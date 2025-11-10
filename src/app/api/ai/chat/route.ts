/**
 * Endpoint: POST /api/ai/chat
 * Chat inteligente con Eno que analiza la pregunta y llama al endpoint correcto
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiInsight } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  console.log('🚀 Chat endpoint llamado');
  
  try {
    const body = await request.json();
    console.log('📨 Body recibido:', body);
    
    const { message, customerId } = body;

    if (!message) {
      console.log('❌ Mensaje vacío');
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }

    console.log(`💬 Mensaje: "${message}"`);

    // ID por defecto desde variables de entorno si no se proporciona
    const finalCustomerId = customerId || process.env.DEMO_CUSTOMER_ID;
    console.log(`👤 Customer ID: ${finalCustomerId}`);

    if (!finalCustomerId || finalCustomerId === 'your_customer_id_here') {
      console.warn('⚠️ DEMO_CUSTOMER_ID no configurado, usando respuesta general');
      // Si no hay customer_id, respondemos de forma general
      const generalPrompt = `
        Eres Eno, el asistente virtual de Capital One. Eres amigable, servicial y conciso.
        Un usuario te dice: "${message}"

        Responde de manera breve y amigable (máximo 2-3 frases). Habla en español.
        Nota: Menciona que necesitas que configure su cuenta para darte información específica.
      `;
      console.log('🤖 Llamando a Gemini con prompt general...');
      const generalInsight = await getGeminiInsight(generalPrompt);
      console.log('✅ Respuesta de Gemini:', generalInsight);
      return NextResponse.json({ 
        insight: generalInsight,
        intent: 'general',
        warning: 'DEMO_CUSTOMER_ID no configurado'
      });
    }

    // Primero, analizamos la intención del usuario con Gemini
    console.log('🔍 Detectando intención...');
    const intentPrompt = `
      Eres un clasificador de intenciones. Un usuario de un banco te hace la siguiente pregunta:
      "${message}"

      Clasifica la intención en UNA de estas categorías:
      - gastos: Si pregunta sobre en qué gastó, compras, gastos
      - saldos: Si pregunta cuánto dinero tiene, sus saldos, cuentas
      - pagos: Si pregunta sobre pagos pendientes, facturas, bills
      - deudas: Si pregunta sobre préstamos, deudas, loans
      - ingresos: Si pregunta cuándo le pagan, depósitos, salario
      - general: Si es un saludo, agradecimiento, o pregunta general

      Responde SOLO con la categoría, sin puntuación ni explicación.
    `;

    const intent = (await getGeminiInsight(intentPrompt)).toLowerCase().trim();
    console.log(`🎯 Intent detectado: "${intent}"`);

    // Según la intención, llamamos al endpoint correspondiente
    let response;

    switch (intent) {
      case 'gastos':
        console.log(`📊 Consultando gastos para customer: ${finalCustomerId}`);
        response = await fetch(
          `${request.nextUrl.origin}/api/ai/get_spending_data?customerId=${finalCustomerId}`
        );
        break;

      case 'saldos':
        console.log(`💰 Consultando saldos para customer: ${finalCustomerId}`);
        response = await fetch(
          `${request.nextUrl.origin}/api/ai/get_account_balances?customerId=${finalCustomerId}`
        );
        break;

      case 'pagos':
        console.log(`📅 Consultando pagos para customer: ${finalCustomerId}`);
        response = await fetch(
          `${request.nextUrl.origin}/api/ai/get_upcoming_payments?customerId=${finalCustomerId}`
        );
        break;

      case 'deudas':
        console.log(`🏦 Consultando deudas para customer: ${finalCustomerId}`);
        response = await fetch(
          `${request.nextUrl.origin}/api/ai/get_debt_status?customerId=${finalCustomerId}`
        );
        break;

      case 'ingresos':
        console.log(`💵 Consultando ingresos para customer: ${finalCustomerId}`);
        response = await fetch(
          `${request.nextUrl.origin}/api/ai/get_income_stream?customerId=${finalCustomerId}`
        );
        break;

      case 'general':
      default:
        // Para preguntas generales, Gemini responde directamente
        const generalPrompt = `
          Eres Eno, el asistente virtual de Capital One. Eres amigable, servicial y conciso.
          Un usuario te dice: "${message}"

          Responde de manera breve y amigable. Habla en español sin salirte del tema en nada nunca pero dando informacion relevante e incluso cuentas matematicas o aproximaciones.
        `;
        const generalInsight = await getGeminiInsight(generalPrompt);
        return NextResponse.json({ 
          insight: generalInsight,
          intent: 'general'
        });
    }

    if (response && response.ok) {
      const data = await response.json();
      console.log(`✅ Respuesta exitosa del endpoint ${intent}`);
      return NextResponse.json({ 
        insight: data.insight,
        intent 
      });
    } else {
      const errorText = response ? await response.text() : 'No response';
      console.error(`❌ Error en endpoint ${intent}:`, errorText);
      throw new Error(`Error al obtener datos del endpoint ${intent}`);
    }

  } catch (error) {
    console.error('❌ Error en el chat:', error);
    return NextResponse.json(
      { 
        error: 'Error al procesar tu mensaje',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
