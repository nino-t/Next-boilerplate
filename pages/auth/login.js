import React from 'react'
import Link from 'next/link'

import Head from '../../components/head'
import Error from '../../components/Error'
import Success from '../../components/Success'

import { getCookie, removeCookie } from "../../lib/session"
import { signIn, redirectIfAuthenticated } from "../../lib/auth"

export default class Login extends React.Component {
	static getInitialProps(ctx) {
		if (redirectIfAuthenticated(ctx)) {
			return {}
		}

		const success = getCookie("success", ctx.req)
		if (success) {
			removeCookie("success")
		}

		return {
			success
		}
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email: '',
	  	password: '',
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
  	    const { email, password } = this.state
  	    
	    const error = await signIn(email, password)
	    if (error) {
	      this.setState({
	        error
	      })
	      return false
	    }
	}

	render() {
		const { url, success } = this.props
		const { email, password, error } = this.state

		return (
			<div>
				<Head title="Login" />
				<div className="container" style={{ paddingTop: '150px' }}>
					<div className="row">
						<div className="col-md-4 col-md-push-4">
							<div className="login-panel panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Sign In</h3>
								</div>
								<div className="panel-body">
									{success && <Success message={success} />}
									{error && <Error message={error} />}

									<form role="form" onSubmit={this.handleSubmit}>
										<fieldset>
											<div className="form-group">
												<input 
													className="form-control" 
													placeholder="E-mail" 
													name="email" 
													type="email" 
													autoFocus="true"
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

											<div className="checkbox">
												<label>
													<input name="remember" type="checkbox" value="Remember Me" />Remember Me
												</label>
											</div>

											<button 
												type="submit" 
												className="btn btn-sm btn-success">Login</button>
										</fieldset>
									</form>

									<center>
										<hr />
										<p>
											<span style={{ marginRight: '2px' }}>Not have a account?</span>
											<Link href="/auth/register">
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
