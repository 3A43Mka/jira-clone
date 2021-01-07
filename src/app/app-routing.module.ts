import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosPageComponent } from './components/todos-page/todos-page.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: TodosPageComponent
  },

  {
    path: "**",
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
