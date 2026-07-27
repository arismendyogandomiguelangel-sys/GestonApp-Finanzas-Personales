# 📋 PLAN MAESTRO DEFINITIVO — GestionIHA-Finanzas

> **Documento consolidado para asignación a agente de desarrollo.**
> Contiene TODAS las decisiones de producto, arquitectura, UX y técnicas acordadas.

---

## 1. Visión del Producto

**GestionIHA-Finanzas** es una web app de finanzas personales agéntica construida sobre el core open-source `expense-budget-tracker` (Next.js 16 + PostgreSQL + TypeScript). Está diseñada para cualquier persona en República Dominicana —sin importar su combinación de roles económicos— que necesite un asistente financiero personal inteligente.

La app no se siente como un software de contabilidad. Se siente como tener a alguien que te ayuda a organizarte financieramente: registra, clasifica, planifica, alerta, exporta y aprende de ti progresivamente.

### Diferenciadores

- **Agente IA personal nombrable** (ALIAS) que aprende progresivamente del usuario sin bombardear con preguntas
- **Multi-LLM**: funciona con Ollama (local/gratis), Gemini, ChatGPT o Alibaba
- **Perfiles flexibles**: no categorías rígidas — combinaciones de actividades económicas y situaciones de vida
- **Onboarding sin fricción**: "Comienza Ya" (30s) o "Configuración Guiada" (15min) — respeta a escépticos de IA
- **Pipeline OCR → DGII**: foto de factura → datos estructurados → formato 606/607 TXT → descarga para subir a Oficina Virtual
- **Dashboard avanzado** con templates etiquetados (DGII, Banco, Financiera, Personal, Custom), exportable a PDF, consultable por el agente
- **Moneda DOP** con botón de conversión instantánea DOP ↔ USD en tiempo real

---

## 2. Stack Tecnológico

| Capa | Tecnología | Notas |
|------|------------|-------|
| **Frontend** | React, Next.js 16, CSS Modules | Base existente del repo |
| **Backend** | Next.js API Routes, TypeScript | Mismo proceso que el frontend |
| **BD** | PostgreSQL 18 con RLS | Contenedor Docker local, RDS en AWS |
| **IA / LLM** | Ollama local, Gemini API, OpenAI API, Alibaba DashScope | Seleccionable por el usuario en la UI |
| **OCR** | Gemini Flash (visión multimodal) / Tesseract.js (fallback local) | Multi-proveedor |
| **Gráficos** | D3.js (existente) + Framer Motion (animaciones) | Dashboards avanzados |
| **Exportación** | SheetJS (xlsx), jsPDF + autoTable (PDF), nativo (CSV/TXT) | Multi-formato |
| **Voz** | Web Speech API (TTS + Speech Recognition) | v1, gratis, offline |
| **Entorno** | Docker Compose (local), AWS CDK (producción) | Existente |
| **Integraciones externas** | Hermes MCP Server (interno AlianeD), Google Workspace y Notion vía Hermes | El usuario NO interactúa con Hermes |

---

## 3. Identidad del Agente: ALIAS

### Significado

```
A · L · I · H · A · S
        ↑
     La IA con H al centro
```

| Capa | Significado |
|------|-------------|
| **Acrónimo** | Contiene "IA" con la H de IHA en el centro |
| **Hebreo** | De "Aliyá" (עֲלִיָּה): progreso, ascenso, retorno al destino |
| **Español** | "Alias" = seudónimo, alter ego, lo que aspiras a ser |
| **Función** | El asistente te ayuda a llegar donde quieres estar financieramente |

### Nomenclatura

| Contexto | Formato | Ejemplo |
|----------|---------|---------|
| **Interfaz del usuario** | `[ALIAS] + Nombre` o solo `Nombre` (configurable) | "Axel" o "ALIAS Axel" |
| **Documentos del usuario** | Solo nombre si quitó prefijo | "Axel" |
| **Ecosistema AlianeD (interno)** | Siempre `ALIAS + Nombre` | "ALIAS Axel" |
| **Logs / registro técnico** | Siempre `ALIAS + Nombre` | Siempre tiene prefijo interno |

- El usuario elige el nombre de su agente en onboarding o en Configuración
- Toggle en settings: "Mostrar prefijo ALIAS" (default: activado)
- Si el usuario no pone nombre → se muestra solo "ALIAS"
- **Prefijo ALIAS = es una IA**. Es la firma del ecosistema AlianeD.

### Tono de Género

| Config | Textos | Voz TTS |
|--------|--------|---------|
| **Masculino** | "Listo, he registrado tu gasto" | Voz masculina |
| **Femenino** | "Lista, he registrado tu gasto" | Voz femenina |
| **Neutro** | "Registrado tu gasto" | Voz neutral |

