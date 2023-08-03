import React, {useContext, useEffect, useState} from 'react'
import Classes from '../Styles/Admin_item_space.module.scss'
import AdminItem from './admin_item'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import {AdminPanelContext} from "../Context/AdminPanelContext";
import {useDispatch} from "react-redux";

const AdminItemSpace = (props) => {
    //#region States
    // const [clickedProjBtn, setClickedProjBtn] = useState(props.clickedProjBtn)
    const [articles, setArticles] = useState([])
    const [projects, setProjects] = useState([])
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const {needRefresh} = {...useContext(AdminPanelContext)}
    const dispatch = useDispatch()
    //#endregion


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
    //For fetching projects as AdminItems
    const projectFetcher = async () => {
        await axios
            .get(serverUrl + '/api/cards/projects')
            .then((res) => setProjects(res.data))
            .catch((error) => {
                dispatch(setAlertMsg(error.message))
                setProjects([])
            })
    }
    //#endregion


    //#region Deleting
    const projectDeleter = async (id) => {
        await axios
            .delete(`${serverUrl}/api/cards/projects/${id}`)
            .then((res) => {
                projectFetcher()
            })
            .catch((error) => {
                dispatch(setAlertMsg(error.message))
                projectFetcher()
            })
    }

    const articleDeleter = async (id) => {
        await axios
            .delete(`${serverUrl}/api/cards/articles/${id}`)
            .then((res) => articleFetcher())
            .catch((error) => {
                dispatch(setAlertMsg(error.message))
                projectFetcher()
            })
    }

    const delItem = (deletingItem) => {
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
            {/*<AlertModal msg={alertMsg} setVisible={setAlertVisible} visible={alertVisible}/>*/}
            {itemList}

        </div>
    )
}

export default AdminItemSpace
