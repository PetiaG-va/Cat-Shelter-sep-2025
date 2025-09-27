import fs from 'fs/promises';

const dbSerialized = await fs.readFile('./src/db.json');
const db = JSON.parse(dbSerialized);

export async function getCats() {
     return db.cats;
};

export async function saveCat(cat) {
    // Add cat to cats array
    db.cats.push(cat);

    await saveDb();
}

export async function getCat(id) {
    return db.cats.find(cat => cat.id === id);
    
};

export async function updateCat(catId, catData) {
    db.cats = db.map(cat => cat.id === catId ? {id: catId, ...catData} : cat);
    await saveDb();
}

async function saveDb() {
    const dbSerialized = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', dbSerialized, {encoding: 'utf-8'});
}
