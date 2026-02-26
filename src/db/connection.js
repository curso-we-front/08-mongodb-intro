require('dotenv').config();
const { MongoClient } = require('mongodb');

/**
 * Tarea 1: Conexión singleton a MongoDB.
 *
 * - Usa MONGODB_URI del .env
 * - La función connect() devuelve la instancia de la DB
 * - Si ya está conectado, devuelve la conexión existente
 */

let client = null;
let db = null;

async function connect() {
  // TODO: implementar
  // Pista: guarda client y db en las variables de módulo
}

async function disconnect() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connect, disconnect };
