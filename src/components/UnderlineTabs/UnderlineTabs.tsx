import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
interface Props {
  tabs: string[]
  selectedTab: string
  setSelectedTab: Dispatch<SetStateAction<string>>
}
export default function UnderlineTabs({ tabs, selectedTab, setSelectedTab }: Props) {
  return tabs.map((tab) => {
    return (
      <button
        className={classNames('relative flex items-center justify-center h-14 px-4 text-sm text-center capitalize', {
          ' text-blue': selectedTab === tab,
          ' text-gray-900': selectedTab !== tab
        })}
        key={tab}
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
        {tab === selectedTab ? (
          <motion.div
            className='absolute inset-x-0 bottom-[-1px] h-[2px] bg-blue'
            layoutId='underline'
            transition={{ duration: 0.3, ease: 'linear' }}
          ></motion.div>
        ) : null}
      </button>
    )
  })
}
