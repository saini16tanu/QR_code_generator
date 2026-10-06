import React from 'react';
import { QrCode, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-medium mb-3 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        <span>Instant, Client-Side & Private</span>
      </div>

      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
          <QrCode className="w-7 h-7" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Instant QR Generator
        </h1>
      </div>

      <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto">
        Turn any valid link into a scannable QR code.
      </p>
    </header>
  );
};
