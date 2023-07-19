import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import {serverUrl} from '../../GlobalData/Global'


const XCarousel = (props) => {

    const carouselSlides = props.itemList?.map((uri) => {
        return (
            <Carousel.Item>
                <img
                    key={uri}
                    src={serverUrl + uri}
                    alt=''
                    style={{width: '100%', objectFit: 'contain'}}
                />
            </Carousel.Item>
        )
    })
    return (
        <Carousel
            interval={props.noAutoPlay ? null : 5000}
            touch
            keyboard
            className={props.className}
            prevIcon={<i className='far fa-arrow-alt-circle-left'/>}
            nextIcon={<i className='far fa-arrow-alt-circle-right'/>}>
            {carouselSlides}
        </Carousel>
    )
}

export default XCarousel
