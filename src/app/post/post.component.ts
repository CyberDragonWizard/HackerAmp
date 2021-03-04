import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class PostComponent implements OnInit {

  posts!: Array<Post>;
  postForm!: FormGroup;


  constructor(private _postService: PostService, fb: FormBuilder, private router: Router) {
    this.postForm = fb.group({
      'title' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(75)])],
      'url' : [null, Validators.required],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(25), Validators.maxLength(500)])],
    });
   }

  ngOnInit(): void {
    this._postService.getPosts()
    .subscribe(res => this.posts = res as Array<Post>);
  }

  addPost(post: Post) {
    this._postService.insertPost(post)
    .subscribe((params) => {
      let np = params['np']
      this.posts.push(np);
      this.router.navigateByUrl('/');
    })
  }

}
