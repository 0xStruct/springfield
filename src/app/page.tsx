'use client';
import PersonalSign from "@/components/PersonalSign";
import SwitchChains from "@/components/SwitchChains";
import Welcome from "@/components/Welcome";
import Poll0 from "@/components/Poll0";
import Poll1 from "@/components/Poll1";
import Poll2 from "@/components/Poll2";
import Login from "@/components/Login";
import { useWallet } from "@/components/WalletContext";

import { useState } from 'react';

import Image from "next/image";

import snapshot from "@snapshot-labs/snapshot.js";
import { ethers } from "ethers";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";

export default function Home() {

  const [hasSBT, setHasSBT] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    connected,
    walletClient,
    userAddress,
    web3Provider,
  } = useWallet();

  const hub = 'https://testnet.hub.snapshot.org';
  const client = new snapshot.Client712(hub);

  async function doMockVerify() {
    const rawResponse = await fetch('https://api.holonym.io/testnet-minter/kyc', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "sbtReceiver": "0xE8504Cc3D5baeA07EFB9A45937fC1d09a9e26c7c" })
    });

    setIsVerifying(true);
    try {
      const content = await rawResponse.json();

      alert("txHash: "+ content.TransactionHash);
      console.log("txHash", content.TransactionHash);
      setHasSBT(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsVerifying(false);
    }

  };

  async function doVote(proposal: string, choice: number) {
    // @ts-ignore
    // const wallet = window.ethereum;

    // const wallet = initSilk();

    // const web3 = new ethers.providers.Web3Provider(wallet, { name: "sepolia", chainId: 11155111 });
    // const [account] = await web3.listAccounts();

    try {
      const receipt = await client.vote(web3Provider, userAddress, {
        space: 'springfield.eth',
        proposal: proposal,
        type: 'single-choice',
        choice: choice,
        reason: '',
        app: 'springfield'
      });

      console.log("receipt", receipt);
    } catch (error) {
      console.log('catched an error', error);

      // _signTypedData
      // Snapshot vote signature does not need to sign domain.chainId and domain.verifyingContract
      // hence signature signed by Silk is not verified accordingly
      // this can be fixed in Snapshot ingestor's signature verification code
      // for now just show on UI that user has voted
      alert("you voted " + choice);
    }

  }

  return (
    <main className="flex flex-grow flex-col items-center justify-between px-24 pt-4">
      <div className="w-full max-w-5xl flex flex-col items-center space-y-2 font-mono text-sm lg:flex">

        <>
          <div>
            <Image className="h-36 w-auto drop-shadow-xl" src="/images/springfield.webp" width="100" height="30" alt="springfield" />
          </div>
          <div className="py-6">
            {Login()}
          </div>
        </>
        {connected && walletClient && userAddress ? (
          <>
            <div className="p-4 rounded-md border-black border bg-white w-1/2">
              <h2 className="text-lg font-semibold mb-2">Hello anon Springfield resident!</h2>
              <p className="mt-2 text-gray-600 break-all">{userAddress}</p>
              {hasSBT ? (
                <p className="mt-2 text-gray-600 break-all">You have verified your residency anonymously.</p>
              ) : (
                <>
                  <p className="my-2 text-gray-600 break-all">You have not verified your residency anonymously yet.</p>
                  <div className="text-center">
                    <button className="btn btn-primary btn-sm rounded-full" onClick={() => doMockVerify()} disabled={isVerifying}
                    >
                      {isVerifying ? 'Verifying...' : 'Mock Verify'}</button>
                  </div>
                </>

              )}

            </div>
            {hasSBT ? (
              <>
                <Poll1 doVote={doVote} />
                <Poll2 doVote={doVote} />
              </>
            ) : (
              <>
                <Poll0 />
              </>
            )}

          </>
        ) : (
          <Welcome />
        )}
      </div>
    </main>
  );
}
