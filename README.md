# Instant QR Generator

> Turn any valid link into a scannable QR code — instantly, privately, and entirely in your browser.

![Instant QR Generator](https://img.shields.io/badge/status-live-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) ![React](https://img.shields.io/badge/React-19-61dafb)

---

## Features

- 🔗 **Real QR generation** — encodes the exact URL you enter using the `qrcode` library
- ✅ **Robust URL validation** — uses the browser's native `URL` constructor (not just a regex)
- 📥 **Download as PNG** — saves `qr-code.png` directly to your device
- 📋 **Copy URL to clipboard** — with graceful fallback for non-secure contexts
- 🔒 **100% client-side** — no server, no database, no tracking
- 📱 **Responsive** — works on mobile and desktop
- ♿ **Accessible** — semantic HTML, ARIA roles, keyboard navigation

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling |
| [qrcode](https://github.com/soldair/node-qrcode) | QR code generation |
| [lucide-react](https://lucide.dev) | Icon library |

---

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gen_ai_II

# Install dependencies
npm install
```

---

## Running the App

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Building for Production

```bash
npm run build
```

The output is in the `dist/` directory. Serve it with any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## How QR Generation Works

1. User enters a URL in the input field
2. `urlValidator.ts` validates it using the native `URL` constructor — requires `http:` or `https:` protocol with a valid hostname
3. `qrGenerator.ts` calls `QRCode.toDataURL(url, options)` from the `qrcode` library
4. The library encodes the exact URL into a standard QR matrix and returns a PNG data URL
5. The data URL is rendered in an `<img>` tag for display and used as the download source

Error correction level `M` is used for a good balance of scanability and data density.

---

## File Structure

```
src/
├── types/
│   └── qr.ts              # TypeScript interfaces (ValidationResult, QrCodeState, StatusState)
├── lib/
│   ├── urlValidator.ts    # URL validation using native URL constructor
│   └── qrGenerator.ts    # QR code generation using qrcode library
├── components/
│   ├── Header.tsx         # App header and badge
│   ├── UrlInput.tsx       # URL input, Generate button, Clear
│   ├── QrPreview.tsx      # QR image display with scan guidance
│   ├── ActionButtons.tsx  # Download PNG & Copy URL buttons
│   └── StatusMessage.tsx  # Inline success/error/info alerts
├── App.tsx                # Main state orchestrator
├── main.tsx               # React DOM entry point
└── index.css              # Tailwind directives + custom utilities
```

---

## Functional Verification

The following tests were performed after build:

| Test | Expected | Result |
|------|----------|--------|
| `https://example.com` → Generate | QR code appears | ✅ PASS |
| `https://www.google.com` → Generate | Different QR appears | ✅ PASS |
| `not-a-url` → Generate | Error message, no QR | ✅ PASS |
| Empty input → Generate | "Please enter a URL first" | ✅ PASS |
| Download PNG | `qr-code.png` downloaded | ✅ PASS |
| Copy URL | Clipboard updated, button shows "URL copied!" | ✅ PASS |
| QR decode verification | Decoded data === input URL | ✅ PASS (via jsQR) |

---

## Known Limitations

- Clipboard access requires a secure context (HTTPS or localhost) in modern browsers. A `execCommand` fallback is provided for non-secure contexts.
- Very long URLs may result in smaller QR modules and require a closer camera scan. The app uses error correction level `M` by default.
