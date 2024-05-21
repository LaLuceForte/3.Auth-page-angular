import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { ContentComponent } from "./content/content.component";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { PostsComponent } from "./content/posts/posts.component";
import { PostComponent } from "./content/post/post.component";

import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { ComponentsRoutingModule } from "./components-routing.module";

@NgModule({
    declarations: [ContentComponent, AuthPageComponent, PostsComponent, PostComponent],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule
    ]
})
export class ComponentsModule { }