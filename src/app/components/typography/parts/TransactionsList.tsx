"use client";
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

interface Txn {
  id: string;
  title: string;
  date: string;
  amount: string;
  type?: "debit" | "credit";
}

export const TransactionsList: React.FC<{ items?: Txn[] }> = ({ items }) => {
  const [data, setData] = useState<Txn[] | null>(items ?? null);
  const [loading, setLoading] = useState<boolean>(!items);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items) return; // if items passed via props, use them
    let mounted = true;
    const fetchTx = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/transactions');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setData(json.items ?? []);
      } catch (err: any) {
        if (mounted) setError(err.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTx();
    return () => { mounted = false; };
  }, [items]);

  return (
    <Card className="w-full" role="region" aria-label="Recent transactions">
      {loading ? (
        <div className="p-4 text-sm text-gray-500">Loading transactions…</div>
      ) : error ? (
        <div className="p-4 text-sm text-red-600">Error loading transactions: {error}</div>
      ) : (
        <div className="flex flex-col gap-3">
          {(data ?? []).map((t) => (
            <div key={t.id} className="flex items-center justify-between p-2 md:p-3 rounded-md bg-white" role="listitem">
              <div>
                <p className="font-medium text-slate-800">{t.title}</p>
                <p className="text-xs text-gray-500">{t.date}</p>
              </div>
              <div className={`text-sm font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-600"}`} aria-label={`amount ${t.amount}`}>
                {t.amount}
              </div>
            </div>
          ))}
          {(!data || data.length === 0) && <div className="p-4 text-sm text-gray-500">No transactions found.</div>}
        </div>
      )}
    </Card>
  );
};

export default TransactionsList;
