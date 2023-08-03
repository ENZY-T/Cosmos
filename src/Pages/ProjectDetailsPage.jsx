import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../GlobalData/Global';
import { setAlertMsg } from '../Store/Slices/AppStateSlice';

const ProjectDetailsPage = ({ match }) => {
	// States
	const [project, setProject] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		projectFetcher();
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [match.url]);

	// Projects fetching function
	const projectFetcher = async () => {
		await axios
			.get(serverUrl + `/api/cards/projects/${match.params.id}`)
			.then((res) => setProject(res.data))
			.catch((error) => {
				setProject(null);
				dispatch(setAlertMsg(error.message));
			});
	};
	return (
		<div id='page-wraper' style={{ background: '#1d1d1e', color: '#' }}>
			<div className='container g-4 g-md-0'>
				<div className='row my-3 py-3'></div>
				<div className='row my-3 py-3 justify-content-center'>
					<div className='project-title col-8'>
						<figure class='text-center'>
							<blockquote class='blockquote'>
								<h1 className='display-3'>{project?.title}</h1>
							</blockquote>
							<figcaption class='blockquote-footer fs-5'>{project?.tagline}</figcaption>
						</figure>
						<hr />
					</div>
				</div>
				<div className='row my-1 py-1 justify-content-center'>
					<div className='project-discription col-8 d-flex justify-content-center'>
						<p className='d-inline' style={{ textAlign: 'justify' }}>
							{project?.description}
						</p>
					</div>
				</div>
				<div className='row my-2 py-2'></div>

				<div className='project-discription'></div>
				<hr className='my-5' style={{ height: 2 }} />
				<div className='vhcf-section'>
					{project?.mediaURIs?.map((uri, index, arr) => {
						if (index % 2 === 0)
							return (
								<div className='vhcf-row '>
									<div className='row justify-content-center align-items-center'>
										<div className='col-md' data-aos='zoom-out' data-aos-dely='400'>
											<img className='project-pic' src={serverUrl + uri} alt='' />
										</div>
										<div className='col-md py-5 p-md-2'>
											<div className=''>
												<p className='text-center text-md-start text-md-left'>
													{project?.mediaDescriptions && project?.mediaDescriptions[index]}
												</p>
											</div>
										</div>
									</div>
									<hr className='mb-5 d-md-none' />
									<div className='row justify-content-center align-items-center'>
										<div className='col-md order-md-2' data-aos-dely='800' data-aos='zoom-in'>
											<img className='project-pic' src={serverUrl + arr[index + 1]} alt='' />
										</div>
										<div className='col-md order-md-1 py-5 p-md-2'>
											<div className=''>
												<p className='text-center text-md-end' style={{ textAlign: 'justify' }}>
													{project?.mediaDescriptions && project?.mediaDescriptions[index + 1]}
												</p>
											</div>
										</div>
									</div>
									<hr className='mb-5 d-md-none' />
								</div>
							);
					})}
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsPage;
