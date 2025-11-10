/**
 * Endpoint: GET /api/ai/get_debt_status
 * Análisis de estatus de deudas con IA usando PostgreSQL
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiInsight } from '@/lib/gemini';
import { getLoans } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('🏦 [GET_DEBT_STATUS] Endpoint llamado');
  
  const { searchParams } = request.nextUrl;
  const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID;

  console.log(`👤 [GET_DEBT_STATUS] Customer ID: ${customerId}`);

  if (!customerId) {
    console.log('❌ [GET_DEBT_STATUS] Customer ID faltante');
    return NextResponse.json(
      { error: 'El "customerId" es requerido' },
      { status: 400 }
    );
  }

  try {
    console.log('🔍 [GET_DEBT_STATUS] Consultando loans...');
    const loans = await getLoans(customerId);
    console.log(`✅ [GET_DEBT_STATUS] Encontrados ${loans.length} loans`);

    if (loans.length === 0) {
      console.log('⚠️ [GET_DEBT_STATUS] No hay loans');
      return NextResponse.json({ 
        insight: "¡Genial! No tienes préstamos activos en este momento." 
      });
    }

    // Construimos el prompt para Gemini
    const dataString = JSON.stringify(loans.map(loan => ({
      tipo: loan.type,
      monto_total: loan.amount,
      pago_mensual: loan.monthly_payment,
      credit_score: loan.credit_score,
      status: loan.status
    })));

    console.log('🤖 [GET_DEBT_STATUS] Llamando a Gemini...');
    const prompt = `
      Eres un asesor financiero amigable y conciso llamado Eno.
      Un usuario te pregunta: "¿Cómo van mis deudas?"
      
      Analiza los siguientes datos de sus préstamos en formato JSON:
      ${dataString}

      Basándote en esos datos, dale un resumen breve (máximo 2-3 frases) de sus deudas.
      Habla en español y en un tono casual. Por ejemplo: "Tienes X préstamos activos. Tu pago mensual total es de..."
    `;

    const insight = await getGeminiInsight(prompt);
    console.log('✅ [GET_DEBT_STATUS] Respuesta de Gemini obtenida');

    return NextResponse.json({ insight });

  } catch (error) {
    console.error('❌ [GET_DEBT_STATUS] Error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
