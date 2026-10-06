import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { QrPreview } from './components/QrPreview';
import { ActionButtons } from './components/ActionButtons';
import { StatusMessage } from './components/StatusMessage';
import { validateUrl } from './lib/urlValidator';
import { generateQrCodeDataUrl } from './lib/qrGenerator';
import type { QrCodeState, StatusState } from './types/qr';

const INITIAL_STATE: QrCodeState = {
  originalUrl: '',
  dataUrl: null,
  isGenerating: false,
  status: null,
};

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [qrState, setQrState] = useState<QrCodeState>(INITIAL_STATE);
  const [actionStatus, setActionStatus] = useState<StatusState | null>(null);

  const handleGenerate = useCallback(async () => {
    // Clear previous action status
    setActionStatus(null);

    const validation = validateUrl(inputUrl);

    if (!validation.valid) {
      setQrState((prev) => ({
        ...prev,
        dataUrl: null,
        originalUrl: '',
        status: { type: 'error', message: validation.message ?? 'Invalid URL.' },
      }));
      return;
    }

    const normalizedUrl = validation.normalizedUrl ?? inputUrl.trim();

    setQrState((prev) => ({
      ...prev,
      isGenerating: true,
      status: null,
    }));

    try {
      const dataUrl = await generateQrCodeDataUrl(normalizedUrl);
      setQrState({
        originalUrl: normalizedUrl,
        dataUrl,
        isGenerating: false,
        status: {
          type: 'success',
          message: 'QR code generated! Scan it to open your link.',
        },
      });
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : 'Failed to generate QR code.';
      setQrState({
        originalUrl: '',
        dataUrl: null,
        isGenerating: false,
        status: { type: 'error', message: errMessage },
      });
    }
  }, [inputUrl]);

  const handleClear = useCallback(() => {
    setInputUrl('');
    setQrState(INITIAL_STATE);
    setActionStatus(null);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInputUrl(value);
    // Clear error status when user starts typing again
    if (qrState.status?.type === 'error') {
      setQrState((prev) => ({ ...prev, status: null }));
    }
    setActionStatus(null);
  }, [qrState.status?.type]);

  const handleNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info') => {
      setActionStatus({ type, message });
      if (type === 'success') {
        setTimeout(() => setActionStatus(null), 3000);
      }
    },
    []
  );

  const displayStatus = actionStatus ?? qrState.status;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex flex-col items-center justify-start px-4 py-10 sm:py-16">
      {/* Background decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl mx-auto">
        {/* Header */}
        <Header />

        {/* Main Card */}
        <main className="w-full bg-white rounded-2xl shadow-card border border-slate-200/60 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* URL Input Section */}
            <UrlInput
              url={inputUrl}
              onChange={handleInputChange}
              onGenerate={handleGenerate}
              onClear={handleClear}
              isLoading={qrState.isGenerating}
            />

            {/* Status Message */}
            <StatusMessage status={displayStatus} />

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* QR Preview */}
            <QrPreview
              dataUrl={qrState.dataUrl}
              url={qrState.originalUrl}
              isGenerating={qrState.isGenerating}
            />

            {/* Action Buttons — only visible when QR exists */}
            {qrState.dataUrl && (
              <ActionButtons
                dataUrl={qrState.dataUrl}
                url={qrState.originalUrl}
                onNotification={handleNotification}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-slate-400">
          <p>
            QR codes are generated entirely in your browser — no data is sent to any server.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
