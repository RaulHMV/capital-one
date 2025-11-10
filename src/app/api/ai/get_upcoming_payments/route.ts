/**
 * Endpoint: GET /api/ai/get_upcoming_payments
 * Análisis de pagos futuros con IA usando PostgreSQL
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiInsight } from '@/lib/gemini';
import { getPendingBills } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('📅 [GET_UPCOMING_PAYMENTS] Endpoint llamado');
  
  const { searchParams } = request.nextUrl;
  const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID;

  console.log(`👤 [GET_UPCOMING_PAYMENTS] Customer ID: ${customerId}`);

  if (!customerId) {
    console.log('❌ [GET_UPCOMING_PAYMENTS] Customer ID faltante');
    return NextResponse.json(
      { error: 'El "customerId" es requerido' },
      { status: 400 }
    );
  }

  try {
    console.log('🔍 [GET_UPCOMING_PAYMENTS] Consultando bills...');
    const pendingBills = await getPendingBills(customerId);
    console.log(`✅ [GET_UPCOMING_PAYMENTS] Encontradas ${pendingBills.length} bills pendientes`);

    if (pendingBills.length === 0) {
      console.log('⚠️ [GET_UPCOMING_PAYMENTS] No hay bills pendientes');
      return NextResponse.json({ 
        insight: "¡Excelente! No tienes pagos pendientes en este momento." 
      });
    }

    // Construimos el prompt para Gemini
    const dataString = JSON.stringify(pendingBills.map(bill => ({
      beneficiario: bill.payee,
      nickname: bill.nickname,
      fecha_vencimiento: bill.upcoming_payment_date,
      status: bill.status
    })));

    console.log('🤖 [GET_UPCOMING_PAYMENTS] Llamando a Gemini...');
    const prompt = `
      Eres un asistente amigable y proactivo llamado Eno.
      Un usuario te pregunta: "¿Qué tengo que pagar pronto?"
      
      Analiza los siguientes datos de sus facturas pendientes en formato JSON:
      ${dataString}

      Basándote en esos datos, recuérdale sus próximos pagos (máximo 2-3 frases).
      Habla en español y en un tono casual. Por ejemplo: "¡Ojo! No olvides que tienes que pagar..."
    `;

    const insight = await getGeminiInsight(prompt);
    console.log('✅ [GET_UPCOMING_PAYMENTS] Respuesta de Gemini obtenida');

    return NextResponse.json({ insight });

  } catch (error) {
    console.error('❌ [GET_UPCOMING_PAYMENTS] Error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
