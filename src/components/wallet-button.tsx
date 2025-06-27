"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useWallet } from "@/context/wallet-context"
import WalletSelection from "./wallet-selection"

export function WalletButton() {
    const { connected, wallet } = useWallet()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

    const selectedWalletComponent = useMemo(() => {
        if (!wallet) return null
        return (
            <div className="st-flex st-items-center">
                <img
                    src={wallet.logo.src}
                    alt={wallet.logo.alt}
                    className="st-w-5 st-h-5 st-rounded-full"
                />
                <span className="st-ml-2 st-text-sm st-font-medium">
          {wallet.title || wallet.extensionName || "Unknown Wallet"}
        </span>
            </div>
        )
    }, [wallet])

    return (
        <>
            <button
                onClick={() => setIsWalletModalOpen(true)}
                className={cn(
                    "st-inline-flex st-items-center st-px-4 st-py-2 st-rounded-md st-text-sm sm:st-text-base st-font-medium",
                    "st-border st-bg-blue-500 st-text-white st-border-blue-500",
                    "hover:st-bg-blue-600 focus:st-ring-2 focus:st-ring-blue-300 transition"
                )}
            >
                {connected ? selectedWalletComponent : "Connect Wallet"}
            </button>

            {isWalletModalOpen && <WalletSelection onClose={() => setIsWalletModalOpen(false)} />}
        </>
    )
}
