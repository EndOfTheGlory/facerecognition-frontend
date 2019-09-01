import React from 'react';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: '',
			email: '',
			password: ''
		}
	}

	onNicknameChange = (event) => {
		this.setState({nickname: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSumbitSignUp = () => {
		fetch('http://localhost:700/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				nickname: this.state.nickname
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id){
				this.props.loadUser(user);
				this.props.signedOrNot('homepage')
			} else {
				alert('There are spaces in the form')
			}
		})
	}

	render() {
		return(
		<article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5 bg-transparent">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f4" htmlFor="name">Nickname</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="nickname"  
			        id="nickname" 
			        onChange = {this.onNicknameChange}
			        />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        onChange = {this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
			        <input 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        onChange = {this.onPasswordChange}
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign up"
			      onClick = {this.onSumbitSignUp}
			      />
			    </div>
			    <div className="lh-copy mt3">
			    </div>
			  </div>
			</main>
		</article>
	);

	}
	
}


export default Register;