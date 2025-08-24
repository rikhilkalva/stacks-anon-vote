export const CONFIG = {
  network: import.meta.env.VITE_STACKS_NETWORK || "testnet",
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || "",
  contractName: import.meta.env.VITE_CONTRACT_NAME || "voting",
  backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
};
