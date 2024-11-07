"use client";
import { useWallet } from "./WalletContext";
import Image from "next/image";

export default function Poll1({ doVote }) {
  const { currentNetwork, setCurrentNetwork, initializeWalletClient } = useWallet();

  const proposal = "0x12b389aa8f7fc5c2e1845ca8b6325fb23c46b1ec901518b4013174f2137bc8db";

  return (
    <div className="p-4 rounded-md border-black border bg-white w-1/2">
      <h2 className="text-lg font-semibold mb-2">Poll #1 
        <a href={"https://testnet.snapshot.org/#/springfield.eth/proposal/"+ proposal} target="_blank" className="pl-4 text-sm text-blue-800 font-normal">[source]</a>
      </h2>
      <p className="mb-2">
        <h3 className="text-lg">Change our town name!<br />from Spring<b>Field</b> to Spring<b>Blob</b></h3>
        <p className="py-2">
          <Image className="h-auto w-full drop-shadow-xl" src="/images/blob.png" width="100" height="30" alt="springfield" />

          let's go <b>BIG</b> with SpringBlob!
        </p>
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className="btn btn-secondary btn-sm rounded-full px-8"
          onClick={() => doVote(proposal, 1)}
        >
          SpringFIELD
        </button>
        <button
          className="btn btn-primary btn-sm rounded-full px-8"
          onClick={() => doVote(proposal, 2)}
        >
          SpringBLOB
        </button>

      </div>
    </div>
  );
}