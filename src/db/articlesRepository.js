const { connect } = require("./connection")
const { ObjectId } = require("mongodb")

async function getCollection() {
  const db = await connect()
  return db.collection("articles")
}

async function findAll() {
  const collection = await getCollection()
  const publishedArticles = await collection.find({ published: true }).toArray()
  return publishedArticles
}

async function findById(id) {
  const collection = await getCollection()
  try {
    const objectId = new ObjectId(id)
    const article = await collection.findOne({ _id: objectId })
    return article
  } catch {
    return null
  }
}

async function create(data) {
  const collection = await getCollection()
  const result = await collection.insertOne(data)
  const insertData = await collection.findOne({ _id: result.insertedId })
  return insertData
}

async function update(id, data) {
  const collection = await getCollection()
  try {
    const article = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" },
    )
    return article
  } catch {
    return null
  }
}

async function remove(id) {
  const collection = await getCollection()

  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  if (result.deletedCount === 1) {
    return true
  }
  return false
}

module.exports = { findAll, findById, create, update, remove }
