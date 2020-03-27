import React from 'react';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			registerEmail:'',
			registerPassword:'',
			name:''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}
	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}
	onSubmitRegister = () => {
		fetch('https://shrouded-savannah-19779.herokuapp.com/register', {
			method:'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify(
				{
					email: this.state.registerEmail,
					pass: this.state.registerPassword,
					name: this.state.name
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
	}
	render(){
		// const {onRouteChange} = this.props;
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 bg-white center">
				<main className="pa4 black-80" style={{width:'65%'}}>
				  <div className="measure center w-100" style={{display:'flex', flexDirection:'column'}}>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6 center" htmlFor="name">Name</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
				        type="name" name="name" id="name" 
				        onChange={this.onNameChange}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6 center" htmlFor="email-address">Email</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" name="email-address"  id="email-address"
				        onChange={this.onEmailChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6 center" htmlFor="password">Password</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" name="password"  id="password"
				        onChange={this.onPasswordChange}
				        />
				      </div>
				      
				    </fieldset>
				    <div className="">
				      <input onClick = {this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer w-50" type="submit" value="Register" />
				    </div>
				    
				  </div>
				</main>
			</article>
			);
	}
}

export default Register;