# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/core/models/client.model.ts` — `PurchaseRecord.map`: Se invoca `map` sobre `PurchaseRecord`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/services/product.service.ts` — `DatabaseService.executeQuery`: Se invoca `executeQuery` sobre `DatabaseService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/clients/client-list/client-list.component.ts` — `Client.set`: Se invoca `set` sobre `Client`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/clients/client-form/client-form.component.ts` — `ClientService.emailExists`: Se invoca `emailExists` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/shared/components/sql-query/sql-query.component.ts` — `DatabaseService.executeQuery`: Se invoca `executeQuery` sobre `DatabaseService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Bases de datos, Trainee L2

### Brecha de conocimiento
Ejecuta consultas SQL básicas CRUD (Create, Insert, Select, Update, Delete) y de optimizacion como Joins, Group By y Order By, en al menos un (1) motor de base de datos como SQL Server, Oracle, PostgreSQL, MySQL, DB2 y SQLite.

### Reto
- Tema: Data Manipulation Language (DML)
- Seniority: trainee-l2
- Tipo: practical
- Título: Consultas SQL Básicas y de Optimización
- Tiempo estimado: 3 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Creación y Lectura de Datos — objetivo: Ejecutar consultas SQL para crear y leer datos de productos y clientes. — entregable (NO resolver): Lista de productos y clientes creada y consultada.
- Fase 2: Actualización y Eliminación de Datos — objetivo: Ejecutar consultas SQL para actualizar y eliminar datos de productos y clientes. — entregable (NO resolver): Producto actualizado y cliente eliminado.
- Fase 3: Consultas Optimizadas — objetivo: Ejecutar consultas SQL optimizadas como joins, group by y order by. — entregable (NO resolver): Resultados de las consultas optimizadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "inventory-management",
  "version": "0.0.1",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~20.0.0",
    "@angular/common": "~20.0.0",
    "@angular/compiler": "~20.0.0",
    "@angular/core": "~20.0.0",
    "@angular/forms": "~20.0.0",
    "@angular/platform-browser": "~20.0.0",
    "@angular/platform-browser-dynamic": "~20.0.0",
    "@angular/router": "~20.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0"
  },
  "devDependencies": {
    "@angular/cli": "~20.0.0",
    "@angular/compiler-cli": "~20.0.0",
    "@types/better-sqlite3": "^7.6.4",
    "@types/jasmine": "~4.3.0",
    "jasmine-core": "~4.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.4.2"
  }
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "inventory-management": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/inventory-management",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "development": {
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": true,
              "buildOptimizer": false
            },
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "development": {
              "browserTarget": "inventory-management:build:development"
            },
            "production": {
              "browserTarget": "inventory-management:build:production"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "inventory-management:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "defaultProject": "inventory-management"
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom",
      "dom.iterable"
    ],
    "paths": {
      "@app/*": [
        "src/app/*"
      ],
      "@core/*": [
        "src/app/core/*"
      ],
      "@features/*": [
        "src/app/features/*"
      ],
      "@shared/*": [
        "src/app/shared/*"
      ]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: src/app/core/models/product.model.ts ===
// Modelo de datos para productos con atributos como nombre, precio, stock y categoría.

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number = 0,
    name: string = '',
    price: number = 0,
    stock: number = 0,
    category: string = '',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Product {
    return new Product(
      json.id,
      json.name,
      json.price,
      json.stock,
      json.category,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      category: this.category,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('El nombre del producto es obligatorio.');
    }
    if (this.price <= 0) {
      errors.push('El precio debe ser mayor que cero.');
    }
    if (this.stock < 0) {
      errors.push('El stock no puede ser negativo.');
    }
    if (!this.category || this.category.trim().length === 0) {
      errors.push('La categoría es obligatoria.');
    }
    return { valid: errors.length === 0, errors };
  }
}

