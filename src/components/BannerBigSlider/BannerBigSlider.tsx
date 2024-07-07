import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useRef } from 'react'

export default function BannerSlider() {
  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: 'button__bar',
    arrows: false
  }

  return (
    <div className='container relative group'>
      <div className='px-4 pt-4 pb-6 rounded-md overflow-hidden bg-white'>
        <Slider ref={sliderRef} {...settings}>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
          <div className='h-[380px] w-full overflow-hidden px-2'>
            <img
              className='w-full h-full rounded-md object-cover'
              src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/2a/ac/9b/a9956939d5f4b7a2acb41ddc3a66f885.jpg.webp'
              alt=''
            />
          </div>
        </Slider>
      </div>
      <div className='absolute top-[45%] left-0 ml-5 hidden group-hover:block'>
        <button
          className='p-2 bg-white rounded-full border'
          type='button'
          onClick={() => sliderRef?.current?.slickPrev()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.2}
            stroke='currentColor'
            className='size-5 text-blue'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </button>
      </div>
      <div className='absolute top-[45%] right-0 mr-5 hidden group-hover:block'>
        <button
          className='p-2 bg-white rounded-full border'
          type='button'
          onClick={() => sliderRef?.current?.slickNext()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.2}
            stroke='currentColor'
            className='size-5 text-blue'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </div>
  )
}
