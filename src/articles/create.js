import {inject} from "aurelia-framework";
import {ArticleData} from "./articleData";
import {Router} from "aurelia-router";
import {Validation} from 'aurelia-validation';

@inject(ArticleData, Router, Validation)
export class Create {


    constructor(articleData, router, validation) {
        this.data = articleData;
        this.router = router;
        this.validation = validation.on(this)
        this.validation = validation.on(this)
            .ensure("article.title")
                .isNotEmpty()
                .hasMinLength(3)
                .hasMaxLength(100);
    }

    activate(params) {

    }

    save() {

        this.validation.validate().then(() => {
            this.data.create(this.article)
            .then(article => {
                //let url = this.router.generate("details", { id: movie.id});
                this.router.navigate("/");
            });
        });


    }

}

// import {Validation} from 'aurelia-validation';
// import {ensure} from 'aurelia-validation';
// import {inject} from 'aurelia-framework';
//
// @inject(Validation)
// export class Create {
//   @ensure(function(it){ it.isNotEmpty().hasLengthBetween(3,10) })
//     name = '';
//   @ensure(function(it){ it.isNotEmpty().isEmail() })
//     email = '';
//
//   constructor(validation) {
//     this.validation = validation.on(this);
//   }
//
//   register(){
//     //check if the validation is valid before performing the register
//     this.validation.validate().then( () => {
//       alert('Welcome!'); //Your more meaningful stuff would go here
//     });
//   }
// }
