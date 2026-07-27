# ⚙️ Documento Técnico — FinanzasPersonales IA

Este documento describe las bases arquitectónicas y la configuración técnica del proyecto.

---

## 1. Diagrama de Arquitectura
El siguiente diagrama describe el flujo de datos desde la captura de vouchers físicos hasta el almacenamiento y consumo agéntico:

```
[ Celular / PWA / Web UI ]
         │ (Subida de Imagen)
         ▼
[ POST /api/ocr ] ───► [ AIService ] ───► [ Ollama (Local) o Gemini/OpenAI (Cloud) ]
                             │
                             ▼ (Devuelve JSON estructurado)
[ POST /api/classify ] ◄─────┘
         │
         ├───► Sugerencias en UI (2-3 opciones de confirmación)
         │
         ▼ (Confirmación del Usuario)
[ Registrar Transacción ] ───► [ PostgreSQL ] ───► [ Grafo de Conocimiento (.dev/knowledge/) ]
                                     ▲
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                                       │
                 ▼                                       ▼
     [ CLI (npm run cli) ]                     [ NCP API (/api/ncp/) ]
                 ▲                                       ▲
                 │                                       │
            [ OpenClaw ]                             [ Hermes ]
```

---

## 2. Stack Tecnológico Detallado
* **Frontend/Backend:** Next.js (TypeScript), utilizando API Routes para endpoints y Tailwind CSS para la interfaz web.
* **Base de Datos:** PostgreSQL local, levantada en un contenedor Docker con persistencia de volumen.
* **IA/OCR:** Abstracción multi-proveedor usando la API de OpenAI, Gemini Flash API (Multimodal), Alibaba (DashScope) y Ollama local.
* **Seguridad:** Autenticación por firma HMAC (para telemetría) y API Keys para la API SQL de consulta directa.

---

## 3. Variables de Entorno Requeridas
Configura el archivo `.env` en la raíz del proyecto con las siguientes variables:

| Variable | Propósito | Valor por Defecto / Ejemplo |
|----------|-----------|-----------------------------|
| `DATABASE_URL` | Conexión con PostgreSQL | `postgresql://postgres:postgres@localhost:5432/finance_tracker` |
| `AI_PROVIDER` | Proveedor activo de IA | `ollama` (opciones: `ollama`, `gemini`, `openai`, `alibaba`) |
| `OLLAMA_BASE_URL` | URL de Ollama local | `http://localhost:11434` |
| `OLLAMA_MODEL` | Modelo local para clasificar | `qwen2.5-coder` (o similar) |
| `GEMINI_API_KEY` | Key para Gemini (Cloud) | `AIzaSy...` (si aplica) |
| `OPENAI_API_KEY` | Key para OpenAI | `sk-proj-...` (si aplica) |
| `ALIBABA_API_KEY` | Key para Alibaba | `sk-...` (si aplica) |
| `ARMOR_WEBHOOK_SECRET` | Secreto HMAC para NCP | `super_secret_hmac_key` |
| `ADMIN_API_KEY` | Key para acceso a la API SQL | `admin_secret_key_123` |

---

## 4. Estructura de Archivos del Proyecto
El proyecto se organiza de la siguiente manera:

```
GestorIHA-Finanzas_Personales(GFP)/
├── .agents/                      # Reglas específicas de optimización de agentes
│   └── global-optimization.md
├── .dev/                         # Documentación técnica y perfiles locales
│   ├── 01_PRD_y_checklist.md
│   ├── 02_system_prompts.md
│   ├── 03_documento_tecnico.md
│   ├── hermes_api_reference.md   # Referencia de API SQL y Endpoints para Hermes
│   ├── handoffs/
│   │   └── current-state.md
│   └── knowledge/                # Nodos del Grafo de Conocimiento (Markdown)
├── apps/                         # Aplicación Next.js frontend/backend
│   └── web/
│       ├── src/
│       │   ├── pages/api/        # Endpoints (ocr, classify, ncp, sql)
│       │   └── services/         # Servicios (ai, database, graph)
│       └── package.json
├── db/                           # Scripts de base de datos y migraciones
├── infra/                        # Configuración de Docker y contenedores
│   └── docker/
│       └── compose.yml           # Archivo Docker Compose de Postgres y Web
├── scripts/                      # Utilidades de automatización
├── roadmap.md                    # Roadmap de 8 fases del proyecto
└── package.json                  # Script base y comandos CLI
```

---

## 5. Guía de Construcción y Ejecución
Sigue estos pasos para iniciar el proyecto localmente:

1. **Instalar Dependencias:**
   ```bash
   npm install
   ```
2. **Configurar el Entorno:**
   Copiar el archivo de configuración `.env.example` y renombrarlo como `.env`.
   ```bash
   cp .env.example .env
   ```
3. **Levantar Contenedores de Base de Datos:**
   ```bash
   docker compose -f infra/docker/compose.yml up -d
   ```
4. **Ejecutar Migraciones:**
   ```bash
   npm run db:migrate
   ```
5. **Iniciar el Servidor de Desarrollo:**
   ```bash
   npm run dev
   ```

---

## 6. ADRs (Architecture Decision Records)
* **ADR 1: Híbrido CLI y NCP (HTTP):** Decidimos soportar tanto una interfaz por consola (CLI) como llamadas Webhook NCP (HMAC). La CLI facilita la manipulación directa en entornos sandbox con shell, mientras que la API por NCP permite la integración de agentes distribuidos de forma remota sin requerir permisos de terminal.
* **ADR 2: Grafo de Conocimiento en Markdown Local:** Para optimizar tokens, guardamos los perfiles de suplidores y categorías en archivos Markdown planos enlazados. Esto permite al agente de IA leer y actualizar las relaciones de forma rápida con técnicas de búsqueda simple sobre texto, evitando sobrecargar la base de datos PostgreSQL con consultas relacionales complejas y reduciendo el prompt de LLM.
