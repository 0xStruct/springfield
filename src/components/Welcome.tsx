"use client";
import { useWallet } from "./WalletContext";
import Image from "next/image";

export default function Welcome() {
  const { currentNetwork, setCurrentNetwork, initializeWalletClient } = useWallet();


  return (
    <div className="p-4 rounded-md border-black border bg-white w-1/2">
      <h2 className="text-lg font-semibold mb-2">Welcome to Springfield!</h2>
      <p className="py-2">
        At Springfield, a fictional "Any Town", citizens come together to govern themselves using decentralized tools.
      </p>
      <p className="py-2">
        The decentralized governance system must meet these 3 keys criteria:
      </p>
      <div className="py-2">
        <b>1. ease-of-use for high rate of citizens' participation</b>
        <p className="pl-8 pt-2">
          citizens can participate right away through the embedded wallet, <a href="https://silk.sc" target="_blank" className="underline text-primary">Silk</a>. On-boarding frictions are very much reduced.
        </p>
      </div>
      <div className="py-2">
        <b>2. privacy and anonymity to protect citizens' identities while safeguarding integrity of the governance</b>
        <p className="pl-8 pt-2">
          zero-knowledge credentials powered by <a href="https://docs.holonym.id/for-developers/start-here" target="_blank" className="underline text-primary">Zeronym</a> are used to ensure residency in Springfield anonymously and single unique participation
        </p>
      </div>
      <div className="py-2">
        <b>3. censorship and oppression resistant to ensure non-interference from big powers</b>
        <p className="pl-8 pt-2">
          big powers hate when citizens wake up and take lead. the governance system of Springfield must run in a decentralized manner.
        </p>
      </div>
    </div>
  );
}