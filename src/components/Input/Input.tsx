import { InputHTMLAttributes, useState, useEffect } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  classNameEye?: string;
  classNameInputError?: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInputError = '',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-blue-500 focus:shadow-md transition duration-300',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm transition-opacity duration-300 ease-in-out',
  classNameEye = 'absolute size-5 top-[8px] right-[5px] cursor-pointer',
  ...rest
}: Props) {
  const [openEye, setOpenEye] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dateError, setDateError] = useState('');

  const registerResult = register && name ? register(name, rules) : null;

  const toggleEye = () => {
    setOpenEye((prev) => !prev);
  };

  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password';
    }
    return rest.type;
  };
  //Tạo 1 mảng chứa các năm trẻ nhất là 2024 già nhất là 1900
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
      years.push(i);
    }
    return years;
  };
  //Tạo 1 mảng chứa các tháng 1 -> 12
  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };
  //Tạo 1 mảnh chứa các nagsy 1 -> 31
  const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  useEffect(() => {
    if (day && month && year) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (date.getFullYear() !== parseInt(year) || date.getMonth() !== parseInt(month) - 1 || date.getDate() !== parseInt(day)) {
        setDateError('Ngày không hợp lệ');//Bắt lỗi ngày không hợp lệ, chưa bắt năm nhuận
      } else {
        setDateError('');
      }
    }
  }, [day, month, year]);

  return (
    <div className={'relative ' + className}>
      {rest.type !== 'datetime-local' && (
        <input
          className={`${classNameInput} ${errorMessage ? classNameInputError : ''}`}
          {...registerResult}
          {...rest}
          type={handleType()}
        />
      )}
      {rest.type === 'datetime-local' && (
        <div className="flex space-x-2">
          <select
            className={`${classNameInput} ${day ? '' : 'text-gray-400'}`}
            value={day}
            onChange={(e) => setDay(e.target.value)}
            name={`${name}-day`}
          >
            <option value="">Ngày</option>
            {generateDays().map((d) => (
              <option key={d} value={d}>
                Ngày {d}
              </option>
            ))}
          </select>
          <select
            className={`${classNameInput} ${month ? '' : 'text-gray-400'}`}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            name={`${name}-month`}
          >
            <option value="">Tháng</option>
            {generateMonths().map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>
          <select
            className={`${classNameInput} ${year ? '' : 'text-gray-400'}`}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            name={`${name}-year`}
          >
            <option value="">Năm</option>
            {generateYears().map((y) => (
              <option key={y} value={y}>
                Năm {y}
              </option>
            ))}
          </select>
        </div>
      )}
      {dateError && <div className={classNameError}>{dateError}</div>}
      {rest.type === 'password' && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={classNameEye}
          onClick={toggleEye}
        >
          {openEye ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
            />
          )}
        </svg>
      )}
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  );
}
