import React from 'react';

const LoggedMain = () => {

    const load = async()=> {
        const response = await fetch('http://localhost:8000/api/auth/user', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        const content = await response.json();
        console.log(content);
    }
    return (
        <div>

        </div>
    );
};

export default LoggedMain;