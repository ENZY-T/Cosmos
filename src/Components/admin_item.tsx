import React, {useState} from 'react';
import Classes from '../Styles/Admin_item.module.css'
import testIcon1 from '../img/ico1.jpg'

const AdminItem = () => {
    // States
    const [title, setTitle] = useState('');
    const [date, setDate] = useState((new Date()).toDateString());
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    //testing

    //Casting Multiple CSS classes
    const classText = [];
        classText.push(Classes.text)

    return (
        <div className={Classes.adminItem}>
            <img src={testIcon1} alt=""/>
            <div className={Classes.dataPlate}>
                <div className={classText.join(' ')} >Item 01</div>
                <div>{`Created on : ${date}`}</div>
            </div>
            <div className={Classes.description} >{'Hello the test description'}</div>
            <div className={Classes.btnPanel} >
                <i className="fas fa-edit"/>
                <i className="fas fa-trash-alt"/>
            </div>
        </div>
    );
};

export default AdminItem;