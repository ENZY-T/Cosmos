import Classes from '../Styles/View.module.scss'
import XCarousel from '../Components/StyledComponents/XCarousel'
import {IProject} from '../Services/Dtos'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import {useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import XButton_SquareDark from "../Components/StyledComponents/XButton_SquareDark";
import {Link} from 'react-router-dom'
import EditRoundedIcon from '@material-ui/icons/EditRounded'

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

    useEffect(() => {
        window.scrollTo(0, 0)
        projectFetcher()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    console.log(project)
    return (
        <div className={Classes.view}>
            <h1>{project.title}</h1>
            <Link to={`/admin/liveeditor/${project.id}`}><XButton_SquareDark isClicked={false} invisible={false}><EditRoundedIcon
                fontSize="small"/> Edit</XButton_SquareDark></Link>
            <div className={Classes.gallery}>
                <XCarousel itemList={project.mediaURIs}/>
            </div>
            <div className={Classes.text}>
                <p>{project.description}</p>
            </div>
        </div>
    )
}

export default View
