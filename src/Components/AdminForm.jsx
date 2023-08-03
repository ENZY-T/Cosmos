import React, { useContext, useEffect, useState } from 'react';
import Classes from '../Styles/AdminForm.module.scss';
import XButton from './StyledComponents/XButton';
import axios from 'axios';
import { serverUrl } from '../GlobalData/Global';
import { XNotification } from './StyledComponents/Notification';
import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdminPanelContext } from '../Context/AdminPanelContext';
import AdminFormTable from './Admin/AdminFormTable';
import { setAlertMsg } from '../Store/Slices/AppStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminFormOpen, setSelectedAdminItemType } from '../Store/Slices/AdminStateSlice';

const XImg = styled.img`
	border-radius: var(--globalBorderRadius);
	aspect-ratio: 1;
	object-fit: contain;
	border: 2px rgba(255, 255, 255, 0.3) solid;
`;

const AdminForm = (props) => {
	//region States
	const editingAdminItem = useSelector((state) => state.adminState.editingAdminItem);
	const selectedAdminItemType = useSelector((state) => state.adminState.selectedAdminItemType);

	const [id, setId] = useState('');
	const [title, setTitle] = useState('');
	const [tagline, setTagline] = useState('');
	const [description, setDescription] = useState('');
	const [images, setImages] = useState({ uris: [], files: [] }); // type => {files:[{id:Number, image:File, desc:String}], uris:[{id:Number, image:String, desc:String}]}
	const [progress, setProgress] = useState(0);
	const [imVidAlignment, setImVidAlignment] = useState('image');

	const dispatch = useDispatch();

	useEffect(() => {
		if (editingAdminItem) {
			if (editingAdminItem?.mediaURIs?.length > 0)
				setImages((prev) => ({
					...prev,
					uris: editingAdminItem.mediaURIs.map((uri, index) => ({
						id: index,
						image: uri,
						desc: editingAdminItem?.mediaDescriptions?.[index] || '',
					})),
				}));

			setId(editingAdminItem.id);
			setTitle(editingAdminItem.title);
			setTagline(editingAdminItem.tagline);
			setDescription(editingAdminItem.description);
		}
	}, []);

	const handleImVidChange = (event, newAlignment) => {
		setImVidAlignment(newAlignment);
	};
	//endregion

	//region Use Context
	const { refreshPanel } = { ...useContext(AdminPanelContext) };
	//endregion

	// Styling
	const articleBtnStyle = selectedAdminItemType === 'project' ? undefined : Classes.clickedBtn;
	const projBtnStyle = selectedAdminItemType === 'project' ? Classes.clickedBtn : undefined;

	// On form submission sending create HTTP req
	const handleSubmitStart = async (e) => {
		e.preventDefault();
		// Configuring FormData Object
		const formData = new FormData();

		if (editingAdminItem) formData.append('id', id);
		formData.append('title', title);
		formData.append('tagline', tagline);
		formData.append('description', description);
		formData.append('mediaType', imVidAlignment);

		if (images?.uris?.length > 0) {
			for (let i = 0; i < images.uris.length; i++) {
				formData.append('mediaURIs', images.uris[i].image);
				formData.append('uriDescriptions', images.uris[i].desc);
			}
		}
		if (images?.files?.length > 0) {
			for (let i = 0; i < images.files.length; i++) {
				formData.append('media', images.files[i].image, images.files[i].image.name);
				formData.append('mediaDescriptions', images.files[i].desc);
			}
		}

		// Endpoint must be set respect to the selected type of the form (project/article)
		const urlEndpoint = selectedAdminItemType === 'project' ? 'projects' : 'articles';

		const axiosConfig = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			maxBodyLength: Infinity,
			maxContentLength: Infinity,
			onUploadProgress: (progressEvent) => setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100)),
		};
		if (editingAdminItem) {
			await axios
				.put(serverUrl + `/api/cards/${urlEndpoint}`, formData, axiosConfig)
				.then(() => handleSubmitComplete())
				.catch((err) => dispatch(setAlertMsg(err.message)));
		} else {
			await axios
				.post(serverUrl + `/api/cards/${urlEndpoint}`, formData, axiosConfig)
				.then(() => handleSubmitComplete())
				.catch((err) => dispatch(setAlertMsg(err.message)));
		}
	};

	const handleSubmitComplete = () => {
		document.getElementById('fileInput').value = '';
		refreshPanel?.();
		dispatch(setAdminFormOpen(false));
	};

	const handleFiles = (files) => {
		let imgArr = [];
		if (files !== null) {
			for (let i = 0; i < files.length; i++) {
				imgArr?.push({ id: images.files.length + i, image: files[i], desc: '' });
			}
		}
		setImages((prev) => ({
			...prev,
			files: prev.files.concat(imgArr),
		}));
	};

	// Additional Style for main
	const mainStyleMore = {
		width: '100%',
	};

	return (
		<main className={Classes.main} style={props.isFullWidth ? mainStyleMore : undefined}>
			<form className={Classes.form} onSubmit={(e) => handleSubmitStart(e)}>
				<div className={Classes.bg} />
				<div className={Classes.bg2} />
				<div className={Classes.contentWrapper}>
					<h4>Edit {selectedAdminItemType === 'project' ? 'Project' : 'Article'}</h4>
					<div className={Classes.selectorPlate}>
						<XButton
							className={projBtnStyle}
							type='button'
							onClick={() => dispatch(setSelectedAdminItemType('project'))}
							invisible={'false'}
						>
							Project
						</XButton>
						<XButton
							className={articleBtnStyle}
							type='button'
							onClick={() => dispatch(setSelectedAdminItemType('article'))}
							invisible={'false'}
						>
							Article
						</XButton>
					</div>

					{/* Title */}
					<input
						type='text'
						placeholder='Title'
						required
						autoFocus
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					></input>

					{/* TagLine */}
					<input
						type='text'
						placeholder='Brief      #It is displayed in the project card'
						required
						autoFocus
						value={tagline}
						onChange={(e) => setTagline(e.target.value)}
					></input>

					{/* Video/photo Selector buttons */}
					{selectedAdminItemType === 'article' && (
						<ToggleButtonGroup
							style={{ color: 'azure' }}
							color='info'
							value={imVidAlignment}
							exclusive
							fullWidth
							onChange={handleImVidChange}
						>
							<ToggleButton value='image' sx={{ color: '#b0b0b0' }}>
								Images
							</ToggleButton>
							<ToggleButton value='video' sx={{ color: '#b0b0b0' }}>
								Video
							</ToggleButton>
						</ToggleButtonGroup>
					)}

					<div className={Classes.fileHandlerWrapper}>
						{(images?.uris?.length > 0 || images?.files?.length > 0) && (
							<AdminFormTable sx={{ mt: 2 }} data={images} setData={setImages} />
						)}

						{/*File Browser*/}
						<div className={Classes.fileHandler}>
							<label> Select Images</label>
							<input
								id='fileInput'
								type='file'
								multiple={selectedAdminItemType === 'project'}
								className='visually-hidden'
								onChange={(event) => handleFiles(event.target.files)}
							/>
							<label htmlFor='fileInput'>
								{' '}
								<i className='far fa-file-image' /> <i className='fas fa-upload' />
							</label>
						</div>
					</div>

					{/* Description */}
					{selectedAdminItemType === 'project' && (
						<textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
					)}
					<div className={Classes.actionBtnPlate}>
						<XButton className={Classes.btnLogin} invisible={'false'} type='submit'>
							Save & Preview
						</XButton>
						<XButton
							className={Classes.btnLogin}
							onClick={() => dispatch(setAdminFormOpen(false))}
							invisible={'false'}
							type='button'
						>
							Close
						</XButton>
					</div>
					<XNotification
						message={`Uploading: ${progress} %`}
						progress={progress}
						autoHideDuration={0.5}
						isVisible={true}
					/>
				</div>
			</form>
		</main>
	);
};

export default AdminForm;
