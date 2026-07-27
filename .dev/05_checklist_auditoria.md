# 🧪 Checklist y Parámetros de Auditoría — GestionIHA-Finanzas

> **Propósito:** Documento de control de calidad y auditoría post-desarrollo. Cualquier agente IA (Claude Code, Gemini, Codex) debe cumplir el 100% de estos parámetros antes de considerar el desarrollo finalizado. Antigravity utilizará esta lista para auditar el proyecto.

---

## SECCIÓN 1 — Navegación, Layout y UX (P0)

- [ ] **1.1. Sidebar Izquierdo Colapsable:**
  - Alterna entre estado Desplegado (260px) y Retraído (64px con solo íconos + tooltips).
  - Animación de transición fluida (~300ms CSS transition).
  - Estado del sidebar persistido en la cookie `sidebar_state`.
  - En móviles (<768px), el sidebar se convierte en un drawer con overlay oscuro.
  - Soporte RTL completo usando propiedades lógicas CSS (`inset-inline-start`, `margin-inline-start`, etc.).
- [ ] **1.2. Pestañas Horizontales Secundarias:**
  - Fila de pestañas superior que cambia dinámicamente según el módulo activo.
  - Indicador visual animado de pestaña activa.
  - Scroll horizontal responsivo en pantallas pequeñas.
- [ ] **1.3. Onboarding Dual:**
  - Detección automática en primer uso (`onboarding_completed === false`).
  - **Ruta A "Comienza Ya" (30s):** Pide nombre + objetivo principal + moneda (DOP). Sin mencionar IA/agentes.
  - **Ruta B "Configuración Guiada" (15min):** Wizard conversacional con ALIAS para seleccionar actividades económicas, situación de vida, modo de asistencia y configuración del agente.
- [ ] **1.4. Filtrado Dinámico por Actividades Económicas:**
  - Los módulos `Fiscal` y `Clientes` solo son visibles si se selecciona la actividad "Emprendedor/a" o "Profesional independiente".
  - Todos los módulos universales (Inicio, Transacciones, Presupuesto, Cuentas, Planificación, Vouchers, Asistente, Reportes, Exportación, Configuración) están siempre disponibles.

---

## SECCIÓN 2 — Identidad y Comportamiento del Agente ALIAS (P0 / P1)

- [ ] **2.1. Branding e Identidad ALIAS:**
  - Formato por defecto: `ALIAS [NombrePersonalizado]` (ej: ALIAS Axel).
  - Toggle en `Configuración → Agente IA` para mostrar u ocultar el prefijo "ALIAS" en la UI.
  - Si el usuario oculta el prefijo, la UI muestra solo el nombre ("Axel") y los documentos oficiales no llevan el prefijo.
  - Internamente en logs y telemetría de AlianeD, el registro siempre conserva el prefijo `ALIAS`.
- [ ] **2.2. Tono de Género:**
  - Configurable en Masculino, Femenino o Neutro.
  - Inyección adecuada en el system prompt del LLM para mantener la concordancia gramatical en español.
  - Configuración aplicada en las respuestas habladas por voz (TTS).
- [ ] **2.3. Interfaces de ALIAS en la UI:**
  - **Barra Flotante:** Input fijo en la parte inferior del canvas con ícono de micrófono y adjuntar archivo, context-aware del módulo activo.
  - **Widget Lateral:** Panel colapsable a la derecha con historial, adjuntos y botones de acción rápida.
  - **Chat Completo (`/chat`):** Interfaz full-screen en nueva pestaña estilo Gemini/ChatGPT.
  - **Overlay Contextual:** Banners/toasts no bloqueantes para alertas o preguntas de aprendizaje.
  - **Modo Voz:** Integración con Web Speech API (TTS + Reconocimiento de Voz) funcional.
- [ ] **2.4. Aprendizaje Progresivo (Motor de Aprendizaje):**
  - **Máximo 1 pregunta por sesión:** ALIAS nunca hace más de una pregunta al abrir la app o tras registrar un gasto.
  - **Expira tras 3 omisiones:** Si el usuario ignora la pregunta 3 veces, el sistema la marca como `expired` y no la vuelve a mostrar.
  - **Cola de preguntas (`agent_learning_queue`):** Registro y prioridad funcional en PostgreSQL.
