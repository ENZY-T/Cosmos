import React from "react";
import Classes from "../Styles/article.module.css";
import ReactPlayer from "react-player";

//#region Interfaces
// article template(Global)
interface IArticle {
  articleId: string;
  title: string;
  description: string;
  mediaType: string;
  media: string;
}

// Props for this comp.
interface IProps {
  article: IArticle;
}
//#endregion

const Article = (props: IProps) => {
  const mediaItem = () => {
    if (props.article.mediaType === "video") {
      return (
        <video src={props.article.media} className={Classes.mediaContent} />
      );
    } else if (props.article.mediaType === "image") {
      return <ReactPlayer url="" controls={false} />;
    } else {
      return null;
    }
  };
  return (
    // Article
    <div className={Classes.article}>
      {/*Article Wrapper*/}
      <div className={Classes.articleWrapper}>
        {/*Text Wrapper*/}
        <div className={Classes.textWrapper}>
          {/*Title*/}
          <div className={Classes.title}>{props.article.title}</div>

          {/*Descriptive Text*/}
          <div className={Classes.description}>{props.article.description}</div>
        </div>

        {/*Media Wrapper*/}
        <div className={Classes.mediaWrapper}>
          {/*Media Content*/}
          {mediaItem()}
        </div>
      </div>

      {/*Article Wrapper - Reverse*/}
      <div className={Classes.articleWrapper}>
        {/*Media Wrapper*/}
        <div className={Classes.mediaWrapper}>
          {/*Media Content*/}
          {mediaItem()}
        </div>

        {/*Text Wrapper*/}
        <div className={Classes.textWrapper}>
          {/*Title*/}
          <div className={Classes.title}>{props.article.title}</div>

          {/*Descriptive Text*/}
          <div className={Classes.description}>{props.article.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Article;
