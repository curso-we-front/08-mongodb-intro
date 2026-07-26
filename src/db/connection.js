require("dotenv").config()
const { MongoClient } = require("mongodb")

let client = null
let db = null

async function connect() {
  if (db) {
    return db
  }
  try {
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    db = client.db()
    return db
  } catch (error) {
    console.error("Error al conectarse a MongoDB", error)
    throw error
  }
}

async function disconnect() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}

module.exports = { connect, disconnect }
