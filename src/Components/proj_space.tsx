import React, {useState} from 'react';
import Classes from '../Styles/proj_space.module.css'
import ProjCard from "./proj_card";

const ProjSpace = () => {
    //List of json objects from database.
    const projArr = () => [
        {id:1, title : "03", cover :"url03", description : "desc03"},
        {id:2, title : "03", cover :"url03", description : "desc03"},
    ]

    const projArr2 = () => [
        {id:1, title : "03", cover :"url03", description : "desc03"},
        {id:2, title : "03", cover :"url03", description : "desc03"},
        {id:3, title : "01", cover :"url01", description : "desc01"},
        {id:4, title : "02", cover :"url02", description : "desc02"},
        {id:5, title : "03", cover :"url03", description : "desc03"},
        {id:6, title : "03", cover :"url03", description : "desc03"},
        {id:7, title : "01", cover :"url01", description : "desc01"},
        {id:8, title : "02", cover :"url02", description : "desc02"},
        {id:9, title : "03", cover :"url03", description : "desc03"},
        {id:10, title : "03", cover :"url03", description : "desc03"},
        {id:11, title : "01", cover :"url01", description : "desc01"},
        {id:12, title : "02", cover :"url02", description : "desc02"},
    ]

    const [cardList,setCardList] = useState(projArr2());

    //injecting the json object data to the project card component
    const projCardList = cardList.map((item,id)=>{
        return(
          <ProjCard key={id} title={item.title} cover={item.cover} description={item.description}/>
        );
    })
    
    return (
        <div className={Classes.projSpace}>
            <div className={Classes.title}>Projects</div>
            {projCardList}
        </div>
    );
};

export default ProjSpace;