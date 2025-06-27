"use client"

import {type BalanceDataItem, useWallet} from '@/context/wallet-context'
import { cn } from "../lib/utils"

interface BalanceInfoProps {
  activeTab?: "stake" | "unstake"
}

type BalanceSpanProps = {
  className?: string
  value?: BalanceDataItem
  isLoading?: boolean
  displayDecimals?: number
}

export const BalanceSpan = (props: BalanceSpanProps) => {
  const {
    className = "st-font-medium",
    value = {
        raw: "0",
        decimals: 18,
        unit: "",
    } as BalanceDataItem,
    isLoading = false,
    displayDecimals = 4,
  } = props

  if (isLoading) return <span className={className}>...</span>

  const raw = BigInt(value.raw)
  if (raw === 0n) return <span className={className}>0</span>

  const divisor = 10n ** BigInt(value.decimals)
  const whole = raw / divisor
  const fraction = raw % divisor
  const padded = fraction.toString().padStart(value.decimals, "0")
  const displayFraction = padded.slice(0, displayDecimals)

  const isNegligible = whole === 0n && displayFraction.split("").every((d) => d === "0")
  if (isNegligible) return (<span className={className}>0</span>)

  return (
      <span className={cn("st-inline-flex st-items-baseline", className)}>
      <span>{whole.toString()}</span>
      <span className="st-ml-0.5 st-text-xs st-opacity-50">.{displayFraction}</span>
      <span className="st-ml-1">{value.unit}</span>
    </span>
  )
}

export default function BalanceInfo({ activeTab = "stake" }: BalanceInfoProps) {
  const { connected, walletAddress, isLoading, balanceData } = useWallet()

  if (!connected || !walletAddress) return null

  const isDataLoading = isLoading || !balanceData

  return (
      <div className={cn("st-space-y-2")}>
        <div className={cn("st-flex st-justify-between")}>
          <span className={cn("st-text-gray-700 dark:st-text-gray-300")}>Total balance:</span>
          <BalanceSpan value={balanceData?.totalBalance} isLoading={isDataLoading} />
        </div>

        {activeTab === "stake" ? (
            <>
              <div className={cn("st-flex st-justify-between")}>
                <span className={cn("st-text-gray-700 dark:st-text-gray-300")}>Staked volume:</span>
                <BalanceSpan value={balanceData?.stakedBalance} isLoading={isDataLoading} />
              </div>
              <div className={cn("st-flex st-justify-between")}>
                <span className={cn("st-text-gray-700 dark:st-text-gray-300")}>Pending unstake:</span>
                <BalanceSpan value={balanceData?.unstakedBalance} isLoading={isDataLoading} />
              </div>
              <div className={cn("st-flex st-justify-between")}>
                <span className={cn("st-text-gray-700 dark:st-text-gray-300")}>Available to stake:</span>
                <BalanceSpan value={balanceData?.availableBalance} isLoading={isDataLoading} />
              </div>
            </>
        ) : (
            <>
              <div className={cn("st-flex st-justify-between")}>
                <span className={cn("st-text-gray-600 dark:st-text-gray-300")}>Pending unstake:</span>
                <BalanceSpan value={balanceData?.unstakedBalance} isLoading={isDataLoading} />
              </div>
              <div className={cn("st-flex st-justify-between")}>
                <span className={cn("st-text-gray-600 dark:st-text-gray-300")}>Staked volume:</span>
                <BalanceSpan value={balanceData?.stakedBalance} isLoading={isDataLoading} />
              </div>
            </>
        )}
      </div>
  )
}
