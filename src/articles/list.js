import {inject} from 'aurelia-framework';
import {bindable } from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {AuthService} from 'aurelia-auth';
import {ArticleData} from "./articleData";
import {UserProfile} from './../user';


@inject(AuthService, ArticleData, UserProfile)
export class List{

  _isAuthenticated = false;
  _ownResource = false;
  hasActiveSubscription = false;

  constructor(auth, articleData, userProfile){
    this.auth = auth;
    this.articleData = articleData;
    this.userProfile = userProfile;

  }

  //@computedFrom(this.auth)
  get isAuthenticated(){
      return this.auth.isAuthenticated();
  }

  ownResource(article) {
      if(this.userProfile.currentUser && this.userProfile.currentUser._id && article.user != null){
          return this.userProfile.currentUser._id === article.user._id;
      }else{
          return false;
      }

  }
  hasActiveSub(user){
      if(user && user.stripe.plan &&  user.stripe.plan == "pro"){
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
      return this.userProfile.setUser()
            .then(data=>{
              self.hasActiveSub(this.userProfile.currentUser);
          }).catch((e) => {
              console.log("No user returned")}
          );

  }

  deleteArticle(articleId){
      return this.articleData
        .delete(articleId)
        .then(() =>{
            this.getArticles();
        });
  }

  activate(){
      this.getUser();
      this.getArticles();

  }

}
