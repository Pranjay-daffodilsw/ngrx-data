import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less']
})
export class EditPostComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<Object>();
  public postForm!: FormGroup;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      id: new FormControl(null, [
        Validators.required
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ])
    })

    this.activatedRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((paramsMap) => {
        this.postService.getByKey(paramsMap.get('id'))
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((post) => {
            if (post) {
              this.postForm.setValue({
                id: post?.id,
                title: post?.title,
                description: post?.description,
              })
            }
          })

      })




  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUpdatePost(): void {
    if (this.postForm.valid) {
      const post = this.postForm.value;
      const entityUpdate: Partial<Post> = {
        ...post
      }
      this.postService.update(entityUpdate);
      this.router.navigate(['/posts']);
    }
  }

}
