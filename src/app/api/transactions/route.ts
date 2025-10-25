import { NextResponse } from 'next/server';

const sample = [
  { id: '1', title: 'Coffee Shop', date: 'Oct 22', amount: '- $8.50', type: 'debit' },
  { id: '2', title: 'Salary Deposit', date: 'Oct 21', amount: '+ $2,400.00', type: 'credit' },
  { id: '3', title: 'Netflix Subscription', date: 'Oct 19', amount: '- $15.99', type: 'debit' },
];

export async function GET() {
  // In a real app you'd return data from a DB. This is a mock for local development.
  return NextResponse.json({ items: sample });
}
