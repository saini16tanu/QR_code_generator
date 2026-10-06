export type StatusType = 'idle' | 'success' | 'error' | 'info';

export interface ValidationResult {
  valid: boolean;
  message?: string;
  normalizedUrl?: string;
}

export interface StatusState {
  type: StatusType;
  message: string;
}

export interface QrCodeState {
  originalUrl: string;
  dataUrl: string | null;
  isGenerating: boolean;
  status: StatusState | null;
}
