import React from 'react';
import './RecognizeFace.css';

const RecognizeFace = ({ pictureUrl , boxFace }) => {
	console.log('final box',boxFace)
	return(
	<div className='center'>
		<div className='mt4'>
			<img id='inputedimage' src={pictureUrl} width='400px' height='auto' alt=''/>
			<div className='bounding' style={{top: boxFace.topRow, right: boxFace.rightCol, left: boxFace.leftCol, bottom: boxFace.bottomRow }}></div>
		</div>
	</div>
	)
}


export default RecognizeFace;