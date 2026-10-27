# Consultas SQL Básicas y de Optimización

En el contexto de una aplicación de gestión de inventarios, debes ejecutar consultas SQL para manipular datos de productos y clientes. Los productos tienen atributos como nombre, precio, stock y categoría. Los clientes tienen atributos como nombre, correo electrónico y historial de compras. El sistema debe permitir la creación, lectura, actualización y eliminación de productos y clientes, así como la realización de consultas optimizadas como joins, group by y order by.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Data Manipulation Language (DML) |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 3 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Creación y Lectura de Datos

**Objetivo:** Ejecutar consultas SQL para crear y leer datos de productos y clientes.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Crear un producto con nombre, precio, stock y categoría.
- Consultar todos los productos y verificar que el producto creado aparece en la lista.
- Crear un cliente con nombre y correo electrónico.
- Consultar todos los clientes y verificar que el cliente creado aparece en la lista.

**Entregable:** Lista de productos y clientes creada y consultada.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que los nombres de los productos y clientes no pueden ser duplicados.
- Verifica que los precios de los productos sean positivos.

</details>

### Fase 2: Actualización y Eliminación de Datos

**Objetivo:** Ejecutar consultas SQL para actualizar y eliminar datos de productos y clientes.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Actualizar el precio de un producto existente.
- Eliminar un cliente existente.
- Verificar que el producto y el cliente han sido actualizados y eliminados correctamente.

**Entregable:** Producto actualizado y cliente eliminado.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que al actualizar un producto, el precio debe seguir siendo positivo.
- Verifica que el cliente eliminado no aparece en la lista de clientes.

</details>

### Fase 3: Consultas Optimizadas

**Objetivo:** Ejecutar consultas SQL optimizadas como joins, group by y order by.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Realizar un join entre productos y clientes para obtener una lista de productos comprados por cada cliente.
- Agrupar los productos por categoría y contar el número de productos en cada categoría.
- Ordenar los productos por precio de forma ascendente y descendente.

**Entregable:** Resultados de las consultas optimizadas.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que los joins deben realizarse entre las tablas correctas y con las condiciones adecuadas.
- Verifica que los resultados de las consultas group by y order by son correctos y eficientes.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las consultas SQL básicas y de optimización?
- **paraQueSirve**: ¿Para qué sirven las consultas SQL básicas y de optimización en una aplicación de gestión de inventarios?
- **comoSeUsa**: ¿Cómo se usan las consultas SQL básicas y de optimización para manipular datos de productos y clientes?
- **erroresComunes**: ¿Cuáles son los errores comunes al ejecutar consultas SQL básicas y de optimización?

## Criterios de Evaluacion

- Ejecutar correctamente consultas SQL para crear, leer, actualizar y eliminar datos de productos y clientes.
- Realizar correctamente consultas SQL optimizadas como joins, group by y order by.
- Identificar y corregir errores comunes al ejecutar consultas SQL básicas y de optimización.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
