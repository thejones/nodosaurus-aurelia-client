import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(AuthService, Router)
export class UserProfile{

    constructor(auth, router){
        this.auth = auth;
        this.router = router;
        this.currentUser = {};
    }

    clearCurrentUser(){
        this.currentUser = {};
        this.router.navigate('/');
    }

    setUser(){
		return this.auth.getMe()
		.then(data=>{
            return this.currentUser = data;
        }).catch((e) => {
            this.router.navigate('/');
            return e;
        });
	}

}
