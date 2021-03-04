import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { routerTransition } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit {

  posts!: Array<Post>;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getPosts()
    .subscribe(res => this.posts = res as Array<Post>);
  }

}
