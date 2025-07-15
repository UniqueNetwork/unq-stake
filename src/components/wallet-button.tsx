"use client"

import { useState, useMemo } from "react"
import { useWallet } from "@/context/wallet-context"
import WalletSelection from "./wallet-selection"

export function WalletButton() {
    const { connected, wallet } = useWallet()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const novaLogoString = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20324%20324'%20style='enable-background:new%200%200%20324%20324'%20xml:space='preserve'%3e%3cradialGradient%20id='a'%20cx='8.15'%20cy='19.93'%20r='372.636'%20gradientTransform='matrix(1%200%200%20-1%200%20326)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.053'%20style='stop-color:%23d7d3e9'/%3e%3cstop%20offset='.193'%20style='stop-color:%23a19cde'/%3e%3cstop%20offset='.383'%20style='stop-color:%23696bd9'/%3e%3cstop%20offset='.54'%20style='stop-color:%233a5ae7'/%3e%3cstop%20offset='.773'%20style='stop-color:%23225fe7'/%3e%3cstop%20offset='1'%20style='stop-color:%230883d1'/%3e%3c/radialGradient%3e%3cpath%20d='M84.1%200h155.8C286.3%200%20324%2037.7%20324%2084.1v155.8c0%2046.5-37.7%2084.1-84.1%2084.1H84.1C37.7%20324%200%20286.3%200%20239.9V84.1C0%2037.7%2037.7%200%2084.1%200z'%20style='fill:url(%23a)'/%3e%3cpath%20d='M275%20166.7v3c-18.4%202.9-58%209.8-77.5%2017.2-7%202.7-12.5%208.1-15.2%2015.1-7.4%2019.4-14.4%2059.2-17.3%2077.7h-6c-2.9-18.5-9.9-58.4-17.3-77.7-2.7-6.9-8.2-12.4-15.2-15.1-19.5-7.5-59-14.3-77.5-17.2v-6c18.4-2.9%2058-9.8%2077.5-17.2%207-2.7%2012.5-8.1%2015.2-15.1%207.5-19.4%2014.4-59.2%2017.3-77.7h6c2.9%2018.5%209.9%2058.3%2017.3%2077.7%202.7%206.9%208.2%2012.4%2015.2%2015.1%2019.5%207.4%2059.1%2014.3%2077.5%2017.2v3z'%20style='fill:%23fff'/%3e%3c/svg%3e"

    const selectedWalletComponent = useMemo(() => {
        if (!wallet) return null
        const isNovaWallet = typeof window !== 'undefined' && window.walletExtension?.isNovaWallet

        let walletLogoSrc, walletLogoAlt, walletTitle

        if (isNovaWallet) {
            walletLogoSrc = novaLogoString
            walletLogoAlt = "Nova Wallet logo"
            walletTitle = "Nova Wallet"
        } else {
            walletLogoSrc = wallet.logo.src
            walletLogoAlt = wallet.logo.alt
            walletTitle = wallet.title || wallet.extensionName || "Unknown Wallet"
        }

        return (
            <div className="flex items-center">
                 <img
                    src={walletLogoSrc}
                    alt={walletLogoAlt}
                    className="w-5 h-5 rounded-full"
                />
                <span className="ml-2 text-sm font-medium">
                    {walletTitle}
                </span>
            </div>
        )
    }, [wallet])

    return (
        <>
            <button
                onClick={() => setIsWalletModalOpen(true)}
                className="inline-flex items-center px-4 py-2 rounded-md text-sm sm:text-base font-medium border bg-blue-500 text-white border-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
            >
                {connected ? selectedWalletComponent : "Connect Wallet"}
            </button>

            {isWalletModalOpen && <WalletSelection onClose={() => setIsWalletModalOpen(false)} />}
        </>
    )
}