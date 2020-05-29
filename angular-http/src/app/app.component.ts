import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] = [];
  isFetching=false;
  error:string =null;
  errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.onFetchPosts();
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);

  }

  onFetchPosts() {
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching=false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching=false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts =[];
    }, error => {
      this.isFetching=false;
      this.error = error.message;
    })
  }

  onHandleError(){
    this.error=null;
  }
}
