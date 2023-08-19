import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import AddReviewModal from './AddReviewModal';
import axios from 'axios';
import { serverUrl } from '../../GlobalData/Global';

import { useDispatch } from 'react-redux';
import { setAlertMsg } from '../../Store/Slices/AppStateSlice';
import ReviewCard from '../ReviewCard';

export default function ReviewPanel({ projectId }) {
	const [reviews, setReviews] = useState([]);
	const [refreshHandle, setRefreshHandle] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get(serverUrl + `/api/cards/projects/${projectId}/reviews`)
			.then((res) => {
				if (res.status === 200) setReviews(res.data);
			})
			.catch((err) => dispatch(setAlertMsg(err)));
	}, [projectId, refreshHandle]);

	return (
		<MDBContainer className='py-5'>
			<MDBRow className='d-flex justify-content-center'>
				<MDBCol md='10' xl='8' className='text-center'>
					<h3 className='mb-4 display-6'>Our Valuable Customer Reviews</h3>
					<p className='mb-4 pb-2 mb-md-5 pb-md-0'>Your feedbacks are our motivation !</p>
				</MDBCol>
			</MDBRow>
			<MDBRow className='my-5 py-5 px-5 d-flex justify-content-end'>
				<AddReviewModal projectId={projectId} setRefreshHandle={setRefreshHandle} />
			</MDBRow>
			<MDBRow className='text-center scroll-x flex-nowrap'>
				{reviews?.length > 0 ? (
					reviews.map((item) => <ReviewCard item={item} setRefreshHandle={setRefreshHandle} />)
				) : (
					<h1 className='is-size-5'>No reviews yet. Please add your reivew on this project</h1>
				)}
			</MDBRow>
		</MDBContainer>
	);
}
