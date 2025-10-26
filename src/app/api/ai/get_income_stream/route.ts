/**
 * Endpoint: GET /api/ai/get_income_stream
 * Análisis de flujo de ingresos con IA usando PostgreSQL
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiInsight } from '@/lib/gemini';
import { getDeposits } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('💵 [GET_INCOME_STREAM] Endpoint llamado');
  
  const { searchParams } = request.nextUrl;
  const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID;

  console.log(`👤 [GET_INCOME_STREAM] Customer ID: ${customerId}`);

  if (!customerId) {
    console.log('❌ [GET_INCOME_STREAM] Customer ID faltante');
    return NextResponse.json(
      { error: 'El "customerId" es requerido' },
      { status: 400 }
    );
  }

  try {
    console.log('🔍 [GET_INCOME_STREAM] Consultando deposits...');
    const deposits = await getDeposits(customerId);
    console.log(`✅ [GET_INCOME_STREAM] Encontrados ${deposits.length} deposits`);

    if (deposits.length === 0) {
      console.log('⚠️ [GET_INCOME_STREAM] No hay deposits para este customer');
      return NextResponse.json({ 
        insight: "No encontré depósitos recientes en tu cuenta." 
      });
    }

    // Construimos el prompt para Gemini
    const dataString = JSON.stringify(deposits.map(dep => ({
      descripcion: dep.description,
      monto: dep.amount,
      tipo: dep.type,
      fecha: dep.transaction_date,
      status: dep.status
    })));

    console.log('🤖 [GET_INCOME_STREAM] Llamando a Gemini...');
    const prompt = `
      Eres un asistente amigable y observador llamado Eno.
      Un usuario te pregunta: "¿Cuándo me pagan?"
      
      Analiza los siguientes datos de sus depósitos recientes en formato JSON:
      ${dataString}

      Busca depósitos que parezcan un salario (descripción con "salary", "payroll", etc.). 
      Responde su pregunta basándote en la fecha del último depósito de salario.
      Habla en español y en un tono casual. Por ejemplo: "Veo que recibiste tu depósito de salario el día X..."
    `;

    const insight = await getGeminiInsight(prompt);
    console.log('✅ [GET_INCOME_STREAM] Respuesta de Gemini obtenida');

    return NextResponse.json({ insight });

  } catch (error) {
    console.error('❌ [GET_INCOME_STREAM] Error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
