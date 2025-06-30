import {cn} from '@/lib/utils.ts';
import React from 'react';
import {
    type BalanceTransferItem,
    formatAmount,
    formatDate,
    formatHash,
    type StakingHistoryItem
} from '@/utils/staking-api.ts';

export const StakingTable: React.FC<{stake: StakingHistoryItem[]}> = ({stake}) => {
    return (
        <table className={cn("st-min-w-full", "st-bg-white", "dark:st-bg-gray-800", "st-rounded-lg", "st-overflow-hidden")}>
            <thead className={cn("st-bg-gray-50", "dark:st-bg-gray-700")}>
            <tr>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Block
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Hash
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Time
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Status
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Method
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-right", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Amount
                </th>
            </tr>
            </thead>
            <tbody className={cn("st-divide-y", "st-divide-gray-200", "dark:st-divide-gray-700")}>
            {stake.map((item, index) => (
                <tr key={index} className={cn("st-hover:bg-gray-50", "dark:st-hover:bg-gray-700")}>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-medium", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {item.blockNumber}
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-mono")}>
                        <a
                            href={`https://unique.subscan.io/extrinsic/${item.hash}?tab=event`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("st-text-blue-600", "st-hover:text-blue-800", "st-hover:underline")}
                        >
                            {formatHash(item.hash)}
                        </a>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-text-gray-600", "dark:st-text-gray-400")}>
                        {formatDate(item.blockTimestamp)}
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                          <span className={cn("st-inline-flex", "st-items-center", "st-rounded-full", "st-bg-green-50", "st-px-2", "st-py-1", "st-text-xs", "st-font-medium", "st-text-green-700", "dark:st-bg-green-800", "dark:st-text-green-100")}>
                            Success
                          </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                          <span className={cn("st-text-sm", "st-text-gray-700", "dark:st-text-gray-300")}>
                            {item.section} ({item.method})
                          </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-text-right", "st-font-mono", "st-text-sm", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {formatAmount(item.amount)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export const UnstakingTable: React.FC<{unStake: StakingHistoryItem[]}> = ({unStake}) => {
    return (
        <table className={cn("st-min-w-full", "st-bg-white", "dark:st-bg-gray-800", "st-rounded-lg", "st-overflow-hidden")}>
            <thead className={cn("st-bg-gray-50", "dark:st-bg-gray-700")}>
            <tr>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Block
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Hash
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Time
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Status
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Method
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-right", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Amount
                </th>
            </tr>
            </thead>
            <tbody className={cn("st-divide-y", "st-divide-gray-200", "dark:st-divide-gray-700")}>
            {unStake.map((item, index) => (
                <tr key={index} className={cn("st-hover:bg-gray-50", "dark:st-hover:bg-gray-700")}>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-medium", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {item.blockNumber}
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-mono")}>
                        <a
                            href={`https://unique.subscan.io/extrinsic/${item.hash}?tab=event`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("st-text-blue-600", "st-hover:text-blue-800", "st-hover:underline")}
                        >
                            {formatHash(item.hash)}
                        </a>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-text-gray-600", "dark:st-text-gray-400")}>
                        {formatDate(item.blockTimestamp)}
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                          <span className={cn("st-inline-flex", "st-items-center", "st-rounded-full", "st-bg-green-50", "st-px-2", "st-py-1", "st-text-xs", "st-font-medium", "st-text-green-700", "dark:st-bg-green-800", "dark:st-text-green-100")}>
                            Success
                          </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                          <span className={cn("st-text-sm", "st-text-gray-700", "dark:st-text-gray-300")}>
                            {item.section} ({item.method})
                          </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-text-right", "st-font-mono", "st-text-sm", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {formatAmount(item.amount)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export const TransfersTable: React.FC<{transfers: BalanceTransferItem[]}> = ({transfers}) => {
    return (
        <table className={cn("st-min-w-full", "st-bg-white", "dark:st-bg-gray-800", "st-rounded-lg", "st-overflow-hidden")}>
            <thead className={cn("st-bg-gray-50", "dark:st-bg-gray-700")}>
            <tr>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Block
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Hash
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Time
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Status
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Method
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-right", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Amount
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-right", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Direction
                </th>
            </tr>
            </thead>
            <tbody className={cn("st-divide-y", "st-divide-gray-200", "dark:st-divide-gray-700")}>
            {transfers.map((item, index) => (
                <tr key={index} className={cn("st-hover:bg-gray-50", "dark:st-hover:bg-gray-700")}>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-medium", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {item.blockNumber}
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-mono")}>
                        <a
                            href={`https://unique.subscan.io/extrinsic/${item.extrinsicHash}?tab=event`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("st-text-blue-600", "st-hover:text-blue-800", "st-hover:underline")}
                        >
                            {formatHash(item.extrinsicHash)}
                        </a>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-text-gray-600", "dark:st-text-gray-400")}>
                        {formatDate(item.blockTimestamp)}
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                        <span className={cn("st-inline-flex", "st-items-center", "st-rounded-full", "st-bg-green-50", "st-px-2", "st-py-1", "st-text-xs", "st-font-medium", "st-text-green-700", "dark:st-bg-green-800", "dark:st-text-green-100")}>
                          Success
                        </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                        <span className={cn("st-text-sm", "st-text-gray-700", "dark:st-text-gray-300")}>
                          {item.section} ({item.method})
                        </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-text-right", "st-font-mono", "st-text-sm", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {formatAmount(item.amount)}
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-text-right", "st-font-mono", "st-text-sm", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {item.direction === 'in' ? (
                            <span className={cn("st-text-green-500")}>Incoming</span>
                        ) : (
                            <span className={cn("st-text-red-500")}>Outgoing</span>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export const StakingRewardsTable: React.FC<{stakingRewards: BalanceTransferItem[]}> = ({stakingRewards}) => {
    return (
        <table className={cn("st-min-w-full", "st-bg-white", "dark:st-bg-gray-800", "st-rounded-lg", "st-overflow-hidden")}>
            <thead className={cn("st-bg-gray-50", "dark:st-bg-gray-700")}>
            <tr>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Block
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Hash
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Time
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Status
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-left", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Method
                </th>
                <th className={cn("st-px-6", "st-py-3", "st-text-right", "st-text-xs", "st-font-medium", "st-text-gray-500", "dark:st-text-gray-300", "st-uppercase", "st-tracking-wider")}>
                    Amount
                </th>
            </tr>
            </thead>
            <tbody className={cn("st-divide-y", "st-divide-gray-200", "dark:st-divide-gray-700")}>
            {stakingRewards.map((item, index) => (
                <tr key={index} className={cn("st-hover:bg-gray-50", "dark:st-hover:bg-gray-700")}>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-medium", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {item.blockNumber}
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-font-mono")}>
                        <a
                            href={`https://unique.subscan.io/extrinsic/${item.extrinsicHash}?tab=event`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("st-text-blue-600", "st-hover:text-blue-800", "st-hover:underline")}
                        >
                            {formatHash(item.extrinsicHash)}
                        </a>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-whitespace-nowrap", "st-text-sm", "st-text-gray-600", "dark:st-text-gray-400")}>
                        {formatDate(item.blockTimestamp)}
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                        <span className={cn("st-inline-flex", "st-items-center", "st-rounded-full", "st-bg-green-50", "st-px-2", "st-py-1", "st-text-xs", "st-font-medium", "st-text-green-700", "dark:st-bg-green-800", "dark:st-text-green-100")}>
                          Success
                        </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4")}>
                        <span className={cn("st-text-sm", "st-text-gray-700", "dark:st-text-gray-300")}>
                          {item.section} ({item.method})
                        </span>
                    </td>
                    <td className={cn("st-px-6", "st-py-4", "st-text-right", "st-font-mono", "st-text-sm", "st-text-gray-900", "dark:st-text-gray-100")}>
                        {formatAmount(item.amount)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
