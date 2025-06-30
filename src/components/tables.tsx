import {cn} from '@/lib/utils.ts';
import React from 'react';
import {
    type BalanceTransferItem, formatDate, formatHash, mapTransferHistoryToCsv, mapStakingHistoryItemsToCsv, type StakingHistoryItem,
} from '@/utils/staking-api.ts';
import {Pagination, usePagination} from '@/components/pagination.tsx';
import {DownloadCsv} from '@/components/download-csv.tsx';
import {BalanceSpan} from '@/components/balance-info.tsx';

const TableHeader: React.FC<{ children: React.ReactNode, align?: string }> = ({children, align = 'left'}) => {
    const _alignClass = align === 'right' ? 'st-text-right' : 'st-text-left';

    return (
        <th className={cn('st-px-6', 'st-py-3', _alignClass, 'st-text-xs', 'st-font-medium', 'st-text-gray-500', 'dark:st-text-gray-300', 'st-uppercase', 'st-tracking-wider')}>
            {children}
        </th>)
}

const SuccessBadge: React.FC = () => (<td className={cn('st-px-6', 'st-py-4')}>
    <span
        className={cn('st-inline-flex', 'st-items-center', 'st-rounded-full', 'st-bg-green-50', 'st-px-2', 'st-py-1', 'st-text-xs', 'st-font-medium', 'st-text-green-700', 'dark:st-bg-green-800', 'dark:st-text-green-100')}>
      Success
    </span>
</td>)

const AmountCell: React.FC<{ amount: string | bigint }> = ({amount}) => (
    <td className={cn('st-px-6', 'st-py-4', 'st-text-right', 'st-font-mono', 'st-text-sm', 'st-text-gray-900', 'dark:st-text-gray-100')}>
        <BalanceSpan value={{raw: amount.toString(), decimals: 18}} />
    </td>
)

const SectionMethodCell: React.FC<{item: { section: string, method: string }}> = ({item :{section, method}}) => (
    <td className={cn('st-px-6', 'st-py-4')}>
        <span className={cn('st-text-sm', 'st-text-gray-700', 'dark:st-text-gray-300')}>
          {section} ({method})
        </span>
    </td>
)

const TimestampCell: React.FC<{ timestamp: string | Date }> = ({timestamp}) => (
    <td className={cn('st-px-6', 'st-py-4', 'st-whitespace-nowrap', 'st-text-sm', 'st-text-gray-600', 'dark:st-text-gray-400')}>
        {formatDate(timestamp)}
    </td>
)

const BlockNumberCell: React.FC<{ blockNumber: number }> = ({blockNumber}) => (
    <td className={cn('st-px-6', 'st-py-4', 'st-whitespace-nowrap', 'st-text-sm', 'st-font-medium', 'st-text-gray-900', 'dark:st-text-gray-100')}>
        {blockNumber}
    </td>
)

type Chain = 'unique' | 'quartz';

type LinkCellProps = {
    extrinsicHash: string,
    blockNumber: number
    chain: Chain
}

const LinkCell: React.FC<LinkCellProps> = ({extrinsicHash, blockNumber, chain}) => {
    const url = chain === 'unique'
        ? `https://unique.subscan.io/extrinsic/${extrinsicHash}?tab=event`
        : `https://polkadot.js.org/apps/?rpc=wss://ws-quartz.unique.network#/explorer/query/${blockNumber}`;

    return (<td className={cn('st-px-6', 'st-py-4', 'st-whitespace-nowrap', 'st-text-sm', 'st-font-mono')}>
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('st-text-blue-600', 'st-hover:text-blue-800', 'st-hover:underline')}
        >
            {formatHash(extrinsicHash)}
        </a>
    </td>)
}

const DirectionCell: React.FC<{ direction: 'in' | 'out' }> = ({direction}) => (
    <td className={cn('st-px-6', 'st-py-4', 'st-text-right', 'st-font-mono', 'st-text-sm', 'st-text-gray-900', 'dark:st-text-gray-100')}>
        {direction === 'in' ? (<span className={cn('st-text-green-500')}>Incoming</span>) : (
            <span className={cn('st-text-red-500')}>Outgoing</span>)}
    </td>
)

export const StakingTable: React.FC<{ stake: StakingHistoryItem[], chain: Chain }> = ({stake, chain}) => {
    const {
        page, setPage, pageSize, setPageSize, totalPages, currentPageData,
    } = usePagination(stake, 10);

    return (<>
        <table
            className={cn('st-min-w-full', 'st-bg-white', 'dark:st-bg-gray-800', 'st-rounded-lg', 'st-overflow-hidden')}>
            <thead className={cn('st-bg-gray-50', 'dark:st-bg-gray-700')}>
            <tr>
                <TableHeader>Block</TableHeader>
                <TableHeader>Hash</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Method</TableHeader>
                <TableHeader align="right">Amount</TableHeader>
            </tr>
            </thead>
            <tbody className={cn('st-divide-y', 'st-divide-gray-200', 'dark:st-divide-gray-700')}>
            {currentPageData.map((item, index) => (
                <tr key={index} className={cn('st-hover:bg-gray-50', 'dark:st-hover:bg-gray-700')}>
                    <BlockNumberCell blockNumber={item.blockNumber} />
                    <LinkCell extrinsicHash={item.hash} blockNumber={item.blockNumber} chain={chain} />
                    <TimestampCell timestamp={item.blockTimestamp} />
                    <SuccessBadge />
                    <SectionMethodCell item={item} />
                    <AmountCell amount={item.amount} />
                </tr>))}
            </tbody>
        </table>
        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
        />
        <DownloadCsv
            data={stake}
            mapToRows={mapStakingHistoryItemsToCsv}
            filename="staking-history.csv"
        />
    </>)
}

