import React, {Component} from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/rank';
import SignIn from './components/SignIn/signin';
import Register from './components/Register/register';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
	particles: {
        number:{
        	value: 100,
        	density: {
        		enable: true,
        		value_area: 800
        	}
        },
        line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
    }
}
const initialState = {
	input: '',
		imageURL: '',
		box: {},
		route: 'signin',
		isSignedIn: false,
		user:{
			id: '',
			name: '',
			pass: '',
			email: '',
			score:0,
			joined: ''
			}
}

class App extends Component {
	constructor(){
		super();
		this.state=initialState;
	}

	loadUser = (data) => {
		this.setState(
			{user:{
				id: data.id,
				name: data.name,
				pass: data.pass,
				email: data.email,
				score: data.score,
				joined: data.joined
			}}
		)
	}

	calculateFacePosition = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return{
			topRow: clarifaiFace.top_row * height,
			leftCol: clarifaiFace.left_col * width,
			botRow: height - (clarifaiFace.bottom_row * height),
			rightCol: width - (clarifaiFace.right_col * width)
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box:box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onSubmit = () => {
		fetch('https://shrouded-savannah-19779.herokuapp.com/imageUrl', {
			method:'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
				})
		})
		.then(response => response.json())
		// this.setState({imageURL: this.state.input})
		// app.models.predict(
		// 	Clarifai.FACE_DETECT_MODEL,
		// 	this.state.input)
		.then((response) => {
			if(response){
				fetch('https://shrouded-savannah-19779.herokuapp.com/image', {
					method:'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
						})
				})
				.then(response => response.json())
				.then(count => {
					this.setState(Object.assign(this.state.user, {score: count}))
				})
				.catch(console.log)
			}
			this.displayFaceBox(this.calculateFacePosition(response))
		})
	    .catch(err => console.log(err));
	    this.setState({imageURL: this.state.input})
	}

	onRouteChange = (route) => {
		if(route === 'signout'){
			this.setState(initialState)
		}
		else if(route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	render(){
	  return (
	    <div className="App">
	    	<Particles className='particles'
                params = {particlesOptions} />
	    	 <Navigation onRouteChange = {this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
	    	 { this.state.route === 'home' ?
		    	<div>
			    	 <Logo/>
			    	 <Rank name={this.state.user.name} score={this.state.user.score}/>
			    	 <ImageLinkForm 
			    	 	inputChange = {this.onInputChange} 
			    	 	submit = {this.onSubmit}
			    	/>
			    	<FaceRecognition box={this.state.box} imageURL = {this.state.imageURL}/>
		    	</div>
		    	:(
		    		this.state.route === 'signin' ?
		    		<SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
		    		: <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
		    		)
		    }
		    <p style={{bottom:'10px'}} className='gray'>Made by Sanskar</p>
	    </div>
	  );
	}
}

export default App;
