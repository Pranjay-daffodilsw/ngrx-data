import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first, map, mergeMap, tap } from "rxjs/operators";
import { PostService } from "./post.service";

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  constructor(
    private postsService: PostService,
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    status: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.postsService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            return this.postsService.getAll();
          }
          return of(true)
        }),
        first()
      )
  }
}