import Classes from '../Styles/Live-Editor-New.module.scss'
import XCarousel from '../Components/StyledComponents/XCarousel'
import {IProject} from '../Services/Dtos'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import React, {useEffect, useState} from 'react'
import XButtonSquareDark from '../Components/StyledComponents/XButtonSquareDark'
import XButton_SquareDark from '../Components/StyledComponents/XButtonSquareDark'
import {useDispatch} from 'react-redux'
import RelatedProjects from '../Components/Later-Implements/RelatedProjects'
import {Switch} from '@material-ui/core'
import EditBox from '../Components/EditBox'
import {Link} from 'react-router-dom'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import {setNavState} from "../Store/Slices/AppStateSlice";

// Initial project dummy
const projDefault = {
    id: '',
    title: '',
    tagline: '',
    description: '',
    mediaType: '',
    mediaURIs: [],
}


const LiveEditorNew = ({match}) => {
    // States
    const [project, setProject] = useState(projDefault)
    const [isEditBoxOpen, setEditBoxOpen] = useState(false)

    const [editedProject, setEditedProject] = useState(projDefault)
    const [editable, setEditable] = useState(false)
    // Change trackers
    const [hasChangesDesc, setHasChangesDesc] = useState(false)
    const [hasChangesTitle, setHasChangesTitle] = useState(false)
    const [hasChangesTag, setHasChangesTag] = useState(false)

    const [savingProject, setSavingProject] = useState(projDefault)
    const dispatch = useDispatch()
    dispatch(setNavState(true))

    useEffect(() => {
        projectFetcher()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        projectFetcher()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditBoxOpen])

    useEffect(() => {
        checkForChanges()
    }, [editedProject])

    // Updating the database of there's a change
    useEffect(() => {
        //Sending PUT request
        if (savingProject !== projDefault) sendData()
    }, [savingProject])

    // Projects fetching function
    const projectFetcher = async () => {
        await axios
            .get(serverUrl + `/api/cards/projects/${match.params.id}`)
            .then((res) => {
                setProject(res.data)
                setEditedProject(res.data)
            })
            .then(() => {
            })
            .catch((error) => {
                // showAlert(error.status, error.message)
                setProject(projDefault)
                setEditedProject(projDefault)
            })
    }

    // Setting the changes that are needed to enable buttons
    const checkForChanges = () => {
        setHasChangesTitle(project.title !== editedProject.title)
        setHasChangesTag(project.tagline !== editedProject.tagline)
        setHasChangesDesc(project.description !== editedProject.description)
    }

    const handleTitle = (event) => {
        const h2 = event.target
        setEditedProject({
            ...editedProject,
            title: h2.innerText,
        })
        if (project.title !== h2.innerText) {
            setHasChangesTitle(true)
        } else {
            setHasChangesTitle(false)
        }
    }

    const handleTag = (event) => {
        const h4 = event.target
        setEditedProject({
            ...editedProject,
            tagline: h4.innerText,
        })
        if (project.tagline !== h4.innerText) {
            setHasChangesTag(true)
        } else {
            setHasChangesTag(false)
        }
    }

    const handleDescription = (event) => {
        const p = event.target
        setEditedProject({
            ...editedProject,
            description: p.innerText,
        })
        if (project.description !== p.innerText) {
            setHasChangesDesc(true)
        } else {
            setHasChangesDesc(false)
        }
    }
    const handleSave = (e) => {
        // Readying to send
        setSavingProject({
            ...projDefault,
            title: editedProject.title,
            description: editedProject.description,
            tagline: editedProject.tagline,
        })
    }

    const sendData = async () => {
        const formData = new FormData()
        formData.append('id', project.id)
        Object.entries(savingProject).map((item) => {
            // <<Fault>>  if a field after edit is empty this will not work
            if (item[1] !== '' && item[0] !== 'mediaURIs')
                formData.append(item[0], item[1])
        })
        await axios
            .put(serverUrl + `/api/cards/projects/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
            })
            .then(() => projectFetcher())
    }

    return (
        <div className={Classes.view}>
            <div className={Classes.optionBar}>
                <h6>Images</h6>
                <h6>Title</h6>
                <h6>Tagline</h6>
                <h6>Text</h6>
                <h6>Enable Editing</h6>
                <hr/>
                <div>
                    <label> Edit </label>
                    <Switch
                        // checked={state.checkedB}
                        onChange={(event) => setEditable(event.target.checked)}
                        color='secondary'
                        name='checkedB'
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </div>
                <div>
                    <XButtonSquareDark
                        isClicked={false}
                        onClick={() => setEditBoxOpen(true)}
                        name='mediaURIs'
                        disabled={false}
                        invisible={!editable}>
                        Edit Images
                    </XButtonSquareDark>
                </div>
                <div>
                    <XButtonSquareDark
                        isClicked={false}
                        onClick={(e) => handleSave(e.target)}
                        name='title'
                        disabled={!hasChangesTitle}
                        invisible={!editable}>
                        Save
                    </XButtonSquareDark>
                </div>
                <div>
                    <hr/>
                    <XButtonSquareDark
                        isClicked={false}
                        onClick={(e) => handleSave(e.target)}
                        name='tagline'
                        disabled={!hasChangesTag}
                        invisible={!editable}>
                        Save
                    </XButtonSquareDark>
                </div>
                <div>
                    <hr/>
                    <XButtonSquareDark
                        isClicked={false}
                        onClick={(e) => handleSave(e.target)}
                        name='description'
                        disabled={!hasChangesDesc}
                        invisible={!editable}>
                        Save
                    </XButtonSquareDark>
                </div>
            </div>

            <h2 onKeyUp={(e) => handleTitle(e)} contentEditable={editable}>
                {project.title}
            </h2>
            <div className={Classes.gallery}>
                <div className={Classes.overlay}/>
                <XCarousel itemList={project.mediaURIs}/>
            </div>
            <div className={Classes.inlineGallery}>
                <XCarousel itemList={editedProject.mediaURIs}/>
            </div>
            <div className={Classes.content}>
                <h4 onKeyUp={(e) => handleTag(e)} contentEditable={editable}>
                    {project.tagline}
                </h4>
                <hr/>
                <p
                    onKeyUp={(e) => handleDescription(e)}
                    contentEditable={editable}
                    className={Classes.text}>
                    {project.description === null ? '' : project.description}
                </p>
            </div>
            <div className={Classes.relates}>
                <h2>
                    <span>You may like to see</span>...
                </h2>
                <div className={Classes.relatesSpace}>
                    <RelatedProjects/>
                </div>
            </div>
            <Link
                className={Classes.adminLiveEditLink}
                to={`/projects/${match.params.id}`}>
                <XButton_SquareDark isClicked={false} invisible={'false'}>
                    <CancelPresentationIcon fontSize='small'/> Close
                </XButton_SquareDark>
            </Link>

            {isEditBoxOpen && (
                <EditBox
                    itemType={'Project'}
                    adminItem={project}
                    isFullWidth
                    setFormVisibility={setEditBoxOpen}
                />
            )}
        </div>
    )
}

export default LiveEditorNew
