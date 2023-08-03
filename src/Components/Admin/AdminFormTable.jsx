import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Classes from '../../Styles/AdminFormTable.module.scss';
import Button from '@mui/material/Button';
import MuiStyledTextArea from '../MuiStyledTextArea';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { serverUrl } from '../../GlobalData/Global';

const XImg = styled.img`
	border-radius: var(--globalBorderRadius);
	aspect-ratio: 1;
	object-fit: contain;
	border: 2px rgba(255, 255, 255, 0.3) solid;
`;

// typeof(data) => {files:[{id:Number, image:File, desc:String}, uris:{id:Number, image:String, desc:String}]}
export default function AdminFormTable({ data, setData, sx }) {
	const editingAdminItem = useSelector((state) => state.adminState.editingAdminItem);
	const tableContainer = useRef();

	const handleRemoveImage = (remId) => {
		setData((prev) => prev.filter((item) => item.id !== remId));
	};
	const handleDescriptionChange = (text, id, isUriImage = false) => {
		setData((prev) => {
			const type = isUriImage ? 'uris' : 'files';
			const edited = {
				...prev[type][id],
				desc: text,
			};
			return {
				...prev,
				[type]: Array.from(prev[type])
					.slice(0, id)
					.concat(edited)
					.concat(prev[type].slice(id + 1)),
			};
		});
	};

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	const imageTag = (image, isUris = false) => {
		if (isUris) return <XImg key={image?.split('/')[-1]} src={serverUrl + image} alt='No Preview' />;
		else return <XImg key={image.name} src={URL.createObjectURL(image)} alt='No Preview' />;
	};

	const delButton = (id) => (
		<Button variant='outlined' color={'error'} size={'small'} onClick={() => handleRemoveImage(id)}>
			Remove
		</Button>
	);

	return (
		<TableContainer
			ref={tableContainer}
			component={Paper}
			sx={{ ...sx, height: 300 }}
			className={Classes.adminFormTabPaper}
		>
			<Table aria-label='simple table' stickyHeader>
				<TableBody>
					{data?.uris?.map((row, index) => (
						<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell width={10} sx={{ p: 1 }}>
								{index + 1}
							</TableCell>
							<TableCell width={100} sx={{ p: 1 }}>
								{row.image && imageTag(row.image, true)}
							</TableCell>
							<TableCell sx={{ p: 1, flex: 1 }} display={'flex'}>
								<MuiStyledTextArea text={row.desc} setText={handleDescriptionChange} id={row.id} isUriImage={true} />
							</TableCell>
							<TableCell width={100} sx={{ p: 1 }}>
								{delButton(row.id)}
							</TableCell>
						</TableRow>
					))}
					{data?.files?.map((row, index) => (
						<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell width={10} sx={{ p: 1 }}>
								{index + 1}
							</TableCell>
							<TableCell width={100} sx={{ p: 1 }}>
								{row.image && imageTag(row.image)}
							</TableCell>
							<TableCell sx={{ p: 1, flex: 1 }} display={'flex'}>
								<MuiStyledTextArea text={row.desc} setText={handleDescriptionChange} id={row.id} />
							</TableCell>
							<TableCell width={100} sx={{ p: 1 }}>
								{delButton(row.id)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
