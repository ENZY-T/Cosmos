import React from 'react';
import Classes from '../Styles/Team_Space.module.scss';
import { teamCrew } from '../GlobalData/Global';
import PersonCard from './Person_Card';

const TeamSpace = () => {
	const personListJsx = teamCrew.map((item, pos) => {
		return <PersonCard key={pos} person={item} />;
	});

	return (
		<div className={Classes.teamSpace}>
			<div className={Classes.title}>
				<span>
					<span>Team</span> of Experts
				</span>
			</div>
			<div className={Classes.text}>
				<p>
					Rooted in ethics and integrity, our team of experts leverages these foundational principles to amplify the
					impact of our company's unparalleled expertise
				</p>
			</div>
			{personListJsx}
		</div>
	);
};

export default TeamSpace;
