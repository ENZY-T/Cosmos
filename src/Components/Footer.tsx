import Classes from '../Styles/Footer.module.scss'
import bgImage from '../img/footer-bg.jpg'
import React, {SyntheticEvent, useRef} from 'react'
import XButton from './StyledComponents/XButton'
import {contactDetails, socialLinks} from '../GlobalData/Global'

const Footer = () => {
    const txtAreaEmailBody = useRef<HTMLTextAreaElement>(null)
    const inputEle_Name = useRef<HTMLInputElement>(null)

    function handleSendEmail(e: SyntheticEvent) {
        e.preventDefault();
        const emailBody = txtAreaEmailBody.current?.value;
        const customerName = inputEle_Name.current?.value;
        window.location.href = `mailto:${contactDetails.email}?subject=Customer%20Inquiry%20%2D%20${encodeURIComponent(customerName ? customerName : '')}&body=${encodeURIComponent(emailBody ? emailBody : '')}%0A%0A%0A`;
    }

    return (
        <div className={Classes.footer}>
            <img src={bgImage} className={Classes.footerBgImage} alt=''/>
            <div className={Classes.footerBgOverlay}/>

            <div className={Classes.contactIconCol}>
                <a title='Click to make a cellular call' href={`tel:${contactDetails.tele}`}>
                    <i className='fas fa-phone-alt'/>
                </a>
                <p>{contactDetails.tele}</p>
                <i className='fas fa-map-marked-alt'/>
                <p>
                    {contactDetails.addressRegOffice.entity}<br/>
                    {contactDetails.addressRegOffice.street}, {contactDetails.addressRegOffice.city},
                    {contactDetails.addressRegOffice.district}
                </p>
            </div>
            {/*    <hr/>*/}
            <div className={Classes.addressCol}>
                <div>
                    {contactDetails.addressRegOffice.entity} <br/>
                    {contactDetails.addressRegOffice.street} <br/>
                    {contactDetails.addressRegOffice.city} <br/>
                    {contactDetails.addressRegOffice.district} <br/>
                    {contactDetails.addressRegOffice.country} <br/>
                </div>
                <div>{contactDetails.email}</div>
                <div>{contactDetails.tele}</div>
            </div>
            <div className={Classes.addressCol2}>
                <div>
                    {contactDetails.addressLab.entity} <br/>
                    {contactDetails.addressLab.street} <br/>
                    {contactDetails.addressLab.city} <br/>
                    {contactDetails.addressLab.district} <br/>
                    {contactDetails.addressLab.country} <br/>
                </div>
                {/*<div>{contactDetails.email2}</div>*/}
                {/*<div>{contactDetails.tele2}</div>*/}
            </div>
            {/*    <hr/>*/}

            <form
                // Use the workaround in Obsidian-> React -> Mailto with Js
                onSubmit={e => handleSendEmail(e)}
                method={'post'}
                encType={'text/plain'}
                className={Classes.form}
                autoComplete='off'>
                <h1>Get in Touch</h1>
                <h6>Email us. We are eagerly waiting for the next invention...</h6>
                <div>
                    <input ref={inputEle_Name} placeholder='Name' required type={'text'}/>
                    <input placeholder='Email Address' required type={'text'}/>
                </div>
                <textarea ref={txtAreaEmailBody} placeholder='What do you want to know...?'/>
                <XButton type={'submit'} value={'send'} invisible={false}>
                    Send
                </XButton>
            </form>

            {/*    <hr/>*/}

            <div className={Classes.socialIcons}>
                <a href={socialLinks.fb}>
                    <i className='fab fa-facebook-square'/>
                </a>
                {/*<a href={socialLinks.twitter}><i className='fab fa-twitter-square'/></a>*/}
                {/*<a href={socialLinks.instagram}><i className='fab fa-instagram'/></a>*/}
            </div>
        </div>
    )
}

export default Footer
