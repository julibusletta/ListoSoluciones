import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Load env variables manually since we are running a raw node script
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const mongoUriMatch = envFile.match(/MONGODB_URI="(.*)"/);
if (!mongoUriMatch) {
  console.error('Could not find MONGODB_URI in .env.local');
  process.exit(1);
}

const uri = mongoUriMatch[1];
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const db = client.db("listosoluciones");
    const collection = db.collection("obras");

    const dataPath = path.join(__dirname, '..', 'legacy', 'data', 'obras.json');
    const obrasData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Clear existing data to avoid duplicates if run multiple times
    await collection.deleteMany({});
    
    // Insert new data
    const result = await collection.insertMany(obrasData);
    console.log(`Successfully inserted ${result.insertedCount} obras into MongoDB`);
  } catch (err) {
    console.error("Error connecting or inserting:", err);
  } finally {
    await client.close();
  }
}

run();
