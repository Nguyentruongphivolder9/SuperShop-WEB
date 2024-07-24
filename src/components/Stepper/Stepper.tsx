import { useState } from 'react'
import { StepperProps, StepperIcons } from 'src/types/stepper.type'
import classNames from 'classnames'

const StepperIcon = ({ is_active, is_complete, step_number }: StepperIcons) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-center w-10 h-10 border-2 rounded-full transition-all duration-500',
        {
          'border-green-600 scale-110 bg-green-100': is_active,
          'border-gray-600': !is_active && !is_complete,
          'dark:border-green-400': is_active,
          'dark:border-gray-400': !is_active && !is_complete,
          'border-green-500 bg-green-200': is_complete
        }
      )}
    >
      {is_complete ? (
        <span className='flex items-center justify-center w-full h-full bg-blue-100 rounded-full dark:bg-blue-800'>
          <svg
            className='w-4 h-4 text-green-400 dark:text-blue-300'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 16 12'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5.917 5.724 10.5 15 1.5'
            />
          </svg>
        </span>
      ) : (
        <span className={is_active ? 'text-green-500' : ''}>{step_number}</span>
      )}
    </div>
  )
}

const Stepper = ({
  steps,
  current_step,
  messages,
  is_complete,
  children,
  goToNextStep,
  goToPrevStep
}: StepperProps) => {
  const [complete, setComplete] = useState(is_complete)

  const handleStepChange = (direction: string) => {
    if (direction === 'next') {
      if (current_step < steps) {
        goToNextStep()
      } else {
        setComplete(true)
      }
    } else {
      if (current_step > 1) {
        goToPrevStep()
      }
    }
  }

  return (
    <>
      <div className='relative'>
        <ol className='flex justify-between items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse container bg-white rounded-md p-4'>
          {messages.map((message, i) => {
            const stepNumber = i + 1
            const isActive = current_step === stepNumber
            const isCompleted = current_step > stepNumber
            return (
              <div
                key={i}
                className={classNames(
                  'relative z-0 flex items-center space-x-2.5 rtl:space-x-reverse transition-all duration-500',
                  {
                    'text-green-600 font-semibold': isActive,
                    'text-gray-500 dark:text-gray-400': !isActive
                  }
                )}
              >
                <StepperIcon is_active={isActive} is_complete={isCompleted} step_number={stepNumber} />
                <span className='flex items-center'>
                  <h3 className={classNames('font-semibold leading-tight', { 'text-green-600': isCompleted })}>
                    {message}
                  </h3>
                </span>
                {i < messages.length - 1 && (
                  <div
                    className={`absolute h-1.5 w-full transition-all duration-500 rounded-lg ${isCompleted ? 'bg-green-400' : 'bg-gray-300'} top-1/2 left-full -translate-y-1/2`}
                  ></div>
                )}
              </div>
            )
          })}
        </ol>
      </div>
      {!complete && (
        <div className='flex justify-between mt-4'>
          <button
            className='px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-600 transition duration-300'
            onClick={() => handleStepChange('next')}
          >
            {current_step === steps ? 'Finish' : 'Next'}
          </button>
          <button
            className='px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-600 transition duration-300'
            onClick={() => handleStepChange('prev')}
          >
            {current_step === 1 ? 'Cancel' : 'Previous'}
          </button>
        </div>
      )}
      <div className='mt-6 flex justify-center items-center'>{children}</div>
    </>
  )
}

export default Stepper
