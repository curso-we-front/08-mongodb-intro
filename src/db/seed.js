require("dotenv").config({ path: "../../.env" });
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

  try {
    for (const article of articles) {
      const exists = await collection.findOne({
        title: article.title,
      });

      if (!exists) {
        await collection.insertOne({
          ...article,
          created_at: new Date(),
        });

        console.log(`✔️ Insertado: ${article.title}`);
      } else {
        console.log(`⚠️ Ya existe: ${article.title}`);
      }
    }

    console.log("✅ Seed completado");
  } catch (error) {
    console.error("❌ Error en seed:", error);
  } finally {
    await disconnect();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
