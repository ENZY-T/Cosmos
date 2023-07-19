import React, {useEffect, useRef, useState} from 'react';

export const useOutClickedAlert = (ref, setOutClicked) => {
    useEffect(() => {

        //EventListener
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutClicked(true)
            }
        }
        //Binding EventListeners
        document.addEventListener("mousedown", handleClick)
        //CleanUp
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ref])
};

const PopupWrapper = (props) => {
    const wrapperRef = useRef(null);
    const [outClicked, setOutClicked] = useState(false)
    useOutClickedAlert(wrapperRef, setOutClicked)

    return (outClicked ? null : (<div ref={wrapperRef}>{props.children}</div>))
}

export default PopupWrapper;