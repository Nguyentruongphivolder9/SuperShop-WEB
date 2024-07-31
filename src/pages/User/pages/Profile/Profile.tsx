
import ModalChanger from 'src/components/AvatarChanger/ModelChanger'
import { Input, TextInput } from '@mantine/core';
import { useContext, useState } from 'react';
import { AppContext } from 'src/contexts/app.context';

export default function Profile() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);
  const [closeModal, setCloseModal] = useState<boolean>(true);

  const handleCutUpLongEmail = (email?: string): string => {
    if (typeof email === 'string') {
      let result: string = "";
      const skipElements = [2, 3, 4, 5, 6, 7, 8];
      const emailNamePart = email.slice(0, email.indexOf('@'));
      const emailDomainPart = email.slice(email.indexOf('@'));

      for (let i = 0; i < emailNamePart.length; i++) {
        if (skipElements.includes(i)) {
          result += "*";
        } else {
          result += emailNamePart[i];
        }
      }

      return result + emailDomainPart;
    } else {
      return "";
    }
  }

  //   if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
  //     toast.error('Dung lượng file tối đa 1 MB. Định dạng: jpg, jpeg, png')
  //   } else {
  //     setFile(fileFromLocal)
  //   }
  // }


  return (
    <div className='rounded-lg shadow-md bg-white px-2 md:px-7 pb-10 md:pb-20'>
      <div className='border-b text-center md:text-left border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>

          <TextInput
            withAsterisk
            label="Họ tên đầy đủ"
            placeholder="Họ tên đầy đủ của bạn"
            description="Chỉ được thay đổi 2 lần"
            value={profile?.fullName}
          />

          <TextInput
            withAsterisk
            label="Tên tài khoản"
            placeholder="Tên tài khoản của bạn"
            value={profile?.userName}
            type='text'
          />

          <TextInput
            withAsterisk
            label="Địa chỉ Email"
            placeholder="Email của bạn"
            value={`${handleCutUpLongEmail(profile?.email)}`}
          />
          <TextInput
            withAsterisk
            label="Số điện thoại"
            placeholder="Số điện thoại của bạn"
            value={`${profile?.phoneNumber}`}
            type='number'
          />
          <TextInput
            withAsterisk
            label="Họ tên đầy đủ"
            placeholder="Họ tên của bạn"
            description="Chỉ được thay đổi 2 lần"
          />
          <TextInput
            withAsterisk
            label="Họ tên đầy đủ"
            placeholder="Họ tên của bạn"
            description="Chỉ được thay đổi 2 lần"
          />

        </div>
        <button onClick={() => setCloseModal(!closeModal)}>Open modal</button>
        <ModalChanger closeModal={closeModal} handleCloseModal={setCloseModal} updateAvatar="anh tien"></ModalChanger>
      </div>
    </div>
  )
}