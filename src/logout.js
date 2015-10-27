import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {UserProfile} from './user';

@inject(AuthService, UserProfile )

export class Logout{
	constructor(authService, userProfile){
		this.authService = authService;
		this.userProfile = userProfile;
	};

	 activate(){
		this.authService.logout("#/login")
		.then(response=>{
			console.log("ok logged out on  logout.js");
			this.this.userProfile.clearCurrentUser();
		})
		.catch(err=>{
			console.log("error logged out  logout.js");

		});
	}
}
