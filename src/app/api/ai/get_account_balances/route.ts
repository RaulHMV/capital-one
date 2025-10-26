/**
 * Endpoint: GET /api/ai/get_account_balances
 * Análisis de saldos de cuentas con IA usando PostgreSQL
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiInsight } from '@/lib/gemini';
import { getAccounts } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('💰 [GET_ACCOUNT_BALANCES] Endpoint llamado');
  
  const { searchParams } = request.nextUrl;
  const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID;

  console.log(`👤 [GET_ACCOUNT_BALANCES] Customer ID: ${customerId}`);

  if (!customerId) {
    console.log('❌ [GET_ACCOUNT_BALANCES] Customer ID faltante');
    return NextResponse.json(
      { error: 'El "customerId" es requerido' },
      { status: 400 }
    );
  }

  try {
    console.log('🔍 [GET_ACCOUNT_BALANCES] Consultando base de datos...');
    const accounts = await getAccounts(customerId);
    console.log(`✅ [GET_ACCOUNT_BALANCES] Encontradas ${accounts.length} cuentas`);

    if (accounts.length === 0) {
      console.log('⚠️ [GET_ACCOUNT_BALANCES] No hay cuentas para este customer');
      return NextResponse.json({ 
        insight: "No encontré cuentas asociadas a tu perfil." 
      });
    }

    // Construimos el prompt para Gemini
    const dataString = JSON.stringify(accounts.map(acc => ({
      tipo: acc.type,
      nickname: acc.nickname,
      saldo: acc.balance,
      recompensas: acc.rewards
    })));

    console.log('🤖 [GET_ACCOUNT_BALANCES] Llamando a Gemini...');
    const prompt = `
      Eres un asesor financiero amigable y conciso llamado Eno.
      Un usuario te pregunta: "¿Cómo voy de dinero?"
      
      Analiza los siguientes datos de sus cuentas en formato JSON:
      ${dataString}

      Basándote en esos datos, dame un resumen breve (máximo 2-3 frases) de su situación financiera. 
      Suma los saldos para darle un total.
      Habla en español y en un tono casual. Por ejemplo: "¡Te ves bien! Tienes un total de $X repartido en..."
    `;

    const insight = await getGeminiInsight(prompt);
    console.log('✅ [GET_ACCOUNT_BALANCES] Respuesta de Gemini obtenida');

    return NextResponse.json({ insight });

  } catch (error) {
    console.error('❌ [GET_ACCOUNT_BALANCES] Error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
