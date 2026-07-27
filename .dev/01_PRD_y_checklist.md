# 📄 PRD + Checklist — FinanzasPersonales IA

## 🎯 Uso de Este Documento
| Consumidor | Propósito | Fases del Roadmap |
|------------|-----------|-------------------|
| **Stitch (Diseño)** | Generar pantallas, mockups y flujos de usuario | Fase 1 |
| **Builders (Desarrollo)** | Construir lógica, OCR, IA, perfiles y APIs | Fases 1-6 |
| **TestSprite (QA)** | Automatizar y validar casos de prueba basándose en la Sección B | Fase 7 |

---

## SECCIÓN A — PRD (Product Requirements Document)

### 1. Visión General
FinanzasPersonales IA es una mini-app de finanzas de uso personal (Miguel Ángel) y de uso agéntico (Hermes, OpenClaw). Permite el registro rápido de transacciones financieras mediante la captura de vouchers físicos. Incorpora un motor de OCR agéntico multi-proveedor (Ollama local, Gemini, OpenAI, Alibaba) para extraer metadatos estructurados (monto, fecha, RNC, descripción) y un clasificador IA que sugiere opciones sencillas de confirmar. También aprende de suplidores y clientes frecuentes basándose en perfiles RNC, optimizando el contexto enviado al modelo mediante un grafo de conocimiento local. Expone una API y CLI para que agentes IA de control automatizado operen en su nombre.

### 2. Objetivos del Producto
| Objetivo | KPI de éxito |
|----------|--------------|
| **Automatización del registro** | El 80% de las capturas OCR de vouchers extraen los datos correctos en < 5s sin corrección manual. |
| **Interacción agéntica fluida** | El usuario registra un voucher en 3 clics o menos en la UI móvil/PWA. |
| **Operación agéntica autónoma** | Hermes o OpenClaw pueden inyectar transacciones y extraer reportes a través de CLI y API. |
| **Optimización de tokens** | Reducir el consumo de tokens en un 50% al clasificar usando el grafo de conocimiento local (perfiles RNC filtrados) en lugar del historial completo. |

### 3. Usuarios
* **Miguel Ángel (Usuario Principal):** Ubicado en Santo Domingo, República Dominicana. Requiere registrar y consultar sus gastos personales rápidamente.
* **Hermes / OpenClaw (Usuarios Secundarios / Agentes):** Agentes de IA que operan en segundo plano, insertando transacciones, auditando registros y generando reportes/exportaciones automáticamente.

### 4. Arquitectura Funcional
La aplicación está organizada en las siguientes áreas de desarrollo:
1. **Core Financiero (Área 1):** Gestión de transacciones, presupuestos, categorías y cuentas basándose en `expense-budget-tracker`.
2. **Motor OCR (Área 2):** Servicio de visión multimodal para lectura y parsing estructurado de vouchers.
3. **Clasificador IA (Área 3):** Clasificación agéntica de transacciones, sugiriendo tipo (compra/gasto/venta) y categoría con 2-3 opciones rápidas.
4. **Perfiles RNC (Área 4):** Registro e identificación inteligente de RNC/RUC de República Dominicana, detectando roles (suplidor/cliente).
5. **Grafo de Conocimiento (Área 5):** Sincronización en archivos Markdown enlazados para formar el grafo que optimiza el contexto de los agentes de IA.
6. **Interfaces Agénticas (Área 6):** API REST protegida por HMAC (telemetría NCP de OpenClaw) y terminal CLI ejecutable.
7. **Dashboard y Exportación (Área 7):** Gráficos de balances, gastos y exportador CSV/TXT compatible con formatos DGI/TCS.

### 5. Stack Tecnológico
| Capa | Tecnología | Justificación |
|------|------------|---------------|
| **Frontend** | React, Next.js, Tailwind CSS | Stack base del repositorio `expense-budget-tracker`, responsivo e interactivo. |
| **Backend** | Next.js API Routes, TypeScript | Core robusto, modular y de alto rendimiento. |
| **Base de Datos** | PostgreSQL | Almacenamiento seguro, soporte de consultas SQL estructuradas y transaccionales. |
| **IA / LLM** | Ollama, Gemini API, OpenAI, Alibaba | Soporte multi-proveedor local (offline) y cloud. |
| **OCR** | Gemini Flash (Visión) / Tesseract.js | Parsing multimodal de fotos de vouchers y fallback local. |
| **Entorno** | Docker Compose | Contenedores locales listos para subir la base de datos y la aplicación. |

