# API de IA con Gemini - Capital One Hackathon

## 📋 Configuración

### Variables de Entorno (.env.local)

```bash
# Hackathon API
HACKATHON_API_URL=https://api.nessie.com
HACKATHON_API_KEY=tu_api_key_del_hackathon

# Google Gemini AI
GEMINI_API_KEY=AIzaSyAkkxEcr_fhb-Ienu0UhTfVAlqKPJNO6Rs

# IDs de Demo (hardcoded)
DEMO_CUSTOMER_ID=tu_customer_id
DEMO_ACCOUNT_ID=tu_account_id
```

## 🎯 Endpoints Disponibles

### 1. Chat Inteligente (Recomendado)
**POST /api/ai/chat**

Este endpoint analiza la pregunta del usuario y llama automáticamente al endpoint correcto.

**Request:**
```json
{
  "message": "¿En qué gasté mi dinero?",
  "customerId": "opcional",
  "accountId": "opcional"
}
```

**Response:**
```json
{
  "insight": "Veo que tus gastos más fuertes fueron en Amazon y Starbucks...",
  "intent": "gastos"
}
```

### 2. Análisis de Gastos
**GET /api/ai/get_spending_data?accountId=xxx**

Analiza en qué gasta el usuario.

**Response:**
```json
{
  "insight": "Veo que tus gastos más fuertes fueron en Amazon ($45.99) y Starbucks ($8.50)..."
}
```

### 3. Análisis de Saldos
**GET /api/ai/get_account_balances?customerId=xxx**

Analiza los saldos de todas las cuentas.

**Response:**
```json
{
  "insight": "¡Te ves bien! Tienes un total de $7,251.86 repartido en tu cuenta de ahorros y checking..."
}
```

### 4. Pagos Pendientes
**GET /api/ai/get_upcoming_payments?accountId=xxx**

Analiza facturas pendientes de pago.

**Response:**
```json
{
  "insight": "¡Ojo! No olvides que tienes que pagar tu factura de Netflix el 20 de enero..."
}
```

### 5. Estado de Deudas
**GET /api/ai/get_debt_status?accountId=xxx**

Analiza préstamos activos.

**Response:**
```json
{
  "insight": "Tienes 2 préstamos activos. Tu pago mensual total es de $450..."
}
```

### 6. Flujo de Ingresos
**GET /api/ai/get_income_stream?accountId=xxx**

Analiza depósitos y salarios.

**Response:**
```json
{
  "insight": "Veo que recibiste tu depósito de 'Salary' el 1 de noviembre..."
}
```

## 💡 Uso desde el Frontend

### Ejemplo con el Chat Inteligente:

```typescript
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    message: "¿Cuándo me pagan?" 
  }),
});

const data = await response.json();
console.log(data.insight); // Respuesta de Gemini
```

### Ejemplo con Endpoint Específico:

```typescript
const accountId = process.env.NEXT_PUBLIC_DEMO_ACCOUNT_ID;
const response = await fetch(`/api/ai/get_spending_data?accountId=${accountId}`);
const data = await response.json();
console.log(data.insight);
```

## 🔐 Seguridad

- ✅ Las API keys están en `.env.local` (nunca en el frontend)
- ✅ Los endpoints actúan como proxy, ocultando las credenciales
- ✅ Gemini tiene configuraciones de seguridad moderadas para datos financieros

## 🤖 Funcionamiento de Gemini

1. El endpoint obtiene datos de la API del hackathon
2. Convierte los datos a JSON legible
3. Crea un prompt específico para Gemini
4. Gemini analiza y genera un insight en español
5. El endpoint devuelve solo el insight al frontend

## 📊 Intenciones Detectadas

El chat inteligente puede detectar estas intenciones:
- **gastos**: "¿En qué gasté?", "¿Cuáles fueron mis compras?"
- **saldos**: "¿Cuánto dinero tengo?", "¿Cómo van mis cuentas?"
- **pagos**: "¿Qué tengo que pagar?", "¿Facturas pendientes?"
- **deudas**: "¿Cómo van mis préstamos?", "¿Cuánto debo?"
- **ingresos**: "¿Cuándo me pagan?", "¿Cuándo recibo mi salario?"
- **general**: Saludos, agradecimientos, preguntas generales

## 🚀 Próximos Pasos

1. Reemplaza los IDs de demo en `.env.local` con tus IDs reales del hackathon
2. Verifica que la URL de la API del hackathon sea correcta
3. Prueba cada endpoint individualmente
4. Integra el chat en tu UI
5. ¡Gana el hackathon! 🏆
