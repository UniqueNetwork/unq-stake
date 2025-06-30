"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/context/wallet-context"
import {
  fetchStakingHistory,
  fetchTransferHistory,
  type StakingHistoryItem,
  type BalanceTransferItem,
} from "@/utils/staking-api"
import { RefreshCw } from "lucide-react"
import { cn } from "../lib/utils"
import {StakingRewardsTable, StakingTable, TransfersTable, UnstakingTable} from '@/components/tables.tsx';

type TabType = "staking" | "unstaking" | "rewards" | "transfers"

export default function StakingHistory() {
  const { connected, walletAddress, registerRefreshCallback, tokenSymbol } = useWallet()
  const [activeTab, setActiveTab] = useState<TabType>("staking")
  const [stakingTransactions, setStakingTransactions] = useState<StakingHistoryItem[]>([])
  const [transferTransactions, setTransferTransactions] = useState<BalanceTransferItem[]>([])
  const [stakingRewards, setStakingRewards] = useState<BalanceTransferItem[]>([])
  const [stakingLoading, setStakingLoading] = useState(false)
  const [transfersLoading, setTransfersLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const stake = stakingTransactions.filter((tx) => tx.eventType === "Stake")
  const unstake = stakingTransactions.filter((tx) => tx.eventType === "Unstake")

  async function fetchStakingData() {
    if (!connected || !walletAddress) return

    setStakingLoading(true)
    try {
      const transactions = await fetchStakingHistory(walletAddress, tokenSymbol)
      setStakingTransactions(transactions)
    } catch (error) {
      console.error("Failed to load staking history:", error)
    } finally {
      setStakingLoading(false)
    }
  }

  async function fetchTransferData() {
    if (!connected || !walletAddress) return

    setTransfersLoading(true)
    try {
      const transactions = await fetchTransferHistory(walletAddress, tokenSymbol)
      setTransferTransactions(transactions.transfers)
      setStakingRewards(transactions.stakingRewards)
    } catch (error) {
      console.error("Failed to load transfer history:", error)
    } finally {
      setTransfersLoading(false)
    }
  }

  const refreshTransactions = async () => {
    if (isRefreshing || !connected || !walletAddress) return

    setIsRefreshing(true)
    try {
      await Promise.all([
        fetchStakingData(),
        fetchTransferData(),
      ])
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    async function loadInitialData() {
      if (!connected || !walletAddress || !isMounted) return

      try {
        await Promise.all([fetchStakingData(), fetchTransferData()])
      } catch (error) {
        console.error("Failed to load transaction history:", error)
      }
    }

    if (connected && walletAddress) {
      loadInitialData()
    }

    return () => {
      isMounted = false
    }
  }, [connected, walletAddress, tokenSymbol])

  useEffect(() => {
    const unregister = registerRefreshCallback(refreshTransactions)
    return unregister
  }, [registerRefreshCallback])

  if (!connected) {
    return null
  }

  return (
      <section className={cn("st-py-12", "st-bg-white", "dark:st-bg-gray-800")}>
        <div className={cn("st-container", "st-mx-auto", "st-px-4")}>
          <div className={cn("st-flex", "st-justify-between", "st-items-center", "st-mb-6")}>
            <h2 className={cn("st-text-2xl", "st-font-bold")}>Your Transaction History</h2>
            <button
                onClick={refreshTransactions}
                disabled={isRefreshing || stakingLoading || transfersLoading}
                className={cn(
                    "st-flex", "st-items-center", "st-gap-2", "st-px-4", "st-py-2", "st-bg-blue-500", "st-text-white", "st-rounded-md",
                    "st-hover:bg-blue-600", "st-disabled:opacity-50", "st-disabled:cursor-not-allowed", "st-transition-colors"
                )}
            >
              <RefreshCw className={cn("st-w-4", "st-h-4", isRefreshing ? "st-animate-spin" : "")} />
              Refresh
            </button>
          </div>

          <div className={cn("st-bg-white", "dark:st-bg-gray-700", "st-rounded-lg", "st-shadow-md", "st-overflow-hidden")}>
            <div className={cn("st-border-b", "st-border-gray-200", "dark:st-border-gray-600")}>
              <div className={cn("st-flex")}>
                <button
                    className={cn(
                        "st-px-6", "st-py-3", "st-text-sm", "st-font-medium",
                        activeTab === "staking"
                            ? ["st-border-b-2", "st-border-blue-500", "st-text-blue-500"]
                            : ["st-text-gray-500", "st-hover:text-gray-700", "dark:st-text-gray-400", "dark:st-hover:text-gray-200"]
                    )}
                    onClick={() => setActiveTab("staking")}
                >
                  Staking ({stake.length})
                </button>
                <button
                    className={cn(
                        "st-px-6", "st-py-3", "st-text-sm", "st-font-medium",
                        activeTab === "unstaking"
                            ? ["st-border-b-2", "st-border-blue-500", "st-text-blue-500"]
                            : ["st-text-gray-500", "st-hover:text-gray-700", "dark:st-text-gray-400", "dark:st-hover:text-gray-200"]
                    )}
                    onClick={() => setActiveTab("unstaking")}
                >
                  Unstaking ({unstake.length})
                </button>
                <button
                    className={cn(
                        "st-px-6", "st-py-3", "st-text-sm", "st-font-medium",
                        activeTab === "rewards"
                            ? ["st-border-b-2", "st-border-blue-500", "st-text-blue-500"]
                            : ["st-text-gray-500", "st-hover:text-gray-700", "dark:st-text-gray-400", "dark:st-hover:text-gray-200"]
                    )}
                    onClick={() => setActiveTab("rewards")}
                >
                  Rewards ({stakingRewards.length})
                </button>
                <button
                    className={cn(
                        "st-px-6", "st-py-3", "st-text-sm", "st-font-medium",
                        activeTab === "transfers"
                            ? ["st-border-b-2", "st-border-blue-500", "st-text-blue-500"]
                            : ["st-text-gray-500", "st-hover:text-gray-700", "dark:st-text-gray-400", "dark:st-hover:text-gray-200"]
                    )}
                    onClick={() => setActiveTab("transfers")}
                >
                  Transfers ({transferTransactions.length})
                </button>
              </div>
            </div>

            <div className={cn("st-p-6")}>
              {activeTab === "staking" ? (
                  stakingLoading ? (
                      <div className={cn("st-flex", "st-justify-center", "st-py-8")}>
                        <div className={cn("st-animate-spin", "st-rounded-full", "st-h-12", "st-w-12", "st-border-b-2", "st-border-blue-500")}></div>
                      </div>
                  ) : stake.length === 0 ? (
                      <div className={cn("st-text-center", "st-py-8", "st-bg-gray-50", "dark:st-bg-gray-700", "st-rounded-lg")}>
                        <p className={cn("st-text-gray-500", "dark:st-text-gray-400")}>No staking history found</p>
                      </div>
                  ) : (
                      <div className={cn("st-overflow-x-auto")}>
                        <StakingTable stake={stake} />
                      </div>
                  )
              ) : activeTab === "unstaking" ? (
                  stakingLoading ? (
                      <div className={cn("st-flex", "st-justify-center", "st-py-8")}>
                        <div className={cn("st-animate-spin", "st-rounded-full", "st-h-12", "st-w-12", "st-border-b-2", "st-border-blue-500")}></div>
                      </div>
                  ) : unstake.length === 0 ? (
                      <div className={cn("st-text-center", "st-py-8", "st-bg-gray-50", "dark:st-bg-gray-700", "st-rounded-lg")}>
                        <p className={cn("st-text-gray-500", "dark:st-text-gray-400")}>No unstaking history found</p>
                      </div>
                  ) : (
                      <div className={cn("st-overflow-x-auto")}>
                        <UnstakingTable unStake={unstake} />
                      </div>
                  )
              ) : transfersLoading ? (
                  <div className={cn("st-flex", "st-justify-center", "st-py-8")}>
                    <div className={cn("st-animate-spin", "st-rounded-full", "st-h-12", "st-w-12", "st-border-b-2", "st-border-blue-500")}></div>
                  </div>
              ) : transferTransactions.length === 0 ? (
                  <div className={cn("st-text-center", "st-py-8", "st-bg-gray-50", "dark:st-bg-gray-700", "st-rounded-lg")}>
                    <p className={cn("st-text-gray-500", "dark:st-text-gray-400")}>No transfer transactions found</p>
                  </div>
              ) : activeTab === 'transfers' ? (
                  <div className={cn("st-overflow-x-auto")}>
                    <TransfersTable transfers={transferTransactions} />
                  </div>
              ) : (
                  <div className={cn("st-overflow-x-auto")}>
                    <StakingRewardsTable stakingRewards={stakingRewards} />
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>
  )
}
