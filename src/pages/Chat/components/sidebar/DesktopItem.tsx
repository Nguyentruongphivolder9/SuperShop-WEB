import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface DesktopItemProps {
  href: string
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const DesktopItem: React.FC<DesktopItemProps> = ({ href, label, icon: Icon, active, onClick }: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <li onClick={handleClick}>
      <Link
        to={href}
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-black
          hover:bg-gray-100
        `,
          active && 'bg-gray-100 text-black'
        )}
      >
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
