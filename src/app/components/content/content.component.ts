import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  constructor(private router: Router, private http: HttpClient) { }

  visiblePosts: boolean = true;  //to change child components visibility (PostsComponents on default)

  posts: Post[] = [];
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({ next: (data: any) => {this.posts = data; typeof data} })
  }

  id: number; //id of the selected post to open 

  goToPost(id: number) {
    this.id = id;
    this.visiblePosts = false;
  }

  goHome() { //got to all Posts
    this.visiblePosts = true;
  }

  signOut() {
    localStorage.removeItem('signedIn');
    this.router.navigate(['auth']);
  }
}
