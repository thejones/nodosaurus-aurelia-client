var configForDevelopment = {
	  httpInterceptor: true,
	  loginOnSignup: true,
	  baseUrl: 'https://localhost:3001',
	  loginRedirect: '/#articles',
	  logoutRedirect: '/',
	  signupRedirect: '/login',
	  loginUrl: '/auth/login',
	  signupUrl:  '/auth/signup',
	  profileUrl: '/auth/me',
	  loginRoute: '/login',
	  signupRoute: '/signup',
	  tokenRoot: false,
	  tokenName: 'token',
	  tokenPrefix: 'aurelia',
	  unlinkUrl: '/auth/unlink/',
	  unlinkMethod: 'get',
	  authHeader: 'Authorization',
	  authToken: 'Bearer',
	  withCredentials: true,
	  platform: 'browser',
	  storage: 'localStorage',
	providers: {
		google: {
			clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com'
		}
		,
		linkedin:{
			clientId:'778mif8zyqbei7'
		},
		facebook:{
			clientId:'1452782111708498'
		}
	}
};

var configForProduction = {
	providers: {
		google: {
			clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
		}
		,
		linkedin:{
			clientId:'7561959vdub4x1'
		},
		facebook:{
			clientId:'1653908914832509'
		}

	}
};
var config ;
if (window.location.hostname==='localhost') {
	config = configForDevelopment;
}
else{
	config = configForProduction;
}


export default config;
