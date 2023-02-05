import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HouseholdService } from 'src/app/core/household.service';

@Component({
  selector: 'app-add-house-dialog',
  templateUrl: './add-house-dialog.component.html',
  styleUrls: ['./add-house-dialog.component.scss']
})
export class AddHouseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddHouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private houseHoldService: HouseholdService
  ) {}

  ngOnInit(): void {
  }

  addHouseHold(){
    this.houseHoldService.createHousehold(this.data.name).subscribe({
      next: (resp: any) => {
        this.houseHoldService.assignHousehold(this.data.userID,this.data.name).subscribe({
          next: (resp: any) => {
            window.alert("Household created!");
            this.dialogRef.close();
          }
        })
      }
    })
  }

}
