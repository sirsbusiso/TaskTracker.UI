import { Component, Inject } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { TaskDto } from '../../../core/models/task-model-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskTrackerModule } from '../../../shared/modules/task-tracker-module';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, TaskTrackerModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
})
export class TaskViewComponent {
  task: TaskDto | undefined;
  roadmapStages: Array<'New' | 'InProgress' | 'Done'> = [
    'New',
    'InProgress',
    'Done',
  ];

  constructor(
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private dialogRef: MatDialogRef<TaskViewComponent>
  ) {}

  ngOnInit(): void {
    this.getTaskById(this.data.taskId);
  }

  getTaskById(taskId: number) {
    this.taskService.getById(taskId).subscribe((res) => {
      this.task = res.data;
    });
  }

  getStageStatus(
    stage: 'New' | 'InProgress' | 'Done'
  ): 'completed' | 'active' | 'pending' {
    if (!this.task) return 'pending';
    const currentStatus = this.task.status;
    if (stage === 'Done' && currentStatus === 'Done') return 'completed';
    if (stage === currentStatus) return 'active';
    const stageIndex = this.roadmapStages.indexOf(stage);
    const currentIndex = this.roadmapStages.indexOf(currentStatus);
    return stageIndex < currentIndex ? 'completed' : 'pending';
  }
  close(): void {
    this.task = undefined;
    this.dialogRef.close();
  }
}
