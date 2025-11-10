import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Use lazy initialization to avoid build-time errors
const getSQL = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está configurada en .env.local');
  }
  return neon(process.env.DATABASE_URL);
};

export async function POST(request: NextRequest) {
  try {
    const sql = getSQL(); // Initialize at runtime
    const { customerId, amount, surveyId } = await request.json();

    if (!customerId || !amount) {
      return NextResponse.json(
        { error: 'customerId y amount son requeridos' },
        { status: 400 }
      );
    }

    // Obtener la cuenta principal del cliente (puedes ajustar el tipo según necesites)
    const accounts = await sql`
      SELECT account_id, balance 
      FROM account 
      WHERE customer_id = ${customerId} 
      AND type = 'Checking'
      LIMIT 1
    `;

    if (accounts.length === 0) {
      return NextResponse.json(
        { error: 'No se encontró cuenta para el cliente' },
        { status: 404 }
      );
    }

    const account = accounts[0];
    const newBalance = Number(account.balance) + Number(amount);

    // Actualizar el balance
    await sql`
      UPDATE account 
      SET balance = ${newBalance},
          rewards = COALESCE(rewards, 0) + ${amount}
      WHERE account_id = ${account.account_id}
    `;

    // Opcional: Registrar el depósito en la tabla deposit
    await sql`
      INSERT INTO deposit (
        deposit_id,
        account_id,
        type,
        transaction_date,
        status,
        medium,
        description,
        amount
      ) VALUES (
        ${`DEP-${Date.now()}-${surveyId}`},
        ${account.account_id},
        'survey_reward',
        ${new Date().toISOString()},
        'completed',
        'online',
        ${`Recompensa por completar encuesta: ${surveyId}`},
        ${amount}
      )
    `;

    return NextResponse.json({
      success: true,
      newBalance,
      amount
    });

  } catch (error) {
    console.error('Error actualizando balance:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el balance' },
      { status: 500 }
    );
  }
}