import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";


let baseUrl = 'https://localhost:3001/auth/forgot'

@inject(AuthService, HttpClient, Router)
export class Signup{
	constructor( auth, httpClient, router){
		this.auth = auth;
		this.http = httpClient;
		this.router = router
	}
	heading = 'Forgot Password';

	email='';
	password='';

	askForPasswordReset(){
		this.http.post(`${baseUrl}`, {email: this.email } )
            .then( () => {
				alert("Please check your email for further instructions.")
				this.router.navigate('/');

				}
			);
	}
}
