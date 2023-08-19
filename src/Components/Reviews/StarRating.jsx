import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Label } from '@material-ui/icons';
import { useEffect } from 'react';

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
};

function getLabelText(value) {
	return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function StarRating({ setRating }) {
	const [value, setValue] = React.useState(5);
	const [hover, setHover] = React.useState(-1);

	useEffect(() => {
		setRating?.(value);
	}, [value]);

	return (
		<Box
			sx={{
				width: 200,
				display: 'flex',
				alignItems: 'center',
				marginTop: '20px',
			}}
		>
			<Rating
				name='hover-feedback'
				value={value}
				precision={1}
				getLabelText={getLabelText}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
			/>
			{value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
		</Box>
	);
}
