# Guía de Configuración - Sistema de IA

## 🎯 Paso 1: Configurar Variables de Entorno

Edita el archivo `.env.local` en la raíz del proyecto:

```bash
# API del Hackathon
HACKATHON_API_URL=https://api.nessie.com
HACKATHON_API_KEY=tu_api_key_aqui

# Gemini AI (Ya configurada)
GEMINI_API_KEY=AIzaSyAkkxEcr_fhb-Ienu0UhTfVAlqKPJNO6Rs

# PostgreSQL (Ya configurada)
DATABASE_URL=postgresql://neondb_owner:npg_Mj3nS6oARCFl@ep-holy-dust-ahjsh6v4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

# IDs de Demo (Reemplaza con tus IDs reales)
DEMO_CUSTOMER_ID=tu_customer_id_del_hackathon
DEMO_ACCOUNT_ID=tu_account_id_del_hackathon
```

## 🔑 Paso 2: Obtener tus IDs del Hackathon

1. Ve a la documentación de la API del hackathon
2. Crea un customer usando: `POST /customers`
3. Crea una cuenta usando: `POST /accounts`
4. Copia los IDs y pégalos en `.env.local`

## 🧪 Paso 3: Probar los Endpoints

### Opción A: Desde el Chat (Recomendado)

1. Navega a `/chat` en tu app
2. Escribe cualquier pregunta:
   - "¿En qué gasté mi dinero?"
   - "¿Cuánto dinero tengo?"
   - "¿Cuándo me pagan?"
3. Eno (Gemini) responderá automáticamente

### Opción B: Desde Postman/Thunder Client

#### Test del Chat Inteligente:
```http
POST http://localhost:3000/api/ai/chat
Content-Type: application/json

{
  "message": "¿En qué gasté mi dinero?"
}
```

#### Test de Gastos:
```http
GET http://localhost:3000/api/ai/get_spending_data?accountId=tu_account_id
```

#### Test de Saldos:
```http
GET http://localhost:3000/api/ai/get_account_balances?customerId=tu_customer_id
```

## 📱 Paso 4: Integrar en tu UI

### En cualquier componente:

```typescript
// Usando el chat inteligente
const askEno = async (question: string) => {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: question }),
  });
  
  const data = await response.json();
  return data.insight; // Respuesta de Gemini
};

// Ejemplo de uso
const insight = await askEno("¿Cuánto dinero tengo?");
console.log(insight); // "¡Te ves bien! Tienes $7,251.86..."
```

## 🎨 Paso 5: Personalizar los Prompts

Si quieres cambiar cómo responde Gemini, edita los prompts en:
- `src/app/api/ai/get_spending_data/route.ts`
- `src/app/api/ai/get_account_balances/route.ts`
- `src/app/api/ai/get_upcoming_payments/route.ts`
- `src/app/api/ai/get_debt_status/route.ts`
- `src/app/api/ai/get_income_stream/route.ts`
- `src/app/api/ai/chat/route.ts`

## ⚡ Troubleshooting

### Error: "Cannot find module '@google/generative-ai'"
```bash
npm install @google/generative-ai
```

### Error: "GEMINI_API_KEY no encontrada"
- Verifica que `.env.local` existe en la raíz
- Reinicia el servidor de desarrollo: `npm run dev`

### Error: "Error al obtener las compras"
- Verifica que `HACKATHON_API_URL` y `HACKATHON_API_KEY` sean correctos
- Verifica que el `accountId` exista en la API del hackathon

### La IA responde en inglés
- Edita el prompt y asegúrate que dice "Habla en español"

## 🚀 ¡Listo!

Ahora tienes:
✅ 5 endpoints de análisis financiero con IA
✅ 1 chat inteligente que entiende preguntas
✅ Gemini configurado y funcionando
✅ IDs centralizados en .env.local

¡Buena suerte en el hackathon! 🏆
