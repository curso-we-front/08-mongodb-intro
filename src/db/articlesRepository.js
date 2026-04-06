require("dotenv").config({ path: "../../.env" });
const { connect } = require("./connection");
const { ObjectId } = require("mongodb");

/**
 * Tarea 2: Repositorio de artículos con driver nativo de MongoDB.
 */

async function getCollection() {
  const db = await connect();
  return db.collection("articles");
}

/**
 * Devuelve todos los artículos publicados
 * @returns {Promise<Array>}
 */
async function findAll() {
  const collection = await getCollection();
  const publishedArticles = await collection
    .find({ published: true })
    .toArray();

  console.log(publishedArticles);
  return publishedArticles;
}

findAll();

/**
 * Busca por _id. Devuelve null si el id es inválido o no existe.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  try {
    const collection = await getCollection();

    const article = await collection.findOne({
      _id: new ObjectId(id),
      published: true,
    });

    return article || null;
  } catch (error) {
    console.log("id inválido (no es ObjectId)");
    return null;
  }
}

/**
 * Inserta un documento y devuelve el documento completo (con _id)
 * @param {Object} data
 * @returns {Promise<Object>}
 */
async function create(data) {
  const collection = await getCollection();

  const newArticle = {
    ...data,
    created_at: new Date(),
  };

  const result = await collection.insertOne(newArticle);

  return {
    _id: result.insertedId,
    ...newArticle,
  };
}

/**
 * Actualiza campos con $set y devuelve el documento actualizado
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
  try {
    const collection = await getCollection();

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" },
    );

    return result || null;
  } catch (error) {
    return null;
  }
}

/**
 * Elimina el documento
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
  try {
    const collection = await getCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount === 1;
  } catch (error) {
    return false;
  }
}

module.exports = { findAll, findById, create, update, remove };
