import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HouseholdService } from 'src/app/core/household.service';
import { TaskServiceService } from 'src/app/core/task-service.service';

@Component({
  selector: 'app-assign-task-dialog',
  templateUrl: './assign-task-dialog.component.html',
  styleUrls: ['./assign-task-dialog.component.scss']
})
export class AssignTaskDialogComponent implements OnInit {

  members?: any;
  selectedMember?: string;
  userID?: string | null;

  constructor(
    public dialogRef: MatDialogRef<AssignTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskServiceService,
    private houseHoldService: HouseholdService
  ) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID');

    if(this.data.isassign){
      this.taskService.getHouseHoldMembers(this.data.task.household.id).subscribe({
        next: (resp: any) => {
          this.members = resp;
        }
      })
    }
    else{
      this.houseHoldService.getAllMembers().subscribe({
        next: (resp: any) => {
          this.members = resp;
          this.members = this.members.filter((f: any) =>  f.household === null && f.userID != this.userID);
        }
      })
    }
  }

  assign(){
    this.taskService.assignTask(this.data.task.id,this.selectedMember!).subscribe({
      next: (resp: any) => {
        window.alert('Task assigned!');
        this.dialogRef.close();
      }
    })
  }

  addMember(){
    this.houseHoldService.assignHousehold(this.selectedMember!,this.data.householdid).subscribe({
      next: (resp: any) => {
        window.alert('Member successfully added to household!');
        this.dialogRef.close();
      }
    })
  }

}
