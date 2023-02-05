import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskServiceService } from 'src/app/core/task-service.service';
import { AssignTaskDialogComponent } from 'src/app/pages/tasks/assign-task-dialog/assign-task-dialog.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {


  @Input() task: any;
  userid?: string | null;

  constructor(public dialog: MatDialog, private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userID');
  }

  addMember(){
    const dialogRef = this.dialog.open(AssignTaskDialogComponent,{data: {task: this.task, isassign:true}});
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    })
  }

  done(){
    this.taskService.doneTask(this.task.id).subscribe({
      next: (resp) => {
        window.location.reload();
      }
    })
  }

}
