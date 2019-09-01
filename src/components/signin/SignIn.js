import React from 'react';


class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value })
	}

	onSumbitSignIn = () => {
		fetch('http://localhost:700/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id){
				this.props.loadUser(user);
				this.props.signedOrNot('homepage')
			} else {
				alert('Invalid email or password')
			}
		})
	}

	render() {
		const { signedOrNot } = this.props;

		return(
		<article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5 bg-transparent">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        onChange={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
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
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in"
			      onClick = {this.onSumbitSignIn}
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick = {() => signedOrNot('register')} href="#0" className="f6 link dim black db pointer">Register</p>
			    </div>
			  </div>
			</main>
		</article>
	);
 }
}
	


export default SignIn;