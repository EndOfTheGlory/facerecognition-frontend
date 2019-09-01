import React from 'react';


const Rank = ({nickname, entries}) => {
	return(
	<div>
		<div className='f3 white'>
			<p>
			{`${nickname},Your current entry count is `}
			</p>
		</div>
		<div className='f2 white'>
			{entries}
		</div>
	</div>
	)
}

export default Rank;