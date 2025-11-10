/**
 * Gemini AI Helper
 * Centralized configuration and helper functions for Google Generative AI
 */

// @ts-ignore - Temporarily ignore type errors for @google/generative-ai
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Lazy initialization to avoid build-time errors
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

const getModel = () => {
  if (!model) {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      throw new Error("GEMINI_API_KEY no encontrada en .env.local");
    }
    
    genAI = new GoogleGenerativeAI(API_KEY);
    
    // Configuración del modelo Gemini 1.5 Flash (más estable, mayor cuota)
    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      // Configuraciones de seguridad moderadas para datos financieros
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
  }
  return model;
};

/**
 * Función genérica para llamar a Gemini con un prompt
 * @param prompt - El texto del prompt para Gemini
 * @returns El insight generado por Gemini
 */
export async function getGeminiInsight(prompt: string): Promise<string> {
  try {
    console.log('🤖 [GEMINI] Iniciando llamada a Gemini...');
    console.log('🤖 [GEMINI] Prompt length:', prompt.length);
    
    const currentModel = getModel();
    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ [GEMINI] Respuesta recibida, length:', text.length);
    return text.trim();
  } catch (error) {
    console.error("❌ [GEMINI] Error al llamar a la API de Gemini:", error);
    console.error("❌ [GEMINI] Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return "Lo siento, no pude procesar tu solicitud en este momento. Por favor, intenta de nuevo.";
  }
}
