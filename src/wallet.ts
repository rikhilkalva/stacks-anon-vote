// src/wallet.ts
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export function connectWallet(): void {
  showConnect({
    userSession,
    appDetails: {
      name: 'Stacks Anon Vote',
      icon: `${window.location.origin}/vite.svg`,
    },
    // Not passing "network" — Leather will use the wallet's selected network (keep Leather on Testnet)
    onFinish: () => {
      window.location.reload();
    },
  });
}

type StxProfile = {
  stxAddress?: { testnet?: string; mainnet?: string };
};

export function getAddress(): string | null {
  if (!userSession.isUserSignedIn()) return null;
  const userData = userSession.loadUserData();
  const profile = (userData?.profile ?? {}) as StxProfile;
  return profile.stxAddress?.testnet ?? profile.stxAddress?.mainnet ?? null;
}
