import { userSession, connectWallet, getAddress } from './wallet';
import { readVersion } from './read';
import { useState } from 'react';

export default function App() {
  const addr = import.meta.env.VITE_CONTRACT_ADDRESS as string;
  const name = import.meta.env.VITE_CONTRACT_NAME as string;
  const net  = import.meta.env.VITE_STACKS_NETWORK as string;

  const signedIn = userSession.isUserSignedIn();
  const myAddr = getAddress();
  const [ver, setVer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onReadVersion() {
    if (!signedIn || !myAddr) return;
    setLoading(true);
    setError(null);
    try {
      const v = await readVersion(addr, name, myAddr);
      setVer(v);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to read version');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h2>Stacks Anon Vote</h2>

      <p>Network: <b>{net}</b></p>
      <p>Contract: <b>{addr}.{name}</b></p>

      <hr />

      {!signedIn ? (
        <button onClick={connectWallet} style={{ padding: '8px 14px', fontWeight: 600 }}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: <b>{myAddr}</b></p>

          <button
            onClick={onReadVersion}
            disabled={loading}
            style={{ padding: '8px 14px', fontWeight: 600 }}
          >
            {loading ? 'Reading…' : 'Read version()'}
          </button>

          {ver && <p>Contract version: <b>{ver}</b></p>}
          {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
        </>
      )}
    </div>
  );
}
