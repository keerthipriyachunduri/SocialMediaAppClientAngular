import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostModel } from '../../shared/post-model';

import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { LikeService } from '../like.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {LikesPayload} from '../like-payload';


@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
 
  posts: PostModel[]= [];

  @Input() post: PostModel;
  likesPayload: LikesPayload;
  isLoggedIn: boolean;
  likesColor: String;
  dislikesColor: String;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  likemodel: any;
  

  constructor(private router: Router,private likeService: LikeService,
   
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) { 
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
 

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
  ngOnInit(): void {
    this.likesPayload = {
      postId: null,
      liked: false,
      disliked: false
    }
 
    
  }

  likePost(post: PostModel) {
    console.log(post);
    this.likesPayload.liked = true
    this.likesPayload.disliked = false
    this.likes(post);
    this.likesColor = '';
  }

  dislikePost(post: PostModel) {
    this.likesPayload.disliked = true;
    this.likesPayload.liked = false;
    this.likes(post);
    this.dislikesColor = '';
  }

  private likes(post: PostModel) {
    this.likesPayload.postId = post.id;
    console.log(this.likesPayload);
    this.likeService.likes(this.likesPayload).subscribe(data => {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
      });
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }


  

}
