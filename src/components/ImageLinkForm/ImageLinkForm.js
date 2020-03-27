import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({inputChange, submit}) => {
	return(
		<div>
			<p className='f3 white'>
			{'Give me a photo and I will give you a face.'}
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 form'>
					<input 
						className='f4 pa2 w-70 center' 
						type='text' 
						onChange = {inputChange}
						placeholder='Insert link of image'
					/>
					<button 
						className='grow f4 link ph3 pv2 dib white bg-black hover-bg-gray hover-white pa2 but-pad' 
						onClick={submit}
					>{'shakalakaboomboom'}</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm