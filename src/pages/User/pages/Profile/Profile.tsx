import ModalChanger from 'src/components/AvatarChanger/ModelChanger'
import { useContext, useState } from 'react';
import { AppContext } from 'src/contexts/app.context';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'src/components/Input';
import { userSchema, UserSchema } from 'src/utils/rules';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

type FormUserInfoUpdate = Pick<UserSchema, "user_name" | "full_name" | "birth_day" | "email" | "gender" | "phone" | "avatar">;
const updateUserSchema = userSchema.pick(["user_name", "full_name", "birth_day", "email", "gender", "phone", "avatar"]);

export default function Profile() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);
  const [closeModal, setCloseModal] = useState<boolean>(true);
  //Che thông tin Email
  const handleCutUpEmail = (email?: string): string => {
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

  //Che thông tin phonenumber
  const handleCutUpPhoneNumber = (phoneNum?: string): string => {
    if (typeof phoneNum === "string") {
      if (phoneNum.length <= 4) {
        return phoneNum;
      }
      const last4Digits = phoneNum.slice(-4);
      const maskedDigits = '*'.repeat(phoneNum.length - 4);
      return maskedDigits + last4Digits;
    } else {
      return "";
    }
  }

  //Lấy tuổi của user
  // const getUserYearsOld = (dateTime: Date): number => {

  // }

  const [userUpdate, setUserUpdate] = useState<FormUserInfoUpdate>({
    user_name: profile?.userName ? profile.userName : "",
    full_name: profile?.fullName ? profile.fullName : "",
    gender: profile?.gender === "male" ? "Nam" : "Nữ",
    phone: profile?.phoneNumber ? handleCutUpPhoneNumber(profile.phoneNumber) : "",
    email: profile?.email ? handleCutUpEmail(profile.email) : "",
    birth_day: new Date(profile?.birthDay ? profile.birthDay : ""),
  })
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormUserInfoUpdate>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: userUpdate
  });


  const updateuserInfo = useMutation({

  })

  return (
    <div className="rounded-lg shadow-md bg-white px-6 py-8 md:px-8 md:py-10">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Hồ Sơ Của Tôi</h1>
        <p className="mt-1 text-sm text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="flex-1 space-y-4">
          <form className='space-y-4'>
            <div>
              <b>Tên đầy đủ</b>
              <p className='text-sm font-extralight text-red-400'>{
                profile?.fullNameChanges === 1 ? (
                  "Số lần thay đổi còn 1"
                ) : (profile?.fullNameChanges === 2 ? ("Số lần thay đổi tối đa là 2") : (
                  "Hết lượt thây đổi"
                ))
              }</p>
              <Input
                rightClearButton
                placeholder="Họ tên đầy đủ của bạn"
                name="full_name"
                register={register}
                rules={{ required: 'Họ tên đầy đủ là bắt buộc' }}
                errorMessage={errors.full_name?.message}
                onChange={(event) => {
                  setUserUpdate((prev) => ({
                    ...prev,
                    full_name: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <b>Tên tài khoản:</b>
              <Input
                rightClearButton
                placeholder="Tên tài khoản của bạn"
                type="text"
                name="user_name"
                register={register}
                rules={{ required: 'Tên tài khoản là bắt buộc' }}
                errorMessage={errors.user_name?.message}
                onChange={(event) => {
                  setUserUpdate((prev) => ({
                    ...prev,
                    user_name: event.target.value,
                  }));
                }}
              />

            </div>
            <div>
              <b>Địa chỉ Email</b>
              <Input
                rightClearButton
                placeholder="Email của bạn"
                name="email"
                register={register}
                rules={{ required: 'Email là bắt buộc' }}
                errorMessage={errors.email?.message}
                onChange={(event) => {
                  setUserUpdate((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />

            </div>
            <div>
              <b>Số điện thoại</b>
              <Input
                rightClearButton
                placeholder="Số điện thoại của bạn"
                type="text"
                name="phone"
                register={register}
                rules={{ required: 'Số điện thoại là bắt buộc' }}
                errorMessage={errors.phone?.message}
                onChange={(event) => {
                  setUserUpdate((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <b>Giới tính</b>
              <Input
                rightClearButton
                placeholder="Chọn giới tính"
                type="select"
                name="gender"
                register={register}
                rules={{ required: 'Giới tính là bắt buộc' }}
                errorMessage={errors.gender?.message}
              />
            </div>
            <div>
              <b>Ngày sinh</b>
              <Input
                type='datetime-local'
                register={register}
                rules={{ required: 'Ngày sinh là bắt buộc' }}
                errorMessage={errors.birth_day?.message}
              />
            </div>
          </form>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <div className="bg-slate-100 h-full rounded-lg p-10 relative border-2 border-black w-full">
            <div className='relative w-48 m-8'>
              <img
                src={`${profile?.avatarUrl}`}
                className="w-48 h-48 p-2 rounded-full ring-2 ring-gray-200 dark:ring-gray-500 object-cover"
                alt="Profile Avatar"
              />
              <button
                className="border-2 border-black rounded-full bg-blue-500 text-white bg-black transition-colors duration-200 absolute top-3 right-3"
                onClick={() => setCloseModal(!closeModal)}
              >
                <div className='m-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 4.828l3.536 3.536m-2.036-5.036a2.25 2.25 0 113.182 3.182L7.5 18.75H4v-3.75l11.232-11.232z" />
                  </svg>
                </div>
              </button>

              <div className="pt-3 -mr-6 -ml-6 text-center">
                <hr className="border-gray-300 mb-6" />
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between items-center">
                    <b className="whitespace-nowrap text-lg">Họ tên:</b>
                    <span className="whitespace-nowrap text-lg">{userUpdate?.full_name || "_______"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <b className="whitespace-nowrap text-lg">Tên tk:</b>
                    <span className="whitespace-nowrap text-lg">{userUpdate?.user_name || "______"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <b className="whitespace-nowrap text-lg">Ngày sinh:</b>
                    <span className="whitespace-nowrap text-lg">{userUpdate?.birth_day ? new Date(userUpdate.birth_day).toLocaleDateString() + ` (${2024 - new Date(userUpdate.birth_day).getFullYear()})` : "_______"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <b className="whitespace-nowrap text-lg">Giới tính:</b>
                    <span className="whitespace-nowrap text-lg">{userUpdate?.gender === "Nam" ? "Nam" : userUpdate?.gender === "Nữ" ? "Nữ" : "_______"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="border-2 border-black py-2 px-6 rounded-full text-slate-800 transition-colors duration-200 absolute bg-slate-300 bottom-5 left-1/2 transform -translate-x-1/2"
              type='submit'
            >
              Cập nhật
            </button>
          </div>

        </div>
      </div>
      <ModalChanger closeModal={closeModal} handleCloseModal={setCloseModal} />
    </div>
  );
}
