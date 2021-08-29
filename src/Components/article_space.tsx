import React, { useEffect, useState } from "react";
import Article from "./article";
import Classes from "../Styles/article_space.module.css";

//#region Interfaces
interface IArticle {
  articleId: string;
  title: string;
  description: string;
  mediaType: string;
  media: string;
}
//#endregion

const ArticleSpace = () => {
  //#region Generating Dummy data
  const dummy: [IArticle] = [
    {
      articleId: "01",
      title: "Solutions With Modern Automation\n" + "Equipment",

      description:
        "More accuracy new IO equipment\n" +
        "and new communication technologies\n" +
        "are used for the solutions.",
      mediaType: "image",
      media: "url",
    },
  ];

  //#endregion

  // States
  const [articles, setArticles] = useState(dummy);

  //#region  Dummy data loading
  const loadDummyData = async () => {
    // await fetch('https://jsonplaceholder.typicode.com/photos')
    //     .then(response => response.json())
    //     .then(json => setArticles(json));
  };

  useEffect(() => {
    loadDummyData().then((r) => {});
  }, []);
  //#endregion

  const articleItems = articles.map((item, pos) => {
    return <Article key={item.articleId} article={item} />;
  });

  return (
    // Article space
    <div className={Classes.articleSpace}>
      {/*Title*/}
      <div className={Classes.title}>
        <h1>Cosmos. We Solve.</h1>
      </div>

      {/*Wrapper for article items*/}
      <div className={Classes.articleWrapper}>
        {/*Article list*/}
        {articleItems}
      </div>
    </div>
  );
};

export default ArticleSpace;
