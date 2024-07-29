import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.css']
})
export class AddUpdateTaskComponent implements OnInit  {
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operation: string = 'Add';
  
  constructor(private fb: FormBuilder,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      isCompleted: ['', Validators.required],
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0) {
      this.operation = 'Edit';
      this.getTask(this.id)
    }
  }

  getTask(id: number) {
    this.loading = true;
    this._taskService.getTask(id).subscribe(data => {
      this.form.setValue({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        isCompleted: data.isCompleted,
      })
      this.loading = false;
    })
  }

  addUpdateTask() {
    //Builf OBject
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      dueDate: this.form.value.dueDate,
      isCompleted: this.form.value.isCompleted,
    }

    if(this.id != 0) {
      task.id = this.id;
      this.editTask(this.id, task);
    } else {
      this.addTask(task);
    }
  }

  editTask(id: number, task: Task) {
    this.loading = true;
    this._taskService.updateTask(id, task).subscribe(() => {
      this.loading = false;
      this.SuccessMessage(' Updated');
      this.router.navigate(['/listtasks']);
    })
  }

  addTask(task: Task) {
    this.loading = true;
    console.log(task);
      this._taskService.addTask(task).subscribe(() => {
        this.loading = false;
        this.SuccessMessage('Created');
        this.router.navigate(['/listtasks']);
      })
  }

  SuccessMessage(text: string) {
    this._snackBar.open(`The task was ${text} succesfully`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
