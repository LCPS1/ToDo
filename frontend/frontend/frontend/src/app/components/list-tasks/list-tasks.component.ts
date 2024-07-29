import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/interfaces/Task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})

export class ListTasksComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'isCompleted', 'actions'];
  dataSource = new  MatTableDataSource<Task>();
  loading: boolean = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _snackBar: MatSnackBar, private _taskService: TaskService) { }
    
  ngOnInit(): void{
    this.getTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTasks() {
    this.loading = true;
    this._taskService.getTasks().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    })
  }

  deleteTask(id: number) {
    this.loading = true;

    this._taskService.deleteTask(id).subscribe(() => {
     this.successMessage();
     this.loading = false;
     this.getTasks();
    });    
  }

  successMessage() {
    this._snackBar.open('The Task was deleted Succesfully','', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

}

