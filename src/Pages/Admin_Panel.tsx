import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Classes from '../Styles/Admin_Panel.module.scss'
import AdminItemSpace from '../Components/admin_item_space'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { INavActionTypes, setHideNav, setShowNav } from '../Store/NavState'
import AdminForm from '../Components/AdminForm'
import XButton from '../Components/StyledComponents/XButton'
import XButtonSquareDark_Toggle from '../Components/StyledComponents/XButton_SquareDark_Toggle'

interface IProps {}

//Only for admin
const AdminPanel = (props: IProps) => {
  // States
  const history = useHistory()
  const [formVisibility, setFormVisibility] = useState(false)
  const [projectClicked, setProjectClicked] = useState(true)
  const dispatchNavState = useDispatch<Dispatch<INavActionTypes>>()
  dispatchNavState(setHideNav())

  // To refresh on closing adminForm, projectClicked state toggles
  // on adminForm open and close. Due to 2 toggles for open and close, it
  // restores the state on close(when content visible
  useEffect(() => {
    setProjectClicked(!projectClicked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formVisibility])

  // Close button action
  const onCloseClick = () => {
    dispatchNavState(setShowNav())
    history.push('/')
  }

  // Conditionally load the profPic or default image
  const userIcon = <i className='fas fa-user-circle' />
  // Not implemented yet

  // Section buttons clicked logic
  let projectBtnStyle = [Classes.sectionButton]
  let articleBtnStyle = [Classes.sectionButton]
  projectBtnStyle.push(projectClicked ? Classes.sectionBtnClicked : '')
  articleBtnStyle.push(!projectClicked ? Classes.sectionBtnClicked : '')

  return (
    <div className={Classes.adminPanel}>
      <div className={Classes.adminPanel_Container}>
        <div className={Classes.left_Wrapper}>
          <div className={Classes.userDisplay}>
            {userIcon}
            <p>Username</p>
            <p>Description</p>
          </div>

          {/*Section Buttons*/}
          <div className={Classes.sectionButtonWrapper}>
            <XButtonSquareDark_Toggle
              isClicked={formVisibility}
              onClick={() => setFormVisibility(!formVisibility)}
              invisible={false}>
              Create New
            </XButtonSquareDark_Toggle>
            <XButton
              className={projectBtnStyle.join(' ')}
              onClick={() => setProjectClicked(true)}
              invisible={false}>
              Projects
            </XButton>
            <XButton
              className={articleBtnStyle.join(' ')}
              onClick={() => setProjectClicked(false)}
              invisible={false}>
              Articles
            </XButton>
          </div>
        </div>
        <div className={Classes.right_Wrapper}>
          <div className={Classes.topBar}>
            <div className={Classes.adminClose} onClick={onCloseClick}>
              <i className='fas fa-times' />
            </div>
            <div className={Classes.heading}>
              {projectClicked ? 'Projects' : 'Articles'}
            </div>
          </div>
          {/* <Notification progress={80} message={'Uploading'} isVisible={true} autoHideDuration={1} /> */}
          {formVisibility ? (
            <AdminForm setFormVisibility={setFormVisibility} />
          ) : null}
          <AdminItemSpace clickedProjBtn={projectClicked} />
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
