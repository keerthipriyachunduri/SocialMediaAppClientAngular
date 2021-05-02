import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LikesPayload } from './like-payload';
import { Observable } from 'rxjs';
import {PostModel} from '../shared/post-model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  likes(likesPayload: LikesPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/likes/', likesPayload);
  }

  getLikesByPostAndUser(post : PostModel):Observable<any> {
    console.log(post);
      return this.http.get('http://localhost:8080/api/likes/by-post/'+post);
  }
}
