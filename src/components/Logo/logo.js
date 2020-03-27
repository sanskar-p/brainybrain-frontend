import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
	return(
		<div className='ma4 mt0 center'>
			<Tilt className="Tilt" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa2"> <img alt='logo' src={brain}/> </div>
			</Tilt>
			
		</div>
	);
}

export default Logo;