import styled from 'styled-components';

const XButton = styled.button`
	margin: 8px;
	border: 1.5px solid var(--globalGreen);
	border-radius: 3px;
	background-color: var(--globalGreen_Trans);
	transition: all, 2s, ease-out;
	visibility: ${(sProps) => (sProps.invisible === 'true' ? 'hidden' : 'visible')};
	flex: 0 0 auto;

	font-size: 1.05em;
	font-weight: 400;
	text-decoration: none;
	color: var(--globalWhite);
	padding: 0.25em 0.5em;

	& * {
		text-decoration: none;
	}

	&:hover {
		color: azure;
		background-color: rgba(5, 130, 131, 0.65);
		transition: all 0.3s ease-out;
	}
`;
export default XButton;
