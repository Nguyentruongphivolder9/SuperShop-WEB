import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useRef, useState } from 'react'
import Product from '../Product/Product'

export default function ProductsSlider() {
  const sliderRef = useRef<Slider>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    speed: 1000,
    pauseOnHover: true,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex)
  }

  const sliderItems = Array.from({ length: 18 }).map((_, i) => (
    <div key={i} className='h-[345px] pb-2 w-full overflow-hidden px-1'>
      <Product />
    </div>
  ))

  return (
    <div className='relative group'>
      <div className='pb-4 rounded-md overflow-hidden bg-transparent'>
        <Slider ref={sliderRef} {...settings}>
          {sliderItems}
        </Slider>
      </div>
      {currentSlide > 0 && (
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
      )}
      {currentSlide < 18 - settings.slidesToShow && (
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
      )}
    </div>
  )
}
