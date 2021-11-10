import Classes from '../Styles/Live-Editor-New.module.scss'
import XCarousel from '../Components/StyledComponents/XCarousel'
import { IAdminItem, IProject } from '../Services/Dtos'
import axios from 'axios'
import { serverUrl } from '../GlobalData/Global'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import XButtonSquareDark from '../Components/StyledComponents/XButtonSquareDark'
import XButton_SquareDark from '../Components/StyledComponents/XButtonSquareDark'
import { useDispatch } from 'react-redux'
import RelatedProjects from '../Components/Later-Implements/RelatedProjects'
import { Dispatch } from 'redux'
import { INavActionTypes, setShowNav } from '../Store/NavState'
import { Switch } from '@material-ui/core'
import EditBox from '../Components/EditBox'
import { Link } from 'react-router-dom'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'

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

const LiveEditorNew = ({ match }: RouteComponentProps<IMatchParams>) => {
  // States
  const [project, setProject] = useState<IProject>(projDefault)
  const [isEditBoxOpen, setEditBoxOpen] = useState(false)

  const [editedProject, setEditedProject] = useState<IProject>(projDefault)
  const [editable, setEditable] = useState(false)
  // Change trackers
  const [hasChangesDesc, setHasChangesDesc] = useState(false)
  const [hasChangesTitle, setHasChangesTitle] = useState(false)
  const [hasChangesTag, setHasChangesTag] = useState(false)

  const [savingProject, setSavingProject] = useState(projDefault)
  useDispatch<Dispatch<INavActionTypes>>()(setShowNav())

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
      .then(() => {})
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

  const handleTitle = (event: SyntheticEvent) => {
    const h2 = event.target as HTMLHeadElement
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

  const handleTag = (event: SyntheticEvent) => {
    const h4 = event.target as HTMLHeadElement
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

  const handleDescription = (event: SyntheticEvent) => {
    const p = event.target as HTMLParagraphElement
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
  const handleSave = (e: HTMLButtonElement) => {
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
        <hr />
        <div>
          <label> Edit </label>
          <Switch
            // checked={state.checkedB}
            onChange={(event) => setEditable(event.target.checked)}
            color='secondary'
            name='checkedB'
            inputProps={{ 'aria-label': 'primary checkbox' }}
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
            onClick={(e) => handleSave(e.target as HTMLButtonElement)}
            name='title'
            disabled={!hasChangesTitle}
            invisible={!editable}>
            Save
          </XButtonSquareDark>
        </div>
        <div>
          <hr />
          <XButtonSquareDark
            isClicked={false}
            onClick={(e) => handleSave(e.target as HTMLButtonElement)}
            name='tagline'
            disabled={!hasChangesTag}
            invisible={!editable}>
            Save
          </XButtonSquareDark>
        </div>
        <div>
          <hr />
          <XButtonSquareDark
            isClicked={false}
            onClick={(e) => handleSave(e.target as HTMLButtonElement)}
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
        <div className={Classes.overlay} />
        <XCarousel itemList={project.mediaURIs} />
      </div>
      <div className={Classes.inlineGallery}>
        <XCarousel itemList={editedProject.mediaURIs} />
      </div>
      <div className={Classes.content}>
        <h4 onKeyUp={(e) => handleTag(e)} contentEditable={editable}>
          {project.tagline}
        </h4>
        <hr />
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
          <RelatedProjects />
        </div>
      </div>
      <Link
        className={Classes.adminLiveEditLink}
        to={`/projects/${match.params.id}`}>
        <XButton_SquareDark isClicked={false} invisible={false}>
          <CancelPresentationIcon fontSize='small' /> Close
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
