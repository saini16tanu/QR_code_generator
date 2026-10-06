import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import type { StatusState } from '../types/qr';

interface StatusMessageProps {
  status: StatusState | null;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (!status || !status.message) return null;

  const { type, message } = status;

  if (type === 'error') {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm animate-in fade-in duration-200"
      >
        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  if (type === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm animate-in fade-in duration-200"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm animate-in fade-in duration-200"
    >
      <Info className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
      <span className="font-medium">{message}</span>
    </div>
  );
};
