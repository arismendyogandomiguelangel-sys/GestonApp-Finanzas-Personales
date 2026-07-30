# GestionIHA-Finanzas: guía funcional para la gestión asistida de finanzas personales

## 1. Propósito

GestionIHA-Finanzas ayuda a una persona contemporánea a convertir información financiera dispersa —cuentas, efectivo, ingresos, recibos, pagos, deudas y metas— en una vista comprensible y accionable. La persona conserva el control; la aplicación organiza los datos y el asistente Axelin propone el siguiente paso, explica las opciones y pide confirmación antes de registrar información financiera.

No es solo una hoja de cálculo ni un chatbot aislado. Es un espacio de trabajo financiero: cada módulo muestra una proyección visual de los datos que la persona registra, confirma o construye junto al asistente.

## 2. Principios de la experiencia iHA

- **La persona decide.** Axelin puede sugerir, resumir, clasificar y preparar borradores, pero no debe inventar datos ni ejecutar movimientos financieros sin confirmación.
- **Un objetivo a la vez.** La configuración inicial se aborda como un objetivo concreto, por ejemplo: “organizar mis finanzas de este mes”.
- **Menos carga cognitiva.** La persona puede empezar por una conversación, un recibo o una transacción; no tiene que conocer toda la estructura desde el primer día.
- **Datos privados por espacio de trabajo.** Cada usuario trabaja en su propio espacio y los datos se aíslan por permisos.
- **La IA usa contexto.** El asistente debe saber cuál módulo está abierto y qué objetivo está activo para orientar la respuesta.

## 3. Ruta recomendada para una persona nueva

1. Crear la cuenta e iniciar sesión.
2. Seleccionar idioma, tema, zona horaria y moneda de reporte.
3. Definir las cuentas o lugares donde existe dinero: banco, efectivo, tarjeta, ahorro o inversión.
4. Registrar las fuentes de ingreso, obligaciones y gastos recurrentes.
5. Añadir transacciones recientes o cargar vouchers.
6. Confirmar las categorías sugeridas.
7. Crear el primer presupuesto mensual.
8. Revisar saldos y panel para decidir qué ajustar.

En una experiencia agéntica completa, Axelin guía estos pasos, registra borradores y lleva un indicador discreto de progreso en el objetivo activo. Esa capa de objetivos está definida como la siguiente evolución del producto; no debe presentarse como terminada hasta que sus datos, permisos y confirmaciones estén implementados.

## 4. Funcionalidades por categoría

### A. Cuenta, seguridad y espacio personal

| Funcionalidad | Qué permite | Estado |
| --- | --- | --- |
| Registro e inicio de sesión | Crear una cuenta, verificarla e iniciar/cerrar sesión. | Disponible |
| Espacios de trabajo | Separar las finanzas de cada usuario o contexto. | Disponible |
| Aislamiento de datos | Restringir cada consulta y escritura al espacio autorizado. | Disponible |
| Preferencias de usuario | Ajustar idioma, formato, fecha, zona horaria, tema y moneda de reporte. | Disponible |
| Conexiones de agentes | Ver y revocar conexiones autorizadas de agentes. | Disponible |

### B. Registro financiero diario

| Funcionalidad | Qué permite | Estado |
| --- | --- | --- |
| Transacciones | Registrar ingresos, gastos y transferencias. | Disponible |
| Cuentas y saldos nativos | Identificar el origen o destino del dinero y su moneda. | Disponible |
| Categorías y notas | Clasificar movimientos y preservar contexto útil. | Disponible |
| Metadatos de cuenta | Indicar liquidez, uso personal o de negocio y tipo de cuenta. | Disponible |
| Vouchers y recibos | Adjuntar comprobantes de forma segura mediante Cloudinary. | Disponible |
| OCR de comprobantes | Leer automáticamente los datos de un recibo y proponer un registro. | En preparación |

### C. Presupuesto, control y decisiones

| Funcionalidad | Qué permite | Estado |
| --- | --- | --- |
| Presupuesto mensual | Planificar por categoría usando un monto base y modificadores. | Disponible |
| Comentarios de presupuesto | Guardar contexto o decisiones sobre una línea presupuestaria. | Disponible |
| Saldos por cuenta | Ver la disponibilidad por cuenta y moneda. | Disponible |
| Panel financiero | Revisar tendencias y el comportamiento presupuestario. | Disponible; se sigue mejorando la experiencia |
| Avisos de conversión | Identificar importes que no pueden convertirse por falta de tasa. | Disponible |
| Metas de ahorro | Definir una meta, aportes y progreso. | En preparación |
| Gastos fijos y calendario | Organizar obligaciones recurrentes y vencimientos. | En preparación |
| Eventos financieros | Planear viaje, vivienda, vehículo, boda u otro proyecto. | En preparación |

### D. Monedas y visión de diáspora

| Funcionalidad | Qué permite | Estado |
| --- | --- | --- |
| Moneda de reporte | Elegir la moneda en la que se leen los resúmenes. | Disponible |
| Registro en moneda original | Conservar el valor real de cada transacción. | Disponible |
| Conversión de reportes | Mostrar totales comparables en la moneda de reporte. | Disponible cuando hay tasas cargadas |
| DOP, USD y EUR | Orientación de producto para República Dominicana, Estados Unidos y Europa. | En consolidación de UX y tasas |
| Tasas diarias | Alimentar conversiones con una tabla de tasas. | Requiere activar y supervisar el proceso de carga |

### E. Asistencia por IA: Axelin / ALIAS

