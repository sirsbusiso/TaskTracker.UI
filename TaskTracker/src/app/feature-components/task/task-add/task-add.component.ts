import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { Priority, Status } from '../../../core/models/task-enums-model';
import { TaskAddDto } from '../../../core/models/task-add-model-dto';
import { TaskTrackerModule } from '../../../shared/modules/task-tracker-module';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskTrackerModule],
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent {
  dialogRef = inject(MatDialogRef<TaskAddComponent>);

  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  dueDate = new Date();
  task: TaskAddDto = {
    title: '',
    description: '',
    priority: Priority.Medium,
    status: Status.New,
    dueDate: this.dueDate
      ? new Date(this.dueDate).toLocaleDateString('en-GB').replace(/\//g, '-')
      : '',
  };

  constructor(private taskService: TaskService) {}

  save(form: NgForm) {
    if (form.valid) {
      this.task.dueDate = new Date(this.task.dueDate as string).toISOString();
      this.taskService.add(this.task).subscribe((res) => {
        if (res) {
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
}
