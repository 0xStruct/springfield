"use client";
import { useWallet } from "./WalletContext";
import Image from "next/image";

export default function Poll2({doVote}) {
  const { currentNetwork, setCurrentNetwork, initializeWalletClient } = useWallet();

  const proposal = "0x3e14e923a1ab6d00f3ad3dc6ba3bb2970d33e4a2f1ad345bdabf2e100306680b";

  return ( 
    <div className="p-4 rounded-md border-black border bg-white w-1/2">
      <h2 className="text-lg font-semibold mb-2">Poll #2 
        <a href={"https://testnet.snapshot.org/#/springfield.eth/proposal/"+ proposal} target="_blank" className="pl-4 text-sm text-blue-800 font-normal">[source]</a>
      </h2>
      <p className="mb-2">
        <h3 className="text-lg">(Exit Poll) <b>POTS</b> - President of the Springfield</h3>
        <p className="py-2">
          <Image className="h-auto w-full drop-shadow-xl" src="/images/musk-or-swift.png" width="100" height="30" alt="springfield" />
        </p>
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className="btn btn-secondary btn-sm rounded-full px-8"
          onClick={() => doVote(proposal, 2)}
        >
          Musk
        </button>
        <button
          className="btn btn-primary btn-sm rounded-full px-8"
          onClick={() => doVote(proposal, 2)}
        >
          Swift
        </button>

      </div>
    </div>
  );
}