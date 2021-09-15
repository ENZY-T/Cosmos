import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface IProps2 extends IProps {
  autoHideDuration: number
}

export const XNotification = (props: IProps2) => {
  const [notificationVisibility, setNotificationVisibility] = useState(false)

  useEffect(() => {
    if (props.progress > 0 && props.progress < 100) {
      setNotificationVisibility(true)
    } else if (props.progress === 100) {
      startClosing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.progress])

  const startClosing = () =>
    setTimeout(() => {
      setNotificationVisibility(false)
    }, props.autoHideDuration * 1000)

  return (
    <NotificationCore
      isVisible={notificationVisibility}
      message={props.message}
      progress={props.progress}
    />
  )
}

interface IProps {
  message: string
  progress: number
  isVisible: boolean
}

interface sProps {
  progress: number
}

const WrapperBox = styled.div<sProps>`
  position: absolute;
  z-index: 12;
  border-radius: 5px;
  width: 400px;
  margin: 0 auto;
  background-color: #54a6d7;
  height: 50px;
  font-weight: 600;
  box-shadow: 1px 4px 4px rgba(28, 28, 28, 0.64);

  display: flex;
  color: rgba(0, 0, 0, 0.64);
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;

  & * {
    width: 100%;
    align-self: center;
    text-align: center;
  }

  & > div:last-of-type {
    background-color: #cde1e5;
    height: 3px;
    margin: 0 10px;
    width: 90%;
    overflow: hidden;
    border-radius: 3px;

    & > div {
      background-color: #014a5e;
      height: 100%;
      width: ${(sProps) => sProps.progress.toString() + '%'};
      border-radius: 3px;
      transition: all 0.3s ease-out;
    }
  }
`

const NotificationCore = (props: IProps) => {
  return props.isVisible ? (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '50px',
      }}>
      <WrapperBox progress={props.progress}>
        <div>{props.message}</div>
        <div>
          <div />
        </div>
      </WrapperBox>
    </div>
  ) : null
}
