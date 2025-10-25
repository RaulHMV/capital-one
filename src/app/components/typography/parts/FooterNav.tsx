"use client";
import React from "react";
import { CreditCard, ArrowRightLeft, FileText, User } from "lucide-react";

export const FooterNav: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t ${className}`} role="navigation" aria-label="Mobile navigation">
      <div className="flex justify-around py-2 text-gray-600">
          <button className="flex flex-col items-center text-xs" aria-label="Home" type="button">
            <CreditCard size={18} className="text-slate-300" />
            <span>Home</span>
          </button>
          <button className="flex flex-col items-center text-xs" aria-label="Pay or Move" type="button">
            <ArrowRightLeft size={18} className="text-slate-300" />
            <span>Pay/Move</span>
          </button>
          <button className="flex flex-col items-center text-xs" aria-label="Benefits" type="button">
            <FileText size={18} className="text-slate-300" />
            <span>Benefits</span>
          </button>
          <button className="flex flex-col items-center text-xs" aria-label="Profile" type="button">
            <User size={18} className="text-slate-300" />
            <span>Profile</span>
          </button>
      </div>
    </div>
  );
};

export default FooterNav;
