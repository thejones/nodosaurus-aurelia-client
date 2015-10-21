import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-http-client";
import md5 from "md5";

let baseUrl = 'http://localhost:3001/users/plan';


@inject(HttpClient)

export class StripePlanCustomElement{
    plan = "";

    constructor(httpClient) {
        this.http = httpClient;
    }

    activate(){

    }

    bind(bindingContext) {
        this.$parent = bindingContext;
        this.plan = this.$parent.profile.stripe.plan;
      }

    submitPayment(token){
        var self = this;
        var params = {
            stripeToken: token,
            plan: 'pro'
        }
        return this.http.post(`${baseUrl}`, params)
            .then( response => {
                self.plan = response.content.user.stripe.plan;
                return response.content;
            })
            .catch((e) => {
              return e;
            });
    }

    processPayment(){
        var self = this;
        return Stripe.card.createToken({
          number: '4242424242424242',
          cvc: 100,
          exp_month: 12,
          exp_year: 2016
        },function(status, response) {
        if (response.error) {

        } else {
          var token = response.id;
          self.submitPayment(token);

        }

      });
    }


}
