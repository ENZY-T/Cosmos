import React from 'react';


const HeadingGreenBoxed = (props) => {
    const styles = {
        h2: {
            zIndex: 1200,
            margin: '1.5rem 0',
            fontWeight: 700,
            fontSize: '3rem',
            fontFamily: "''Poppins', sans-serif'",
        },
        span: {
            color: '#00a6a6',
            backgroundColor: 'rgba(0, 166, 166, 0.2)',
            borderRadius: '3px',
            padding: '0 15px'
        }
    }


    return (
        <h2 className={props.className} style={styles.h2}>
            <span style={styles.span}>{props.titleGreen}</span>
            {'  '}{props.titleRaw ? props.titleRaw : ''}
        </h2>
    );
};

export default HeadingGreenBoxed;