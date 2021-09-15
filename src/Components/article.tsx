import React, { useState } from 'react'
import Classes from '../Styles/article.module.scss'
import ReactPlayer from 'react-player'
import { IArticle } from '../Services/Dtos'
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded'
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded'
const vPath = require('../video/vid02.mp4') // call as : vPath.default

// Props for this comp.
interface IProps {
  evenArticle: IArticle | null
  oddArticle: IArticle | null
}

// Video url = "https://www.youtube.com/watch?v=K4TOrB7at0Y"
const Article = (props: IProps) => {
  // States
  const [playingEven, setPlayingEven] = useState(false)
  const [playingOdd, setPlayingOdd] = useState(false)

  const mediaItem = (article: IArticle | null, playing?: boolean) => {
    // Displaying Video
    if (article?.mediaType === 'video') {
      return (
        <ReactPlayer
          url={vPath.default}
          playing={playing}
          config={{
            file: {
              attributes: {
                controlsList: 'nofullscreen',
              },
            },
          }}
        />
      )
      // Displaying Photo
    } else if (article?.mediaType === 'image') {
      return <img src={article?.mediaURIs[0]} alt='' />
    } else {
      return null
    }
  }

  return (
    // Article
    <div className={Classes.article}>
      {/*Article Wrapper*/}
      <div className={Classes.articleWrapper}>
        {/*Text Wrapper*/}
        <div className={Classes.textWrapper}>
          {/*Title*/}
          <div className={Classes.title}>{props.evenArticle?.title}</div>

          {/*Descriptive Text*/}
          <div className={Classes.description}>
            {props.evenArticle?.description}
          </div>
        </div>

        {/*Media Wrapper*/}
        <div className={Classes.mediaWrapper}>
          {/*Media Content*/}
          {mediaItem(props.evenArticle, playingEven)}
          {props.evenArticle?.mediaType === 'image' ? null : (
            <div
              onClick={() => {
                setPlayingEven(!playingEven)
              }}>
              {!playingEven ? (
                <PlayCircleFilledRoundedIcon />
              ) : (
                <PauseCircleFilledRoundedIcon style={{ opacity: '0.05' }} />
              )}
            </div>
          )}
        </div>
      </div>

      {/*Article Wrapper - Reverse*/}
      {props.oddArticle === undefined ? null : (
        <div className={`${Classes.articleWrapper}  ${Classes.reverse}`}>
          {/*Media Wrapper*/}
          <div className={Classes.mediaWrapper}>
            {/*Media Content*/}
            {mediaItem(props.oddArticle, playingOdd)}
            {props.oddArticle?.mediaType === 'image' ? null : (
              <div
                onClick={() => {
                  setPlayingOdd(!playingOdd)
                }}>
                {!playingOdd ? (
                  <PlayCircleFilledRoundedIcon />
                ) : (
                  <PauseCircleFilledRoundedIcon />
                )}
              </div>
            )}
          </div>

          {/*Text Wrapper*/}
          <div className={`${Classes.textWrapper} ${Classes.textReverse}`}>
            {/*Title*/}
            <div className={Classes.title}>{props.oddArticle?.title}</div>

            {/*Descriptive Text*/}
            <div className={Classes.description}>
              {props.oddArticle?.description}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Article
