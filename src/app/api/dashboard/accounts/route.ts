import { NextRequest, NextResponse } from 'next/server';
import { getAccounts } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId') || process.env.DEMO_CUSTOMER_ID || 'cust_ana_perez_001';

    console.log('💰 [DASHBOARD/ACCOUNTS] Obteniendo saldos para customer:', customerId);

    // Get all accounts for the customer
    const accounts = await getAccounts(customerId);
    
    console.log('💰 [DASHBOARD/ACCOUNTS] Cuentas encontradas:', accounts.length);

    if (!accounts || accounts.length === 0) {
      return NextResponse.json({
        availableBalance: 0,
        currentBalance: 0,
        message: 'No accounts found'
      });
    }

    // Calculate total balances
    const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
    
    console.log('💰 [DASHBOARD/ACCOUNTS] Balance total calculado:', totalBalance);

    return NextResponse.json({
      availableBalance: totalBalance,
      currentBalance: totalBalance,
      accounts: accounts.map(acc => ({
        id: acc.account_id,
        type: acc.type,
        balance: Number(acc.balance)
      }))
    });

  } catch (error) {
    console.error('❌ [DASHBOARD/ACCOUNTS] Error:', error);
    return NextResponse.json(
      { error: 'Error fetching account balances', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
