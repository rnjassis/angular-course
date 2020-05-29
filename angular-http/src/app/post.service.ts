import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map , catchError, tap} from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
error = new Subject<string>();
  constructor(private http:HttpClient){}

  createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content};

    this.http
    .post<{[key: string]: Post}>('<ADD URL HERE>',
      postData, {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error =>{
      this.error.next(error.message);
    });
  }

  fetchPosts(){
    let params = new HttpParams();
    params = params.append('print','pretty');

    return this.http
    .get<{[key: string]: Post}>('<ADD URL HERE>', {
      headers: new HttpHeaders({
        'custom-header':'hello'
      }),
      params: params
    })
    .pipe(map((responseData) => {
      const postArray: Post[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty){
          postArray.push({...responseData[key], id: key});
        }
      }
      return postArray;
    }),
    catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  deletePosts(){
    return this.http.delete('<ADD URL HERE>',
    {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event =>{
      if(event.type === HttpEventType.Response){
        console.log(event.body)
      }
    }));
  }
}
