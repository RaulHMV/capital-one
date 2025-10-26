import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada en .env.local');
}

const sql = neon(process.env.DATABASE_URL);

// Interfaces basadas en el esquema real de PostgreSQL
export interface Purchase {
  purchase_id: string;
  payer_id: string;
  merchant_id?: string;
  type?: string;
  purchase_date: string;
  amount: number;
  status: string;
  medium?: string;
  description?: string;
  merchant_name?: string; // Del JOIN con merchant
  merchant_category?: string; // Del JOIN con merchant
}

export interface Account {
  account_id: string;
  customer_id: string;
  type: string; // 'Checking', 'Savings', 'Credit Card'
  nickname?: string;
  rewards?: number;
  balance: number;
  account_number: string;
}

export interface Bill {
  bill_id: string;
  account_id: string;
  status: string; // 'pending', 'paid', 'cancelled'
  payee: string;
  nickname?: string;
  creation_date: string;
  payment_date?: string;
  recurring_date?: number;
  upcoming_payment_date?: string;
}

export interface Loan {
  loan_id: string;
  account_id: string;
  type?: string;
  creation_date: string;
  status: string; // 'pending', 'active', 'paid_off', 'defaulted'
  credit_score?: number;
  monthly_payment: number;
  amount: number;
  description?: string;
}

export interface Deposit {
  deposit_id: string;
  account_id: string;
  type?: string;
  transaction_date: string;
  status: string;
  payee_id?: string;
  medium?: string;
  description?: string;
  amount: number;
}

// Funciones para consultar la base de datos según el esquema real
export async function getPurchases(customerId: string): Promise<Purchase[]> {
  try {
    console.log(`🔍 Buscando purchases para customer_id: ${customerId}`);
    const result = await sql`
      SELECT 
        p.purchase_id,
        p.payer_id,
        p.merchant_id,
        p.type,
        p.purchase_date,
        p.amount,
        p.status,
        p.medium,
        p.description,
        m.name as merchant_name,
        m.category as merchant_category
      FROM purchase p
      LEFT JOIN merchant m ON p.merchant_id = m.merchant_id
      LEFT JOIN account a ON p.payer_id = a.account_id
      WHERE a.customer_id = ${customerId}
      ORDER BY p.purchase_date DESC
    `;
    console.log(`✅ Encontradas ${result.length} purchases`);
    return result as Purchase[];
  } catch (error) {
    console.error('❌ Error fetching purchases:', error);
    throw new Error('No se pudieron obtener las compras');
  }
}

export async function getAccounts(customerId: string): Promise<Account[]> {
  try {
    console.log(`🔍 Buscando accounts para customer_id: ${customerId}`);
    const result = await sql`
      SELECT * FROM account 
      WHERE customer_id = ${customerId}
    `;
    console.log(`✅ Encontradas ${result.length} accounts`);
    return result as Account[];
  } catch (error) {
    console.error('❌ Error fetching accounts:', error);
    throw new Error('No se pudieron obtener las cuentas');
  }
}

export async function getPendingBills(customerId: string): Promise<Bill[]> {
  try {
    console.log(`🔍 Buscando bills pendientes para customer_id: ${customerId}`);
    const result = await sql`
      SELECT b.* 
      FROM bill b
      LEFT JOIN account a ON b.account_id = a.account_id
      WHERE a.customer_id = ${customerId}
      AND b.status = 'pending'
      ORDER BY b.upcoming_payment_date ASC
    `;
    console.log(`✅ Encontradas ${result.length} bills pendientes`);
    return result as Bill[];
  } catch (error) {
    console.error('❌ Error fetching bills:', error);
    throw new Error('No se pudieron obtener los pagos pendientes');
  }
}

export async function getLoans(customerId: string): Promise<Loan[]> {
  try {
    console.log(`🔍 Buscando loans para customer_id: ${customerId}`);
    const result = await sql`
      SELECT l.* 
      FROM loan l
      LEFT JOIN account a ON l.account_id = a.account_id
      WHERE a.customer_id = ${customerId}
    `;
    console.log(`✅ Encontrados ${result.length} loans`);
    return result as Loan[];
  } catch (error) {
    console.error('❌ Error fetching loans:', error);
    throw new Error('No se pudieron obtener los préstamos');
  }
}

export async function getDeposits(customerId: string): Promise<Deposit[]> {
  try {
    console.log(`🔍 Buscando deposits para customer_id: ${customerId}`);
    const result = await sql`
      SELECT d.* 
      FROM deposit d
      LEFT JOIN account a ON d.account_id = a.account_id
      WHERE a.customer_id = ${customerId}
      ORDER BY d.transaction_date DESC
    `;
    console.log(`✅ Encontrados ${result.length} deposits`);
    return result as Deposit[];
  } catch (error) {
    console.error('❌ Error fetching deposits:', error);
    throw new Error('No se pudieron obtener los depósitos');
  }
}
