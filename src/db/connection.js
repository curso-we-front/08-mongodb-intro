require("dotenv").config();
const { MongoClient } = require("mongodb");

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

  if (db) {
    return db;
  }
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db();
    return db;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function disconnect() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connect, disconnect };
