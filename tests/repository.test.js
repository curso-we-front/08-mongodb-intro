const { connect, disconnect } = require('../src/db/connection');
const { findAll, findById, create, update, remove } = require('../src/db/articlesRepository');

beforeAll(async () => {
  const db = await connect();
  await db.collection('articles').deleteMany({});
});

afterAll(async () => {
  await disconnect();
});

describe('create', () => {
  test('inserta y devuelve el documento con _id', async () => {
    const doc = await create({ title: 'Test', content: 'Contenido válido', author: 'A', published: true });
    expect(doc._id).toBeDefined();
    expect(doc.title).toBe('Test');
  });
});

describe('findAll', () => {
  test('devuelve solo los publicados', async () => {
    await create({ title: 'Draft', content: 'Draft content', author: 'B', published: false });
    const articles = await findAll();
    expect(articles.every(a => a.published === true)).toBe(true);
  });
});

describe('findById', () => {
  test('devuelve el documento correcto', async () => {
    const created = await create({ title: 'Find Me', content: 'Find me content', author: 'C', published: true });
    const found = await findById(created._id.toString());
    expect(found.title).toBe('Find Me');
  });

  test('devuelve null con id inválido', async () => {
    const result = await findById('id-no-valido');
    expect(result).toBeNull();
  });

  test('devuelve null si no existe', async () => {
    const result = await findById('507f1f77bcf86cd799439011');
    expect(result).toBeNull();
  });
});

describe('update', () => {
  test('actualiza y devuelve el documento actualizado', async () => {
    const created = await create({ title: 'Old Title', content: 'Content body', author: 'D', published: true });
    const updated = await update(created._id.toString(), { title: 'New Title' });
    expect(updated.title).toBe('New Title');
    expect(updated.content).toBe('Content body');
  });
});

describe('remove', () => {
  test('elimina y devuelve true', async () => {
    const created = await create({ title: 'Delete', content: 'Will be deleted', author: 'E', published: true });
    const result = await remove(created._id.toString());
    expect(result).toBe(true);
  });

  test('devuelve false si no existe', async () => {
    const result = await remove('507f1f77bcf86cd799439011');
    expect(result).toBe(false);
  });
});
