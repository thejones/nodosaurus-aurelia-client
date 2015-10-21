import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-http-client";
import md5 from "md5";

let baseUrl = 'http://localhost:3001/';


@inject(AuthService, HttpClient )

export class Profile{

	constructor(auth){
		this.auth = auth;
		this.profile = null;
		this.gravatarURL = "";
	}

	activate(){
		return this.auth.getMe()
		.then(data=>{
			this.profile = data;
			this.gravatarURL = "http://www.gravatar.com/avatar/" + md5(data.email) + ".jpg?s=150";
		});
	}

	heading = 'Profile';

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

	email='';
	password='';


}
