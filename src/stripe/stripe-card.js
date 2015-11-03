import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-http-client";
import md5 from "md5";
import _ from "lodash";

let baseUrl = 'https://localhost:3001/users/billing';


@inject(HttpClient)

export class StripeCardCustomElement{

    constructor(httpClient) {
        this.http = httpClient;
        this.plans = ["free", "pro"];
        this.stripeInfo = {};

    }

    activate(){

    }

    bind(bindingContext) {
        this.$parent = bindingContext;
        this.stripeInfo.last4 = this.$parent.profile.stripe.last4;

      }

    submitPayment(token){
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

    processPayment(){
        var params = {
            plan: this.plan
        }
        var handler = StripeCheckout.configure({
            key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
                params.stripeToken = token;
                this.submitPayment(params);
            }
          });
        return handler.open({
          name: 'nodosaurus',
          description: 'Pro Subscription',
          amount: 999
        });
    }


}
