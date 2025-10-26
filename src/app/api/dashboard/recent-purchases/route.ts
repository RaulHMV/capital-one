import { NextRequest, NextResponse } from 'next/server';
import { getPurchases } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID || 'cust_ana_perez_001';

    console.log('🛒 [DASHBOARD/RECENT-PURCHASES] Obteniendo compras para customer:', customerId);

    // Get all purchases for the customer
    const purchases = await getPurchases(customerId);
    
    console.log('🛒 [DASHBOARD/RECENT-PURCHASES] Compras encontradas:', purchases.length);

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        transactions: []
      });
    }

    // Sort by date (most recent first) and take last 10
    const sortedPurchases = purchases
      .sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime())
      .slice(0, 10);

    // Format for dashboard UI
    const transactions = sortedPurchases.map(purchase => {
      const date = new Date(purchase.purchase_date);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      return {
        date: formattedDate,
        description: purchase.merchant_name || 'Purchase',
        amount: `-$${Number(purchase.amount).toFixed(2)}`,
        pending: false
      };
    });

    console.log('🛒 [DASHBOARD/RECENT-PURCHASES] Transacciones formateadas:', transactions.length);

    return NextResponse.json({
      transactions
    });

  } catch (error) {
    console.error('❌ [DASHBOARD/RECENT-PURCHASES] Error:', error);
    return NextResponse.json(
      { error: 'Error fetching recent purchases', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
