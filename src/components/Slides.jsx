import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Slides.module.css'
import { useState, useEffect } from 'react'

register()

export default function Slides(){

    const [size, setSize] = useState()

    useEffect(() => {
        function handleResize(){
            if (window.innerWidth <= 840) setSize('p')
            else setSize('g')
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const data = [
        {
            id: '0',
            img: 'https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Palestras'
        },
        {
            id: '1',
            img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Shows'
        },
        {
            id: '2',
            img: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Apresentações artísticas'
        },
        {
            id: '3',
            img: 'https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Eventos educacionais'
        }
    ]

    return (
        <div className={styles.slidesContainerDiv}>
            <Swiper
             slidesPerView={1}
             pagination={{ clickable: true }}
             navigation
             autoplay
             a
             style={size == 'p' ? {width: '400px', height: '300px'} : {width: '700px', height: '500px'}}
            >
                {data.map((item) => (
                    <SwiperSlide className={styles.swiperSlide}>
                        <h2 className={styles.slideTitle}>{item.title}</h2>
                        <img style={size == 'p' ? {width: '400px', height: '300px'} : {width: '700px', height: '500px'}} src={item.img} alt={item.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}