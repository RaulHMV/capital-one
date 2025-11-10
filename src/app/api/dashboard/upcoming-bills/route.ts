import { NextRequest, NextResponse } from 'next/server';
import { getPendingBills } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID || 'cust_ana_perez_001';

    console.log('📅 [DASHBOARD/UPCOMING-BILLS] Obteniendo facturas pendientes para customer:', customerId);

    // Get all pending bills for the customer
    const bills = await getPendingBills(customerId);
    
    console.log('📅 [DASHBOARD/UPCOMING-BILLS] Facturas encontradas:', bills.length);

    if (!bills || bills.length === 0) {
      return NextResponse.json({
        transactions: []
      });
    }

    // Sort by upcoming payment date (earliest first)
    const sortedBills = bills
      .filter(bill => bill.upcoming_payment_date) // Filter out bills without upcoming_payment_date
      .sort((a, b) => new Date(a.upcoming_payment_date!).getTime() - new Date(b.upcoming_payment_date!).getTime());

    // Format for dashboard UI
    const transactions = sortedBills.map(bill => {
      const date = new Date(bill.upcoming_payment_date!);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      return {
        date: formattedDate,
        description: bill.payee || 'Bill Payment',
        amount: `Pending`, // Bills don't have payment_amount in the schema
        pending: true
      };
    });

    console.log('📅 [DASHBOARD/UPCOMING-BILLS] Transacciones formateadas:', transactions.length);

    return NextResponse.json({
      transactions
    });

  } catch (error) {
    console.error('❌ [DASHBOARD/UPCOMING-BILLS] Error:', error);
    return NextResponse.json(
      { error: 'Error fetching upcoming bills', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
