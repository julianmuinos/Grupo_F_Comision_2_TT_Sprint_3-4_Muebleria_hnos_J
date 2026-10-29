const mongoose = require('mongoose');

/**
 * Módulo de conexión a MongoDB Atlas mediante Mongoose
 * Obtiene la URI de conexión desde la variable de entorno MONGO_URI
 */
const conectarDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        'La variable de entorno MONGO_URI no está configurada. Verifica tu archivo .env'
      );
    }

    const conn = await mongoose.connect(mongoUri);

    // Mensaje decorado de conexión exitosa
    console.log('\n' + '='.repeat(65));
    console.log('  🍃 [MongoDB Atlas] CONEXIÓN EXITOSA A LA BASE DE DATOS');
    console.log('  🏬 Tienda:   Mueblería Hermanos Jota');
    console.log(`  📦 Host:     ${conn.connection.host}`);
    console.log(`  🗄️  Database: ${conn.connection.name}`);
    console.log('='.repeat(65) + '\n');

    return conn;
  } catch (error) {
    // Mensaje decorado en caso de error
    console.error('\n' + '!'.repeat(65));
    console.error('  ❌ ERROR CRÍTICO: No se pudo conectar a MongoDB');
    console.error(`  ⚠️  Detalle: ${error.message}`);
    console.error('!'.repeat(65) + '\n');
    process.exit(1);
  }
};

module.exports = conectarDB;

