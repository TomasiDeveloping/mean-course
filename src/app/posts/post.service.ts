import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts(): Post[] {
    return [...this.posts];
  }

  getPostUpdatedListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = {title, content};
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
