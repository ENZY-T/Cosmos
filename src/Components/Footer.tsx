import Classes from '../Styles/Footer.module.scss'
import bgImage from '../img/footer-bg.jpg'
import React from 'react'
import XButton from './StyledComponents/XButton'
import {contactDetails, socialLinks} from '../GlobalData/Global'

const Footer = () => {
    return (
        <div className={Classes.footer}>
            <img src={bgImage} className={Classes.footerBgImage} alt=''/>
            <div className={Classes.footerBgOverlay}/>

            <div className={Classes.contactIconCol}>
                <a title='Click to make a cellular call' href="tel:+94%2077%200533845"><i className='fas fa-phone-alt'/></a>
                <p>{contactDetails.tele}</p>
                <i className='fas fa-map-marked-alt'/>
                <p>
                    {contactDetails.address.street}, {contactDetails.address.city},
                    {contactDetails.address.district}
                </p>
            </div>
            {/*    <hr/>*/}
            <div className={Classes.addressCol}>
                <div>
                    {contactDetails.address.city} <br/>
                    {contactDetails.address.district} <br/>
                    {contactDetails.address.country} <br/>
                </div>
                <div>info@cosmos.lk</div>
                <div>+94 76 596 4999</div>
            </div>
            {/*    <hr/>*/}
            <form action={'mailto:info@cosmos.lk'} method={'post'} encType={'text/plain'}
                  className={Classes.form} autoComplete='off'>
                <h1>Get in Touch</h1>
                <h6>Email us. We are eagerly waiting for the next invention...</h6>
                <div>
                    <input placeholder='Name' required type={'text'}/>
                    <input placeholder='Email Address' required type={'text'}/>
                </div>
                <textarea placeholder='What do you want to know...?'/>
                <XButton type={'submit'} value={'send'} invisible={false}>Send</XButton>
            </form>

            {/*    <hr/>*/}

            <div className={Classes.socialIcons}>
                <a href={socialLinks.fb}><i className='fab fa-facebook-square'/></a>
                {/*<a href={socialLinks.twitter}><i className='fab fa-twitter-square'/></a>*/}
                {/*<a href={socialLinks.instagram}><i className='fab fa-instagram'/></a>*/}
            </div>
        </div>
    )
}

export default Footer
