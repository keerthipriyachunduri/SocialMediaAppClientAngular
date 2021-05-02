import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';

import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;

  constructor(private router: Router, private postService: PostService,
   ) {
    this.postPayload = {
      postData: '',
     
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      
      postData: new FormControl('', Validators.required),
    });
    
  }

  createPost() {
    console.log("hello");
    this.postPayload.postData = this.createPostForm.get('postData').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      alert('Post succesfully submitted');
      location.reload();
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.createPostForm.reset();
  }

}