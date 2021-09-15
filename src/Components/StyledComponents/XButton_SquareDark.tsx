import styled from 'styled-components'

// Styled components
//interface for sProps to pass into style component
interface sProps {
    invisible: boolean
    isClicked: boolean
    disabled?: boolean
}

const XButtonSquareDark = styled.button<sProps>`
  margin: 8px;
  transition: all, 2s, ease-out;
  visibility: ${(sProps) => (sProps.invisible ? 'hidden' : 'visible')};
  border: solid 1px #6a6a6a;
  background-color: #333333;
  border-radius: 1px;
  flex: 1 0 auto;

  font-size: 1.05em;
  font-weight: 400;
  text-decoration: none;
  color: var(--globalWhite);
  padding: 0.25em 1em;
  text-align: center;
  opacity: ${sProps => sProps.disabled ? '0.3' : '1'};

  & * {
    text-decoration: none;
  }

  &:hover {
    background-color: ${sProps => sProps.disabled ? '#333333' : '#6a6a6a'};
  }

  &:active {
    background-color: #333333;
    transform: ${sProps => sProps.disabled ? 'scale(1,1)' : 'scale(0.96, 0.96)'};
  }

  //For Clicked State
  transform: ${(sProps) => (sProps.isClicked ? 'scale(1.08, 1.08)' : '')};
  background-color: ${(sProps) => (sProps.isClicked ? ' #6a6a6a' : '')};
  color: ${(sProps) => (sProps.isClicked ? 'azure' : '')};
`
export default XButtonSquareDark
