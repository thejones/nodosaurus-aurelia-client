import {inject} from 'aurelia-framework';
import {bindable } from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {AuthService} from 'aurelia-auth';
import {ArticleData} from "./articleData";


@inject(AuthService, ArticleData)
export class List{

  currentUser = "";
  _isAuthenticated = false;
  _ownResource = false;
  hasActiveSubscription = false;

  constructor(auth, articleData){
    this.auth = auth;
    this.articleData = articleData;

  }

  //@computedFrom(this.auth)
  get isAuthenticated(){
      return this.auth.isAuthenticated();
  }

  ownResource(article) {
      if(this.currentUser && this.currentUser._id && article.user != null){
          return this.currentUser._id === article.user._id;
      }else{
          return false;
      }

  }
  hasActiveSub(user){
      if(user && user.stripe.status &&  user.stripe.status == "active" || user.stripe.status == "trialing"){
                return this.hasActiveSubscription = true;
            }else{
                return this.hasActiveSubscription = false;
            }
}


  getArticles(){
      return this.articleData
        .getAll()
        .then(articles => this.articles = articles);
  }

  getUser(){
      self = this;
      return this.auth.getMe()
            .then(data=>{
              this.currentUser = data;
              self.hasActiveSub(this.currentUser);
          }).catch((e) => {console.log("No user returned")});

  }

  activate(){
      this.getUser();
      this.getArticles();

  }

}
