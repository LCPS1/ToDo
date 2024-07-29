import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'listtasks', pathMatch: 'full' },
  { path:'listtasks', component: ListTasksComponent },
  { path:'addtask', component: AddUpdateTaskComponent },
  { path:'viewtask/:id', component: ViewTaskComponent },
  { path:'edittask/:id', component: AddUpdateTaskComponent },
  { path: '**',  redirectTo: 'listtasks', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
