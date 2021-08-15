import React from 'react';

const Home = (props: {name : string}) => {

    return (
        <div>
            <h1>Home</h1>
            <h3>{props.name ? 'Hi, ' + props.name : 'You are not logged in'}</h3>
        </div>
    );
    };

export default Home;