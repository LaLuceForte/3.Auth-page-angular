import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  @Input() posts: Post[];

  @Input() displayedColumns: string[];
  @Output() onClick = new EventEmitter<number>();

  goToPost(id: number) {
    this.onClick.emit(id);
  }

}