export const UnstakingTable: React.FC<{ unStake: StakingHistoryItem[], chain: Chain }> = ({unStake, chain}) => {
    const {
        page, setPage, pageSize, setPageSize, totalPages, currentPageData,
    } = usePagination(unStake, 10);

    return (<>
        <table
            className={cn('st-min-w-full', 'st-bg-white', 'dark:st-bg-gray-800', 'st-rounded-lg', 'st-overflow-hidden')}>
            <thead className={cn('st-bg-gray-50', 'dark:st-bg-gray-700')}>
            <tr>
                <TableHeader>Block</TableHeader>
                <TableHeader>Hash</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Method</TableHeader>
                <TableHeader align="right">Amount</TableHeader>
            </tr>
            </thead>
            <tbody className={cn('st-divide-y', 'st-divide-gray-200', 'dark:st-divide-gray-700')}>
            {currentPageData.map((item, index) => (
                <tr key={index} className={cn('st-hover:bg-gray-50', 'dark:st-hover:bg-gray-700')}>
                    <BlockNumberCell blockNumber={item.blockNumber} />
                    <LinkCell extrinsicHash={item.hash} blockNumber={item.blockNumber} chain={chain} />
                    <TimestampCell timestamp={item.blockTimestamp} />
                    <SuccessBadge />
                    <SectionMethodCell item={item} />
                    <AmountCell amount={item.amount} />
                </tr>))}
            </tbody>
        </table>

        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
        />
        <DownloadCsv
            data={unStake}
            mapToRows={mapStakingHistoryItemsToCsv}
            filename="unstaking-history.csv"
        />
    </>)
}

export const TransfersTable: React.FC<{ transfers: BalanceTransferItem[], chain: Chain }> = ({transfers, chain}) => {
    const {
        page, setPage, pageSize, setPageSize, totalPages, currentPageData,
    } = usePagination(transfers, 10);

    return (<>
        <table
            className={cn('st-min-w-full', 'st-bg-white', 'dark:st-bg-gray-800', 'st-rounded-lg', 'st-overflow-hidden')}>
            <thead className={cn('st-bg-gray-50', 'dark:st-bg-gray-700')}>
            <tr>
                <TableHeader>Block</TableHeader>
                <TableHeader>Hash</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Method</TableHeader>
                <TableHeader>Direction</TableHeader>
                <TableHeader align="right">Amount</TableHeader>
            </tr>
            </thead>
            <tbody className={cn('st-divide-y', 'st-divide-gray-200', 'dark:st-divide-gray-700')}>
            {currentPageData.map((item, index) => (
                <tr key={index} className={cn('st-hover:bg-gray-50', 'dark:st-hover:bg-gray-700')}>
                    <BlockNumberCell blockNumber={item.blockNumber} />
                    <LinkCell extrinsicHash={item.extrinsicHash} blockNumber={item.blockNumber} chain={chain} />
                    <TimestampCell timestamp={item.blockTimestamp} />
                    <SuccessBadge />
                    <SectionMethodCell item={item} />
                    <DirectionCell direction={item.direction} />
                    <AmountCell amount={item.amount} />
                </tr>))}
            </tbody>
        </table>
        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
        />
        <DownloadCsv
            data={transfers}
            mapToRows={mapTransferHistoryToCsv}
            filename="transfer-history.csv"
        />
    </>)
}

export const StakingRewardsTable: React.FC<{ stakingRewards: BalanceTransferItem[], chain: Chain }> = ({stakingRewards, chain}) => {
    const {
        page, setPage, pageSize, setPageSize, totalPages, currentPageData,
    } = usePagination(stakingRewards, 10);

    return (<>
        <table
            className={cn('st-min-w-full', 'st-bg-white', 'dark:st-bg-gray-800', 'st-rounded-lg', 'st-overflow-hidden')}>
            <thead className={cn('st-bg-gray-50', 'dark:st-bg-gray-700')}>
            <tr>
                <TableHeader>Block</TableHeader>
                <TableHeader>Hash</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Method</TableHeader>
                <TableHeader align="right">Amount</TableHeader>
            </tr>
            </thead>
            <tbody className={cn('st-divide-y', 'st-divide-gray-200', 'dark:st-divide-gray-700')}>
            {currentPageData.map((item, index) => (
                <tr key={index} className={cn('st-hover:bg-gray-50', 'dark:st-hover:bg-gray-700')}>
                    <BlockNumberCell blockNumber={item.blockNumber} />
                    <LinkCell extrinsicHash={item.extrinsicHash} blockNumber={item.blockNumber} chain={chain} />
                    <TimestampCell timestamp={item.blockTimestamp} />
                    <SuccessBadge />
                    <SectionMethodCell item={item} />
                    <AmountCell amount={item.amount} />
                </tr>))}
            </tbody>
        </table>
        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
        />
        <DownloadCsv
            data={stakingRewards}
            mapToRows={mapTransferHistoryToCsv}
            filename="staking-rewards-history.csv"
        />
    </>)
}
