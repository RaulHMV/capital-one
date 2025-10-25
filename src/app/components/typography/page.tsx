"use client";
import { ArrowRightLeft, Download, FileText, User, CreditCard } from "lucide-react";
import SummaryCard from "./parts/SummaryCard";
import ActionsGrid from "./parts/ActionsGrid";
import TransactionsList from "./parts/TransactionsList";
import FooterNav from "./parts/FooterNav";

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-100 flex items-stretch font-sans">
      {/* Full-bleed container that adapts: column on mobile, two columns on md+ */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Left column: summary + actions */}
        <section className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-start gap-6">
          <SummaryCard amount="7,251.86" />

          <div>
            <h3 className="text-gray-700 font-semibold mb-2">I Want to...</h3>
            <ActionsGrid />
          </div>

          <div className="mt-2">
            <h3 className="text-gray-700 font-semibold">Upcoming Transactions</h3>
            <div className="bg-slate-50 border rounded-xl p-3 text-gray-500 text-sm mt-1">
              You don’t have any upcoming transactions.
            </div>
          </div>
        </section>

        {/* Right column: recent transactions */}
        <aside className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8 border-l md:border-l-0 md:border-t">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold">Recent Transactions</h3>
              <span className="text-sm text-gray-500 hidden sm:inline">Last 30 days</span>
            </div>

            <TransactionsList />

            {/* Desktop nav inside right column */}
            <nav className="mt-6 pt-3 text-gray-500 hidden md:flex justify-around">
              <div className="flex flex-col items-center">
                <CreditCard size={18} className="text-slate-300" />
                <span className="text-xs">Home</span>
              </div>
              <div className="flex flex-col items-center">
                <ArrowRightLeft size={18} className="text-slate-300" />
                <span className="text-xs">Pay/Move</span>
              </div>
              <div className="flex flex-col items-center">
                <FileText size={18} className="text-slate-300" />
                <span className="text-xs">Benefits</span>
              </div>
              <div className="flex flex-col items-center">
                <User size={18} className="text-slate-300" />
                <span className="text-xs">Profile</span>
              </div>
            </nav>
          </div>
        </aside>
      </div>

      <FooterNav />
    </main>
  );
}
