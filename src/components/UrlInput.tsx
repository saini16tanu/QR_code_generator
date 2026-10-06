import React from 'react';
import { Link2, X, ArrowRight, Loader2 } from 'lucide-react';

interface UrlInputProps {
  url: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  url,
  onChange,
  onGenerate,
  onClear,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="url-input"
          className="block text-sm font-semibold text-slate-800"
        >
          Destination URL
        </label>
        {url.length > 0 && (
          <button
            type="button"
            id="clear-btn"
            onClick={onClear}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
            title="Clear input"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Link2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
          />
          {url.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear URL"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 sm:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          id="generate-btn"
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl text-sm sm:text-base shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>Generate QR</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
