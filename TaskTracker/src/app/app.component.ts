import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './feature-components/nav/nav/nav.component';
import { TaskService } from './core/services/task.service';
import { TaskDto } from './core/models/task-model-dto';
import { GenericTableComponent } from './shared/generic-table/shared/generic-table/generic-table.component';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './feature-components/task/task-add/task-add.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from './feature-components/task/delete-task/delete-task.component';
import { TaskUpdateComponent } from './feature-components/task/task-update/task-update.component';
import { TaskTrackerModule } from './shared/modules/task-tracker-module';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    GenericTableComponent,
    CommonModule,
    DeleteTaskComponent,
    SpinnerComponent,
    TaskTrackerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'TaskTracker';
  tasks: TaskDto[] = [];
  dialog = inject(MatDialog);
  searchTerm: string = '';
  isLoading = false;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.isLoading = true;
    this.taskService.getAll().subscribe((res) => {
      this.tasks = [...res.data];
      this.isLoading = false;
    });
  }

  editTask(task: TaskDto) {
    const dialogRef = this.dialog.open(TaskUpdateComponent, {
      width: '1400px',
      data: { task },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTasks();
      }
    });
  }

  deleteTask(task: TaskDto) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this item?',
        taskId: task.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.getAllTasks();
      }
    });
  }

  addNewTask() {
    const dialogRef = this.dialog.open(TaskAddComponent, {
      width: '1400px',
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTasks();
      }
    });
  }

  applySearch() {
    if (!this.searchTerm) {
      this.tasks = [...this.tasks];
      return;
    }
    this.tasks = [];
    this.taskService.searchTasks(this.searchTerm).subscribe((res) => {
      this.tasks = res.data;
    });
  }

  onSearchChange(value: string) {
    const query = value.trim();
    if (!query) {
      this.tasks = [];
      this.getAllTasks();
    }
  }
}