Se inyecta en el system prompt del LLM para que el modelo respete la concordancia gramatical.

---

## 4. Dos Modos de Asistencia IA

El usuario elige en onboarding (o cambia en cualquier momento en Configuración):

### 🎯 Orientada a Objetivos

- El usuario define metas concretas (pagar deuda, boda, vacaciones, carro, fondo de emergencia)
- ALIAS conecta ACTIVAMENTE cada transacción con los objetivos
- Emite alertas: "Este gasto de RD$8,000, ¿corresponde a tu meta de ahorrar para la boda?"
- Notifica progreso, sugiere ajustes, recalcula proyecciones

### 📋 Asistencia Eventual

- Contabilidad pura: registrar, clasificar, visualizar
- ALIAS organiza, identifica patrones y muestra métricas
- NO emite alertas de objetivo ni preguntas proactivas sobre metas
- Es un asistente silencioso que da claridad para que el usuario tome buenas decisiones

**Ambos modos comparten**: clasificación IA, OCR de vouchers, dashboards, exportación, reportes, aprendizaje progresivo. La diferencia es el **nivel de proactividad** respecto a metas.

---

## 5. Onboarding: Dos Caminos

### Principio de diseño

> No imponer la percepción de "inteligencia artificial que controla tus finanzas". Hay gente que duda, que no quiere compartir datos con una IA. La asistencia es **opcional y progresiva**, nunca forzada.

### Pantalla Inicial

```
┌─────────────────────────────────────────────────────────────────┐
│                    BIENVENIDO A GESTIONIHA                       │
│                                                                 │
│  "Tu espacio personal para organizar tus finanzas"              │
│                                                                 │
│  ¿Tu nombre? [ __________________ ]                              │
│                                                                 │
│  ──────────────── Elige cómo empezar ────────────────           │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────────┐           │
│  │  🚀 COMIENZA YA     │  │  ⚙️ CONFIGURACIÓN       │           │
│  │                     │  │     GUIADA               │           │
│  │  30 segundos.       │  │                         │           │
│  │  Ingresa tu primer  │  │  15 minutos.            │           │
│  │  dato y empieza     │  │  Personaliza tu         │           │
│  │  a registrar.       │  │  experiencia completa.  │           │
│  │                     │  │                         │           │
│  │  Configura lo       │  │  "Para una mejor        │           │
│  │  demás cuando       │  │   experiencia, te       │           │
│  │  quieras.           │  │   sugerimos tomar       │           │
│  │                     │  │   15 min para           │           │
│  │  [Empezar →]        │  │   configurarlo"         │           │
│  │                     │  │  [Configurar →]         │           │
│  └─────────────────────┘  └─────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### Ruta A: 🚀 Comienza Ya (30 segundos)

**1 solo paso:**
- ¿Qué quieres hacer? (○ Presupuesto mensual / ● Registrar gastos / ○ Meta de ahorro)
- Moneda: DOP 🇩🇴
- → [Comenzar]

**NO menciona IA, agentes, ni asistentes.** Módulos por defecto: todos los universales. ALIAS empieza silencioso, aprende progresivamente.

### Ruta B: ⚙️ Configuración Guiada (15 minutos)

Wizard conversacional de 3-4 pasos donde ALIAS se presenta:

1. **Nombre y personalidad del agente**: nombre, tono de género (masculino/femenino/neutro), toggle prefijo ALIAS
2. **Actividades económicas** (multi-selección): Empleado, Estudiante, Emprendedor, Freelancer, Vendedor online, Profesional independiente, Dependiente
3. **Situación de vida** (multi-selección): Vive solo, en familia, padre/madre, madre/padre soltero/a, pareja sin hijos, alquilando, hipoteca, vehículo financiado
4. **Modo de asistencia** + moneda + proveedor IA

---

## 6. Aprendizaje Progresivo de ALIAS

### Principio

ALIAS **NO pregunta todo de golpe**. Aprende **estratégicamente** con cada interacción, como un asistente humano que va conociendo a su jefe.

### Reglas

| Regla | Detalle |
|-------|---------|
| **Máximo 1 pregunta por sesión** | Cuando el usuario abre la app, ALIAS puede hacer UNA pregunta pendiente |
| **Preguntas contextuales** | Después de registrar un gasto, ALIAS puede preguntar algo relevante |
| **Ignorar 3 veces = expirar** | Si el usuario ignora la misma pregunta 3 veces, ALIAS deja de preguntar eso |
| **No bombardear** | Nunca 2+ preguntas seguidas |
| **Formato sutil** | Toast/banner en la parte superior, NO popup bloqueante |

### Ejemplo de flujo

```
Día 1: Usuario registra "Alquiler - RD$18,000"
ALIAS: "¿Quieres que registre esto como gasto recurrente?"
Usuario: "Sí" → ✅ Creado como recurrente mensual

