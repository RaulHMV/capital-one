// Script de prueba para verificar conexión a PostgreSQL
const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_Mj3nS6oARCFl@ep-holy-dust-ahjsh6v4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';
const DEMO_CUSTOMER_ID = 'cust_ana_perez_001';

const sql = neon(DATABASE_URL);

async function testConnection() {
  console.log('🔍 Probando conexión a PostgreSQL...');
  console.log('📍 Database URL:', DATABASE_URL.substring(0, 50) + '...');
  console.log('👤 Customer ID:', DEMO_CUSTOMER_ID);
  console.log('');

  try {
    // Test 1: Verificar si existe el customer
    console.log('📊 Test 1: Verificando si existe el customer...');
    const customers = await sql`
      SELECT * FROM customer 
      WHERE customer_id = ${DEMO_CUSTOMER_ID}
    `;
    console.log(`✅ Resultado: ${customers.length} customer(s) encontrado(s)`);
    if (customers.length > 0) {
      console.log('   Datos:', JSON.stringify(customers[0], null, 2));
    }
    console.log('');

    // Test 2: Buscar cuentas del customer
    console.log('📊 Test 2: Buscando cuentas del customer...');
    const accounts = await sql`
      SELECT * FROM account 
      WHERE customer_id = ${DEMO_CUSTOMER_ID}
    `;
    console.log(`✅ Resultado: ${accounts.length} cuenta(s) encontrada(s)`);
    if (accounts.length > 0) {
      console.log('   Datos:', JSON.stringify(accounts, null, 2));
    }
    console.log('');

    // Test 3: Listar todos los customers disponibles
    console.log('📊 Test 3: Listando TODOS los customers disponibles...');
    const allCustomers = await sql`
      SELECT customer_id, first_name, last_name FROM customer LIMIT 5
    `;
    console.log(`✅ Encontrados ${allCustomers.length} customers:`);
    allCustomers.forEach(c => {
      console.log(`   - ${c.customer_id}: ${c.first_name} ${c.last_name}`);
    });
    console.log('');

    // Test 4: Contar todas las tablas
    console.log('📊 Test 4: Verificando datos en las tablas...');
    const tables = ['customer', 'account', 'purchase', 'bill', 'loan', 'deposit'];
    
    for (const table of tables) {
      try {
        const count = await sql`SELECT COUNT(*) as total FROM ${sql(table)}`;
        console.log(`   ${table}: ${count[0].total} registros`);
      } catch (err) {
        console.log(`   ${table}: ❌ Error - ${err.message}`);
      }
    }

    console.log('');
    console.log('✅ ¡Conexión a PostgreSQL exitosa!');
    
  } catch (error) {
    console.error('');
    console.error('❌ ERROR:', error);
    console.error('');
    console.error('Detalles del error:');
    console.error('  Mensaje:', error.message);
    console.error('  Stack:', error.stack);
  }
}

testConnection();
