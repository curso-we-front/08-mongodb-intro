# 08 — Introducción a MongoDB con Node.js

## Objetivo

Conectar Node.js a MongoDB usando el driver nativo, entender documentos y colecciones, y hacer operaciones CRUD básicas.

## Prerequisitos

Necesitas MongoDB corriendo. Puedes usar Docker:
```bash
docker run --name blog-mongo -e MONGO_INITDB_DATABASE=blog -p 27017:27017 -d mongo:7
```

## Tareas

### Tarea 1 — Conexión (`src/db/connection.js`)
Crea y exporta una función `connect()` que:
- Use `MongoClient` del driver nativo
- Lea la URI de `MONGODB_URI` en `.env`
- Devuelva la instancia de la base de datos
- Sea idempotente (no crea múltiples conexiones si se llama varias veces)

### Tarea 2 — Repositorio de artículos (`src/db/articlesRepository.js`)
Implementa usando el driver nativo (sin Mongoose):
- `findAll(filter?)` → todos los documentos (opcionalmente filtrados)
- `findById(id)` → por `_id` (ObjectId)
- `create(data)` → inserta y devuelve el documento completo
- `update(id, data)` → actualiza con `$set` y devuelve el actualizado
- `remove(id)` → elimina y devuelve `true`/`false`

### Tarea 3 — Script de seed (`src/db/seed.js`)
Inserta los artículos de `data/articles.json` en la colección `articles`.  
Si ya existen documentos, no insertes duplicados (comprueba por `title`).

## Diferencias clave con MySQL

| MySQL | MongoDB |
|-------|---------|
| Tabla `articles` | Colección `articles` |
| Columna `id` (INT) | Campo `_id` (ObjectId) |
| `SELECT * WHERE id=1` | `findOne({ _id: ObjectId(id) })` |
| `INSERT INTO ...` | `insertOne({ ... })` |
| Esquema fijo | Esquema flexible |

## Estructura esperada

```
08-mongodb-intro/
├── data/
│   └── articles.json
├── src/
│   └── db/
│       ├── connection.js         ← Tarea 1
│       ├── articlesRepository.js ← Tarea 2
│       └── seed.js               ← Tarea 3
├── tests/
│   └── repository.test.js
├── .env.example
└── package.json
```

## Variables de entorno

```
MONGODB_URI=mongodb://localhost:27017/blog
```

## Criterios de evaluación

- [ ] La conexión es singleton (no abre múltiples conexiones)
- [ ] `findById` maneja correctamente IDs inválidos (no lanza excepción)
- [ ] El seed no duplica documentos en reruns
- [ ] Los tests pasan
