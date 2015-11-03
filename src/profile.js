import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import md5 from "md5";
import {UserProfile} from './user';

let baseUrl = 'https://localhost:3001/auth/me';


@inject(AuthService, UserProfile, HttpClient, Router )

export class Profile{
	heading = 'Profile';
	email='';
	password='';

	constructor(auth, userProfile, httpClient, router){
		this.auth = auth;
		this.http = httpClient;
		this.router = router;
		this.gravatarURL = "";
		this.profile = {};
		this.userProfile = userProfile;
	}

	activate(){
		var self = this;
		return this.userProfile.setUser()
			.then(response => {
				self.profile = this.userProfile.currentUser;
				self.gravatarURL = "http://www.gravatar.com/avatar/" + md5(self.profile.email) + ".jpg?s=150";
			});
	}

	update(){
		var self = this;
		this.http.put(`${baseUrl}`, this.profile)
            .then( () => {
				return self.userProfile.setUser()
					.then(response => {
						self.profile = self.userProfile.currentUser;
						self.gravatarURL = "http://www.gravatar.com/avatar/" + md5(self.profile.email) + ".jpg?s=150";
					});
				}
			);

	}

	deleteUser(){
		var self = this;
		this.http.delete(`${baseUrl}/delete`)
            .then( response => {
				return self.userProfile.clearUser();
				this.router.navigate('/');
			}

		);
	}

	link(provider){
		return this.auth.authenticate(provider, true, null)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.auth.getMe())
		.then(data=>{
			this.profile = data;
		});
	}

	unlink(provider){
		return this.auth.unlink(provider)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.auth.getMe())
		.then(data=>{
			this.profile = data;
		});
	}



}
