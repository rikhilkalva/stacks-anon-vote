# Stacks Anon Vote (Testnet)

A minimal Stacks dApp that:
- Connects a Leather wallet (Testnet)
- Calls the contract read‑only function `version()` and displays the result

This repo is intentionally small so reviewers can run it quickly.

## Contract
- Network: testnet
- Contract ID: `STDW1BSV9QA2ZZX3BQPv7KHWPXMMWV1YS3029T00N9.voting`

## Tech
- React + Vite + TypeScript
- Stacks JS: `@stacks/connect`, `@stacks/transactions`
- Read‑only call via Hiro Testnet API (see `src/read.ts`)

## Prerequisites
- Node.js 18+ and npm
- Leather wallet installed and set to Testnet

## Setup

1) Install dependencies
npm install

2) Start the dev server
npm run dev

3) Open the printed Local URL (e.g., http://localhost:5174)

4) In the app
- Click “Connect Wallet” and approve in Leather (ensure Testnet)
- Click “Read version()”
- Expected: `Contract version: 0.1.0`

## Environment

`.env` (included) should contain:
VITE_STACKS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=STDW1BSV9QA2ZZX3BQPv7KHWPXMMWV1YS3029T00N9
VITE_CONTRACT_NAME=voting
VITE_BACKEND_URL=http://localhost:3000


No private keys are stored or logged.

## Project Structure (relevant)
app/
src/
App.tsx # UI: connect + read-only button, shows version()
wallet.ts # Leather connect helpers (uses wallet’s selected network)
read.ts # call-read to version() via Hiro testnet API
stacks.ts # minimal network holder
.env
package.json
vite.config.ts
README.md

## Scripts
npm run dev # start dev server (development)
npm run build # production build
npm run preview # preview built app locally

## How It Works (short)
- `src/wallet.ts` uses `showConnect` to connect Leather; the wallet’s selected network (Testnet) is used.
- `src/read.ts` posts to the Testnet call‑read endpoint for `version`, decodes the Clarity value, and returns a plain string.
- `src/App.tsx` displays network, contract ID, connect state, and a button to call `version()`.

## Review Checklist
- `npm install` then `npm run dev` starts the app
- Connect wallet on Testnet → shows `Connected: ST…`
- Click “Read version()” → shows `Contract version: 0.1.0`
- Contract ID matches the one above

## License
MIT
