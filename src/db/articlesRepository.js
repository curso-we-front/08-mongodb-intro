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
  // TODO
  const collection = await getCollection();

  const publishedArticles = collection.find({ published: true }).toArray();

  return publishedArticles;
}

/**
 * Busca por _id. Devuelve null si el id es inválido o no existe.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  // TODO: recuerda convertir id a ObjectId con new ObjectId(id)
  // y capturar el error si el id no tiene formato válido
  try {
    const collection = await getCollection();
    const article = await collection.findOne({ _id: new ObjectId(id) });
    return article;
  } catch (error) {
    return null;
  }
}

/**
 * Inserta un documento y devuelve el documento completo (con _id)
 * @param {Object} data
 * @returns {Promise<Object>}
 */

async function create(data) {
  // TODO
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(data);

    return {
      _id: result.insertedId.toString(),
      ...data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Actualiza campos con $set y devuelve el documento actualizado
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
  // TODO: usa findOneAndUpdate con { returnDocument: 'after' }
  const collection = await getCollection();
  const updatedArticle = collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: "after" },
  );
  return updatedArticle;
}

/**
 * Elimina el documento
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
  // TODO
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) {
    return false;
  }
  return true;
}

module.exports = { findAll, findById, create, update, remove };
