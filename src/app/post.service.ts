import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  result:any;

  constructor(private _http: HttpClient) { }

  getPosts() {
    return this._http.get("http://localhost:3000/api/posts")
      .map(result => this.result = result);
  }

  getPost(id) {
    return this._http.get("http://localhost:3000/api/details/"+id)
      .map(result => this.result = result);
  }

  insertPost(post: Post) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let options = { headers: headers };

    return this._http.post("http://localhost:3000/api/posts", JSON.stringify(post), options)
    .map(result => this.result = result);
    
  }

}
