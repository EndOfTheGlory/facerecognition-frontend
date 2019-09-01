import React from 'react';
import './InputUrl.css'

const InputUrl = ({onInputChange,onButtonSumbit}) => {
	return(
	<div>
		<p className='f3'>
		 {'Superbrain stolen from secret lab will find your face'}
		</p>
		<div className='center'>
			<div className='pa4 br1 shadow-5 center pattern'>
				<input type='text' className='pa2 f3 w-60 dim bg-purple br-yellow' onChange={onInputChange}/> 
				<button 
				className='f4 grow dib link pv3 ph4 w-40 bg-light-purple' 
				onClick = {onButtonSumbit}>Check Image </button>
			</div>
			<div>

			</div>
		</div>
	</div>
	)
}

export default InputUrl;