import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskTrackerModule } from '../../../shared/modules/task-tracker-module';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [TaskTrackerModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css',
})
export class DeleteTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; taskId: number },
    private taskService: TaskService
  ) {}

  onConfirm(): void {
    this.taskService.delete(this.data.taskId).subscribe((res) => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
