import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Task } from 'src/app/interfaces/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})


export class ViewTaskComponent implements OnInit, OnDestroy  {
  id!: number;
  task!: Task;
  loading: boolean = false;

  routeSub!: Subscription;

  constructor(private _taskService: TaskService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getTask();
  }

  ngOnDestroy(): void {
    /* this.routeSub.unsubscribe() */
  }

  getTask() {
    this.loading = true;
    this._taskService.getTask(this.id).subscribe(data => {
      this.task = data;
      this.loading = false;
    })
  }

}