// === ARCHIVO: src/app/core/models/client.model.ts ===
// Modelo de datos para clientes con atributos como nombre, correo electrónico e historial de compras.

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Client {
  id: number;
  name: string;
  email: string;
  purchaseHistory: PurchaseRecord[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number = 0,
    name: string = '',
    email: string = '',
    purchaseHistory: PurchaseRecord[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.purchaseHistory = purchaseHistory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Client {
    const purchaseHistory = json.purchaseHistory ? json.purchaseHistory.map((record: any) => PurchaseRecord.fromJson(record)) : [];
    return new Client(
      json.id,
      json.name,
      json.email,
      purchaseHistory,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      purchaseHistory: this.purchaseHistory.map(record => record.toJson()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('El nombre del cliente es obligatorio.');
    }
    if (!this.email || !this.email.includes('@')) {
      errors.push('El correo electrónico debe ser válido.');
    }
    return { valid: errors.length === 0, errors };
  }
}

export class PurchaseRecord {
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: Date;

  constructor(
    productId: number = 0,
    productName: string = '',
    quantity: number = 0,
    totalPrice: number = 0,
    purchaseDate: Date = new Date()
  ) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.purchaseDate = purchaseDate;
  }

  static fromJson(json: any): PurchaseRecord {
    return new PurchaseRecord(
      json.productId,
      json.productName,
      json.quantity,
      json.totalPrice,
      new Date(json.purchaseDate)
    );
  }

  toJson(): any {
    return {
      productId: this.productId,
      productName: this.productName,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      purchaseDate: this.purchaseDate.toISOString()
    };
  }
}

// === ARCHIVO: src/app/core/services/product.service.ts ===
// Servicio para manejar operaciones CRUD de productos utilizando consultas SQL.

import { Injectable } from '@angular/core';
import { DatabaseService } from '@core/services/database.service';
import { Product } from '@core/models/product.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private databaseService: DatabaseService) {}

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    const query = `
      INSERT INTO products (name, price, stock, category, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      product.name,
      product.price,
      product.stock,
      product.category,
      product.createdAt.toISOString(),
      product.updatedAt.toISOString()
    ];
    
    return from(this.databaseService.executeQuery(query, params).then(result => {
      product.id = result.lastInsertRowid;
      return product;
    }));
  }

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    const query = 'SELECT * FROM products';
    return from(this.databaseService.executeQuery(query).then(rows => {
      return rows.map((row: any) => Product.fromJson(row));
    }));
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product | null> {
    const query = 'SELECT * FROM products WHERE id = ?';
    const params = [id];
    return from(this.databaseService.executeQuery(query, params).then(rows => {
      return rows.length > 0 ? Product.fromJson(rows[0]) : null;
    }));
  }

  // Actualizar un producto
  updateProduct(product: Product): Observable<Product> {
    const query = `
      UPDATE products
      SET name = ?, price = ?, stock = ?, category = ?, updatedAt = ?
      WHERE id = ?
    `;
    const params = [
      product.name,
      product.price,
      product.stock,
      product.category,
      product.updatedAt.toISOString(),
      product.id
    ];
    
    return from(this.databaseService.executeQuery(query, params).then(() => product));
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<void> {
    const query = 'DELETE FROM products WHERE id = ?';
    const params = [id];
    return from(this.databaseService.executeQuery(query, params).then(() => {}));
  }

  // Verificar si un nombre de producto ya existe (excluyendo el ID actual en caso de actualización)
  productNameExists(name: string, excludeId?: number): Observable<boolean> {
    let query = 'SELECT COUNT(*) as count FROM products WHERE name = ?';
    const params: any[] = [name];
    
    if (excludeId !== undefined) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    return from(this.databaseService.executeQuery(query, params).then(rows => {
      return rows[0].count > 0;
    }));
  }
}

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Error al iniciar la aplicación Angular:', err));

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Gestión de Inventarios</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sistema de gestión de inventarios con consulta y manipulación de datos SQL">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
  <noscript>
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1>JavaScript requerido</h1>
      <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: src/app/core/services/client.service.ts ===
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { Client, PurchaseRecord } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private databaseService: DatabaseService) {}

  createClient(client: Client): Observable<Client> {
    const validation = client.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const emailExists = this.clientEmailExistsSync(client.email, client.id);
    if (emailExists) {
      throw new Error(`El correo electrónico '${client.email}' ya está registrado`);
    }

    const sql = `
      INSERT INTO clients (name, email, phone, address, created_at, updated_at)
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    const params = [client.name, client.email, client.phone || null, client.address || null];
    return from(this.databaseService.run(sql, params)).pipe(
      map(() => client),
      catchError(error => {
        console.error('Error creating client:', error);
        throw new Error(`No se pudo crear el cliente: ${error.message}`);
      })
    );
  }

  getAllClients(): Observable<Client[]> {
    const sql = 'SELECT * FROM clients ORDER BY name ASC';
    return from(this.databaseService.all<any>(sql)).pipe(
      map(rows => rows.map(row => Client.fromJson(row))),
      catchError(error => {
        console.error('Error fetching clients:', error);
        throw new Error(`No se pudieron obtener los clientes: ${error.message}`);
      })
    );
  }

  getClientById(id: number): Observable<Client | null> {
    const sql = 'SELECT * FROM clients WHERE id = ?';
    return from(this.databaseService.get<any>(sql, [id])).pipe(
      map(row => row ? Client.fromJson(row) : null),
      catchError(error => {
        console.error('Error fetching client by id:', error);
        throw new Error(`No se pudo obtener el cliente: ${error.message}`);
      })
    );
  }

  updateClient(client: Client): Observable<Client> {
    const validation = client.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const existingClient = this.getClientByIdSync(client.id);
    if (!existingClient) {
      throw new Error(`El cliente con ID ${client.id} no existe`);
    }

    const emailExists = this.clientEmailExistsSync(client.email, client.id);
    if (emailExists) {
      throw new Error(`El correo electrónico '${client.email}' ya está registrado`);
    }

    const sql = `
      UPDATE clients
      SET name = ?, email = ?, phone = ?, address = ?, updated_at = datetime('now')
      WHERE id = ?
    `;

    const params = [client.name, client.email, client.phone || null, client.address || null, client.id];
    return from(this.databaseService.run(sql, params)).pipe(
      map(() => client),
      catchError(error => {
        console.error('Error updating client:', error);
        throw new Error(`No se pudo actualizar el cliente: ${error.message}`);
      })
    );
  }

  deleteClient(id: number): Observable<void> {
    const existingClient = this.getClientByIdSync(id);
    if (!existingClient) {
      throw new Error(`El cliente con ID ${id} no existe`);
    }

    const sql = 'DELETE FROM clients WHERE id = ?';
    return from(this.databaseService.run(sql, [id])).pipe(
      map(() => undefined),
      catchError(error => {
        console.error('Error deleting client:', error);
        throw new Error(`No se pudo eliminar el cliente: ${error.message}`);
      })
    );
  }

  clientEmailExists(email: string, excludeId?: number): Observable<boolean> {
    return of(this.clientEmailExistsSync(email, excludeId));
  }

  private clientEmailExistsSync(email: string, excludeId?: number): boolean {
    let sql = 'SELECT COUNT(*) as count FROM clients WHERE email = ?';
    const params: any[] = [email];

    if (excludeId !== undefined) {
      sql += ' AND id != ?';
      params.push(excludeId);
    }

    try {
      const result = this.databaseService.get<{ count: number }>(sql, params);
      return result ? result.count > 0 : false;
    } catch {
      return false;
    }
  }

  private getClientByIdSync(id: number): Client | null {
    try {
      const sql = 'SELECT * FROM clients WHERE id = ?';
      const row = this.databaseService.get<any>(sql, [id]);
      return row ? Client.fromJson(row) : null;
    } catch {
      return null;
    }
  }

  getClientPurchaseHistory(clientId: number): Observable<PurchaseRecord[]> {
    const sql = `
      SELECT pr.*, p.name as product_name, p.price as product_price
      FROM purchase_records pr
      JOIN products p ON pr.product_id = p.id
      WHERE pr.client_id = ?
      ORDER BY pr.purchase_date DESC
    `;

    return from(this.databaseService.all<any>(sql, [clientId])).pipe(
      map(rows => rows.map(row => PurchaseRecord.fromJson(row))),
      catchError(error => {
        console.error('Error fetching purchase history:', error);
        throw new Error(`No se pudo obtener el historial de compras: ${error.message}`);
      })
    );
  }

  getClientsWithPurchases(): Observable<any[]> {
    const sql = `
      SELECT c.*, COUNT(pr.id) as purchase_count, SUM(pr.quantity * pr.unit_price) as total_spent
      FROM clients c
      LEFT JOIN purchase_records pr ON c.id = pr.client_id
      GROUP BY c.id
      ORDER BY total_spent DESC
    `;

    return from(this.databaseService.all<any>(sql)).pipe(
      map(rows => rows.map(row => ({
        ...Client.fromJson(row),
        purchaseCount: row.purchase_count,
        totalSpent: row.total_spent || 0
      }))),
      catchError(error => {
        console.error('Error fetching clients with purchases:', error);
        throw new Error(`No se pudieron obtener los clientes con compras: ${error.message}`);
      })
    );
  }
}

// === ARCHIVO: src/app/core/services/database.service.ts ===
import { Injectable } from '@angular/core';
import Database from 'better-sqlite3';

export interface QueryResult {
  changes: number;
  lastInsertRowid: number;
}

