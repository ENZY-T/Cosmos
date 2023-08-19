import { Rating } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import YesNoDialog from './YesNoDialog';
import axios from 'axios';
import { serverUrl } from '../GlobalData/Global';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertMsg } from '../Store/Slices/AppStateSlice';

export default function ReviewCard({ item, setRefreshHandle }) {
	const [delBtnLoading, setDelBtnLoading] = useState(false);
	const dispatch = useDispatch();
	const isAdmin = useSelector((state) => state.userState.isAdmin);

	const handleDelete = () => {
		setDelBtnLoading(true);
		axios
			.delete(serverUrl + `/api/cards/projects/${item.projectId}/reviews/${item.id}`)
			.then((res) => {
				dispatch(setAlertMsg('Review Deleted !'));
				setRefreshHandle((prev) => !prev);
				setDelBtnLoading(false);
			})
			.catch((err) => {
				dispatch(setAlertMsg(`Error: ${err.message}`));
				setDelBtnLoading(false);
			});
	};

	return (
		<MDBCol md='4' className='mb-5 mb-md-0'>
			<div className='d-flex justify-content-end'>
				{isAdmin && (
					<YesNoDialog onYes={handleDelete} text={'Are you sure you want to delete the review ?'}>
						<LoadingButton loading={delBtnLoading} size='small' variant='outlined' color='error'>
							<DeleteIcon />
						</LoadingButton>
					</YesNoDialog>
				)}
			</div>
			{/* <div className='d-flex justify-content-center mb-4'>
				<img
					src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp'
					className='rounded-circle shadow-1-strong'
					width='150'
					height='150'
					alt=''
				/>
			</div> */}
			<h1 className='mb-3 is-size-5 has-text-weight-bold	'>{item?.authorName}</h1>
			<h5 className='mb-3'>{item?.authorEmail}</h5>
			<h6 className='text-primary mb-3'>{item?.authorRole}</h6>
			<Rating name='read-only' value={item?.rating} readOnly />
			<p className='px-xl-3'>
				{item?.comment && <MDBIcon fas icon='quote-left' className='pe-2' />}
				{item?.comment}
			</p>
		</MDBCol>
	);
}
