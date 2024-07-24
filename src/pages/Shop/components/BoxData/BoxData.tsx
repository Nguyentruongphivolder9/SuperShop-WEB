interface Props {
  title: string
  number: number
}

export default function BoxData({ title, number }: Props) {
  return (
    <div>
      <div className=' border-t-4 w-60 h-32 border-blue bg-white rounded-lg '>
        <h2 className='text-left text-l font-bold tracking-tight text-slate-500 sm:py-4 p-4 '>{title}</h2>
        <h1 className='text-right font-bold text-3xl p-4 '> {number}</h1>
      </div>
    </div>
  )
}
