# 🏁 Handoff & Estado Actual — GestionIHA-Finanzas

## Estado del Proyecto
* **Fase Actual:** Fase 1 → Transición a Rediseño Integral (Plan Maestro v4 aprobado)
* **Sub-estado:** 🟡 Plan consolidado y listo para ejecución. Core de `expense-budget-tracker` clonado. Target de Despliegue Producción: **Vercel + Supabase**.
* **Fecha:** 27 de julio de 2026

## Decisiones Tomadas y Bloqueadas

| Decisión | Estado | Detalles |
|----------|--------|----------|
| **Base del Proyecto** | ✅ Aprobada | Clonación e integración de `expense-budget-tracker` en la raíz finalizada. |
| **Documentación de Fase 0** | ✅ Aprobada | Roadmap, PRD, Prompts y Documento Técnico inicializados. |
| **Nombre de la App** | ✅ Aprobada | **GestionIHA-Finanzas** |
| **Identidad del Agente** | ✅ Aprobada | **ALIAS** (ALIHAS). Nombre personalizable por el usuario. Prefijo ALIAS opcional en UI, siempre presente internamente. Tono de género configurable (masculino/femenino/neutro). |
| **Navegación** | ✅ Aprobada | Sidebar izquierdo colapsable (260px/64px) + pestañas horizontales por módulo. 12 módulos, 48 subpáginas. |
| **Perfiles** | ✅ Aprobada | Perfiles flexibles multi-selección (actividades económicas + situación de vida). NO categorías rígidas. |
| **Onboarding** | ✅ Aprobada | Dos caminos: "Comienza Ya" (30s, sin mencionar IA) + "Configuración Guiada" (15min, conversación con ALIAS). |
| **Aprendizaje del Agente** | ✅ Aprobada | Progresivo: máx 1 pregunta por sesión, ignorar 3x = expirar. NO bombardear. |
| **Modos de Asistencia** | ✅ Aprobada | "Orientada a Objetivos" (proactivo con metas) + "Asistencia Eventual" (silencioso, solo organiza). |
| **Multi-LLM** | ✅ Aprobada | Ollama (local), Gemini, ChatGPT, Alibaba. Seleccionable por el usuario. |
| **Moneda** | ✅ Aprobada | DOP principal + botón DOP↔USD en dashboard para conversión en tiempo real. |
| **Dashboard** | ✅ Aprobada | Avanzado con D3 + Framer Motion. Templates etiquetados (DGII, Banco, Financiera, Personal, Custom). Exportable PDF. |
| **Hermes** | ✅ Aprobada | Interno de AlianeD. El usuario NUNCA interactúa con Hermes. ALIAS es la cara del agente para el usuario. |
| **Integraciones Google/Notion** | ✅ Aprobada | Via Hermes como intermediario (ya tiene integración nativa). Prioridad P3. |
| **Despliegue Producción / SaaS** | ✅ Aprobada | **Vercel** (Frontend/Backend Next.js) + **Supabase / Neon** (PostgreSQL en la nube). 100% compatible con la arquitectura actual. |

## Plan Maestro de Desarrollo

📄 **Documento completo:** `.dev/04_plan_maestro_v4.md`

Contiene:
- 16 secciones con todas las especificaciones
- Esquema SQL completo de 8 tablas nuevas (5 migraciones)
- Inventario de ~45 archivos nuevos + 7 archivos a modificar
- 48 rutas/subpáginas con su contenido detallado
- 5 interfaces del agente ALIAS
- Sistema de templates de dashboard con etiquetas
- Pipeline OCR → DGII
- Checklist de verificación (20 items)
- Orden de implementación por prioridad (P0→P3)

## Instrucciones para el Agente de Desarrollo

### Skill Obligatorio: Claude E² v2.0

El agente constructor DEBE usar la skill **Claude E² v2.0** (`C:\Users\dell\.gemini\config\skills\claude-e2\SKILL.md`) para:

1. **Clasificar complejidad** de cada componente con el medidor de 5 dimensiones antes de actuar.
2. **Asignar modelo correcto**:
   - **P0 (Layout, Sidebar, Onboarding)**: Complejidad Alta (6-8) → `opus-architect` / Terra planifica → `sonnet-executor` / Luna ejecuta
   - **P1 (Motor ALIAS, Dashboard, OCR)**: Complejidad Alta → mismo patrón Terra → Luna
   - **P2 (Fiscal, Clientes)**: Complejidad Media (3-5) → Luna directo
   - **P3 (Voz, Integraciones)**: Complejidad Media → Luna directo
3. **Usar `compactar`** al finalizar cada componente P0/P1 para liberar contexto.
4. **Usar `goals` / `hitos`** al inicio para estructurar los 19 componentes como hitos verificables.
5. **No crear diagramas desde cero** sin consultar primero (ya hay diagramas en `.dev/03_documento_tecnico.md`).

### Reglas del Proyecto (de AGENTS.md y GEMINI.md)

- Código en TypeScript estricto, comentarios en inglés.
- Functional programming, clases solo para conectores externos.
- Errores explícitos con contexto, sin fallback silencioso.
- Cambios de esquema SOLO en `db/migrations/` nuevas, nunca editar migraciones existentes.
- Actualizar TODOS los archivos de locale (8 idiomas) en cada cambio de i18n.
- RTL: propiedades lógicas CSS (`inset-inline-start`, `margin-inline-start`, etc.), `[dir="rtl"]` solo cuando no hay equivalente lógico.
- Usar `log()` del logger estructurado, nunca `console.log`.
- Verificar con `cd apps/web && npm run lint && npm run build` al completar cada componente.
- Modo Demo debe funcionar sin Postgres para hot-reload durante desarrollo UI.

### Orden de Ejecución

```
P0 → Sidebar + TabBar → ALIAS Context → Onboarding Dual → Barra Flotante → Migrar rutas
P1 → Motor Aprendizaje → Multi-LLM → Reglas Agente → Planificación → Dashboard → OCR → Export → Reportes
P2 → Fiscal → Clientes → Hermes MCP
P3 → Voz → Google/Notion → Notificaciones
```

## Documentos del Proyecto

| Documento | Ruta | Estado |
|-----------|------|--------|
| Plan Maestro | `.dev/04_plan_maestro_v4.md` | ✅ Aprobado — EJECUTAR |
| Checklist Auditoría | `.dev/05_checklist_auditoria.md` | ✅ Aprobado — EVALUAR POST-DEV |
| Roadmap | `roadmap.md` | ✅ Aprobado |
| Documento Técnico | `.dev/03_documento_tecnico.md` | ✅ Completado |
| Reglas de Optimización | `.agents/global-optimization.md` | ✅ Vigente |
