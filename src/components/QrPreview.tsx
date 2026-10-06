import React from 'react';
import { ExternalLink, QrCode as QrIcon, Smartphone } from 'lucide-react';

interface QrPreviewProps {
  dataUrl: string | null;
  url: string;
  isGenerating: boolean;
}

export const QrPreview: React.FC<QrPreviewProps> = ({
  dataUrl,
  url,
  isGenerating,
}) => {
  if (!dataUrl) {
    return (
      <div className="w-full py-12 px-6 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 transition-all">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-slate-400 mb-4">
          <QrIcon className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-base font-semibold text-slate-700 mb-1">
          No QR Code Generated Yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs">
          Enter a valid link above and click <span className="font-medium text-slate-700">Generate QR</span> to create your scannable code.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
      {/* Phone scanning indicator note */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full mb-4 border border-emerald-200/60">
        <Smartphone className="w-3.5 h-3.5" />
        <span>Scan with your phone camera to open URL</span>
      </div>

      {/* QR Code Container */}
      <div className="relative p-4 bg-white rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-center group transition-transform">
        <img
          id="qr-image"
          src={dataUrl}
          alt={`Scannable QR code for ${url}`}
          className={`w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg transition-opacity duration-200 ${
            isGenerating ? 'opacity-40' : 'opacity-100'
          }`}
        />
      </div>

      {/* Destination URL Display */}
      <div className="mt-5 w-full max-w-md text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
          Encoded Destination
        </span>
        <div className="inline-flex items-center justify-center max-w-full px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm shadow-2xs overflow-hidden">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={url}
            className="truncate text-blue-600 hover:text-blue-800 hover:underline max-w-[280px] sm:max-w-[340px] inline-flex items-center gap-1.5"
          >
            <span className="truncate">{url}</span>
            <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
