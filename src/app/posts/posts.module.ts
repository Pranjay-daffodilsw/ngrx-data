import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { entityMetadata } from "../entity-metadata";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsDataService } from "./post-data.service";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsResolver } from "./posts.resolver";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsResolver }
  },
  {
    path: 'add',
    component: AddPostComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
  },
  {
    path: 'details/:id',
    component: SinglePostComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [PostsResolver],
  declarations: [],
})
export class PostsModule {

  constructor(
    private eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService,
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', PostsDataService);
  }
}