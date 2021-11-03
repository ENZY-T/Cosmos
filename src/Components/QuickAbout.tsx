import React, {ReactNode} from 'react'
import Classes from '../Styles/QuickAbout.module.scss'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import SecurityIcon from '@material-ui/icons/Security'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

interface IProps {
    children?: {
        header: ReactNode
    },
}

const CertifiedIcon = () => <i className='fas fa-graduation-cap'/>

const QuickAbout = (props: IProps) => {
    return (
        <div className={Classes.container}>
            <div className={Classes.main}>
                {props.children ? props.children.header
                    : (<h2><span>COSMOS</span> Automation Systems</h2>)
                }
                <p>
                    COSMOS Automation (Pvt) Ltd., we serve total community for the engineering solution
                    needs of every state of client with our specialized engineering skills and latest technologies. Higher
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
                        <CertifiedIcon/> Knowledge
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                </div>
                <div className={Classes.tradition}>
                    <h4>
                        <CardMembershipIcon/> Experience
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                </div>
                <div className={Classes.security}>
                    <h4>
                        <SecurityIcon/> Security
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                </div>
                <div className={Classes.certificate}>
                    <h4>
                        <VerifiedUserIcon/> Certification
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    )
}

export default QuickAbout
