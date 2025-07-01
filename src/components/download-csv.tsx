import React from 'react'

type DownloadCsvProps<T> = {
    data: T[]
    mapToRows: (data: T[]) => string[][]
    filename?: string
    children?: React.ReactNode
}

export function DownloadCsv<T>({
   data,
   mapToRows,
   filename = 'data.csv',
   children = 'Download CSV',
}: DownloadCsvProps<T>) {
    const handleDownload = () => {
        const rows = mapToRows(data)
        const csvContent = rows
            .map((row) =>
                row
                    .map((cell) => `"${String(cell).replace(/"/g, '""')}"`) // escape quotes
                    .join(',')
            )
            .join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <button
            onClick={handleDownload}
            className="text-sm text-blue-600 hover:underline"
        >
            {children}
        </button>
    )
}
