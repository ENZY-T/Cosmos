import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../GlobalData/Global';
import LoaderSpinner from '../Loader-Spinner';
import ProjCard from '../proj_card';

//// Relates projects list => To be generated later(Not Implemented)
// For now only the total list of projects are shown
// Show implement a prioritizing algorithm to obtain related Projects
const RelatedProjects = () => {
	const [relates, setRelates] = useState([]);
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		allProjectFetcher();
	}, []);

	const allProjectFetcher = async () => {
		setLoading(true);
		await axios
			.get(serverUrl + '/api/cards/projects')
			.then((res) => {
				setRelates(res.data);
				setLoading(false);
			})
			.catch((error) => setLoading(false));
	};

	if (isLoading) return <LoaderSpinner isPending={true} />;
	return (
		<>
			<div>
				<h1 className='display-6 mx-2 mx-md-5'>Browse more projects . . .</h1>
			</div>
			<div className='d-flex flex-row scroll-x'>
				{relates.map((item) => {
					return (
						<div style={{ transform: 'scale(0.8)' }}>
							<ProjCard
								id={item.id}
								key={item.id}
								title={item.title}
								cover={item.mediaURIs[0]}
								tagline={item.tagline}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default RelatedProjects;
