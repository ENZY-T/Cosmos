import Classes from '../Styles/ViewNew.module.scss'
import XCarousel from '../Components/StyledComponents/XCarousel'
import {ILoggedUser, IProject} from '../Services/Dtos'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import {useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import XButton_SquareDark from '../Components/StyledComponents/XButtonSquareDark'
import {Link} from 'react-router-dom'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import {useSelector} from 'react-redux'
import {AppState} from '../Store/RootStore'
import RelatedProjects from '../Components/Later-Implements/RelatedProjects'

// Initial project dummy
const projDefault: IProject = {
    id: '',
    title: '',
    tagline: '',
    description: '',
    mediaType: '',
    mediaURIs: [],
}

// Typings for the match item content
interface IMatchParams {
    id: string
}

const View = ({match}: RouteComponentProps<IMatchParams>) => {
    // States
    const [project, setProject] = useState<IProject>(projDefault)
    const loggedUser = useSelector<AppState, ILoggedUser>(
        (state) => state.loggedUserReducer
    )

    useEffect(() => {
        projectFetcher()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url])

    // Projects fetching function
    const projectFetcher = async () => {
        await axios
            .get(serverUrl + `/api/cards/projects/${match.params.id}`)
            .then((res) => setProject(res.data))
            .catch((error) => {
                // showAlert(error.status, error.message)
                setProject(projDefault)
            })
    }


    return (
        <div className={Classes.view}>
            <h2>{project.title}</h2>
            {loggedUser?.role === 'admin' ? (
                <Link className={Classes.adminLiveEditLink} to={`/admin/liveeditor/${project.id}`}>
                    <XButton_SquareDark isClicked={false} invisible={false}>
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
