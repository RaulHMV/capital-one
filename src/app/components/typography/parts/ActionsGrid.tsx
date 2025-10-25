"use client";
import React from "react";
import { Button } from "flowbite-react";
import { ArrowRightLeft, Download, FileText, User } from "lucide-react";

export const ActionsGrid: React.FC = () => {
  const actions = [
  { key: "transfer", label: "Transfer", icon: <ArrowRightLeft className="text-slate-300 mb-1" /> },
  { key: "deposit", label: "Deposit", icon: <Download className="text-slate-300 mb-1" /> },
  { key: "statement", label: "Statement", icon: <FileText className="text-slate-300 mb-1" /> },
  { key: "details", label: "Details", icon: <User className="text-slate-300 mb-1" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((a) => (
        <Button
          key={a.key}
          color="light"
          aria-label={a.label}
          className="flex flex-col items-center justify-center h-24 md:h-28 rounded-xl bg-slate-50 border text-slate-800 hover:bg-slate-100"
          type="button"
        >
          <div className="mb-1" aria-hidden>
            {a.icon}
          </div>
          <span className="text-sm font-medium">{a.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ActionsGrid;
