import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import 'rxjs/add/operator/map';
require("dotenv").config({ path: "./config.env"});

@Injectable({
  providedIn: 'root'
})
export class PostService {

  result:any;

  constructor(private _http: HttpClient) { }

  getPosts() {
    return this._http.get(`/api/posts`)
      .map(result => this.result = result);
  }

  getPost(id) {
    return this._http.get(`/api/details/`+id)
      .map(result => this.result = result);
  }

  insertPost(post: Post) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let options = { headers: headers };

    return this._http.post(`api/posts`, JSON.stringify(post), options)
    .map(result => this.result = result);
    
  }

}
