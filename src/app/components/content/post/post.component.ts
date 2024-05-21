import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() id: number; //id of selected post which we want to show 
  @Input() posts: Post[] = [];

  @Output() onClick = new EventEmitter();

  like: boolean = false; //detection whether the like button was clicked
  share: boolean = false; //detection whether the share button was clicked

  goHome() { //go to all posts
    this.onClick.emit();
  }
}
