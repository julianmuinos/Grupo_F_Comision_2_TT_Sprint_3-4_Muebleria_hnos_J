require('dotenv').config();
const mongoose = require('mongoose');
const conectarDB = require('./config/db');
const Producto = require('./models/Producto');
const productos = require('./data/productos');

/**
 * Script de sembrado - Mueblería Hermanos Jota
 * Puebla la colección "productos" con el catálogo oficial.
 * Es idempotente: elimina los documentos existentes antes de insertar.
 * Uso: npm run seed
 */
const sembrarDB = async () => {
  try {
    await conectarDB();

    const eliminados = await Producto.deleteMany({});
    console.log(`🧹 Productos previos eliminados: ${eliminados.deletedCount}`);

    // Remover el campo numérico "id" legado para usar exclusivamente el _id nativo de MongoDB
    const productosParaInsertar = productos.map(({ id, ...resto }) => resto);

    const insertados = await Producto.insertMany(productosParaInsertar);

    const porCategoria = insertados.reduce((acc, p) => {
      acc[p.categoria] = (acc[p.categoria] || 0) + 1;
      return acc;
    }, {});

    console.log('\n' + '='.repeat(65));
    console.log('  🌱 SEED COMPLETADO - Mueblería Hermanos Jota');
    console.log(`  📦 Productos insertados: ${insertados.length}`);
    Object.entries(porCategoria).forEach(([categoria, total]) => {
      console.log(`     • ${categoria}: ${total}`);
    });
    console.log('='.repeat(65) + '\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n' + '!'.repeat(65));
    console.error('  ❌ ERROR durante el seed de la base de datos');
    console.error(`  ⚠️  Detalle: ${error.message}`);
    console.error('!'.repeat(65) + '\n');
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

sembrarDB();

