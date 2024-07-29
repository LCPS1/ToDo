import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Componets
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modules
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AddUpdateTaskComponent,
    ListTasksComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
