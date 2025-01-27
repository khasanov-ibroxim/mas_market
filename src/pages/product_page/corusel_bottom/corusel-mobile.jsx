import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

function CoruselMobile({ images = [] }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div style={{ width: '100%' }} className='bg-success'>
            <Swiper
                style={{
                    width: "100%",
                    height: '100%',
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {images.map((image) => (
                    <SwiperSlide key={image.id} style={{ width: '100%' }}>
                        <img
                            height={200}
                            width="100%"
                            src={image.file}
                            alt={`Slide ${image.id}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <img
                            height={100}
                            src={image.file}
                            alt={`Thumbnail ${image.id}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CoruselMobile;
