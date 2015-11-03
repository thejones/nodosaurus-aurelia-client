import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export default class{

	constructor(router){
		this.router = router;
	}
	configure(){
		var appRouterConfig = function(config){
			config.title = 'Aurelia';
			config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

			config.map([
				//{ route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
				{ route: 'flickr',        moduleId: './flickr',       nav: true, title:'Flickr' },
				{ route: ['','articles'],        moduleId: './articles/list',       nav: true, title:'Articles' },
				//{ route: 'articles/edit',        moduleId: './articles/edit', title:'Article', auth:true },
				{ route: 'articles/create',        moduleId: './articles/create', title:'Article', auth:true, href:'#create', name: 'create' },
				{ route: 'articles/:id/edit',        moduleId: './articles/edit', title:'Article Edit', auth:true , href:'#articles', name: 'edit'},
				// { route: 'articles/:id',        moduleId: './articles/read',       nav: true, title:'Articles', auth:true },
				{ route: 'signup',        moduleId: './signup',       nav: false, title:'Signup' },
				{ route: 'login',        moduleId: './login',       nav: false, title:'Login' },
				{ route: 'logout',        moduleId: './logout',       nav: false, title:'Logout' },
				{ route: 'profile',        moduleId: './profile',       nav: false, title:'Profile', href:'#profile', name: 'profile' },
				{ route: 'profile/forgot',        moduleId: './forgot-password',       nav: false, title:'Forgot' },
				{ route: 'reset/:token',        moduleId: './reset-password',       nav: false, title:'Reset' },
				]);
			};

		this.router.configure(appRouterConfig);
	}

}
