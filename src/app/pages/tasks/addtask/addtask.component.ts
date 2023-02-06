import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskServiceService } from 'src/app/core/task-service.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  taskTitle: string = '';
  taskDescription: string = '';
  priority = ['LOW','MEDIUM','HIGH'];
  selectedPriority: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddtaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskServiceService
  ) { }

  ngOnInit(): void {
  }

  addTask(){
    var task = {title: this.taskTitle, description: this.taskDescription, household: {id: this.data.householdid}, priority: this.selectedPriority};
    this.taskService.addTask(task).subscribe({
      next: (resp: any) => {
        window.alert("Task added!");
      }
    })
    this.dialogRef.close();
  }

}
