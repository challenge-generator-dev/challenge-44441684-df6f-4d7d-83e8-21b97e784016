# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Consultas SQL Básicas y de Optimización**.

| | |
|---|---|
| Tema | Data Manipulation Language (DML) |
| Nivel | trainee-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 |
| Patron arquitectonico | capas estándar |
| Tiempo estimado | 3 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.0.0
- @angular/common 20.0.0
- @angular/forms 20.0.0
- @angular/platform-browser 20.0.0
- @angular/platform-browser-dynamic 20.0.0
- @angular/router 20.0.0
- rxjs 7.8.0
- typescript 5.4.2
- better-sqlite3 n/a
- @types/better-sqlite3 n/a

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Creación y Lectura de Datos**: Lista de productos y clientes creada y consultada.
- **Fase 2 — Actualización y Eliminación de Datos**: Producto actualizado y cliente eliminado.
- **Fase 3 — Consultas Optimizadas**: Resultados de las consultas optimizadas.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (5)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/core/models/client.model.ts` — `PurchaseRecord.map`
      Se invoca `map` sobre `PurchaseRecord`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/services/product.service.ts` — `DatabaseService.executeQuery`
      Se invoca `executeQuery` sobre `DatabaseService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/clients/client-list/client-list.component.ts` — `Client.set`
      Se invoca `set` sobre `Client`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/clients/client-form/client-form.component.ts` — `ClientService.emailExists`
      Se invoca `emailExists` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/shared/components/sql-query/sql-query.component.ts` — `DatabaseService.executeQuery`
      Se invoca `executeQuery` sobre `DatabaseService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (23)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/app/core/models/product.model.ts`
- `src/app/core/models/client.model.ts`
- `src/app/core/services/product.service.ts`
- `src/main.ts`
- `src/index.html`
- `src/app/core/services/client.service.ts`
- `src/app/core/services/database.service.ts`
- `src/app/app.config.ts`
- `src/app/features/products/product-list/product-list.component.ts`
- `src/app/features/products/product-list/product-list.component.html`
- `src/app/features/products/product-list/product-list.component.scss`
- `src/app/features/clients/client-list/client-list.component.ts`
- `src/app/features/clients/client-list/client-list.component.html`
- `src/app/features/clients/client-list/client-list.component.scss`
- `src/app/features/products/product-form/product-form.component.ts`
- `src/app/features/products/product-form/product-form.component.html`
- `src/app/features/clients/client-form/client-form.component.ts`
- `src/app/features/clients/client-form/client-form.component.html`
- `src/app/shared/components/sql-query/sql-query.component.ts`
- `src/app/shared/components/sql-query/sql-query.component.html`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/core`
- `src/app/features/products`
- `src/app/features/clients`
- `src/app/shared`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Bases de datos, Trainee L2
- Brecha que el reto ataca: Ejecuta consultas SQL básicas CRUD (Create, Insert, Select, Update, Delete) y de optimizacion como Joins, Group By y Order By, en al menos un (1) motor de base de datos como SQL Server, Oracle, PostgreSQL, MySQL, DB2 y SQLite.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
