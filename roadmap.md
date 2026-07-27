# 🗺️ Roadmap Maestro — GestionIHA-Finanzas

> **FUENTE ÚNICA DE VERDAD DEL CICLO DE VIDA DEL PROYECTO (Plan v4).**

---

## 🎯 Visión del Producto

**GestionIHA-Finanzas** es una web app de finanzas personales agéntica basada en `expense-budget-tracker`. Permite a cualquier persona en República Dominicana gestionar sus finanzas con la ayuda de un asistente personal inteligente (ALIAS). Ofrece captura de vouchers vía OCR, clasificación multi-LLM (Ollama, Gemini, ChatGPT, Alibaba), perfiles flexibles por actividad y situación de vida, exportación en formato DGII (606/607), dashboard avanzado con templates y soporte multi-moneda (DOP/USD).

---

## 📦 Estrategia de Entrega por Fases

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Fase 0  │────►│ Fase 1  │────►│ Fase 2  │────►│ Fase 3  │────►│ Fase 4  │
│ Plan.   │     │ Core UI │     │ ALIAS   │     │ Planif. │     │ Dash/   │
│ ✅       │     │ P0      │     │ P1      │     │ P1      │     │ DGII P1 │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
                                                                     │
┌─────────┐     ┌─────────┐     ┌─────────┐                          │
│ Fase 7  │◄────│ Fase 6  │◄────│ Fase 5  │◄─────────────────────────┘
│ QA/Audit│     │ Integr. │     │ Fiscal/ │
│ P3      │     │ P2-P3   │     │ Client  │
└─────────┘     └─────────┘     └─────────┘
```

---

## Fase 0: 🔍 Planificación y Especificación — ✅ COMPLETADA

* **Objetivo:** Definir el alcance completo, UX/UI, arquitectura agéntica ALIAS y checklist de auditoría.
* **Entregables:** 
  - `roadmap.md`
  - `.dev/01_PRD_y_checklist.md`
  - `.dev/02_system_prompts.md`
  - `.dev/03_documento_tecnico.md`
  - `.dev/04_plan_maestro_v4.md`
  - `.dev/05_checklist_auditoria.md`
  - `.dev/handoffs/current-state.md`
* **DoD:** Todos los documentos maestros redactados y consolidados.

---

## Fase 1: 🏗️ Layout Base, Sidebar y Onboarding (P0) — 🟡 EN CURSO

* **Objetivo:** Construir la infraestructura de navegación responsiva, perfiles flexibles y onboarding dual.
* **Hitos:**
  - [ ] **H1.1:** Sidebar colapsable (260px ↔ 64px) con animaciones CSS, persistencia en cookie y soporte RTL.
  - [ ] **H1.2:** Fila de pestañas superiores (`TabBar`) dinámicas por módulo activo.
  - [ ] **H1.3:** Contexto de perfil flexible (`profileContext.tsx`) con actividades económicas y situación de vida.
  - [ ] **H1.4:** Onboarding Dual: Pantalla "Comienza Ya" (30s) + Wizard conversacional "Configuración Guiada" (15min).
  - [ ] **H1.5:** Reorganización de las rutas base existentes al nuevo layout grid.
* **DoD:** Navegación funcional en 48 subpáginas y onboarding asignando permisos/módulos correctamente.

---

## Fase 2: 🧠 Motor Agéntico ALIAS y Multi-LLM (P0 / P1)

* **Objetivo:** Implementar la identidad del agente ALIAS, interfaces de usuario y motor de aprendizaje progresivo.
* **Hitos:**
  - [ ] **H2.1:** Configuración de Identidad ALIAS (Nombre personalizable, Tono de género M/F/N, Toggle de prefijo "ALIAS").
  - [ ] **H2.2:** Integración de la Barra Flotante de ALIAS (input + micrófono + adjuntos) en la parte inferior del canvas.
  - [ ] **H2.3:** Integración del Selector Multi-LLM (Ollama local, Gemini, ChatGPT, Alibaba) con test de conexión inline.
  - [ ] **H2.4:** Implementación del Motor de Aprendizaje Progresivo (`learningEngine.ts` + `agent_learning_queue`) con límite de 1 pregunta por sesión y expiración tras 3 omisiones.
  - [ ] **H2.5:** Motor de Reglas de Comportamiento Programables (`agent_behavior_rules`): Planificación dominical, Registro silencioso, Pre-cobro, etc.
* **DoD:** ALIAS responde por texto/voz en las 5 interfaces y aprende progresivamente del usuario.

---

## Fase 3: 🎯 Módulo de Planificación Financiera (P1)

* **Objetivo:** Crear el conjunto de herramientas de planificación financiera personal.
* **Hitos:**
  - [ ] **H3.1:** `/planificacion` (Metas de Ahorro con barras de progreso).
  - [ ] **H3.2:** `/planificacion/eventos` (Planificación de Boda, Viajes, Carro, Vivienda, Embarazo con desglose).
  - [ ] **H3.3:** `/planificacion/gastos-fijos` (Lista maestra de pagos recurrentes: Alquiler, EDENORTE/CAASD, Internet, Seguros).
  - [ ] **H3.4:** `/planificacion/calendario` (Vista calendario con marcadores de cobro y vencimientos).
* **DoD:** Tablas `savings_goals`, `financial_events` y `recurring_expenses` operativas con UI interactiva.

---

## Fase 4: 📊 Dashboard Avanzado, OCR y Exportación DGII (P1)

* **Objetivo:** Dashboard analítico interactivo, procesamiento de vouchers y exportación multi-formato.
* **Hitos:**
  - [ ] **H4.1:** Dashboard interactivo D3 con botón de conversión instantánea **DOP ↔ USD**.
  - [ ] **H4.2:** Sistema de Templates de Dashboard con Etiquetas (`dashboard_templates`): "DGII", "Banco", "Financiera", "Personal", "Custom".
  - [ ] **H4.3:** Pipeline OCR de recibos/vouchers → Lista organizada → Formato DGII.
  - [ ] **H4.4:** Generador de archivos TXT oficiales 606 (compras), 607 (ventas) y 608 (anulaciones).
  - [ ] **H4.5:** Módulo de Exportación Multi-formato (CSV, Excel .xlsx, PDF presentable, TXT).
* **DoD:** Descarga de archivos TXT compatibles con la Oficina Virtual DGII y exportación de reportes PDF.

---

## Fase 5: 🏢 Módulo Fiscal y Clientes (P2 - Emprendedores)

* **Objetivo:** Herramientas de control tributario y CRM ligero para emprendedores y profesionales independientes.
* **Hitos:**
  - [ ] **H5.1:** Módulo Fiscal completo (`/fiscal`, `/fiscal/rnc`, `/fiscal/formatos`, `/fiscal/deducibles`, `/fiscal/calendario`).
  - [ ] **H5.2:** Módulo Clientes/Suplidores (`/clientes`, `/clientes/detalle`, `/clientes/frecuencia`).
  - [ ] **H5.3:** Mapeo de perfiles RNC y clasificación automática de gastos deducibles de ISR.
* **DoD:** Gestión de clientes/suplidores por RNC y reportes fiscales mensuales.

---

## Fase 6: 🔌 Integraciones Internas y Agénticas (P2 / P3)

* **Objetivo:** Conectar el backend con Hermes y servicios externos del ecosistema AlianeD.
* **Hitos:**
  - [ ] **H6.1:** Servidor MCP nativo en la app para consumo interno por Hermes.
  - [ ] **H6.2:** Modo Voz mejorado utilizando Web Speech API (TTS + Speech Recognition).
  - [ ] **H6.3:** Conexión vía Hermes a Google Workspace (Drive, Gmail, Calendar) y Notion.
* **DoD:** Hermes puede auditar, generar reportes y sincronizar datos sin intervención directa del usuario.

---

## Fase 7: 🧪 Auditoría, QA y Cierre (P3)

* **Objetivo:** Verificación del 100% de la checklist de auditoría y prueba de producción.
* **Hitos:**
  - [ ] **H7.1:** Verificación estricta del checklist `.dev/05_checklist_auditoria.md`.
  - [ ] **H7.2:** Ejecución de `npm run lint` y `npm run build` en `apps/web`.
  - [ ] **H7.3:** Handoff final y evaluación de eficiencia de tokens con Antigravity.
* **DoD:** Cobertura total de requisitos sin errores ni advertencias de compilación.
