import {inject} from "aurelia-framework";
import {ArticleData} from "./articleData";
import {Router} from "aurelia-router";
import {Validation} from "aurelia-validation";

@inject(ArticleData, Router, Validation)
export class Edit {

    constructor(articleData, router, validation) {
        this.data = articleData;
        this.router = router;
        this.validation = validation.on(this)
            .ensure("article.title")
                .isNotEmpty()
                .hasMinLength(3)
                .hasMaxLength(100)
    }

    activate(params) {
        return this.data.getById(params.id)
                   .then(article => {
                       this.article = article;
                       this.validation.validate();
                   });
    }

    save() {

        this.validation.validate().then(() => {
            this.data.update(this.article)
                .then(article => {
                    //let url = this.router.generate("read", { id: article.id});
                    this.router.navigate('/');
                });
        });


    }

}
