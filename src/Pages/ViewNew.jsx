import Classes from '../Styles/ViewNew.module.scss'
import XCarousel from '../Components/StyledComponents/XCarousel'
import {IProject} from '../Services/Dtos'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import {useEffect, useState} from 'react'
import XButton_SquareDark from '../Components/StyledComponents/XButtonSquareDark'
import {Link} from 'react-router-dom'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import {useDispatch, useSelector} from 'react-redux'
import RelatedProjects from '../Components/Later-Implements/RelatedProjects'
import {setAlertMsg} from "../Store/Slices/AppStateSlice";

// Initial project dummy
const projDefault = {
    id: '',
    title: '',
    tagline: '',
    description: '',
    mediaType: '',
    mediaURIs: [],
}

const View = ({match}) => {
    // States
    const [project, setProject] = useState(projDefault)
    const loggedUser = useSelector(
        (state) => state.userState.user
    )

    const dispatch = useDispatch()

    useEffect(() => {
        projectFetcher()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [match.url])

    // Projects fetching function
    const projectFetcher = async () => {
        await axios
            .get(serverUrl + `/api/cards/projects/${match.params.id}`)
            .then((res) => setProject(res.data))
            .catch((error) => {
                setProject(projDefault)
                dispatch(setAlertMsg(error.message))
            })
    }

    return (
        <div className={Classes.view}>
            <h2>{project.title}</h2>
            {loggedUser?.role === 'admin' ? (
                <Link className={Classes.adminLiveEditLink} to={`/admin/liveeditor/${project.id}`}>
                    <XButton_SquareDark isClicked={false} invisible={'false'}>
                        <EditRoundedIcon fontSize='small'/> Edit
                    </XButton_SquareDark>
                </Link>
            ) : null}
            <div className={Classes.gallery}>
                <div className={Classes.overlay}/>
                <XCarousel itemList={project.mediaURIs}/>
            </div>
            <div className={Classes.inlineGallery}>
                <XCarousel noAutoPlay={true} itemList={project.mediaURIs}/>
            </div>

            <div className={Classes.content}>
                <h4>{project.tagline}</h4>
                <hr/>
                <p className={Classes.text}>{project.description ?? ''}</p>
            </div>
            <div className={Classes.relates}>
                <h3>
                    <span>You may like to see...</span>
                </h3>
                <div className={Classes.relatesSpace}>
                    <RelatedProjects/>
                </div>
            </div>
        </div>
    )
}

export default View
