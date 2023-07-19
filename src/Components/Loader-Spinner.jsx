import React from 'react'


// style={{
//     width: '5rem',
//         height: '5rem',
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-%50,-50%)',
//         color:'Black'
// }}

const LoaderSpinner = (props) => {
    return props.isPending ? (
        <div className="spinner-border" style={{
            width: '3rem',
            height: '3rem',
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: 'Black'
        }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    ) : null
}

export default LoaderSpinner
