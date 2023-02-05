import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HouseholdService } from 'src/app/core/household.service';
import {HttpErrorResponse} from "@angular/common/http";

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
    let house = {name: this.data.name};
    this.houseHoldService.createHousehold(house).subscribe({
      next: (resp: any) => {
        console.log('here');
        this.houseHoldService.assignHousehold(this.data.userID,resp.id).subscribe({
          next: (resp: any) => {
            localStorage.setItem('household',resp.id);
            window.alert("Household created!");
            this.dialogRef.close();
          }
        })
      },
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

}
