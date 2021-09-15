import React, { SyntheticEvent, useState } from 'react'
import Classes from '../Styles/AdminForm.module.scss'
import XButton from './StyledComponents/XButton'
import axios, { AxiosResponse } from 'axios'
import { serverUrl } from '../GlobalData/Global'
import { XNotification } from './StyledComponents/Notification'
import styled from 'styled-components'

const XImg = styled.img`
  border-radius: var(--globalBorderRadius);
  aspect-ratio: 1;
  max-height: 100%;
  object-fit: contain;
  border: 2px rgba(255, 255, 255, 0.3) solid;
`

interface IProps {
  setFormVisibility: (visibility: boolean) => void
}

const AdminForm = (props: IProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projClicked, setProjClicked] = useState(true)
  const [images, setImages] = useState<FileList | null>(null)
  const [progress, setProgress] = useState(0)

  // Styling
  const articleBtnStyle = projClicked ? undefined : Classes.clickedBtn
  const projBtnStyle = projClicked ? Classes.clickedBtn : undefined

  // ImageList
  const fileList = () => {
    let imgArr = []
    if (images !== null) {
      for (let i = 0; i < images.length; i++) {
        imgArr?.push(images[i])
      }
    }
    return imgArr
  }

  const imgList = fileList().map((image) => {
    return (
      <XImg
        key={image.name}
        src={URL.createObjectURL(image)}
        alt='No Preview'
      />
    )
  })

  // On form submission sending create HTTP req
  const handleSubmitStart = async (e: SyntheticEvent) => {
    e.preventDefault()
    // Configuring FormData Object
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    if (images !== null) {
      for (let i = 0; i < images.length; i++) {
        // Backend depends on the format. Watch out
        formData.append(`media`, images[i], images[i].name)
      }
    }
    console.log(formData)
    // Endpoint must be set respect to the selected type of the form (project/article)
    const urlEndpoint = projClicked ? 'projects' : 'articles'

    await axios
      .post(serverUrl + `/api/cards/${urlEndpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        onUploadProgress: (progressEvent) =>
          setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          ),
      })
      .then((res) => handleSubmitComplete(res))
  }

  const handleSubmitComplete = (response: AxiosResponse<any>) => {
    ;(document.getElementById('fileInput') as HTMLInputElement).value = ''
    props.setFormVisibility(false)
  }

  return (
    <main className={Classes.main}>
      <form className={Classes.form} onSubmit={(e) => handleSubmitStart(e)}>
        <div className={Classes.bg} />
        <div className={Classes.bg2} />
        <div className={Classes.contentWrapper}>
          <h4>Create a New {projClicked ? 'Project' : 'Article'}</h4>
          <div className={Classes.selectorPlate}>
            <XButton
              className={projBtnStyle}
              type='button'
              onClick={() => setProjClicked(true)}
              invisible={false}>
              Project
            </XButton>
            <XButton
              className={articleBtnStyle}
              type='button'
              onClick={() => setProjClicked(false)}
              invisible={false}>
              Article
            </XButton>
          </div>
          <input
            type='text'
            placeholder='Title'
            required
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />

          {/*Images Loading Section*/}
          <div className={Classes.fileHandlerWrapper}>
            <div id='image-stock' className={Classes.imageStock}>
              {(images === undefined || !images?.length) && (
                <h6>No image files selected ...</h6>
              )}
              {imgList}
              <div
                onClick={() => setImages(null)}
                className={'fas fa-backspace ' + Classes.clear}
              />
            </div>

            {/*File Browser*/}
            <div className={Classes.fileHandler}>
              <label> Select Images</label>
              <input
                id='fileInput'
                type='file'
                multiple
                className='visually-hidden'
                onChange={(event) => setImages(event.target.files)}
              />
              <label htmlFor='fileInput'>
                {' '}
                <i className='far fa-file-image' />{' '}
                <i className='fas fa-upload' />
              </label>
            </div>
          </div>
          <textarea
            placeholder='Description'
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={Classes.actionBtnPlate}>
            <XButton
              className={Classes.btnLogin}
              invisible={false}
              type='submit'>
              Save & Preview
            </XButton>
            <XButton
              className={Classes.btnLogin}
              onClick={() => props.setFormVisibility(false)}
              invisible={false}
              type='button'>
              Close
            </XButton>
          </div>
          <XNotification
            message={`Uploading: ${progress} %`}
            progress={progress}
            autoHideDuration={0.5}
            isVisible={true}
          />
        </div>
      </form>
    </main>
  )
}

export default AdminForm
