import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Post } from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsDataService extends DefaultDataService<Post> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`
    ).pipe(
      map((data) => {
        const posts: Post[] = [];
        for (let key in data) {
          posts.push({ ...data[key], id: key });
        }
        return posts;
      })
    )
  }

  add(entity: Post): Observable<Post> {
    return this.http.post<{ name: string }>(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`,
      {
        ...entity
      }
    ).pipe(
      map((data) => {
        const post: Post = {
          ...entity,
          id: data.name
        };
        return post;
      })
    )
  }

  getById(key: string | number): Observable<Post> {
    return this.http.get<Post>(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${key}.json`
    ).pipe(
      map((data) => {
        const posts: Post = {
          id: String(key),
          ...data
        };
        return posts;
      })
    )
  }

  update(update: Update<Post>): Observable<Post> {
    return this.http.patch<{ [id: string]: Post }>(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`,
      {
        [update.id]: {
          ...update.changes
        }
      }
    ).pipe(
      map((data) => {
        return data[update.id];
      })
    )
  }

  delete(key: string | number): Observable<string | number> {
    return this.http.delete<null>(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${key}.json`
    ).pipe(
      map(() => {
        return key;
      })
    )
  }
}