import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskTrackerModule } from '../../../shared/modules/task-tracker-module';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Priority, Status } from '../../../core/models/task-enums-model';
import { TaskUpdateDto } from '../../../core/models/task-update-model-dto';
import { TaskService } from '../../../core/services/task.service';
import { TaskDto } from '../../../core/models/task-model-dto';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskTrackerModule, SpinnerComponent],
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css',
})
export class TaskUpdateComponent implements OnInit {
  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  dueDate = new Date();
  task: TaskUpdateDto = {
    title: '',
    description: '',
    dueDate: '',
    priority: Priority.Low,
    status: Status.New,
  };

  createdAt = new Date();
  isLoading = false;
  constructor(
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskDto },
    private dialogRef: MatDialogRef<TaskUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.task = {
      title: this.data.task.title,
      description: this.data.task.description,
      priority: this.data.task.priority,
      status: this.data.task.status,
      dueDate: this.data.task.dueDate,
    };
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      if (this.task?.dueDate)
        (this.task.dueDate = this.dueDate
          ? new Date(this.dueDate)
              .toLocaleDateString('en-GB')
              .replace(/\//g, '-')
          : ''),
          this.taskService
            .update(this.data.task.id, this.task)
            .subscribe((res) => {
              if (res) {
                this.isLoading = false;
                this.dialogRef.close(this.task);
              }
            });
    } else {
      form.control.markAllAsTouched(); // show all errors if user clicks save without touching
    }
  }

  close() {
    this.dialogRef.close();
  }

  parseDateFromString(dueDate: string | null): Date | null {
    if (!dueDate) return null;

    const [day, month, year] = dueDate.split('-').map(Number);
    if (!day || !month || !year) return null;

    return new Date(year, month - 1, day); // month is 0-indexed
  }
}