- [ ] **2.5. Modos de Asistencia:**
  - **Orientado a Objetivos:** Alertas de impacto en metas de ahorro ante gastos no previstos.
  - **Asistencia Eventual:** Contabilidad silenciosa sin preguntas proactivas sobre metas.

---

## SECCIÓN 3 — Módulos Financieros y Planificación (P1)

- [ ] **3.1. Módulo Planificación (4 Subpáginas):**
  - `/planificacion`: Metas de ahorro con barras de progreso y estado.
  - `/planificacion/eventos`: Planificador de eventos (boda, viajes, carro, etc.) con desglose de costos.
  - `/planificacion/gastos-fijos`: Lista maestra de gastos recurrentes (alquiler, luz, agua, internet, seguros).
  - `/planificacion/calendario`: Calendario visual con marcadores de pagos y fechas límite.
- [ ] **3.2. Dashboard Avanzado y Moneda:**
  - Gráficos D3 interactivos (StreamChart, Treemap, Barras comparativas, Gauge).
  - **Botón DOP ↔ USD:** Conversión de moneda en tiempo real en todos los gráficos usando la matriz FX.
  - **Templates Etiquetados (`dashboard_templates`):** Plantillas predefinidas ("DGII", "Banco", "Financiera", "Personal") y posibilidad de guardar plantillas personalizadas (`Custom`).
- [ ] **3.3. Pipeline OCR → DGII:**
  - Subida/escaneo de voucher en `/vouchers`.
  - Extracción estructurada de monto, fecha, RNC y descripción.
  - Generación y descarga de archivos TXT en formato oficial DGII (606 para compras, 607 para ventas, 608 para anulaciones).
- [ ] **3.4. Exportación Multi-Formato:**
  - Exportación de reportes en CSV, Excel (.xlsx via SheetJS), PDF (via jsPDF/html2pdf) y TXT.
  - Historial de descargas registradas en `export_history`.

---

## SECCIÓN 4 — Módulos Fiscal y Clientes (P2 - Emprendedores)

- [ ] **4.1. Módulo Fiscal (5 Subpáginas):**
  - Panel fiscal con calendario de obligaciones y montos estimados.
  - Gestión de perfiles RNC (`rnc_profiles`) con roles (suplidor/cliente).
  - Generador de formatos 606, 607, 608, IT-1, IR-17.
  - Clasificación de gastos deducibles de ISR.
- [ ] **4.2. Módulo Clientes / CRM (3 Subpáginas):**
  - Directorio de clientes/suplidores.
  - Detalle e historial de transacciones por cliente.
  - Análisis de frecuencia de compra y promedios.

---

## SECCIÓN 5 — Arquitectura de Código y Estándares Técnicos

- [ ] **5.1. Construcción y Tipado:**
  - TypeScript en modo estricto sin uso de `any`.
  - `cd apps/web && npm run lint && npm run build` ejecuta sin errores ni advertencias.
- [ ] **5.2. Base de Datos y RLS:**
  - Migraciones creadas ordenadamente en `db/migrations/` (sin modificar migraciones aplicadas previamente).
  - Todas las tablas nuevas contienen la columna `workspace_id` y aplican políticas RLS por workspace.
- [ ] **5.3. i18n (Internacionalización):**
  - Claves de traducción agregadas en los **8 archivos de idioma** (`en.json`, `es.json`, `ar.json`, `fa.json`, `he.json`, `ru.json`, `uk.json`, `zh.json`) simultáneamente.
- [ ] **5.4. Registros y Seguridad:**
  - Uso exclusivo de `log()` desde `@/server/logger.ts`. Sin `console.log` o `console.error` directos.
  - Sin exposición de API keys o credenciales en código cliente.
- [ ] **5.5. Modo Demo:**
  - La aplicación permite previsualizar y probar los datos demo en caliente sin requerir PostgreSQL.
