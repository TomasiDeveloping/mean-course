import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts(): void {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdatedListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
