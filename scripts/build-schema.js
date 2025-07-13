const fs = require("fs");
const path = require("path");

const SCHEMA_DIR = path.join(__dirname, "../prisma");
const MODELS_DIR = path.join(SCHEMA_DIR, "models");
const OUTPUT_FILE = path.join(SCHEMA_DIR, "schema.prisma");

// Static header (generator + datasource)
const baseSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DB_URL_LOCAL")
}
`;

// Read all .prisma model files
const modelFiles = fs.readdirSync(MODELS_DIR).filter(file => file.endsWith(".prisma"));

let fullSchema = baseSchema;

for (const file of modelFiles) {
  const filePath = path.join(MODELS_DIR, file);
  const modelContent = fs.readFileSync(filePath, "utf8");
  fullSchema += `\n\n// ---- ${file} ----\n` + modelContent;
}

// Write to schema.prisma
fs.writeFileSync(OUTPUT_FILE, fullSchema, "utf8");

console.log("schema.prisma generated from models/");
