import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {UserProfile} from './user';

@inject(AuthService, UserProfile )

export class Login{
	heading = 'Login';
	email='';
	password='';

	constructor(auth, userProfile){
		this.auth = auth;
		this.userProfile = userProfile;
	};


	login(){
		return this.auth.login(this.email, this.password)
		.then(response=>{
			console.log("success logged " + response);
			this.userProfile.setUser();
		})
		.catch(err=>{
			console.log("login failure");
			alert("Something was not right.");
		});
	};



	authenticate(name){
		return this.auth.authenticate(name, false, null)
		.then((response)=>{
			console.log("auth response " + response);
		});

	}
}