Día 3: Usuario abre la app
ALIAS: "Vi que pagaste luz EDENORTE por RD$2,300. ¿También es mensual?"
Usuario: "Sí, pero varía" → ✅ Recurrente variable, promedio para presupuesto

Día 7: ALIAS detecta gastos diarios de comida sin etiquetar
ALIAS: "He notado gastos de comida casi todos los días. ¿Los agrupo como 'Alimentación'?"
```

### Motor de Aprendizaje (Backend)

1. **OBSERVAR**: Cada transacción → analizar patrones (frecuencia, montos, categorías, horarios)
2. **INFERIR**: Detectar recurrentes, categorías frecuentes, RNC repetidos, tendencias
3. **ENCOLAR**: Agregar preguntas a la cola con prioridad (1 sola pregunta a la vez)
4. **PREGUNTAR**: Timing: al abrir la app O después de registrar
5. **APLICAR**: Respuestas → crear recurrentes, ajustar categorías, refinar system prompt del LLM

---

## 7. Comportamientos Programables del Agente

El usuario configura reglas de comportamiento en **Asistente IA → Reglas**:

| Regla Ejemplo | Trigger | Comportamiento |
|---------------|---------|----------------|
| **Planificación Dominical** | Domingo 6-10 AM | ALIAS inicia sesión de preguntas para presupuesto semanal/mensual |
| **Registro Silencioso** | L-S 8AM-9PM | Solo registra operaciones, NO hace preguntas ni notificaciones |
| **Pre-Cobro** | 1 día antes de ingresos recurrentes (ej: 14, 29) | "Mañana recibes tu ingreso. ¿Usamos la misma planificación o reorganizamos?" |
| **Alerta de Objetivo** | Al registrar gasto > umbral (solo modo Orientado) | "Acabas de gastar RD$8,000. ¿Esto afecta tu meta de vacaciones?" |

---

## 8. Perfiles Flexibles (No Rígidos)

No son categorías fijas. El usuario marca **combinaciones** de actividades y situaciones:

### Actividades Económicas (multi-selección)

| Actividad | Módulos que activa |
|-----------|-------------------|
| **Empleado/a** | Ingresos fijos, retenciones ISR, recurrentes de nómina |
| **Estudiante** | Presupuesto estudiantil, metas, gastos de matrícula |
| **Emprendedor/a** | Módulo Fiscal, RNC, Clientes, facturación, deducibles |
| **Freelancer** | Ingresos variables, clientes por proyecto |
| **Vendedor/a online** | Inventario básico, costos, márgenes |
| **Profesional independiente** | Honorarios, especialización |
| **Dependiente** | Solo registro y control de recursos recibidos |

### Situación de Vida (multi-selección)

Vive solo, en familia, padre/madre, madre/padre soltero/a, pareja sin hijos, alquilando, hipoteca, vehículo financiado.

**Lo que configura**: módulos visibles en sidebar + categorías por defecto + gastos fijos sugeridos + contexto del system prompt del agente. **Todo es modificable después** en Configuración.

---

## 9. Arquitectura de Navegación

### 9.1 Sidebar Izquierdo (Menú Principal)

```
┌──────────────────────────┐
│  🏦 GestionIHA-Finanzas  │  ← Logo + nombre
│  ☰ Toggle                │  ← Expandir/Colapsar
├──────────────────────────┤
│  🏠 Inicio               │  ← 2 pestañas
│  💰 Transacciones        │  ← 5 pestañas
│  📊 Presupuesto          │  ← 3 pestañas
│  💳 Cuentas              │  ← 3 pestañas
│  🎯 Planificación        │  ← 4 pestañas
│  📸 Vouchers & OCR       │  ← 3 pestañas
│  🧠 Asistente IA         │  ← 4 pestañas
│  📈 Reportes & Dashboard │  ← 5 pestañas
│  📤 Exportación          │  ← 4 pestañas
│  🏢 Fiscal (*)           │  ← 5 pestañas
│  👥 Clientes (*)         │  ← 3 pestañas
├──────────────────────────┤
│  ⚙️ Configuración        │  ← 8 pestañas (siempre al fondo)
└──────────────────────────┘

