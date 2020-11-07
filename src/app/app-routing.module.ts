import { ListeClientsComponent } from './components/liste-clients/liste-clients.component';
import { ErrorComponent } from './components/error/error.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShowClientsComponent } from './components/show-clients/show-clients.component';
import { EditClientsComponent } from './components/edit-clients/edit-clients.component';
import { AddClientsComponent } from './components/add-clients/add-clients.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',
   component:HomeComponent
  },
  {path:'clients',
   component:ListeClientsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'client/add',
    component:AddClientsComponent
  },
  {
    path:'client/edit/:id',
    component:EditClientsComponent
  },
  {
    path:'client/show/:id',
    component:ShowClientsComponent
  },
  {
    path:'settings',
    component:SettingsComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  },
  { path: '\*\*', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
