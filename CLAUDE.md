# CLAUDE.md — GestorIHA-Finanzas_Personales (GFP)

## Contexto del Proyecto
Este proyecto es una mini-app personal de finanzas con IA, basada en `expense-budget-tracker`. Permite captura de vouchers (OCR), clasificación por agente IA, aprendizaje de RNC y perfiles, dashboard y exportación a DGI/TCS, e integración con Hermes/OpenClaw.

## Primeras Acciones
1. Leer el `roadmap.md` del proyecto para conocer la fase activa.
2. Consultar el estado actual en `.dev/handoffs/current-state.md`.

## Reglas de Operación y Construcción
- Hablar siempre en Español.
- Usar estilo TERSE (ir al grano, sin saludos ni relleno conversacional).
- Leer archivos antes de codificar. Escribir soluciones completas, sin sobreingeniería.
- Formato de paleta HSL para cualquier UI web moderna.

## Optimizaciones de Tokens y Contexto
- Rules: Read files first. Write complete solution. Test once. No over-engineering. Be terse. No conversational filler.
- **graphify** — usar para entender el repositorio y las dependencias antes de hacer lecturas masivas de archivos.

## Comandos Útiles
- Levantar entorno local: `docker compose up -d` o `make up`
- Ejecutar tests: `npm run test`
- Ejecutar comandos CLI de finanzas: `npm run cli`