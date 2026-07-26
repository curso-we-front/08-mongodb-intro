require("dotenv").config()
const { connect, disconnect } = require("./connection")
const articles = require("../../data/articles.json")

async function seed() {
  const db = await connect()
  const collection = db.collection("articles")
  for (const article of articles) {
    const existArticle = await collection.findOne({ title: article.title })
    if (!existArticle) {
      await collection.insertOne(article)
    }
  }
  console.log("Seed completado")
  await disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
