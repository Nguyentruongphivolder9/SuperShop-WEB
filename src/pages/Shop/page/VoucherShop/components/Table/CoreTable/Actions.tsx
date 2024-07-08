import { Cell, Row } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { VoucherResponse } from 'src/types/voucher.type'

export default function Actions({ cell, row }: { cell: Cell<VoucherResponse, unknown>; row: Row<VoucherResponse> }) {
  return (
    <div className='flex flex-col text-blue'>
      {(row.original.status == 'ongoing' || row.original.status == 'upcoming') && <Link to={''}>Edit</Link>}
      <Link to={''}>Orders</Link>
      <Link to={''}>Details</Link>
      {row.original.status == 'ongoing' && <Link to={''}>End</Link>}
      {row.original.status == 'upcoming' && <Link to={''}>Delete</Link>}
    </div>
  )
}
