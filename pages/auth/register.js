import React from 'react'
import Link from 'next/link'

import Head from '../../components/head'
import Error from '../../components/Error'
import { signUp, redirectIfAuthenticated } from "../../lib/auth";

export default class Register extends React.Component {
	static getInitialProps(ctx) {
		redirectIfAuthenticated(ctx)
		return {}
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name: '',
	  	email: '',
	  	password: '',
	  	password_confirmation: '',
	  	error: null
	  }

	  this.handleChange = this.handleChange.bind(this)
	  this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e){
		let target = e.target
		this.setState({
			[target.name]: target.value
		})
	}

  	handleSubmit = async e => {
    	e.preventDefault()
		let data = Object.assign({}, this.state)
		delete data.error

	    const error = await signUp(data)
	    if (error) {
	      this.setState({
	        error
	      })
	      return false
	    }
	}

	render() {
		const { email, password, password_confirmation, error, name } = this.state
		return (
			<div>
				<Head title="Register" />
				<div className="container" style={{ paddingTop: '150px' }}>
					<div className="row">
						<div className="col-md-4 col-md-push-4">
							<div className="login-panel panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Sign Up</h3>
								</div>
								<div className="panel-body">
									{error && <Error message={error} />}

									<form role="form" onSubmit={this.handleSubmit}>
										<fieldset>
											<div className="form-group">
												<input 
													className="form-control" 
													placeholder="Name" 
													name="name" 
													type="text" 
													autoFocus="true"
													value={name}
													onChange={this.handleChange} />
											</div>

											<div className="form-group">
												<input 
													className="form-control" 
													placeholder="E-mail" 
													name="email" 
													type="email" 
													value={email}
													onChange={this.handleChange} />
											</div>

											<div className="form-group">
												<input 
													className="form-control" 
													placeholder="Password" 
													name="password" 
													type="password" 
													value={password}
													onChange={this.handleChange} />
											</div>

											<div className="form-group">
												<input 
													className="form-control" 
													placeholder="Confirm Password" 
													name="password_confirmation" 
													type="password" 
													value={password_confirmation}
													onChange={this.handleChange} />
											</div>											

											<button 
												type="submit" 
												className="btn btn-sm btn-success">Register</button>
										</fieldset>
									</form>

									<center>
										<hr />
										<p>
											<span style={{ marginRight: '2px' }}>Have a account?</span>
											<Link href="/auth/login">
												<a>Click here</a>
											</Link>
										</p>
									</center>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
