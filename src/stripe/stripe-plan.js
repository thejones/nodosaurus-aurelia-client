import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-http-client";
import md5 from "md5";
import _ from "lodash";

let baseUrl = 'https://localhost:3001/users/plan';


@inject(HttpClient)

export class StripePlanCustomElement{

    constructor(httpClient) {
        this.http = httpClient;
        this.plans = ["free", "pro"];
        this.stripeInfo = {};

    }

    activate(){

    }

    bind(bindingContext) {
        this.$parent = bindingContext;
        this.stripeInfo.plan = this.$parent.profile.stripe.plan;

      }

    submitPayment(params){
        var self = this;

        return this.http.post(`${baseUrl}`, params)
            .then( response => {
                self.stripeInfo = response.content.user.stripe;
                return response.content;
            })
            .catch((e) => {
              return e;
            });
    }

    subscribe(){
        var self = this;
        var params = {
            plan: 'pro'
        }
        var handler = StripeCheckout.configure({
            key: 'pk_75OgZuwigJSeX7oplmghD8Zld3uSy',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
                params.stripeToken = token.id;
                self.submitPayment(params);
            }
          });
        return handler.open({
          name: 'nodosaurus',
          description: 'Pro Subscription',
          amount: 999
        });
    }

    unsubscribe(){
        var self = this;
        var params = {
            plan: 'free'
        }
        return this.http.post(`${baseUrl}`, params)
            .then( response => {
                self.stripeInfo = response.content.user.stripe;
                return response.content;
            })
            .catch((e) => {
              return e;
            });
    }


}