export interface DatabaseConfig {
  filename: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: Database.Database | null = null;
  private readonly defaultDbPath = 'inventory.db';

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    try {
      this.db = new Database(this.defaultDbPath);
      this.db.pragma('journal_mode = WAL');
      this.createTables();
      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  private createTables(): void {
    if (!this.db) throw new Error('Base de datos no inicializada');

    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        price REAL NOT NULL CHECK(price >= 0),
        stock INTEGER NOT NULL CHECK(stock >= 0),
        category TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `;

    const createClientsTable = `
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        address TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `;

    const createPurchaseRecordsTable = `
      CREATE TABLE IF NOT EXISTS purchase_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL CHECK(quantity > 0),
        unit_price REAL NOT NULL,
        total_price REAL NOT NULL,
        purchase_date TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
      CREATE INDEX IF NOT EXISTS idx_purchase_records_client ON purchase_records(client_id);
      CREATE INDEX IF NOT EXISTS idx_purchase_records_product ON purchase_records(product_id);
    `;

    try {
      this.db.exec(createProductsTable);
      this.db.exec(createClientsTable);
      this.db.exec(createPurchaseRecordsTable);
      this.db.exec(createIndexes);
    } catch (error) {
      console.error('Error al crear las tablas:', error);
      throw error;
    }
  }

  run(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      try {
        const stmt = this.db.prepare(sql);
        const result = stmt.run(...params);
        resolve({
          changes: result.changes,
          lastInsertRowid: Number(result.lastInsertRowid)
        });
      } catch (error) {
        console.error('Error executing SQL run:', sql, params, error);
        reject(error);
      }
    });
  }

  get<T>(sql: string, params: any[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      try {
        const stmt = this.db.prepare(sql);
        const row = stmt.get(...params) as T | undefined;
        resolve(row || null);
      } catch (error) {
        console.error('Error executing SQL get:', sql, params, error);
        reject(error);
      }
    });
  }

  all<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      try {
        const stmt = this.db.prepare(sql);
        const rows = stmt.all(...params) as T[];
        resolve(rows);
      } catch (error) {
        console.error('Error executing SQL all:', sql, params, error);
        reject(error);
      }
    });
  }

  transaction<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      const transaction = this.db.transaction(async () => {
        return fn();
      });

      try {
        const result = transaction();
        resolve(result);
      } catch (error) {
        console.error('Error en transacción:', error);
        reject(error);
      }
    });
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('Conexión a la base de datos cerrada');
    }
  }

  getDatabase(): Database.Database | null {
    return this.db;
  }
}

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { DatabaseService } from './core/services/database.service';
import { ProductService } from './core/services/product.service';
import { ClientService } from './core/services/client.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    DatabaseService,
    ProductService,
    ClientService
  ]
};

// === ARCHIVO: src/app/features/products/product-list/product-list.component.ts ===
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  selectedCategory = signal<string>('');
  sortField = signal<'name' | 'price' | 'stock'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  categories = computed(() => {
    const cats = new Set<string>();
    this.products().forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
  });

  filteredProducts = computed(() => {
    let result = this.products();
    const category = this.selectedCategory();
    if (category) {
      result = result.filter(p => p.category === category);
    }
    const field = this.sortField();
    const direction = this.sortDirection();
    result = [...result].sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
      }
      return direction === 'asc' ? comparison : -comparison;
    });
    return result;
  });

  totalValue = computed(() => {
    return this.filteredProducts().reduce((sum, p) => sum + (p.price * p.stock), 0);
  });

  totalProducts = computed(() => this.filteredProducts().length);

  lowStockCount = computed(() => this.filteredProducts().filter(p => p.stock < 10).length);

  constructor(private productServ: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar los productos. Intenta de nuevo.');
        this.isLoading.set(false);
        console.error('Error cargando productos:', err);
      }
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }
    this.isLoading.set(true);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(products => products.filter(p => p.id !== id));
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al eliminar el producto.');
        this.isLoading.set(false);
        console.error('Error eliminando producto:', err);
      }
    });
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  clearCategory(): void {
    this.selectedCategory.set('');
  }

  toggleSort(field: 'name' | 'price' | 'stock'): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(field: string): string {
    if (this.sortField() !== field) return '';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }

  refreshData(): void {
    this.loadProducts();
  }
}

// === ARCHIVO: src/app/features/products/product-list/product-list.component.html ===
<div class="product-list-container">
  <header class="list-header">
    <h1>Gestión de Productos</h1>
    <div class="header-actions">
      <button class="btn-primary" routerLink="/products/new">
        <span class="icon">+</span> Nuevo Producto
      </button>
      <button class="btn-secondary" (click)="refreshData()">
        <span class="icon">↻</span> Actualizar
      </button>
    </div>
  </header>

  <div class="stats-bar">
    <div class="stat-item">
      <span class="stat-label">Total Productos:</span>
      <span class="stat-value">{{ totalProducts() }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Valor Inventario:</span>
      <span class="stat-value">${{ totalValue() | number:'1.2-2' }}</span>
    </div>
    <div class="stat-item warning" *ngIf="lowStockCount() > 0">
      <span class="stat-label">Stock Bajo:</span>
      <span class="stat-value">{{ lowStockCount() }}</span>
    </div>
  </div>

  <div class="filters-section">
    <label class="filter-label">Filtrar por categoría:</label>
    <div class="category-filters">
      <button 
        class="filter-chip" 
        [class.active]="selectedCategory() === ''"
        (click)="clearCategory()">
        Todos
      </button>
      <button 
        *ngFor="let cat of categories()" 
        class="filter-chip"
        [class.active]="selectedCategory() === cat"
        (click)="setCategory(cat)">
        {{ cat }}
      </button>
    </div>
  </div>

  <div class="error-banner" *ngIf="errorMessage()">
    <span class="error-icon">⚠</span>
    <span>{{ errorMessage() }}</span>
    <button class="close-btn" (click)="errorMessage.set('')">×</button>
  </div>

  <div class="loading-overlay" *ngIf="isLoading()">
    <div class="spinner"></div>
    <span>Cargando productos...</span>
  </div>

  <div class="table-container" *ngIf="!isLoading()">
    <table class="products-table" *ngIf="filteredProducts().length > 0; else noProducts">
      <thead>
        <tr>
          <th class="sortable" (click)="toggleSort('name')">
            Nombre {{ getSortIcon('name') }}
          </th>
          <th class="sortable" (click)="toggleSort('price')">
            Precio {{ getSortIcon('price') }}
          </th>
          <th class="sortable" (click)="toggleSort('stock')">
            Stock {{ getSortIcon('stock') }}
          </th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th class="actions-column">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of filteredProducts()" 
            [class.low-stock]="product.stock < 10">
          <td class="product-name">{{ product.name }}</td>
          <td class="product-price">${{ product.price | number:'1.2-2' }}</td>
          <td class="product-stock">
            <span class="stock-badge" [class.low]="product.stock < 10">
              {{ product.stock }}
            </span>
          </td>
          <td class="product-category">
            <span class="category-tag">{{ product.category }}</span>
          </td>
          <td class="product-description">{{ product.description }}</td>
          <td class="action-buttons">
            <button class="btn-icon edit" 
                    [routerLink]="['/products/edit', product.id]" 
                    title="Editar">
              ✎
            </button>
            <button class="btn-icon delete" 
                    (click)="deleteProduct(product.id)" 
                    title="Eliminar"
                    [disabled]="isLoading()">
              🗑
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ng-template #noProducts>
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No hay productos</h3>
        <p *ngIf="selectedCategory()">No se encontraron productos en la categoría "{{ selectedCategory() }}"</p>
        <p *ngIf="!selectedCategory()">Comienza agregando tu primer producto</p>
        <button class="btn-primary" routerLink="/products/new">
          Agregar Producto
        </button>
      </div>
    </ng-template>
  </div>
</div>

// === ARCHIVO: src/app/features/products/product-list/product-list.component.scss ===
$primary-color: #2563eb;
$secondary-color: #64748b;
$success-color: #22c55e;
$warning-color: #f59e0b;
$danger-color: #ef4444;
$bg-light: #f8fafc;
$border-color: #e2e8f0;
$text-dark: #1e293b;
$text-muted: #64748b;

.product-list-container {
  padding: 24px;
  background: $bg-light;
  min-height: 100vh;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: $text-dark;
    margin: 0;
  }

  .header-actions {
    display: flex;
    gap: 12px;
  }
}

.btn-primary {
  background: $primary-color;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: darken($primary-color, 10%);
  }

  .icon {
    font-size: 18px;
  }
}

.btn-secondary {
  background: white;
  color: $secondary-color;
  border: 1px solid $border-color;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: $bg-light;
    border-color: $secondary-color;
  }

  .icon {
    font-size: 18px;
  }
}

.stats-bar {
  display: flex;
  gap: 24px;
  background: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .stat-label {
      font-size: 13px;
      color: $text-muted;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: $text-dark;
    }

    &.warning .stat-value {
      color: $warning-color;
    }
  }
}

.filters-section {
  margin-bottom: 20px;

  .filter-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: $text-muted;
    margin-bottom: 8px;
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-chip {
    background: white;
    border: 1px solid $border-color;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    color: $text-muted;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }

    &.active {
      background: $primary-color;
      border-color: $primary-color;
      color: white;
    }
  }
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: $danger-color;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;

  .error-icon {
    font-size: 18px;
  }

  .close-btn {
    margin-left: auto;
    background: none;
    border: none;
    font-size: 20px;
    color: $danger-color;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: $text-muted;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid $border-color;
    border-top-color: $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.products-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid $border-color;
  }

  th {
    background: $bg-light;
    font-weight: 600;
    font-size: 13px;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        background: darken($bg-light, 3%);
        color: $text-dark;
      }
    }
  }

  tbody tr {
    transition: background 0.15s ease;

    &:hover {
      background: $bg-light;
    }

    &.low-stock {
      background: #fffbeb;

      &:hover {
        background: #fef3c7;
      }
    }
  }

  .product-name {
    font-weight: 500;
    color: $text-dark;
  }

  .product-price {
    font-variant-numeric: tabular-nums;
    color: $text-dark;
  }

  .product-stock {
    .stock-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      background: $success-color;
      color: white;

      &.low {
        background: $danger-color;
      }
    }
  }

  .product-category {
    .category-tag {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      background: #e0e7ff;
      color: #3730a3;
    }
  }

  .product-description {
    color: $text-muted;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actions-column {
    width: 100px;
    text-align: center;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;

    .btn-icon {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &.edit {
        background: #e0f2fe;
        color: #0284c7;

        &:hover {
          background: #bae6fd;
        }
      }

      &.delete {
        background: #fef2f2;
        color: $danger-color;

        &:hover:not(:disabled) {
          background: #fecaca;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }
}

.empty-state {
  padding: 60px;
  text-align: center;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 20px;
    color: $text-dark;
    margin: 0 0 8px;
  }

  p {
    color: $text-muted;
    margin: 0 0 24px;
  }
}

// === ARCHIVO: src/app/features/clients/client-list/client-list.component.ts ===
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService } from '@core/services/client.service';
import { Client } from '@core/models/client.model';
import { SqlQueryComponent } from '@shared/components/sql-query/sql-query.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SqlQueryComponent],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  private clientService = inject(ClientService);

  clients = signal<Client[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  lastQueryExecuted = signal<string>('');

  clientCount = computed(() => this.clients().length);

  hasClients = computed(() => this.clients().length > 0);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.getAllClients().subscribe({
      next: (clients: Client[]) => {
        this.clients.set(clients);
        this.isLoading.set(false);
        this.lastQueryExecuted.set('SELECT * FROM clients ORDER BY name ASC');
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar clientes: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  deleteClient(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!confirm('¿Está seguro de que desea eliminar este cliente?')) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        const updatedClients = this.clients().filter(c => c.id !== id);
        this.clients.set(updatedClients);
        this.isLoading.set(false);
        this.lastQueryExecuted.set(`DELETE FROM clients WHERE id = ${id}`);
      },
      error: (err) => {
        this.errorMessage.set('Error al eliminar cliente: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  searchClients(term: string): void {
    if (!term.trim()) {
      this.loadClients();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.searchClients(term).subscribe({
      next: (clients: Client[]) => {
        this.clients.set(clients);
        this.isLoading.set(false);
        this.lastQueryExecuted.set(`SELECT * FROM clients WHERE name LIKE '%${term}%' OR email LIKE '%${term}%'`);
      },
      error: (err) => {
        this.errorMessage.set('Error en la búsqueda: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  sortByName(): void {
    const sorted = [...this.clients()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.clients.set(sorted);
    this.lastQueryExecuted.set('SELECT * FROM clients ORDER BY name ASC');
  }

  sortByEmail(): void {
    const sorted = [...this.clients()].sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    this.clients.set(sorted);
    this.lastQueryExecuted.set('SELECT * FROM clients ORDER BY email ASC');
  }

  getPurchaseCount(client: Client): number {
    return client.purchaseHistory?.length || 0;
  }
}

// === ARCHIVO: src/app/features/clients/client-list/client-list.component.html ===
<div class="client-list-container">
  <div class="header-section">
    <h1 class="page-title">Lista de Clientes</h1>
    <div class="header-actions">
      <button
        class="btn btn-primary"
        routerLink="/clients/new">
        <span class="btn-icon">+</span>
        Nuevo Cliente
      </button>
    </div>
  </div>

  <div class="search-section">
    <div class="search-input-wrapper">
      <input
        type="text"
        class="search-input"
        placeholder="Buscar clientes por nombre o correo..."
        (input)="searchClients($any($event.target).value)"
        aria-label="Buscar clientes">
      <span class="search-icon">🔍</span>
    </div>
    <div class="sort-buttons">
      <button class="btn btn-secondary" (click)="sortByName()">
        Ordenar por Nombre
      </button>
      <button class="btn btn-secondary" (click)="sortByEmail()">
        Ordenar por Correo
      </button>
    </div>
  </div>

  @if (isLoading()) {
    <div class="loading-indicator">
      <div class="spinner"></div>
      <p>Cargando clientes...</p>
    </div>
  }

  @if (errorMessage()) {
    <div class="error-message" role="alert">
      <span class="error-icon">⚠️</span>
      {{ errorMessage() }}
    </div>
  }

  @if (!isLoading() && !errorMessage()) {
    <div class="results-info">
      <span class="client-count">Total de clientes: {{ clientCount() }}</span>
    </div>

    @if (hasClients()) {
      <div class="table-wrapper">
        <table class="client-table" role="table" aria-label="Lista de clientes">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo Electrónico</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Compras</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (client of clients(); track client.id) {
              <tr class="client-row" [class.clickable]="true">
                <td class="cell-id">{{ client.id }}</td>
                <td class="cell-name">
                  <a [routerLink]="['/clients', client.id]" class="client-link">
                    {{ client.name }}
                  </a>
                </td>
                <td class="cell-email">{{ client.email }}</td>
                <td class="cell-phone">{{ client.phone || 'N/A' }}</td>
                <td class="cell-purchases">
                  <span class="purchase-badge">{{ getPurchaseCount(client) }}</span>
                </td>
                <td class="cell-actions">
                  <div class="action-buttons">
                    <button
                      class="btn btn-icon"
                      [routerLink]="['/clients', client.id, 'edit']"
                      aria-label="Editar cliente"
                      title="Editar">
                      ✏️
                    </button>
                    <button
                      class="btn btn-icon btn-danger"
                      (click)="deleteClient(client.id, $event)"
                      aria-label="Eliminar cliente"
                      title="Eliminar">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h2>No hay clientes registrados</h2>
        <p>Comienza agregando tu primer cliente al sistema.</p>
        <button class="btn btn-primary" routerLink="/clients/new">
          Agregar Cliente
        </button>
      </div>
    }
  }

  @if (lastQueryExecuted()) {
    <app-sql-query [query]="lastQueryExecuted()"></app-sql-query>
  }
</div>

// === ARCHIVO: src/app/features/clients/client-list/client-list.component.scss ===
.client-list-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #fafafa;
  min-height: calc(100vh - 64px);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e0e0e0;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}

.btn-primary {
  background-color: #2563eb;
  color: white;

  &:hover {
    background-color: #1d4ed8;
  }
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #e5e7eb;
  }
}

.btn-icon {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;

  &:hover {
    background-color: #f3f4f6;
  }
}

.btn-danger {
  &:hover {
    background-color: #fee2e2;
  }
}

.btn-icon {
  .btn-icon;
}

.search-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 280px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  opacity: 0.6;
}

.sort-buttons {
  display: flex;
  gap: 8px;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  margin-bottom: 20px;
}

.error-icon {
  font-size: 20px;
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.client-count {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.table-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.client-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead {
    background-color: #f9fafb;
    border-bottom: 2px solid #e5e7eb;

    th {
      padding: 14px 16px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6b7280;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.15s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #f9fafb;
      }
    }

    td {
      padding: 14px 16px;
      font-size: 14px;
      color: #1f2937;
    }
  }
}

.client-row {
  &.clickable {
    cursor: pointer;
  }
}

.cell-id {
  font-weight: 600;
  color: #9ca3af;
  width: 60px;
}

.cell-name {
  font-weight: 500;
}

.client-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.cell-email {
  color: #4b5563;
}

.cell-phone {
  color: #6b7280;
}

.cell-purchases {
  text-align: center;
}

.purchase-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #dbeafe;
  color: #1d4ed8;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.cell-actions {
  width: 120px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

@media (max-width: 768px) {
  .client-list-container {
    padding: 16px;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .search-section {
    flex-direction: column;
    align-items: stretch;
  }

  .sort-buttons {
    justify-content: stretch;

    .btn {
      flex: 1;
    }
  }

  .client-table {
    display: block;
    overflow-x: auto;
  }
}

// === ARCHIVO: src/app/features/products/product-form/product-form.component.ts ===
import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '@app/core/services/product.service';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = signal(false);
  productId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isCheckingName = signal(false);
  nameExists = signal(false);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required, Validators.maxLength(50)]]
    });

    effect(() => {
      const name = this.productForm.get('name')?.value;
      const currentId = this.productId();
      if (name && name.length >= 3 && !this.isCheckingName()) {
        this.checkNameAvailability(name, currentId);
      }
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.productId.set(id);
        this.isEditMode.set(true);
        this.loadProduct(id);
      }
    }
  }

  loadProduct(id: number): void {
    this.isLoading.set(true);
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category
          });
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar el producto');
        this.isLoading.set(false);
        console.error('Error loading product:', err);
      }
    });
  }

  checkNameAvailability(name: string, excludeId?: number): void {
    this.isCheckingName.set(true);
    this.productService.productNameExists(name, excludeId ?? undefined).subscribe({
      next: (exists) => {
        this.nameExists.set(exists);
        if (exists) {
          this.productForm.get('name')?.setErrors({ nameExists: true });
        }
        this.isCheckingName.set(false);
      },
      error: () => {
        this.isCheckingName.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const formValue = this.productForm.value;
    const product = new Product(
      formValue.id ?? 0,
      formValue.name,
      parseFloat(formValue.price),
      parseInt(formValue.stock, 10),
      formValue.category
    );

    const operation = this.isEditMode()
      ? this.productService.updateProduct(product)
      : this.productService.createProduct(product);

    operation.subscribe({
      next: (savedProduct) => {
        this.successMessage.set(
          this.isEditMode()
            ? 'Producto actualizado correctamente'
            : 'Producto creado correctamente'
        );
        this.isLoading.set(false);
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage.set(
          this.isEditMode()
            ? 'Error al actualizar el producto'
            : 'Error al crear el producto'
        );
        this.isLoading.set(false);
        console.error('Error saving product:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  get nameControl() {
    return this.productForm.get('name');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get stockControl() {
    return this.productForm.get('stock');
  }

  get categoryControl() {
    return this.productForm.get('category');
  }
}

// === ARCHIVO: src/app/features/products/product-form/product-form.component.html ===
<div class="product-form-container">
  <h2>{{ isEditMode() ? 'Editar Producto' : 'Nuevo Producto' }}</h2>

  <div *ngIf="errorMessage()" class="alert alert-error">
    {{ errorMessage() }}
  </div>

  <div *ngIf="successMessage()" class="alert alert-success">
    {{ successMessage() }}
  </div>

  <div *ngIf="isLoading()" class="loading-overlay">
    <div class="spinner"></div>
    <p>Procesando...</p>
  </div>

  <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form">
    <div class="form-group">
      <label for="name">Nombre del Producto *</label>
      <input
        type="text"
        id="name"
        formControlName="name"
        placeholder="Ingrese el nombre del producto"
        [class.is-invalid]="nameControl?.invalid && nameControl?.touched"
        [class.is-valid]="nameControl?.valid && nameControl?.touched"
      />
      <div class="invalid-feedback" *ngIf="nameControl?.invalid && nameControl?.touched">
        <span *ngIf="nameControl?.errors?.['required']">El nombre es requerido</span>
        <span *ngIf="nameControl?.errors?.['minlength']">El nombre debe tener al menos 3 caracteres</span>
        <span *ngIf="nameControl?.errors?.['maxlength']">El nombre no puede exceder 100 caracteres</span>
        <span *ngIf="nameControl?.errors?.['nameExists']">Ya existe un producto con este nombre</span>
      </div>
      <div class="availability-check" *ngIf="isCheckingName()">
        Verificando disponibilidad...
      </div>
    </div>

    <div class="form-group">
      <label for="price">Precio *</label>
      <input
        type="number"
        id="price"
        formControlName="price"
        placeholder="0.00"
        step="0.01"
        min="0.01"
        [class.is-invalid]="priceControl?.invalid && priceControl?.touched"
        [class.is-valid]="priceControl?.valid && priceControl?.touched"
      />
      <div class="invalid-feedback" *ngIf="priceControl?.invalid && priceControl?.touched">
        <span *ngIf="priceControl?.errors?.['required']">El precio es requerido</span>
        <span *ngIf="priceControl?.errors?.['min']">El precio debe ser mayor a 0</span>
      </div>
    </div>

    <div class="form-group">
      <label for="stock">Stock *</label>
      <input
        type="number"
        id="stock"
        formControlName="stock"
        placeholder="0"
        min="0"
        [class.is-invalid]="stockControl?.invalid && stockControl?.touched"
        [class.is-valid]="stockControl?.valid && stockControl?.touched"
      />
      <div class="invalid-feedback" *ngIf="stockControl?.invalid && stockControl?.touched">
        <span *ngIf="stockControl?.errors?.['required']">El stock es requerido</span>
        <span *ngIf="stockControl?.errors?.['min']">El stock no puede ser negativo</span>
      </div>
    </div>

    <div class="form-group">
      <label for="category">Categoría *</label>
      <input
        type="text"
        id="category"
        formControlName="category"
        placeholder="Ingrese la categoría"
        [class.is-invalid]="categoryControl?.invalid && categoryControl?.touched"
        [class.is-valid]="categoryControl?.valid && categoryControl?.touched"
      />
      <div class="invalid-feedback" *ngIf="categoryControl?.invalid && categoryControl?.touched">
        <span *ngIf="categoryControl?.errors?.['required']">La categoría es requerida</span>
        <span *ngIf="categoryControl?.errors?.['maxlength']">La categoría no puede exceder 50 caracteres</span>
      </div>
    </div>

    <div class="form-actions">
      <button
        type="submit"
        class="btn btn-primary"
        [disabled]="isLoading() || productForm.invalid"
      >
        {{ isEditMode() ? 'Actualizar' : 'Crear' }} Producto
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        (click)="onCancel()"
        [disabled]="isLoading()"
      >
        Cancelar
      </button>
    </div>
  </form>
</div>

// === ARCHIVO: src/app/features/clients/client-form/client-form.component.ts ===
import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientService } from '@app/core/services/client.service';
import { Client, PurchaseRecord } from '@app/core/models/client.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = signal(false);
  clientId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isCheckingEmail = signal(false);
  emailExists = signal(false);
  purchaseHistory = signal<PurchaseRecord[]>([]);

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ], [this.emailValidator.bind(this)]],
      phone: ['', [
        Validators.pattern(/^\d{10,15}$/)
      ]],
      address: ['', [Validators.maxLength(200)]]
    });
  }

  emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    if (!email) {
      return of(null);
    }

    this.isCheckingEmail.set(true);
    return new Observable(observer => {
      this.clientService.emailExists(email, this.clientId() ?? undefined).subscribe({
        next: (exists) => {
          this.emailExists.set(exists);
          this.isCheckingEmail.set(false);
          if (exists) {
            observer.next({ emailExists: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: () => {
          this.isCheckingEmail.set(false);
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.clientId.set(id);
        this.isEditMode.set(true);
        this.loadClient(id);
      }
    }
  }

  loadClient(id: number): void {
    this.isLoading.set(true);
    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        if (client) {
          this.clientForm.patchValue({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone || '',
            address: client.address || ''
          });
          if (client.purchaseHistory) {
            this.purchaseHistory.set(client.purchaseHistory);
          }
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar el cliente');
        this.isLoading.set(false);
        console.error('Error loading client:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const formValue = this.clientForm.value;
    const client = new Client(
      formValue.id ?? 0,
      formValue.name,
      formValue.email,
      formValue.phone || null,
      formValue.address || null
    );

    const operation = this.isEditMode()
      ? this.clientService.updateClient(client)
      : this.clientService.createClient(client);

    operation.subscribe({
      next: (savedClient) => {
        this.successMessage.set(
          this.isEditMode()
            ? 'Cliente actualizado correctamente'
            : 'Cliente creado correctamente'
        );
        this.isLoading.set(false);
        setTimeout(() => {
          this.router.navigate(['/clients']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage.set(
          this.isEditMode()
            ? 'Error al actualizar el cliente'
            : 'Error al crear el cliente'
        );
        this.isLoading.set(false);
        console.error('Error saving client:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }

  get nameControl() {
    return this.clientForm.get('name');
  }

  get emailControl() {
    return this.clientForm.get('email');
  }

  get phoneControl() {
    return this.clientForm.get('phone');
  }

  get addressControl() {
    return this.clientForm.get('address');
  }

  getTotalPurchases(): number {
    return this.purchaseHistory().reduce((sum, record) => sum + record.amount, 0);
  }

  getPurchaseCount(): number {
    return this.purchaseHistory().length;
  }
}

// === ARCHIVO: src/app/features/clients/client-form/client-form.component.html ===
<div class="client-form-container">
  <h2>{{ isEditMode ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
  
  <form [formGroup]="clientForm" (ngSubmit)="onSubmit()" class="client-form">
    <div class="form-group">
      <label for="name">Nombre del Cliente</label>
      <input 
        id="name" 
        type="text" 
        formControlName="name" 
        placeholder="Ingrese el nombre del cliente"
        [class.error]="isFieldInvalid('name')"
      />
      <div *ngIf="isFieldInvalid('name')" class="error-message">
        <span *ngIf="clientForm.get('name')?.errors?.['required']">El nombre es requerido</span>
        <span *ngIf="clientForm.get('name')?.errors?.['minlength']">El nombre debe tener al menos 3 caracteres</span>
      </div>
    </div>

    <div class="form-group">
      <label for="email">Correo Electrónico</label>
      <input 
        id="email" 
        type="email" 
        formControlName="email" 
        placeholder="correo@ejemplo.com"
        [class.error]="isFieldInvalid('email')"
      />
      <div *ngIf="isFieldInvalid('email')" class="error-message">
        <span *ngIf="clientForm.get('email')?.errors?.['required']">El correo es requerido</span>
        <span *ngIf="clientForm.get('email')?.errors?.['email']">Ingrese un correo electrónico válido</span>
      </div>
    </div>

    <div class="form-group">
      <label for="phone">Teléfono</label>
      <input 
        id="phone" 
        type="tel" 
        formControlName="phone" 
        placeholder="+51 999 999 999"
      />
    </div>

    <div class="form-group">
      <label for="address">Dirección</label>
      <textarea 
        id="address" 
        formControlName="address" 
        placeholder="Ingrese la dirección del cliente"
        rows="3"
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="button" class="btn-cancel" (click)="onCancel()">
        Cancelar
      </button>
      <button 
        type="submit" 
        class="btn-submit"
        [disabled]="clientForm.invalid || isSubmitting"
      >
        {{ isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Cliente') }}
      </button>
    </div>
  </form>

  <div *ngIf="errorMessage" class="error-banner">
    {{ errorMessage }}
  </div>

  <div *ngIf="successMessage" class="success-banner">
    {{ successMessage }}
  </div>
</div>

// === ARCHIVO: src/app/shared/components/sql-query/sql-query.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '@core/services/database.service';
import { Subscription } from 'rxjs';

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTime: number;
}

interface QueryPreset {
  name: string;
  description: string;
  query: string;
  type: 'select' | 'insert' | 'update' | 'delete' | 'join' | 'aggregation';
}

@Component({
  selector: 'app-sql-query',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sql-query.component.html',
  styleUrl: './sql-query.component.scss'
})
export class SqlQueryComponent implements OnInit, OnDestroy {
  currentQuery = signal('');
  queryResults = signal<QueryResult | null>(null);
  isExecuting = signal(false);
  errorMessage = signal('');
  activeTab = signal<'editor' | 'presets' | 'history'>('editor');
  queryHistory = signal<{query: string; timestamp: Date; success: boolean}[]>([]);
  selectedTable = signal<'products' | 'clients' | 'purchases'>('products');

  queryPresets: QueryPreset[] = [
    {
      name: 'Listar Productos',
      description: 'Obtiene todos los productos ordenados por nombre',
      query: 'SELECT * FROM products ORDER BY name ASC',
      type: 'select'
    },
    {
      name: 'Productos por Categoría',
      description: 'Agrupa productos por categoría con conteo',
      query: 'SELECT category, COUNT(*) as count, AVG(price) as avg_price FROM products GROUP BY category ORDER BY count DESC',
      type: 'aggregation'
    },
    {
      name: 'Clientes con Compras',
      description: 'Join entre clientes y historial de compras',
      query: `SELECT c.name, c.email, COUNT(p.id) as purchase_count, SUM(p.total) as total_spent
FROM clients c
LEFT JOIN purchases p ON c.id = p.client_id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC`,
      type: 'join'
    },
    {
      name: 'Stock Bajo',
      description: 'Productos con stock menor a 10 unidades',
      query: 'SELECT name, price, stock, category FROM products WHERE stock < 10 ORDER BY stock ASC',
      type: 'select'
    },
    {
      name: 'Productos Caros',
      description: 'Productos con precio mayor al promedio',
      query: 'SELECT name, price, category FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC',
      type: 'select'
    },
    {
      name: 'Top Clientes',
      description: 'Los 5 clientes con más compras',
      query: `SELECT c.name, c.email, COUNT(p.id) as purchases, SUM(p.total) as total
FROM clients c
INNER JOIN purchases p ON c.id = p.client_id
GROUP BY c.id
ORDER BY total DESC
LIMIT 5`,
      type: 'join'
    },
    {
      name: 'Ventas por Día',
      description: 'Agrupación de ventas por fecha',
      query: `SELECT DATE(purchase_date) as date, COUNT(*) as orders, SUM(total) as daily_total
FROM purchases
GROUP BY DATE(purchase_date)
ORDER BY date DESC`,
      type: 'aggregation'
    },
    {
      name: 'Buscar Producto',
      description: 'Búsqueda por nombre con LIKE',
      query: "SELECT * FROM products WHERE name LIKE '%{{searchTerm}}%' ORDER BY name",
      type: 'select'
    }
  ];

  private subscriptions = new Subscription();

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.loadDefaultQuery();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadDefaultQuery(): void {
    const defaultPreset = this.queryPresets[0];
    this.currentQuery.set(defaultPreset.query);
  }

  selectPreset(preset: QueryPreset): void {
    this.currentQuery.set(preset.query);
    this.activeTab.set('editor');
    this.clearResults();
  }

  selectTable(table: 'products' | 'clients' | 'purchases'): void {
    this.selectedTable.set(table);
    const tableQueries: Record<string, string> = {
      products: 'SELECT * FROM products ORDER BY id DESC LIMIT 100',
      clients: 'SELECT * FROM clients ORDER BY id DESC LIMIT 100',
      purchases: 'SELECT * FROM purchases ORDER BY id DESC LIMIT 100'
    };
    this.currentQuery.set(tableQueries[table]);
    this.activeTab.set('editor');
  }

  executeQuery(): void {
    const query = this.currentQuery().trim();
    if (!query) {
      this.errorMessage.set('Por favor ingrese una consulta SQL');
      return;
    }

    this.isExecuting.set(true);
    this.clearResults();

    const startTime = performance.now();
    const sub = this.databaseService.executeQuery(query).subscribe({
      next: (results) => {
        const executionTime = performance.now() - startTime;
        const processedResults: QueryResult = {
          columns: results.length > 0 ? Object.keys(results[0]) : [],
          rows: results,
          rowCount: results.length,
          executionTime: Math.round(executionTime * 100) / 100
        };
        this.queryResults.set(processedResults);
        this.addToHistory(query, true);
        this.isExecuting.set(false);
      },
      error: (err) => {
        this.errorMessage.set(`Error en la consulta: ${err.message || 'Error desconocido'}`);
        this.addToHistory(query, false);
        this.isExecuting.set(false);
      }
    });

    this.subscriptions.add(sub);
  }

  clearQuery(): void {
    this.currentQuery.set('');
    this.clearResults();
  }

  clearResults(): void {
    this.queryResults.set(null);
    this.errorMessage.set('');
  }

  formatCellValue(value: any): string {
    if (value === null || value === undefined) {
      return 'NULL';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  getPresetIcon(type: string): string {
    const icons: Record<string, string> = {
      select: '🔍',
      insert: '➕',
      update: '✏️',
      delete: '🗑️',
      join: '🔗',
      aggregation: '📊'
    };
    return icons[type] || '📝';
  }

  private addToHistory(query: string, success: boolean): void {
    const currentHistory = this.queryHistory();
    const newEntry = {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      timestamp: new Date(),
      success
    };
    this.queryHistory.set([newEntry, ...currentHistory].slice(0, 20));
  }

  loadFromHistory(entry: { query: string }): void {
    this.currentQuery.set(entry.query);
    this.activeTab.set('editor');
  }

  getRowCountMessage(): string {
    const results = this.queryResults();
    if (!results) return '';
    return `${results.rowCount} fila${results.rowCount !== 1 ? 's' : ''} encontrada${results.rowCount !== 1 ? 's' : ''}`;
  }

  getExecutionTimeMessage(): string {
    const results = this.queryResults();
    if (!results) return '';
    return `Ejecutado en ${results.executionTime}ms`;
  }
}

// === ARCHIVO: src/app/shared/components/sql-query/sql-query.component.html ===
<div class="sql-query-container">
  <header class="sql-query-header">
    <h2>Consola de Consultas SQL</h2>
    <p class="subtitle">Ejecuta consultas optimizadas: JOIN, GROUP BY, ORDER BY</p>
  </header>

  <nav class="sql-query-tabs">
    <button 
      [class.active]="activeTab() === 'editor'" 
      (click)="activeTab.set('editor')"
      class="tab-btn"
    >
      Editor
    </button>
    <button 
      [class.active]="activeTab() === 'presets'" 
      (click)="activeTab.set('presets')"
      class="tab-btn"
    >
      Consultas Predefinidas
    </button>
    <button 
      [class.active]="activeTab() === 'history'" 
      (click)="activeTab.set('history')"
      class="tab-btn"
    >
      Historial
    </button>
  </nav>

  <div class="sql-query-content">
    <div *ngIf="activeTab() === 'editor'" class="editor-section">
      <div class="table-selector">
        <span class="label">Vista rápida:</span>
        <button 
          *ngFor="let table of ['products', 'clients', 'purchases']"
          [class.active]="selectedTable() === table"
          (click)="selectTable($any(table))"
          class="table-btn"
        >
          {{ table | titlecase }}
        </button>
      </div>

      <div class="query-editor">
        <label for="sql-input">Consulta SQL</label>
        <textarea 
          id="sql-input"
          [(ngModel)]="currentQuery"
          placeholder="SELECT * FROM products WHERE..."
          class="sql-textarea"
          rows="8"
          spellcheck="false"
        ></textarea>
      </div>

      <div class="editor-actions">
        <button 
          class="btn-execute" 
          (click)="executeQuery()"
          [disabled]="isExecuting()"
        >
          {{ isExecuting() ? 'Ejecutando...' : '▶ Ejecutar Consulta' }}
        </button>
        <button class="btn-clear" (click)="clearQuery()">
          🗑️ Limpiar
        </button>
        <button class="btn-clear-results" (click)="clearResults()">
          ✨ Limpiar Resultados
        </button>
      </div>

      <div *ngIf="errorMessage()" class="error-banner">
        <span class="error-icon">⚠️</span>
        {{ errorMessage() }}
      </div>
    </div>

    <div *ngIf="activeTab() === 'presets'" class="presets-section">
      <div class="presets-grid">
        <div 
          *ngFor="let preset of queryPresets" 
          class="preset-card"
          (click)="selectPreset(preset)"
        >
          <div class="preset-header">
            <span class="preset-icon">{{ getPresetIcon(preset.type) }}</span>
            <span class="preset-type">{{ preset.type | uppercase }}</span>
          </div>
          <h4 class="preset-name">{{ preset.name }}</h4>
          <p class="preset-description">{{ preset.description }}</p>
          <code class="preset-query">{{ preset.query }}</code>
        </div>
      </div>
    </div>

    <div *ngIf="activeTab() === 'history'" class="history-section">
      <div *ngIf="queryHistory().length === 0" class="empty-history">
        <p>No hay consultas en el historial</p>
      </div>
      <div *ngIf="queryHistory().length > 0" class="history-list">
        <div 
          *ngFor="let entry of queryHistory()" 
          class="history-item"
          (click)="loadFromHistory(entry)"
        >
          <span 
            class="history-status" 
            [class.success]="entry.success"
            [class.error]="!entry.success"
          >
            {{ entry.success ? '✓' : '✗' }}
          </span>
          <code class="history-query">{{ entry.query }}</code>
          <span class="history-time">
            {{ entry.timestamp | date:'HH:mm:ss' }}
          </span>
        </div>
      </div>
    </div>

    <div *ngIf="queryResults()" class="results-section">
      <div class="results-header">
        <h3>Resultados</h3>
        <div class="results-meta">
          <span class="row-count">{{ getRowCountMessage() }}</span>
          <span class="execution-time">{{ getExecutionTimeMessage() }}</span>
        </div>
      </div>

      <div class="results-table-wrapper">
        <table class="results-table" *ngIf="queryResults()!.rows.length > 0">
          <thead>
            <tr>
              <th *ngFor="let column of queryResults()!.columns">
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of queryResults()!.rows; let i = index">
              <td *ngFor="let column of queryResults()!.columns">
                <span [class.null-value]="row[column] === null">
                  {{ formatCellValue(row[column]) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="queryResults()!.rows.length === 0" class="no-results">
          <p>La consulta se ejecutó correctamente pero no devolvió resultados</p>
        </div>
      </div>
    </div>
  </div>
</div>
```
