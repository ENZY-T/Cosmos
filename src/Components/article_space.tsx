import React, { useEffect, useState } from 'react'
import Article from './article'
import Classes from '../Styles/article_space.module.scss'
import { IArticle } from '../Services/Dtos'
import axios from 'axios'
import { serverUrl } from '../GlobalData/Global'
const vPath = require('../video/131747.mp4') // call as : vPath.default

// const dummyArticle: IArticle = {
//   id: '',
//   description: '',
//   mediaURIs: `${'../video/131747.mp4'}`,
//   mediaType: 'image',
//   title: '',
// }

const ArticleSpace = () => {
  // States
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    articleFetcher()
  }, [])

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

  //Populate articles using fetched data array
  const articlesJxs = articles.map((item, pos) => {
    // returns only if pos is odd. Even article is printed by offsetting as pos-1
    return pos % 2 ? null : (
      <Article key={pos} evenArticle={item} oddArticle={articles[pos + 1]} />
    )
  })

  return (
    // Article space
    <div className={Classes.articleSpace}>
      {/*Title*/}
      <div className={Classes.title}>
        <h1><span><span>COSMOS.</span> We Solve.</span></h1>
      </div>
      {/*Wrapper for article items*/}
      <div className={Classes.articleWrapper}>
        {/*Article list*/}
        {articlesJxs}
      </div>
    </div>
  )
}

export default ArticleSpace
