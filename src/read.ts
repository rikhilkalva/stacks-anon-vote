// src/read.ts
import { hexToCV, cvToValue } from '@stacks/transactions';

// Reads the read-only function (version) from your deployed contract.
// addr = contract address (ST...)
// name = contract name (voting)
// sender = any STX address; we'll pass the connected one from the UI.
export async function readVersion(addr: string, name: string, sender: string) {
  const url = `https://api.testnet.hiro.so/v2/contracts/call-read/${addr}/${name}/version`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender, arguments: [] }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`call-read failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  // data.result is a hex-encoded Clarity value
  const cv = hexToCV(data.result);
  const val = cvToValue(cv);
  // cvToValue wraps strings in quotes -> strip them
  return typeof val === 'string' ? val.replace(/^"|"$/g, '') : String(val);
}
