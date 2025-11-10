/**
 * Endpoint: GET /api/ai/get_spending_data
 * Análisis de gastos con IA usando PostgreSQL
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiInsight } from '@/lib/gemini';
import { getPurchases } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('💳 [GET_SPENDING_DATA] Endpoint llamado');
  
  const { searchParams } = request.nextUrl;
  const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID;

  console.log(`👤 [GET_SPENDING_DATA] Customer ID: ${customerId}`);

  if (!customerId) {
    console.log('❌ [GET_SPENDING_DATA] Customer ID faltante');
    return NextResponse.json(
      { error: 'El "customerId" es requerido' },
      { status: 400 }
    );
  }

  try {
    // 1. OBTENEMOS LOS DATOS DE LA BASE DE DATOS
    console.log('🔍 [GET_SPENDING_DATA] Consultando purchases...');
    const purchases = await getPurchases(customerId);
    console.log(`✅ [GET_SPENDING_DATA] Encontradas ${purchases.length} purchases`);

    // Si no hay compras, no molestamos a Gemini
    if (purchases.length === 0) {
      console.log('⚠️ [GET_SPENDING_DATA] No hay purchases para este customer');
      return NextResponse.json({ 
        insight: "No encontré gastos recientes en tu cuenta." 
      });
    }

    // 2. CONSTRUIMOS EL PROMPT PARA GEMINI
    const dataString = JSON.stringify(purchases.map(p => ({
      fecha: p.purchase_date,
      monto: p.amount,
      descripcion: p.description,
      comercio: p.merchant_name,
      categoria: p.merchant_category
    })));

    console.log('🤖 [GET_SPENDING_DATA] Llamando a Gemini...');
    const prompt = `
      Eres un asesor financiero amigable y conciso llamado Eno.
      Un usuario te pregunta: "¿En qué se me fue el dinero este mes?"
      
      Analiza los siguientes datos de sus compras, que están en formato JSON:
      ${dataString}

      Basándote en esos datos, dame un insight breve que responda su pregunta. 
      Habla en español y en un tono casual. Por ejemplo: "Veo que tus gastos más fuertes..."
    `;

    // 3. LLAMAMOS A GEMINI
    const insight = await getGeminiInsight(prompt);
    console.log('✅ [GET_SPENDING_DATA] Respuesta de Gemini obtenida');

    // 4. DEVOLVEMOS EL INSIGHT AL FRONTEND
    return NextResponse.json({ insight });

  } catch (error) {
    console.error('❌ [GET_SPENDING_DATA] Error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
