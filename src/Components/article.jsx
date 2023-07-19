import React, {useState} from 'react'
import Classes from '../Styles/article.module.scss'
import ReactPlayer from 'react-player'
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded'
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded'
import {serverUrl} from '../GlobalData/Global'

// const vPath = require('../video/vid02.mp4') // call as : vPath.default


// Video url = "https://www.youtube.com/watch?v=K4TOrB7at0Y"
const Article = (props) => {
    // States
    const [playingEven, setPlayingEven] = useState(false)
    const [playingOdd, setPlayingOdd] = useState(false)

    const mediaItem = (article, playing) => {
        // Displaying Video
        if (article?.mediaType === 'video') {
            return (
                <ReactPlayer
                    url={serverUrl + article?.mediaURIs[0]}
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
        } else if (article?.mediaType !== 'video') {
            return <img src={serverUrl + article?.mediaURIs[0]} alt=''/>
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
                    <div className={Classes.tagline}>
                        {props.evenArticle?.tagline}
                    </div>
                </div>

                {/*Media Wrapper*/}
                <div className={Classes.mediaWrapper}>
                    {/*Media Content*/}
                    {mediaItem(props.evenArticle, playingEven)}
                    {props.evenArticle?.mediaType === 'video' ? (
                        <div
                            onClick={() => {
                                setPlayingEven(!playingEven)
                            }}>
                            {!playingEven ? (
                                <PlayCircleFilledRoundedIcon/>
                            ) : (
                                <PauseCircleFilledRoundedIcon style={{opacity: '0.1'}}/>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>

            {/*Article Wrapper - Reverse*/}
            {props.oddArticle === undefined ? null : (
                <div className={`${Classes.articleWrapper}  ${Classes.reverse}`}>
                    {/*Media Wrapper*/}
                    <div className={Classes.mediaWrapper}>
                        {/*Media Content*/}
                        {mediaItem(props.oddArticle, playingOdd)}
                        {props.oddArticle?.mediaType === 'video' ? (
                            <div
                                onClick={() => {
                                    setPlayingOdd(!playingOdd)
                                }}>
                                {!playingOdd ? (
                                    <PlayCircleFilledRoundedIcon/>
                                ) : (
                                    <PauseCircleFilledRoundedIcon style={{opacity: '0.05'}}/>
                                )}
                            </div>
                        ) : null}
                    </div>

                    {/*Text Wrapper*/}
                    <div className={`${Classes.textWrapper} ${Classes.textReverse}`}>
                        {/*Title*/}
                        <div className={Classes.title}>{props.oddArticle?.title}</div>

                        {/*Descriptive Text*/}
                        <div className={Classes.tagline}>
                            {props.oddArticle?.tagline}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Article
