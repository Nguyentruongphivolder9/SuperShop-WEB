import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authApi from 'src/apis/auth.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { AppContext } from 'src/contexts/app.context';
import { ErrorResponse } from 'src/types/utils.type';
import { schema, Schema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { parseJwt} from 'src/utils/auth';
import facebookSvg from '../../assets/logoSvg/faceBookSvg.svg';
import googleSvg from '../../assets/logoSvg/googleSvg.svg';
import { toast } from 'react-toastify';
import { User } from 'src/types/user.type';

type FormData = Pick<Schema, 'email' | 'password'> & { setUpdate?: string };
const loginSchema = schema.pick(['email', 'password']);

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [socialLoginDefault, setSocialLoginDefault] = useState<FormData>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const appceptGoogleLoginWithoutPasswpord = useMutation({
    mutationFn:(body: {email:string}) => authApi.googleLoginWithoutPassword(body),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setProfile(parseJwt(data.data.body.accessToken));
      const userLogin: User = parseJwt(data.data.body.accessToken);
      toast.success(`Logged in successfully. Welcome ${userLogin.userName}`);
      navigate('/');
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            });
          });
        }
      }
    }
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
    onSuccess: (data) => {
      setProfile(parseJwt(data.data.body.accessToken));
      const userLogin: User = parseJwt(data.data.body.accessToken);
      setIsAuthenticated(true);
      toast.success(`Logged in successfully. Welcome ${userLogin.userName}`);
      localStorage.setItem("secretKey", data.data.body.secretKey);
      navigate('/');
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            });
          });
        }
      }
    }
  });

  const googleRequestAuthorizationUrlMutation = useMutation({
    mutationFn: () => authApi.requestGoogleAuthorizationUrl(),
    onSuccess: (data) => {
      const authorizationUrl = data.data.body.Url;
      window.location.href = authorizationUrl;
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleGoogleRequestAuthorization = async () => {
    try {
      await googleRequestAuthorizationUrlMutation.mutateAsync();
    } catch (error) {
      console.error('Error requesting Google authorization URL:', error);
    }
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');
    const hasPassword:boolean = urlParams.get('hasPassword') === "true" ? true : false;
    if (token && refreshToken) {
      const userProfile = parseJwt(token);
      if (userProfile && !hasPassword) {
        setSocialLoginDefault({
          password: "",
          email: userProfile.email
        })
      }else if(userProfile && hasPassword){
        appceptGoogleLoginWithoutPasswpord.mutate({email: userProfile.email});
      } else {
        toast.error('Failed to parse JWT token.');
      }
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (socialLoginDefault?.email !== null) data.email = socialLoginDefault?.email ? socialLoginDefault.email : data.email;
    const formData: FormData = {
      ...data,
      setUpdate: socialLoginDefault?.email == null ? "No" : "Yes"
    };
    loginMutation.mutate(formData);
  });


  return (
    <div className='bg-blue'>
      <div className='container'>
        <div className='grid grid-cols lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                value={socialLoginDefault?.email}
                disabled={socialLoginDefault?.email === null}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Nhập Email của bạn'
              />
              <div className="relative flex items-center mt-8 group">
                <div className="flex-1">
                  <Input
                    name="password"
                    register={register}
                    type="password"
                    className="w-full"
                    errorMessage={errors.password?.message}
                    placeholder="Nhập mật khẩu của bạn"
                    autoComplete="on"
                  />
                </div>
                {socialLoginDefault?.email ? (
                  <div className="absolute left-0 top-full mt-2 bg-black text-white bg-opacity-60 p-3 rounded-lg transform opacity-0 group-hover:opacity-100 transition duration-300 ease-in z-50">
                    <div className="relative">
                      <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"></div>
                      <b>Chỉ cần 1 bước nữa thôi 🥳</b>
                      <div>
                        Hãy điền (✍️) 1 mật khẩu mạnh cho tài khoản của bạn và ấn nút Đăng nhập.<br />
                        Hệ thống sẽ chuyển hướng bạn về trang trước đó.
                      </div>
                    </div>
                  </div>
                ) : (<></>)}
              </div>
              <div className='flex items-center justify-between mt-6 mb-6'>
                <hr className='w-4/12 border-gray-300' />
                <span className='text-gray-500 text-md'>Hoặc</span>
                <hr className='w-4/12 border-gray-300' />
              </div>
              <div className='flex space-x-2 mt-2'>
                <a className='flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100 '>
                  <img src={facebookSvg} alt='Facebook' className='w-7 h-7' />
                  <span className='ml-1 text-gray-700 text-md'>Facebook</span>
                </a>
                <a
                  className='flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer'
                  onClick={handleGoogleRequestAuthorization}
                >
                  <img src={googleSvg} alt='Google' className='w-7 h-7' />
                  <span className='ml-1 text-gray-700 text-md'>Google</span>
                </a>
              </div>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex items-center justify-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPaused}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link to={'/register'} className='text-red-400 ml-1'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
