import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/logout', component: LogoutComponent },
    { path: 'auth', redirectTo: '/auth/login', pathMatch: 'prefix' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
