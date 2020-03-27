import React from 'react';

const Rank = ({name, score}) => {
	return(
		<div className='white'>
			{`${name}, your current entry count is...`}
		      <div className='white f1 '>
		        {score}
		      </div>
		</div>
	);
}

export default Rank