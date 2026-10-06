import QRCode from 'qrcode';

export interface QrOptions {
  width?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  darkColor?: string;
  lightColor?: string;
}

/**
 * Generates a PNG Data URL from a valid URL string using the `qrcode` library.
 * Returns a high-resolution, browser-friendly data URL.
 */
export async function generateQrCodeDataUrl(
  url: string,
  options: QrOptions = {}
): Promise<string> {
  const {
    width = 360,
    margin = 2,
    errorCorrectionLevel = 'M',
    darkColor = '#0f172a',
    lightColor = '#ffffff',
  } = options;

  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width,
      margin,
      errorCorrectionLevel,
      color: {
        dark: darkColor,
        light: lightColor,
      },
    });

    return dataUrl;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown QR generation error';
    throw new Error(`Failed to generate QR code: ${errMessage}`);
  }
}
