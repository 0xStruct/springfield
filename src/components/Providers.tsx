"use client";
import { useCallback, useEffect, useState } from "react";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from "@/lib/config";
import WalletContext from "./WalletContext";
import { WalletClient, createWalletClient, custom } from "viem";
import { mainnet, sepolia } from "viem/chains";

import { providers } from "ethers";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [connected, setConnected] = useState<boolean | undefined>(undefined);
  const [walletClient, setWalletClient] = useState<WalletClient | undefined>(undefined);
  const [userAddress, setUserAddress] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("mainnet");
  const [web3Provider, setWeb3Provider] = useState<any | undefined>(undefined);

  const initializeWalletClient = useCallback((account: any) => {
    let network = null;
    switch (currentNetwork) {
      case "mainnet":
        network = mainnet;
        break;
      case "sepolia":
        network = sepolia;
        break;
      default:
        network = mainnet;
        break;
    }

    const newWalletClient = createWalletClient({
      chain: network,
      // @ts-ignore
      transport: custom(window.silk as any),
    });
    setWalletClient(newWalletClient);

    const _domain = {
      name: "snapshot",
      version: "0.1.4",
      chainId: network.id,
      verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
    }

    // ethers.js
    // @ts-ignore
    const provider = new providers.Web3Provider(window.silk, network.id)
    const signer = provider.getSigner(account)

    const newWeb3Provider = {
      getSigner: () => {
        return {
          _signTypedData: (domain: any, types: any, message: any) => {
            console.log("domains", domain, _domain, types, message)

            return signer._signTypedData(_domain, types, message);
            // return newWalletClient?.signTypedData({
            //   account,
            //   // @ts-ignore
            //   domain,
            //   types,
            //   message,
            //   primaryType: 'Vote',
            // })
          },
        }
      },
    }

    setWeb3Provider(newWeb3Provider);
  }, [currentNetwork]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const silk = initSilk();
    // @ts-ignore
    window.silk = silk;

    const checkConnection = async () => {
      try {
        // @ts-ignore
        const accounts = await window.silk.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setConnected(true);
          initializeWalletClient(accounts[0]);
        } else {
          setConnected(false);
        }
      } catch (err) {
        console.error("Error checking connection:", err);
        setConnected(false);
      }
    };
    checkConnection();
  }, [initializeWalletClient]);

  return (
    <WalletContext.Provider value={{ connected, setConnected, walletClient, setWalletClient, userAddress, setUserAddress, currentNetwork, setCurrentNetwork, initializeWalletClient, web3Provider, setWeb3Provider }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </WalletContext.Provider>
  );
}