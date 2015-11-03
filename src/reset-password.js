import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {Router} from "aurelia-router";
import {HttpClient} from "aurelia-http-client";

let baseUrl = 'https://localhost:3001/reset'

@inject(AuthService, HttpClient, Router)
export class Signup{
	heading = 'Forgot Password';
	token = '';
	newPassword='';
	verifyPassword='';

	constructor( auth, httpClient, router){
		this.auth = auth;
		this.http = httpClient;
		this.router = router;
	}

	activate(params){
	  //processing stuff here
	  this.token = params.token;
	}


	resetUserPassword(params){
		this.http.post(`${baseUrl}/${this.token}`, {newPassword: this.newPassword, verifyPassword: this.verifyPassword } )
            .then( () => {
				this.router.navigate('/login');
				}
			);
	}
}
