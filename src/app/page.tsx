"use client";
import { ArrowRightLeft, Download, FileText, User, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex justify-center py-10 font-sans">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide">Available Balance</h2>
          <p className="text-4xl font-bold text-slate-800 mt-1">$7,251.<span className="text-2xl">86</span></p>
          <p className="text-gray-500 text-sm mt-1">Current Balance</p>
        </div>

        {/* Acciones */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">I Want to...</h3>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <button className="flex flex-col items-center justify-center bg-slate-50 border rounded-xl py-4 hover:bg-slate-100">
              <ArrowRightLeft className="text-blue-600 mb-1" />
              <span className="text-sm font-medium">Transfer</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-slate-50 border rounded-xl py-4 hover:bg-slate-100">
              <Download className="text-blue-600 mb-1" />
              <span className="text-sm font-medium">Deposit</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-slate-50 border rounded-xl py-4 hover:bg-slate-100">
              <FileText className="text-blue-600 mb-1" />
              <span className="text-sm font-medium">Statement</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-slate-50 border rounded-xl py-4 hover:bg-slate-100">
              <User className="text-blue-600 mb-1" />
              <span className="text-sm font-medium">Details</span>
            </button>
          </div>
        </div>

        {/* Próximas transacciones */}
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Upcoming Transactions</h3>
          <div className="bg-slate-50 border rounded-xl p-3 text-gray-500 text-sm mt-1">
            You don’t have any upcoming transactions.
          </div>
        </div>

        {/* Transacciones recientes */}
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Recent Transactions</h3>
          <div className="bg-slate-50 border rounded-xl mt-2 divide-y">
            <div className="flex justify-between p-3">
              <div>
                <p className="font-medium text-slate-800">Coffee Shop</p>
                <p className="text-xs text-gray-500">Oct 22</p>
              </div>
              <p className="text-red-600 font-semibold">- $8.50</p>
            </div>
            <div className="flex justify-between p-3">
              <div>
                <p className="font-medium text-slate-800">Salary Deposit</p>
                <p className="text-xs text-gray-500">Oct 21</p>
              </div>
              <p className="text-green-600 font-semibold">+ $2,400.00</p>
            </div>
            <div className="flex justify-between p-3">
              <div>
                <p className="font-medium text-slate-800">Netflix Subscription</p>
                <p className="text-xs text-gray-500">Oct 19</p>
              </div>
              <p className="text-red-600 font-semibold">- $15.99</p>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <nav className="mt-6 border-t pt-3 flex justify-around text-gray-500">
          <div className="flex flex-col items-center">
            <CreditCard size={18} />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRightLeft size={18} />
            <span className="text-xs">Pay/Move</span>
          </div>
          <div className="flex flex-col items-center">
            <FileText size={18} />
            <span className="text-xs">Benefits</span>
          </div>
          <div className="flex flex-col items-center">
            <User size={18} />
            <span className="text-xs">Profile</span>
          </div>
        </nav>
      </div>
    </main>
  );
}
