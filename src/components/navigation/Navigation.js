import React from 'react';

const Navigation = ({ signedOrNot, didUserAuthorized }) => {
	if (didUserAuthorized){
	return(
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={() => signedOrNot('signout')} className='f2 link dim moon-gray underline-hover pa2 pointer'>Sign out</p>
		</nav>	
	 );
	} else {
	return(
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={() => signedOrNot('signin')} className='f2 link dim moon-gray underline-hover pa2 pointer'>Sign in</p>
			<p onClick={() => signedOrNot('register')} className='f2 link dim moon-gray underline-hover pa2 pointer'>Register</p>
		</nav>
	 );	
	}
}

export default Navigation;