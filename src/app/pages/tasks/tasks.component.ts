import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskServiceService } from 'src/app/core/task-service.service';
import { AddtaskComponent } from './addtask/addtask.component';
import { AssignTaskDialogComponent } from './assign-task-dialog/assign-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: TaskServiceService, private dialog: MatDialog) { }

  tasks?: any;
  householdid?: string | null;

  ngOnInit(): void {
    this.householdid = localStorage.getItem('household');
    this.taskService.getTasks(this.householdid!).subscribe({
      next: (resp) => {
        this.tasks = resp;
        console.log(this.tasks);
      } 
    })
  }

  assignMember(){
    const dialogRef = this.dialog.open(AssignTaskDialogComponent,{data: {isassign:false, householdid: this.householdid}});
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    })
  }

  addTask(){
    const dialogRef = this.dialog.open(AddtaskComponent,{data: {householdid: this.householdid}});
    dialogRef.afterClosed().subscribe(result => {
     window.location.reload();
    })
  }

}
