import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent implements OnInit {
  public posts$!: Observable<Post[]>

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
  }

  onDelete(id: string | undefined): void {
    this.postService.delete(String(id));
  }

}