(*) = Solo si el usuario seleccionó Emprendedor o Profesional independiente
```

**Comportamiento:**

| Estado | Ancho | Contenido |
|--------|-------|-----------|
| Abierto | 260px | Ícono + texto + badge de notificaciones |
| Cerrado | 64px | Solo íconos con tooltip al hover |
| Móvil (<768px) | Drawer overlay | Desliza desde la izquierda |

- Transición animada (300ms ease-in-out)
- Estado persistido en cookie `sidebar_state`
- RTL (ar, he, fa): sidebar a la derecha, se refleja todo
- CSS: propiedades lógicas (`inset-inline-start`, `margin-inline-start`, etc.)

### 9.2 Pestañas Horizontales (Menú Secundario)

Fila de pestañas en la parte superior del canvas. Cambian según el módulo activo del sidebar.

---

## 10. Inventario Completo de Módulos y Pestañas

### 🏠 Inicio (2 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Resumen | `/` | Saldo total, gasto del mes, % presupuesto, progreso de metas (modo objetivo), alertas |
| Actividad | `/actividad` | Timeline cronológico de últimas transacciones |

### 💰 Transacciones (5 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Todas | `/transacciones` | Tabla filtrable existente (fecha, categoría, monto, cuenta) |
| Ingresos | `/transacciones/ingresos` | Solo `kind=income` con totales |
| Gastos | `/transacciones/gastos` | Solo `kind=spend` con desglose por categoría |
| Transferencias | `/transacciones/transferencias` | Solo `kind=transfer` entre cuentas |
| Recurrentes | `/transacciones/recurrentes` | 🆕 Pagos automáticos: alquiler, servicios, suscripciones |

### 📊 Presupuesto (3 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Mensual | `/presupuesto` | Grilla existente — planificado vs real |
| Comparativo | `/presupuesto/comparativo` | 🆕 Barras: presupuesto vs gasto real por categoría |
| Histórico | `/presupuesto/historico` | 🆕 Evolución temporal (mes/trimestre/semestre/año) |

### 💳 Cuentas (3 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Balances | `/cuentas` | Tabla de balances existente |
| Detalle | `/cuentas/detalle` | Movimientos de cuenta seleccionada |
| Tasas FX | `/cuentas/fx` | Tabla de tasas con historial |

### 🎯 Planificación (4 pestañas) — 🆕 TODO NUEVO

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Metas | `/planificacion` | Metas de ahorro con barra de progreso |
| Eventos | `/planificacion/eventos` | Gastos grandes: boda (desglose), viaje, embarazo, carro, apartamento |
| Gastos Fijos | `/planificacion/gastos-fijos` | Lista maestra: alquiler, luz, agua, internet, gas, seguros, cuotas |
| Calendario | `/planificacion/calendario` | Vista calendario con marcadores de pagos y vencimientos |

### 📸 Vouchers & OCR (3 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Capturar | `/vouchers` | Subir/escanear voucher → OCR → datos estructurados |
| Lista | `/vouchers/lista` | Vouchers procesados, organizados por fecha |
| Formato DGII | `/vouchers/formato-dgii` | Seleccionar vouchers → generar TXT 606/607 → descargar |

### 🧠 Asistente IA (4 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Chat | `/asistente` | Widget lateral mejorado: texto, voz, adjuntos |
| Chat Completo | `/chat` | Fullscreen estilo Gemini/ChatGPT (ya existe, se potencia) |
| Reglas | `/asistente/reglas` | Configurar comportamientos programables del agente |
| Proveedor | `/asistente/proveedor` | Seleccionar Ollama/Gemini/ChatGPT/Alibaba, API keys, test conexión |

### 📈 Reportes & Dashboard (5 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Dashboard | `/reportes` | Dashboard avanzado con **botón DOP ↔ USD**. Gráficos D3 animados, filtros en vivo, templates etiquetados |
| Mensual | `/reportes/mensual` | Reporte detallado del mes |
| Trimestral | `/reportes/trimestral` | Agregado 3 meses |
| Semestral | `/reportes/semestral` | Agregado 6 meses |
| Anual | `/reportes/anual` | Reporte anual con resumen ejecutivo |

**Templates de Dashboard (etiquetas guardadas):**
- 🏷️ **DGII** — Ingresos brutos, ITBIS, retenciones, formato 606/607
- 🏷️ **Banco** — Ingresos vs gastos, flujo neto, 12 meses (para solicitudes bancarias)
- 🏷️ **Financiera** — Capacidad de pago, ratio deuda/ingreso (para financiamientos)
- 🏷️ **Personal** — Progreso de metas, gastos hormiga, tendencias
- 🏷️ **Custom** — El usuario crea templates personalizados

### 📤 Exportación (4 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Generar | `/exportacion` | Selector: período + formato (CSV, Excel, PDF, TXT) + template → descargar |
| Historial | `/exportacion/historial` | Reportes generados, re-descargables |
| Compartir | `/exportacion/compartir` | Enlace público mensual (existente), email, WhatsApp |
| DGII | `/exportacion/dgii` | Pipeline: facturas → 606/607 TXT → descargar → instrucciones Oficina Virtual |

### 🏢 Fiscal — *Solo Emprendedor/Profesional* (5 pestañas) — 🆕

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Panel | `/fiscal` | Resumen fiscal: obligaciones, montos estimados, próximas fechas |
| RNC | `/fiscal/rnc` | Gestión de perfiles RNC clientes/suplidores |
| Formatos | `/fiscal/formatos` | Generador 606, 607, 608, IT-1, IR-17 |
| Deducibles | `/fiscal/deducibles` | Clasificar gastos como deducibles ISR |
| Calendario | `/fiscal/calendario` | Fechas límite de declaraciones |

### 👥 Clientes — *Solo Emprendedor/Profesional* (3 pestañas) — 🆕

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Directorio | `/clientes` | Lista clientes/suplidores con RNC, nombre, contacto |
| Detalle | `/clientes/detalle` | Historial de transacciones por entidad |
| Frecuencia | `/clientes/frecuencia` | Patrones de recurrencia, montos promedio |

### ⚙️ Configuración (8 pestañas)

| Pestaña | Ruta | Contenido |
|---------|------|-----------|
| Perfil | `/configuracion` | Actividades económicas, situación de vida, modo asistencia |
| Apariencia | `/configuracion/apariencia` | Tema, idioma, formato fecha/número, moneda |
| Categorías | `/configuracion/categorias` | Personalizar categorías (existente) |
| Cuentas | `/configuracion/cuentas` | Gestionar cuentas bancarias y wallets |
| Agente IA | `/configuracion/agente` | Nombre ALIAS, género, toggle prefijo, modo voz on/off |
| Integraciones | `/configuracion/integraciones` | API Keys (existente), conexiones agénticas |
| Notificaciones | `/configuracion/notificaciones` | Alertas de vencimiento, presupuesto excedido |
| Respaldo | `/configuracion/respaldo` | Exportar/importar datos completos |

### Total: 48 subpáginas (40 universales + 8 exclusivas Emprendedor/Profesional)

---

## 11. Interfaces del Agente ALIAS en la App

El usuario interactúa con su agente personal ALIAS a través de 5 interfaces:

### 11.1 Barra Flotante (siempre visible)

- Input de texto fijo en la parte inferior del canvas principal
- Placeholder: "Habla con [ALIAS Nombre]..." o "Habla con [Nombre]..."
- Botón 🎙️ micrófono (dictado/modo voz)
- Botón 📎 adjuntar (fotos de vouchers)
- Al interactuar → mini-chat inline que se despliega
- Contexto-aware: ALIAS sabe en qué módulo y pestaña está el usuario

### 11.2 Widget de Chat Lateral

- Panel colapsable a la derecha (ya existe `ChatLayoutShell`, se mejora)
- Branding ALIAS con nombre y avatar
- Historial, adjuntos, botones de acción rápida, modo voz

### 11.3 Modo Voz

- Web Speech API (TTS + Speech Recognition) para v1
- Voz masculina/femenina/neutra según config de género
- Activable desde 🎙️ en barra flotante o en settings

### 11.4 Overlay Contextual

- Toast/banner sutil en la parte superior cuando ALIAS tiene pregunta de aprendizaje o alerta
- NO es popup bloqueante
- El usuario puede responder, ignorar, o dismiss
- Desaparece automáticamente si no interactúa

### 11.5 Chat Completo (Nueva Pestaña)

- Ruta `/chat` (ya existe, se potencia)
- Interfaz fullscreen estilo Gemini / ChatGPT
- Escribir, adjuntar archivos, dictar
- ALIAS accede a todos los datos financieros del workspace
- Puede pedir reportes, análisis, exportaciones

---

## 12. Integraciones

| Integración | Método | Prioridad | Notas |
|-------------|--------|-----------|-------|
| **ALIAS (agente in-app)** | Motor propio (chat + reglas + aprendizaje) | P0 | El usuario interactúa con ALIAS |
| **Multi-LLM** | Selector UI + abstracción backend (`AI_PROVIDER`) | P0 | Ollama/Gemini/ChatGPT/Alibaba |
| **Hermes** | MCP Server nativo, **invisible al usuario** | P2 | Backend AlianeD, consulta datos, genera reportes |
| **Google Workspace** | Via Hermes (tiene integración nativa) | P3 | Drive, Gmail, Calendar |
| **Notion** | Via Hermes (tiene integración nativa) | P3 | Pages, databases |
| **DGII Oficina Virtual** | Descarga manual de TXT formateado | P1 | 606/607/608 |

---

## 13. Esquema de Base de Datos — Tablas Nuevas

```sql
-- ============================================================
-- MIGRACIÓN 1: Perfiles flexibles y ALIAS
-- ============================================================