### 6. Requerimientos No Funcionales y Estándares ALiaNeD
* **Seguridad de Datos:** PostgreSQL con políticas RLS (Row Level Security) habilitadas para aislar datos.
* **Seguridad Perimetral:** Rate Limiting configurado en endpoints públicos de la API (`/api/ncp/*`, `/api/ocr`, `/api/classify`).
* **Protección del Build:** El frontend compilado no debe exponer source maps en producción.
* **Rendimiento:** Políticas de caché activas para assets estáticos e índices óptimos en PostgreSQL para consultas rápidas.
* **Localización Dominicana:** Moneda DOP ($), fechas en formato DD/MM/YYYY y compatibilidad de campos con el RNC dominicano.
* **Eficiencia de tokens:** El sistema debe usar el grafo de conocimiento para minimizar el tamaño de los prompts de clasificación.

---

## SECCIÓN B — CHECKLIST POR FASE (Casos de prueba para TestSprite)

### Fase 1: Core Financiero
- [ ] El contenedor Postgres se levanta y expone el puerto correspondiente.
- [ ] La aplicación web se inicia localmente y es accesible.
- [ ] Se verifica que la base de datos ejecuta migraciones de esquema correctamente.
- [ ] La API SQL interna responde correctamente a peticiones autorizadas con API Key.

### Fase 2: Motor OCR
- [ ] Cargar una imagen de voucher a través de `POST /api/ocr` y validar que extrae el monto numérico exacto.
- [ ] Validar que se detecta y extrae correctamente un RNC de 9 dígitos de la República Dominicana.
- [ ] Verificar el fallback a OCR local (Tesseract.js) en caso de fallo de red de los APIs Cloud.

### Fase 3: IA de Clasificación
- [ ] Comprobar que `POST /api/classify` retorna un JSON estructurado con el formato de 2-3 opciones de clasificación rápida.
- [ ] Verificar que las sugerencias de categorías se basan en el perfil de gasto.
- [ ] Comprobar que la UI muestra de manera interactiva los botones rápidos ("gasto", "compra", "venta") para confirmación en 1 clic.

### Fase 4: Aprendizaje de RNC y Grafo
- [ ] Registrar un RNC nuevo y validar que se crea un perfil en `rnc_profiles`.
- [ ] Comprobar que el sistema detecta correctamente la frecuencia y clasifica al proveedor.
- [ ] Validar que se escribe el nodo en el grafo de conocimiento local (formato Markdown `[[RNC_12345]]`).
- [ ] Confirmar que al clasificar una transacción, el prompt inyecta únicamente la información relevante del RNC extraída del grafo.

### Fase 5: Dashboard e Informes
- [ ] Visualizar en la UI gráficos correctos de gastos acumulados por categoría y suplidor.
- [ ] Exportar un archivo CSV y verificar que las columnas contienen los datos esperados de transacciones.
- [ ] Generar un archivo TXT y validar que sigue el formato estructurado para los reportes de DGI/TCS.

### Fase 6: Interfaces CLI y NCP
- [ ] Ejecutar el CLI `npm run cli transaction:add` y verificar que la transacción se guarda en la base de datos.
- [ ] Ejecutar una llamada HTTP POST a `/api/ncp/` con una firma HMAC inválida y comprobar que retorna error `401 Unauthorized`.
- [ ] Realizar la llamada HTTP POST anterior con firma HMAC válida y verificar que se procesa la telemetría agéntica correctamente.

### Fase 7: QA y Despliegue
- [ ] El frontend no expone source maps en el build de producción.
- [ ] Los endpoints públicos de la API tienen Rate Limiting configurado.
- [ ] La base de datos tiene políticas RLS habilitadas y probadas.
- [ ] Las páginas de Términos de Servicio y Política de Privacidad están accesibles.
