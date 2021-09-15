import React from 'react'
import ArticleSpace from '../Components/article_space'
import ProjSpace from '../Components/proj_space'
import Classes from '../Styles/Home.module.scss'

const Home = () => {
  return (
    <>
      {/*Home Cover*/}
      <div className={Classes.cover}>
        {/*Cover Background*/}
        <div className={Classes.background}>
          <div className={Classes.overlay} />
        </div>
        <div className={Classes.mainTitle}>
          <p>COSMOS</p>
          <p>ENGINEERING SOLUTIONS</p>
        </div>
        <div className={Classes.subTitle}>
          <span>
            We are Experts in the Engineering Industry
            <br />
            and We Create the Best Solutions
            <br /> with the Best Technologies for Your Need
          </span>
        </div>
        <div className={Classes.overlay} />
      </div>
      <ArticleSpace />
      <ProjSpace />
    </>
  )
}

export default Home
