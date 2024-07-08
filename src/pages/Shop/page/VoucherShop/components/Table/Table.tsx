import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'
import Button from 'src/components/Button'
import { columnDef } from './CoreTable/column'
import { Voucher, VoucherResponse } from 'src/types/voucher.type'

const pageSize: number[] = [10, 15, 20, 25, 30]

export default function Table({ data }: { data: VoucherResponse[] }) {
  const finalColumnDef = useMemo(() => columnDef, [])
  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className='table-cus mt-5'>
      <table className='border-collapse w-full bg-white text-sm shadow-sm rounded'>
        <thead className='bg-slate-200'>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='border border-slate-300 p-3 font-normal text-left text-gray-600'
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id} className='hover:bg-gray-50'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='border border-slate-300 p-2 text-slate-700 '>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center gap-2 mt-4'>
        <Button
          className='py-1 px-3 bg-blue text-white text-sm rounded-sm'
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          className='py-1 px-3 bg-blue text-white text-sm rounded-sm'
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          Previous Page
        </Button>
        <input
          type='text'
          className='max-w-10 min-w-5 rounded-sm border border-gray-400 outline-none text-center'
          defaultValue={tableInstance.getState().pagination.pageIndex}
          onChange={(e) => tableInstance.setPageIndex(Number(e.target.value) - 1)}
        />
        <Button
          className='py-1 px-3 bg-blue text-white text-sm rounded-sm'
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          Next Page
        </Button>
        <Button
          className='py-1 px-3 bg-blue text-white text-sm rounded-sm'
          onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
          disabled={!tableInstance.getCanNextPage()}
        >
          {'>>'}
        </Button>
      </div>
      {/* <div className='mt-5 flex justify-start items-center'>
        <span>
          You are on page:{' '}
          {!isFinite(tableInstance.getState().pagination.pageIndex + 1)
            ? ''
            : tableInstance.getState().pagination.pageIndex + 1}
        </span>
        <span className='mx-7'>Total Page: {tableInstance.getPageCount()}</span>

        <div className='inline-flex items-center'>
          <label htmlFor='selectEl' className='mr-2'>
            Curent Page Size
          </label>
          <select
            id='selectEl'
            className='border border-gray-400 rounded-sm outline-none text-sm px-4 py-1'
            value={tableInstance.getState().pagination.pageSize}
            onChange={(e) => tableInstance.setPageSize(Number(e.target.value))}
          >
            {pageSize.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div> */}
    </div>
  )
}
