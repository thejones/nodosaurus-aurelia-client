import {inject} from "aurelia-framework";
import {ArticleData} from "./articleData";

@inject(ArticleData)
export class Details {

    constructor(articleData) {
        this.data = articleData;
    }

    activate(params) {
        return this.data.getById(params.id)
                        .then(article => this.article = article);
    }
}