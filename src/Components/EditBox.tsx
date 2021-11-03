import React, {ChangeEvent, SyntheticEvent, useContext, useEffect, useState} from 'react'
import Classes from '../Styles/AdminForm.module.scss'
import XButton from './StyledComponents/XButton'
import axios, {AxiosResponse} from 'axios'
import {serverUrl} from '../GlobalData/Global'
import {XNotification} from './StyledComponents/Notification'
import styled from 'styled-components'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import {IAdminItem, IArticle, IProject} from '../Services/Dtos'
import {AdminPanelContext} from "../Context/AdminPanelContext";

const XImg = styled.img`
  border-radius: var(--globalBorderRadius);
  aspect-ratio: 1;
  max-height: 100%;
  object-fit: contain;
  border: 2px rgba(255, 255, 255, 0.3) solid;
`

interface IProps {
    setFormVisibility: (visibility: boolean) => void
    adminItem: IProject | IArticle | IAdminItem
    itemType: string
    isFullWidth?: boolean
}

const dummyItem: IProject | IArticle | IAdminItem = {
    createdDate: "",
    description: "",
    id: "",
    mediaType: "",
    mediaURIs: [],
    tagline: "",
    title: ""
}

const AdminForm = (props: IProps) => {
    //region States
    const [item, setItem] = useState<IProject | IArticle | IAdminItem>(dummyItem)
    const [projClicked, setProjClicked] = useState(true)
    const [images, setImages] = useState<FileList | null>(null)
    const [progress, setProgress] = useState(0)
    const [imVidAlignment, setImVidAlignment] = useState('image')
    const handleImVidChange = (event: SyntheticEvent, newAlignment: string) => {
        setImVidAlignment(newAlignment)
        setImVidAlignment(newAlignment)
    }
    //endregion

    //region Use Context
    const {needRefresh, refreshPanel} = {...useContext(AdminPanelContext)}
    //endregion


    useEffect(() => {
        setItem(props.adminItem)
    }, [])

    // Two way binding
    const handleChanges = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        // const element =(e.target as HTMLInputElement)
        const {name, value} = e.target

        let newValue;
        if (value === '') {
            newValue = '[clear]'
        } else {
            newValue = value
        }

        setItem({
            ...item,
            [name]: newValue
        })

    }

    const handleClearImages = () => {
        setImages(null)
        images === null && setItem({
            ...item,
            mediaURIs: []
        })
    }

    // Styling
    const articleBtnStyle = projClicked ? undefined : Classes.clickedBtn
    const projBtnStyle = projClicked ? Classes.clickedBtn : undefined

    // Generating the image preview list with mediaURIs
    const imgListFromURIs = item.mediaURIs?.map((imgSrc) => {
        return (
            <XImg
                key={imgSrc}
                src={serverUrl + imgSrc}
                alt='No Preview'
            >
            </XImg>
        )
    })

    // Generating image previews with LocalFiles
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
    // Populating
    const imgListFromLocal = fileList().map((image) => {
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
        formData.append('id', item.id)
        formData.append('title', item.title)
        formData.append('tagline', item.tagline)
        formData.append('description', item.description)
        formData.append('mediaType', imVidAlignment)
        if (images !== null) {
            for (let i = 0; i < images.length; i++) {
                // Backend depends on the format. Watch out
                formData.append(`media`, images[i], images[i].name)
            }
        } else if (item.mediaURIs == null) {
            formData.append('mediaURI', '')
        }

        // Endpoint must be set respect to the selected type of the form (project/article)
        const urlEndpoint = projClicked ? 'projects' : 'articles'

        await axios
            .put(serverUrl + `/api/cards/${urlEndpoint}`, formData, {
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
            .then((res) => {
                handleSubmitComplete(res)

            })
    }

    const handleSubmitComplete = (response: AxiosResponse<any>) => {

        ;(document.getElementById('fileInput') as HTMLInputElement).value = ''
        refreshPanel?.()

        props.setFormVisibility(false)
    }

    // Additional Style for main
    const mainStyleMore = {
        width: '100%'
    }

    return (
        <main className={Classes.main} style={props.isFullWidth ? mainStyleMore : undefined}>
            <form className={Classes.form} onSubmit={(e) => handleSubmitStart(e)}>
                <div className={Classes.bg}/>
                <div className={Classes.bg2}/>
                <div className={Classes.contentWrapper}>
                    <h4>Create a New {projClicked ? 'Project' : 'Article'}</h4>
                    <div className={Classes.selectorPlate}>
                        <XButton
                            className={projBtnStyle}
                            type='button'
                            onClick={() => setProjClicked(true)}
                            disabled
                            invisible={false}>
                            Project
                        </XButton>
                        <XButton
                            className={articleBtnStyle}
                            type='button'
                            onClick={() => setProjClicked(false)}
                            disabled
                            invisible={false}>
                            Article
                        </XButton>
                    </div>

                    {/* Title */}
                    <input
                        type='text'
                        placeholder='Title'
                        required
                        autoFocus
                        name={'title'}
                        value={item.title === '[clear]' ? '' : item.title}
                        onChange={handleChanges}>
                    </input>

                    {/* TagLine */}
                    <input
                        type='text'
                        placeholder='Brief      #It is displayed in the project card'
                        required
                        autoFocus
                        name={'tagline'}
                        value={item.tagline === '[clear]' ? '' : item.tagline}
                        onChange={handleChanges}>
                    </input>

                    {/* Video/photo Selector buttons */}
                    {!projClicked && (
                        <ToggleButtonGroup
                            style={{color: 'azure'}}
                            color='info'
                            value={imVidAlignment}
                            exclusive
                            fullWidth
                            onChange={handleImVidChange}>
                            <ToggleButton value='image' sx={{color: '#b0b0b0'}}>
                                Images
                            </ToggleButton>
                            <ToggleButton value='video' sx={{color: '#b0b0b0'}}>
                                Video
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                    {/*Images Loading Section*/}
                    <div className={Classes.fileHandlerWrapper}>
                        <div id='image-stock' className={Classes.imageStock}>
                            {(!item.mediaURIs?.length && !images?.length) && (
                                <h6>No image files selected ...</h6>
                            )}
                            {images?.length ? imgListFromLocal : imgListFromURIs}
                            <div
                                onClick={() => handleClearImages()}
                                className={'fas fa-backspace ' + Classes.clear}
                            />
                        </div>

                        {/*File Browser*/}
                        <div className={Classes.fileHandler}>
                            <label> Select Images</label>
                            <input
                                id='fileInput'
                                type='file'
                                multiple={projClicked}
                                className='visually-hidden'
                                onChange={(event) => setImages(event.target.files)}
                            />
                            <label htmlFor='fileInput'>
                                {' '}
                                <i className='far fa-file-image'/>{' '}
                                <i className='fas fa-upload'/>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    {projClicked && (
                        <textarea
                            placeholder='Description'
                            name={'description'}
                            value={item.description === '[clear]' ? '' : item.description}
                            onChange={handleChanges}/>
                    )}
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
