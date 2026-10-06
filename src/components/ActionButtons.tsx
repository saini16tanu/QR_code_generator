import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

interface ActionButtonsProps {
  dataUrl: string | null;
  url: string;
  onNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  dataUrl,
  url,
  onNotification,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = () => {
    if (!dataUrl) {
      onNotification('No QR code available to download.', 'error');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onNotification('QR code downloaded as PNG!', 'success');
    } catch {
      onNotification('Failed to download QR code. Please try again.', 'error');
    }
  };

  const handleCopy = async () => {
    if (!url) {
      onNotification('No URL available to copy.', 'error');
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) throw new Error('execCommand copy failed');
      }

      setIsCopied(true);
      onNotification('URL copied!', 'success');

      setTimeout(() => {
        setIsCopied(false);
      }, 2500);
    } catch {
      onNotification('Failed to copy URL to clipboard.', 'error');
    }
  };

  if (!dataUrl) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
      {/* Download PNG Button */}
      <button
        type="button"
        id="download-btn"
        onClick={handleDownload}
        className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-medium rounded-xl text-sm transition-all shadow-xs hover:shadow-md cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Download PNG</span>
      </button>

      {/* Copy URL Button */}
      <button
        type="button"
        id="copy-btn"
        onClick={handleCopy}
        className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-xl text-sm transition-all border cursor-pointer ${
          isCopied
            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs hover:border-slate-300'
        }`}
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">URL copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-slate-500" />
            <span>Copy URL</span>
          </>
        )}
      </button>
    </div>
  );
};
