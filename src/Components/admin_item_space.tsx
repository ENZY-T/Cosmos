import React, {useContext, useEffect, useState} from 'react'
import Classes from '../Styles/Admin_item_space.module.scss'
import { IAdminItem } from '../Services/Dtos'
import AdminItem from './admin_item'
import axios from 'axios'
import { serverUrl } from '../GlobalData/Global'
import EditBox from "./EditBox";
import {AdminPanelContext, IAdminPanelContext} from "../Context/AdminPanelContext";

// Props interface
interface IProps {
  clickedProjBtn: boolean
}

const AdminItemSpace = (props: IProps) => {
  //#region States
  // const [clickedProjBtn, setClickedProjBtn] = useState(props.clickedProjBtn)
  const [articles, setArticles] = useState<IAdminItem[]>([])
  const [projects, setProjects] = useState<IAdminItem[]>([])
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  //#endregion

  //region Use Context
  const {needRefresh, refreshPanel} = {...useContext(AdminPanelContext)}
  //endregion

  //#region Fetching
  useEffect(() => {
    // setClickedProjBtn(props.clickedProjBtn)
    props.clickedProjBtn ? projectFetcher() : articleFetcher()
  }, [props.clickedProjBtn])

  useEffect(() => {
    articleFetcher()
    projectFetcher()
  }, [props.clickedProjBtn, needRefresh])

  //For fetching articles as IAdminItem's
  const articleFetcher = async () => {
    await axios
      .get(serverUrl + '/api/cards/articles')
      .then((res) => setArticles(res.data))
      .catch((error) => {
        // showAlert(error.status, error.message)
        setArticles([])
      })
  }
  //For fetching projects as IAdminItem's
  const projectFetcher = async () => {
    await axios
      .get(serverUrl + '/api/cards/projects')
      .then((res) => setProjects(res.data))
      .catch((error) => {
        // showAlert(error.status, error.message)
        setProjects([])
      })
  }
  //#endregion

  //#region Alerting
  // var alertMsg: string = ''
  const showAlert = (errorStatus: number, msg: string) => {
    if (errorStatus === 404) {
      msg = `No ${props.clickedProjBtn ? 'Projects' : 'Articles'} to list`
      props.clickedProjBtn ? setProjects([]) : setArticles([])
    }
    setAlertMsg(msg)
    setAlertVisible(true)
  }
  //#endregion

  //#region Deleting
  const projectDeleter = async (id: string) => {
    await axios
      .delete(`${serverUrl}/api/cards/projects/${id}`)
      .then((res) => {
        projectFetcher()
      })
      .catch((error) => {
        projectFetcher()
      })
  }

  const articleDeleter = async (id: string) => {
    await axios
      .delete(`${serverUrl}/api/cards/articles/${id}`)
      .then((res) => articleFetcher())
      .catch((error) => {
        alert(error)
        projectFetcher()
      })
  }

  const delItem = (deletingItem: IAdminItem) => {
    const process = props.clickedProjBtn ? projectDeleter : articleDeleter
    process(deletingItem.id)
  }
  //#endregion

  //#region Populate items
  // Articles
  const articlesJsx = articles.map((item) => {
    return (
      <AdminItem
        isProjectsClicked={props.clickedProjBtn}
        delItem={delItem}
        key={item.id}
        adminItem={item}
      />
    )
  })
  //Projects
  const projectsJxs = projects.map((item) => {
    return (
      <AdminItem
        isProjectsClicked={props.clickedProjBtn}
        delItem={delItem}
        key={item.id}
        adminItem={item}
      />
    )
  })
  // Conditionally render either article_AdminItems or  project_AdminItems
  const itemList = props.clickedProjBtn ? projectsJxs : articlesJsx
  //#endregion


  // Rendering out
  return (
    <div className={Classes.contentSpace_Wrapper}>
      {/*<Alert msg={alertMsg} setVisible={setAlertVisible} visible={alertVisible}/>*/}
      {itemList}

    </div>
  )
}

export default AdminItemSpace
