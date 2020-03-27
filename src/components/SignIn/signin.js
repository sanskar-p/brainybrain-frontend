import React from 'react';

class SignIn extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}
	onSubmitSignin = () => {
		fetch('https://shrouded-savannah-19779.herokuapp.com/signin', {
			method:'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify(
				{
					email: this.state.signInEmail,
					pass: this.state.signInPassword
				}
				)
		})
		 .then(response => response.json())
	      .then(user => {
	        if(user.id){
	          this.props.loadUser(user);
	          this.props.onRouteChange('home');
	        }
	      })
		// console.log(this.state);
		// this.props.onRouteChange('home');
	}

	render(){
		// const {onRouteChange} = this.props; 
		return(
			<div>
				<p className='f2 white'>{'Sign in/Register detect faces in photos!'}</p>
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 bg-white center">
					<main className="pa4 black-80 signin1" style={{width:'65%'}}>
					  <div className="measure center" style={{display:'flex', flexDirection:'column'}}>
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address" 
					        	id="email-address" 
					        	onChange={this.onEmailChange}
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password"
					        	onChange={this.onPasswordChange}
					        />
					      </div>
					      
					    </fieldset>
					    <div className="">
					      <input 
						      onClick = {this.onSubmitSignin}
						      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer w-50" 
						      type="submit" 
						      value="Sign in" 
					      />
					    </div>
					   
					  </div>
					</main>
				</article>
				<p style={{position:'absolute', bottom:'0', width:'100%'}} className='gray center'>Made by Sanskar</p>
			</div>
		);
	}
}

export default SignIn;
