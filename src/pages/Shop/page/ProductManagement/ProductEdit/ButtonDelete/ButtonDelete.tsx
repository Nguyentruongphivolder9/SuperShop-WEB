import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function ButtonDelete() {
  const [opened, { close, open }] = useDisclosure(false)
  return (
    <div className='h-auto w-auto'>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <div className='w-[400px] relative bg-white h-auto'>
          <div className='flex flex-col'>
            <div className='pb-6 px-6 text-[#333333] flex justify-start items-center'>
              <span className='text-xl'>Are you sure to Save and Delist ?</span>
            </div>
            <div className='px-6 text-[#333333] text-sm flex flex-col'>
              Improve the quality of this listing for better performance. Optimise now before publishing!
            </div>
            <div className='pt-6 px-6 flex flex-row justify-end gap-2'>
              <button
                type='button'
                // onClick={() => setIsSaveAndDelist(false)}
                className={`text-sm border border-solid border-gray-300 rounded-md px-4 py-2 text-[#333333]`}
              >
                Optimize Now
              </button>
              <button
                type='button'
                // onClick={onSubmitDelist}
                className={`text-sm border border-solid border-gray-300 rounded-md px-4 py-2 bg-blue text-white`}
              >
                Save and Delist
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Button
        onClick={open}
        className='hover:bg-gray-100 hover:text-[#999999] text-[#999999] font-medium bg-white text-sm h-8 w-36 flex items-center justify-center  rounded-md border border-solid border-[#999999]'
      >
        Delete
      </Button>
    </div>
  )
}
