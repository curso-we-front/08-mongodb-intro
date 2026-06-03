require("dotenv").config();
const { connect, disconnect } = require("./connection");
const articles = require("../../data/articles.json");

/**
 * Tarea 3: Script de seed.
 *
 * - Inserta los artículos de data/articles.json en la colección 'articles'
 * - Si ya existe un documento con el mismo 'title', no insertes duplicados
 */

async function seed() {
  const db = await connect();
  const collection = db.collection("articles");

  // TODO: recorre los artículos e inserta solo los que no existan (comprueba por title)
  // Pista: usa collection.findOne({ title: article.title }) antes de insertOne

  for (const article of articles) {
    const publishedArticle = await collection.findOne({ title: article.title });
    if (!publishedArticle) {
      const newArticle = {
        id,
        _id: article.id,
        ...article,
      };
      await collection.insertOne(article);
    }
  }

  console.log("Seed completado");
  await disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
