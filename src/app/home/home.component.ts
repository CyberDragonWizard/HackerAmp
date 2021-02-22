import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:Post[] = [];

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getPosts()
    .subscribe(res => this.posts = res as Post[]);
  }

}
