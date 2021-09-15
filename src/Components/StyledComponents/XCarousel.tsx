import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { serverUrl } from '../../GlobalData/Global'

const XCarousel = (props: { itemList?: string[]; className?: string }) => {
  const carouselSlides = props.itemList?.map((uri) => {
    return (
      <Carousel.Item>
        <img
          key={uri}
          src={serverUrl + uri}
          alt=''
          style={{ width: '100%', objectFit: 'contain' }}></img>
      </Carousel.Item>
    )
  })

  return (
    <Carousel touch keyboard className={props.className}>
      {carouselSlides}
    </Carousel>
  )
}

export default XCarousel
