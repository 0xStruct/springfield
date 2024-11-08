import React, { createContext, useContext } from "react";
import { WalletClient } from "viem";

type WalletContextType = {
  connected: boolean | undefined;
  setConnected: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  walletClient: WalletClient | undefined;
  setWalletClient: React.Dispatch<React.SetStateAction<WalletClient | undefined>>;
  userAddress: string;
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  currentNetwork: string;
  setCurrentNetwork: React.Dispatch<React.SetStateAction<string>>;
  initializeWalletClient: () => void;
  web3Provider: any | undefined;
  setWeb3Provider: React.Dispatch<React.SetStateAction<any | undefined>>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WagmiProvider");
  }
  return context;
};

export default WalletContext;