ALTER TABLE workspace_settings
  ADD COLUMN economic_activities JSONB DEFAULT '[]',
  ADD COLUMN life_situation JSONB DEFAULT '[]',
  ADD COLUMN assistance_mode TEXT DEFAULT 'goals',
  ADD COLUMN agent_name TEXT DEFAULT NULL,
  ADD COLUMN agent_gender TEXT DEFAULT 'neutral',
  ADD COLUMN agent_provider TEXT DEFAULT 'ollama',
  ADD COLUMN agent_show_prefix BOOLEAN DEFAULT true,
  ADD COLUMN voice_enabled BOOLEAN DEFAULT false,
  ADD COLUMN onboarding_completed BOOLEAN DEFAULT false,
  ADD COLUMN onboarding_type TEXT;

-- ============================================================
-- MIGRACIÓN 2: Planificación financiera
-- ============================================================

CREATE TABLE savings_goals (
  goal_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  name           TEXT NOT NULL,
  target_amount  NUMERIC(15,2) NOT NULL,
  current_amount NUMERIC(15,2) DEFAULT 0,
  currency       TEXT NOT NULL DEFAULT 'DOP',
  deadline       DATE,
  status         TEXT NOT NULL DEFAULT 'active',
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE financial_events (
  event_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  event_type     TEXT NOT NULL,
  name           TEXT NOT NULL,
  estimated_cost NUMERIC(15,2),
  actual_cost    NUMERIC(15,2) DEFAULT 0,
  target_date    DATE,
  status         TEXT NOT NULL DEFAULT 'planning',
  breakdown      JSONB,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recurring_expenses (
  expense_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  name           TEXT NOT NULL,
  amount         NUMERIC(15,2) NOT NULL,
  currency       TEXT NOT NULL DEFAULT 'DOP',
  frequency      TEXT NOT NULL,
  category       TEXT NOT NULL,
  provider       TEXT,
  due_day        INTEGER,
  next_due_date  DATE,
  auto_register  BOOLEAN DEFAULT false,
  active         BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- MIGRACIÓN 3: Motor del agente ALIAS
-- ============================================================

CREATE TABLE agent_behavior_rules (
  rule_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  name           TEXT NOT NULL,
  trigger_type   TEXT NOT NULL,
  trigger_config JSONB NOT NULL,
  behavior_mode  TEXT NOT NULL,
  message_template TEXT,
  active         BOOLEAN DEFAULT true,
  priority       INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE agent_learning_queue (
  question_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  question_type  TEXT NOT NULL,
  context        JSONB NOT NULL,
  priority       INTEGER DEFAULT 0,
  status         TEXT DEFAULT 'pending',
  asked_count    INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now(),
  asked_at       TIMESTAMPTZ,
  answered_at    TIMESTAMPTZ
);

-- ============================================================
-- MIGRACIÓN 4: Dashboard templates y exportación
-- ============================================================

CREATE TABLE dashboard_templates (
  template_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  label          TEXT NOT NULL,
  description    TEXT,
  config         JSONB NOT NULL,
  is_system      BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE export_history (
  export_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  format         TEXT NOT NULL,
  template_label TEXT,
  period_from    DATE NOT NULL,
  period_to      DATE NOT NULL,
  file_name      TEXT NOT NULL,
  file_size      INTEGER,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- MIGRACIÓN 5: RNC y Clientes (módulo Emprendedor)
-- ============================================================

CREATE TABLE rnc_profiles (
  rnc            TEXT NOT NULL,
  workspace_id   UUID NOT NULL REFERENCES workspaces(workspace_id),
  business_name  TEXT NOT NULL,
  role           TEXT NOT NULL,
  category       TEXT,
  frequency      INTEGER DEFAULT 0,
  last_seen      TIMESTAMPTZ,
  metadata       JSONB,
  created_at     TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (rnc, workspace_id)
);

-- TODAS las tablas nuevas llevan RLS por workspace_id
-- siguiendo el mismo patrón del proyecto existente.
```

---

## 14. Archivos a Crear / Modificar

### MODIFICAR (archivos existentes)

| Archivo | Cambio |
|---------|--------|
| `apps/web/src/app/layout.tsx` | Reemplazar topbar+nav por Sidebar + TabBar + AliasFloatingBar |
| `apps/web/src/lib/navigation.ts` | `NAV_LINKS[]` → `MODULES[]` jerárquico con tabs y filtro por actividades |
| `apps/web/src/ui/charts/` | Ampliar con nuevos gráficos D3, animaciones Framer Motion, botón DOP↔USD |
| `apps/web/src/ui/chat/` | Branding ALIAS, adjuntos de imagen, modo voz, botones de acción |
| `apps/web/src/server/chat/openai/loop.ts` | Soportar multi-LLM según `agent_provider` del workspace |
| `apps/web/src/i18n/*.json` (8 archivos) | ~250+ nuevas claves de traducción para todos los módulos |
| `apps/web/src/app/settings/page.tsx` | Reorganizar en 8 pestañas |

### CREAR (archivos nuevos)

**Layout y Navegación:**
- `apps/web/src/ui/Sidebar.tsx` + `.module.css`
- `apps/web/src/ui/TabBar.tsx` + `.module.css`

**ALIAS (Agente):**
- `apps/web/src/ui/alias/AliasFloatingBar.tsx` + `.module.css`
- `apps/web/src/ui/alias/AliasOverlay.tsx`
- `apps/web/src/lib/aliasContext.tsx`
- `apps/web/src/server/alias/systemPrompt.ts`
- `apps/web/src/server/alias/learningEngine.ts`
- `apps/web/src/server/alias/questionQueue.ts`
- `apps/web/src/ui/alias/AgentRulesEditor.tsx`
- `apps/web/src/ui/alias/AgentProviderSelector.tsx`

**Onboarding:**
- `apps/web/src/ui/onboarding/OnboardingRouter.tsx`
- `apps/web/src/ui/onboarding/QuickStart.tsx`
- `apps/web/src/ui/onboarding/GuidedSetup.tsx`
- `apps/web/src/ui/onboarding/Onboarding.module.css`
- `apps/web/src/lib/profileContext.tsx`

**Páginas nuevas (48 rutas):**
- `apps/web/src/app/actividad/page.tsx`
- `apps/web/src/app/transacciones/ingresos/page.tsx`
- `apps/web/src/app/transacciones/gastos/page.tsx`
- `apps/web/src/app/transacciones/transferencias/page.tsx`
- `apps/web/src/app/transacciones/recurrentes/page.tsx`
- `apps/web/src/app/presupuesto/comparativo/page.tsx`
- `apps/web/src/app/presupuesto/historico/page.tsx`
- `apps/web/src/app/cuentas/page.tsx` (renombrar de balances)
- `apps/web/src/app/cuentas/detalle/page.tsx`
- `apps/web/src/app/cuentas/fx/page.tsx`
- `apps/web/src/app/planificacion/page.tsx`
- `apps/web/src/app/planificacion/eventos/page.tsx`
- `apps/web/src/app/planificacion/gastos-fijos/page.tsx`
- `apps/web/src/app/planificacion/calendario/page.tsx`
- `apps/web/src/app/vouchers/page.tsx`
- `apps/web/src/app/vouchers/lista/page.tsx`
- `apps/web/src/app/vouchers/formato-dgii/page.tsx`
- `apps/web/src/app/asistente/page.tsx`
- `apps/web/src/app/asistente/reglas/page.tsx`
- `apps/web/src/app/asistente/proveedor/page.tsx`
- `apps/web/src/app/reportes/page.tsx` (renombrar de dashboards)
- `apps/web/src/app/reportes/mensual/page.tsx`
- `apps/web/src/app/reportes/trimestral/page.tsx`
- `apps/web/src/app/reportes/semestral/page.tsx`
- `apps/web/src/app/reportes/anual/page.tsx`
- `apps/web/src/app/exportacion/page.tsx`
- `apps/web/src/app/exportacion/historial/page.tsx`
- `apps/web/src/app/exportacion/compartir/page.tsx`
- `apps/web/src/app/exportacion/dgii/page.tsx`
- `apps/web/src/app/fiscal/page.tsx`
- `apps/web/src/app/fiscal/rnc/page.tsx`
- `apps/web/src/app/fiscal/formatos/page.tsx`
- `apps/web/src/app/fiscal/deducibles/page.tsx`
- `apps/web/src/app/fiscal/calendario/page.tsx`
- `apps/web/src/app/clientes/page.tsx`
- `apps/web/src/app/clientes/detalle/page.tsx`
- `apps/web/src/app/clientes/frecuencia/page.tsx`
- `apps/web/src/app/configuracion/page.tsx`
- `apps/web/src/app/configuracion/apariencia/page.tsx`
- `apps/web/src/app/configuracion/categorias/page.tsx`
- `apps/web/src/app/configuracion/cuentas/page.tsx`
- `apps/web/src/app/configuracion/agente/page.tsx`
- `apps/web/src/app/configuracion/integraciones/page.tsx`
- `apps/web/src/app/configuracion/notificaciones/page.tsx`
- `apps/web/src/app/configuracion/respaldo/page.tsx`

**Server / API:**
- `apps/web/src/app/api/alias/` (next-question, answer, dismiss)
- `apps/web/src/app/api/agent/rules/route.ts`
- `apps/web/src/app/api/goals/route.ts`
- `apps/web/src/app/api/events/route.ts`
- `apps/web/src/app/api/recurring/route.ts`
- `apps/web/src/app/api/calendar/route.ts`
- `apps/web/src/app/api/export/generate/route.ts`
- `apps/web/src/app/api/export/history/route.ts`
- `apps/web/src/app/api/dashboard-templates/route.ts`
- `apps/web/src/server/alias/` (systemPrompt, learningEngine, questionQueue)
- `apps/web/src/server/dgii/formatters.ts`
- `apps/web/src/server/export/` (csv, xlsx, pdf, txt)
- `apps/web/src/server/dashboardTemplates.ts`
- `apps/web/src/server/planning/` (goals, events, recurring)

**Migraciones DB:**
- `db/migrations/XXXX_flexible_profiles_and_alias.sql`
- `db/migrations/XXXX_planning_tables.sql`
- `db/migrations/XXXX_agent_rules_and_learning.sql`
- `db/migrations/XXXX_dashboard_templates_and_export.sql`
- `db/migrations/XXXX_rnc_profiles.sql`

---

## 15. Verificación

```bash
cd apps/web && npm run lint && npm run build
```

### Checklist Manual

- [ ] Onboarding "Comienza Ya": nombre + objetivo + moneda → app funcional en 30s
- [ ] Onboarding "Guiado": conversación con ALIAS → configuración completa
- [ ] ALIAS se presenta con nombre y género elegido
- [ ] Aprendizaje progresivo: registrar gasto → ALIAS pregunta UNA cosa
- [ ] Máximo 1 pregunta por sesión, ignorar 3x → expirar
- [ ] Barra flotante ALIAS funciona en todos los módulos
- [ ] Sidebar se despliega/colapsa con animación
- [ ] Pestañas cambian al navegar entre módulos
- [ ] Actividades económicas filtran módulos visibles
- [ ] Botón DOP ↔ USD recalcula dashboard en tiempo real
- [ ] Selector de proveedor IA (Ollama/Gemini/ChatGPT) funciona
- [ ] Modo voz: ALIAS habla con tono de género configurado
- [ ] Pipeline: foto → OCR → lista → TXT 606 → descarga
- [ ] Templates dashboard: guardar "DGII" → reusar en otro período
- [ ] Exportación: CSV, Excel, PDF, TXT funcionan
- [ ] Reportes: mensual, trimestral, semestral, anual con métricas
- [ ] Responsive: sidebar drawer en móvil
- [ ] RTL: sidebar a la derecha en ar/he/fa
- [ ] Toggle prefijo ALIAS visible/oculto funciona
- [ ] Build de producción sin errores

---

## 16. Orden de Implementación

| Prioridad | Componente | Duración Est. |
|-----------|------------|---------------|
| **P0** | Sidebar + TabBar + Responsive | 5 días |
| **P0** | Identidad ALIAS (context + branding) | 2 días |
| **P0** | Onboarding Dual (Quick + Guided) | 4 días |
| **P0** | Barra Flotante ALIAS | 3 días |
| **P0** | Migrar rutas existentes al nuevo layout | 3 días |
| **P1** | Motor Aprendizaje Progresivo ALIAS | 5 días |
| **P1** | Multi-LLM Selector UI | 3 días |
| **P1** | Motor de Reglas del Agente | 4 días |
| **P1** | Módulo Planificación (4 pages + BD) | 7 días |
| **P1** | Dashboard Avanzado + Templates + DOP↔USD | 7 días |
| **P1** | Pipeline OCR → Lista → DGII | 5 días |
| **P1** | Exportación Multi-Formato (CSV/Excel/PDF/TXT) | 4 días |
| **P1** | Reportes Temporales (mensual/trimestral/semestral/anual) | 4 días |
| **P2** | Módulo Fiscal completo (5 pages + BD) | 7 días |
| **P2** | Módulo Clientes / CRM (3 pages + BD) | 5 días |
| **P2** | Hermes MCP Server (interno, invisible al usuario) | 5 días |
| **P3** | Modo Voz (Web Speech API TTS + Recognition) | 3 días |
| **P3** | Google Workspace / Notion via Hermes | 4 días |
| **P3** | Notificaciones + Respaldo | 3 días |

**Total estimado: ~83 días de desarrollo** (distribuible en paralelo con subagentes).
