import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
    { path: 'auth', component: AuthPageComponent },
    {
        path: 'content', loadChildren: () => import('./components/components.module')
            .then(m => m.ComponentsModule), canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: 'auth'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