| Funcionalidad | Qué permite | Estado |
| --- | --- | --- |
| Barra flotante | Abrir una conversación desde cualquier módulo. | Disponible |
| Chat contextual | Consultar datos financieros y recibir orientación dentro de la aplicación. | Disponible según proveedor configurado |
| Adjuntos y dictado | Compartir archivos y usar entradas de voz compatibles. | Disponible según navegador/proveedor |
| Preguntas de aprendizaje | Pedir una confirmación breve para mejorar clasificaciones o reglas. | Base disponible |
| Reglas de comportamiento | Definir preferencias de seguimiento y automatización. | En desarrollo |
| Objetivo activo y progreso | Guiar una configuración o proyecto con hitos, porcentaje y pausas. | Diseñado; pendiente de implementación completa |
| Selección de LLM | Conectar OpenAI, Ollama Cloud, Gemini u otros proveedores aprobados. | En preparación; las claves deben ser solo de servidor |

### F. Fiscal, clientes y exportación

| Funcionalidad | Qué permite | Estado |
| --- | --- | --- |
| Módulo fiscal | Organizar información tributaria y revisiones. | Estructura de interfaz disponible; flujo pendiente |
| Clientes y suplidores | Mantener contactos, historial y frecuencia. | Estructura de interfaz disponible; flujo pendiente |
| Formatos DGII | Preparar información para 606, 607 y 608. | En preparación |
| Exportación CSV, Excel, PDF y TXT | Compartir o presentar información financiera. | En preparación |
| Enlace mensual público | Compartir un reporte mensual controlado por el usuario. | Disponible |

## 5. Cómo usa la IA la información

Axelin trabaja en cuatro niveles:

1. **Comprender.** Lee la pregunta, el módulo actual y los datos a los que el usuario le concedió acceso.
2. **Proponer.** Sugiere una categoría, una transacción, un presupuesto, una regla o el próximo paso de configuración.
3. **Confirmar.** Antes de crear, modificar o eliminar información financiera, solicita confirmación explícita.
4. **Explicar.** Indica qué cambió, dónde se guardó y qué impacto tiene en el saldo, presupuesto u objetivo.

Ejemplo: la persona escribe “cobro RD$45,000 por servicios de contabilidad el día 30”. Axelin debe reconocer que parece un ingreso, preparar los campos necesarios, preguntar por la cuenta de destino si falta y mostrar el borrador antes de guardarlo.

## 6. Integración MCP con Hermes

### Rol de cada componente

| Componente | Responsabilidad |
| --- | --- |
| Persona | Define el objetivo, aporta datos y aprueba cambios. |
| GestionIHA-Finanzas | Guarda y visualiza las finanzas, presupuesto, saldos y comprobantes. |
| Axelin | Es la experiencia conversacional dentro de la app. |
| Hermes | Es el agente externo del ecosistema ALiHaneD que puede razonar y coordinar herramientas. |
| MCP / API de agentes | Es el contrato controlado por el cual Hermes descubre capacidades y trabaja con un espacio autorizado. |

### Flujo seguro esperado

```text
Persona → Axelin o Hermes → solicitud estructurada → MCP/API de GestionIHA
       ← explicación y confirmación ← datos filtrados por permisos ←
```

1. Hermes descubre las capacidades públicas del servicio.
2. El usuario concede acceso únicamente a su espacio de trabajo.
3. Hermes obtiene una identidad o clave de agente con alcance limitado.
4. El agente consulta saldos, transacciones, presupuesto o esquema permitido.
5. Para escribir datos, Hermes presenta un borrador y la persona confirma.
6. La aplicación registra la operación de forma auditable y actualiza sus módulos visuales.
7. El usuario puede revocar la conexión desde Configuración.

### Capacidades expuestas actualmente

- Descubrimiento de agente y de las relaciones de datos permitidas.
- Selección de espacio de trabajo para una identidad de agente.
- Consulta SQL restringida, con límites de filas y de tiempo, sobre relaciones permitidas.
- Gestión y revocación de conexiones de agentes.
- Ruta MCP inicial que declara herramientas de saldo y presupuesto.

### Límite actual importante

La ruta MCP actual es una base de descubrimiento y lista de herramientas; todavía no equivale a una integración completa de Hermes con ejecución segura de todas las operaciones financieras. Para completarla faltan autenticación MCP con alcance, herramientas de escritura con confirmación, auditoría de acciones, pruebas de extremo a extremo y el indicador de objetivo/progreso en Axelin.

## 7. Privacidad y responsabilidades

- La base de datos y autenticación se ejecutan en InsForge.
- Los vouchers se almacenan en Cloudinary; la aplicación genera firmas temporales y no expone el secreto de Cloudinary al navegador.
- Vercel aloja la aplicación web y conserva las variables de entorno cifradas.
- GitHub contiene el código y valida cambios, pero no debe contener claves, contraseñas, URLs con secretos ni archivos `.env`.
- Las claves de modelos de IA deben permanecer del lado del servidor. Un Ollama local no puede ser accedido directamente desde Vercel; requiere un conector local o Hermes como puente autorizado.

## 8. Resumen de valor

GestionIHA-Finanzas busca que una persona no tenga que “aprender contabilidad para poder organizarse”. Puede comenzar por lo que ya sabe —un cobro, un recibo, una deuda o una meta— y convertirlo gradualmente en una estructura financiera clara. La IA y Hermes deben disminuir el trabajo mecánico, mientras la persona mantiene la decisión final, la privacidad y el control de su información.
