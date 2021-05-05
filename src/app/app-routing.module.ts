import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './components/list-page/list-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

const routes: Routes = [
  { path: "", redirectTo: "search", pathMatch: "full" },
  {
    path: "search",
    pathMatch: "full",
    component: SearchPageComponent
  },
  {
    path: "list",
    pathMatch: "full",
    component: ListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }