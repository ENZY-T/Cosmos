import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StarRating from './StarRating';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../GlobalData/Global';
import { useDispatch } from 'react-redux';
import { setAlertMsg } from '../../Store/Slices/AppStateSlice';

export default function AddReviewModal({ projectId, setRefreshHandle }) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState('');
	const [role, setRole] = useState('');

	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setName('');
		setEmail('');
		setRating(5);
		setComment('');
		setRole('');

		setOpen(false);
	};

	const handleSave = () => {
		axios
			.post(
				serverUrl + `/api/cards/projects/${projectId}/reviews`,
				{
					Rating: rating,
					AuthorName: name,
					AuthorEmail: email,
					AuthorRole: role,
					Comment: comment,
					ProjectId: projectId,
				},
				{
					withCredentials: true,
				},
			)
			.then((res) => {
				dispatch(setAlertMsg('Review Added Successfully !'));
				setRefreshHandle((prev) => !prev);
				handleClose();
			})
			.catch((err) => {
				console.log(err);
				dispatch(
					setAlertMsg(
						`Error: ${
							err?.response?.data?.status === 400
								? Object.values(err.response.data.errors).map((error) => `${error} `)
								: err?.message
						}`,
					),
				);
			});
	};

	return (
		<>
			<Button variant='text' onClick={handleClickOpen} className='w-auto'>
				Add Review
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Review</DialogTitle>
				<DialogContent>
					<DialogContentText>Feel free to add your feedback</DialogContentText>

					<div className='row'>
						<div className='col'>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Name'
								type='text'
								fullWidth
								variant='standard'
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='col'>
							<TextField
								autoFocus
								margin='dense'
								id='role'
								label='Role/Job Title'
								type='text'
								fullWidth
								variant='standard'
								onChange={(e) => setRole(e.target.value)}
							/>
						</div>
					</div>

					<div className='row'>
						<div className='col'>
							<TextField
								autoFocus
								margin='dense'
								id='email'
								label='Email Address'
								type='email'
								fullWidth
								variant='standard'
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='col'>
							<StarRating rating={rating} setRating={setRating} />
						</div>
					</div>

					<TextField
						multiline
						rows={4}
						margin='dense'
						id='name'
						label='Comment'
						fullWidth
						variant='standard'
						onChange={(e) => setComment(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
