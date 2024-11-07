"use client";
import { useWallet } from "./WalletContext";
import Image from "next/image";

export default function Poll0() {
  const { currentNetwork, setCurrentNetwork, initializeWalletClient } = useWallet();

  return (
    <div className="p-4 rounded-md border-black border bg-white w-1/2">
      <h2 className="text-lg font-semibold mb-2">Citizens' voices and opinions matter.</h2>
      <p className="mb-2">
        At Springfield, these are collected through decentralized polls, powered by <a href="https://snapshot.org" target="_blank" className="underline text-primary">Snapshot</a>.
      </p>
      <p className="mb-2">
        <a href="https://docs.holonym.id/for-developers/start-here" target="_blank" className="underline text-primary">Zeronym</a> is used for anonymous ZK verified identity.
      </p>
      <p className="mb-2">
        <a href="https://silk.sc" target="_blank" className="underline text-primary">Silk</a> is used for the embedded wallet with seamless UX.
      </p>
      <div className="text-center mt-4 underline">
        Get <em>mock</em> verified to access polls.
      </div>
    </div>
  );
}