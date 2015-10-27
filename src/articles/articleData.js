import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = 'http://localhost:3001/api/articles';

@inject(HttpClient)
export class ArticleData {

    constructor(httpClient) {
        this.http = httpClient;
    }

    getById(id) {
        return this.http.get(`${baseUrl}/${id}`)
                        .then(response => response.content);
    }

    getAll() {
        return this.http.get(baseUrl)
                        .then(response => {
                            return response.content;
                        });
    }

    create(article) {
        return this.http.post(`${baseUrl}`, article)
            .then( response => {
                return response.content;
            })
            .catch((e) => {
              return e;
            });
    }

    update(article) {
        return this.http.put(`${baseUrl}/${article._id}`, article)
            .then( response => {
                return response.content;
            });
    }

    delete(articleId) {
        return this.http.delete(`${baseUrl}/${articleId}`)
            .then( response => {
                return response.content;
            });
    }

}
