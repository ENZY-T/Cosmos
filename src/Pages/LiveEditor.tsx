import Classes from '../Styles/LiveEditor.module.scss'
import XCarousel from '../Components/StyledComponents/XCarousel'
import { IProject } from '../Services/Dtos'
import axios from 'axios'
import { serverUrl } from '../GlobalData/Global'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Switch } from '@material-ui/core'
import XButton_SquareDark from '../Components/StyledComponents/XButton_SquareDark'

// Initial project dummy
const projDefault: IProject = {
  id: '',
  title: '',
  tagline: '',
  description: '',
  mediaType: '',
  mediaURIs: [''],
}

// Typings for the match item content
interface IMatchParams {
  id: string
}

const LiveEditor = ({ match }: RouteComponentProps<IMatchParams>) => {
  // States
  const [project, setProject] = useState<IProject>(projDefault)
  const [editedProject, setEditedProject] = useState<IProject>(projDefault)
  const [editable, setEditable] = useState(false)
  const [hasChangesDesc, setHasChangesDesc] = useState(false)
  const [hasChangesTitle, setHasChangesTitle] = useState(false)
  const [savingProject, setSavingProject] = useState(projDefault)

  useEffect(() => {
    window.scrollTo(0, 0)
    projectFetcher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Enable/Disable Save button based on presence of changes
  const checkForChanges = () => {
    setHasChangesTitle(project.title !== editedProject.title)
    setHasChangesDesc(project.description !== editedProject.description)
  }

  useEffect(() => {
    checkForChanges()
  }, [editedProject])

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

  const handleTitle = (event: SyntheticEvent) => {
    const h1 = event.target as HTMLHeadElement
    setEditedProject({
      ...editedProject,
      title: h1.innerText,
    })
    if (project.title !== h1.innerText) {
      setHasChangesTitle(true)
    } else {
      setHasChangesTitle(false)
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
    if (e.name === 'title') {
      setSavingProject({
        ...projDefault,
        title: editedProject.title,
      })
    } else if (e.name === 'description') {
      setSavingProject({
        ...projDefault,
        description: editedProject.description,
      })
    }
  }

  useEffect(() => {
    //Sending PUT request
    if (savingProject !== projDefault) sendData()
  }, [savingProject])

  const sendData = async () => {
    const formData = new FormData()
    formData.append('id', project.id)
    Object.entries(savingProject).map((item) => {
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
        <div>
          <label> Edit </label>
          <Switch
            // checked={state.checkedB}
            onChange={(event) => setEditable(event.target.checked)}
            color='secondary'
            name='checkedB'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <XButton_SquareDark
            isClicked={false}
            onClick={(e) => handleSave(e.target as HTMLButtonElement)}
            name='title'
            disabled={!hasChangesTitle}
            invisible={!editable}>
            Save Title
          </XButton_SquareDark>
        </div>

        <div>
          <hr />
          <XButton_SquareDark
            isClicked={false}
            onClick={(e) => handleSave(e.target as HTMLButtonElement)}
            name='mediaURIs'
            disabled={true}
            invisible={!editable}>
            Save
          </XButton_SquareDark>
        </div>

        <div>
          <hr />
          <XButton_SquareDark
            isClicked={false}
            onClick={(e) => handleSave(e.target as HTMLButtonElement)}
            name='description'
            disabled={!hasChangesDesc}
            invisible={!editable}>
            Save
          </XButton_SquareDark>
        </div>
      </div>

      <h1 onKeyUp={(e) => handleTitle(e)} contentEditable={editable}>
        {project.title}
      </h1>
      <div className={Classes.gallery}>
        <XCarousel itemList={project.mediaURIs} />
      </div>
      <div className={Classes.text}>
        <p onKeyUp={(e) => handleDescription(e)} contentEditable={editable}>
          {project.description}
        </p>
      </div>
    </div>
  )
}

export default LiveEditor
