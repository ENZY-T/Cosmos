import React from 'react'
import Classes from '../Styles/QuickAbout.module.scss'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import SecurityIcon from '@material-ui/icons/Security'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'


const CertifiedIcon = () => <i className='fas fa-graduation-cap'/>

const QuickAbout = (props) => {
    return (
        <div className={Classes.container}>
            <div className={Classes.main}>
                {props.children ? props.children.header
                    : (<h2><span>COSMOS<br/></span> Automation Systems</h2>)
                }
                <p>
                    COSMOS Automation (Pvt) Ltd., we serve total community for the engineering solution
                    needs of every state of client with our specialized engineering skills and latest technologies.
                    Higher
                    range of engineering services and better clientside satisfaction through international
                    standard service is our deep vision.
                </p>
                <p>
                    We are mostly driven an uplifted by dedicated and experienced employee basis gathered around
                    us in where the best, recent and demanded technologies are mostly encouraged.
                </p>
            </div>
            <div className={Classes.taglines}>
                <div className={Classes.knowledge}>
                    <h4>
                        <CertifiedIcon/>Engineering Expertise
                    </h4>
                    <p>We got the most creative and high level engineers working with us for your solution </p>
                </div>
                <div className={Classes.tradition}>
                    <h4>
                        <CardMembershipIcon/> Clientside Orientation
                    </h4>
                    <p>Aim to deliver the best service with the Flexibility, Customer care and Maintainance </p>
                </div>
                <div className={Classes.security}>
                    <h4>
                        <SecurityIcon/> Reliability and consultancy
                    </h4>
                    <p>Highly reliable, Scalable and Eco-friendly inclination for Automation Solutions </p>
                </div>
                <div className={Classes.certificate}>
                    <h4>
                        <VerifiedUserIcon/> Trust and Stability
                    </h4>
                    <p>We acquired a high grade community base and higher stability in the field withing short time for
                        automation expertise. </p>
                </div>
            </div>
        </div>
    )
}

export default QuickAbout
