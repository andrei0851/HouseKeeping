import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HouseholdService } from 'src/app/core/household.service';
import { AddHouseDialogComponent } from 'src/app/pages/home/add-house-dialog/add-house-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, private householdService: HouseholdService, private router: Router) { }

  token!: string | null;
  household!: string | null;
  userID!: string | null;
  houseName!: string;

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.household=localStorage.getItem('household');
    this.userID = localStorage.getItem('userID');
  }

  openAdd(){
    const dialogRef = this.dialog.open(AddHouseDialogComponent,{data: {name: this.houseName, userID: this.userID}, disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('household');
    localStorage.removeItem('userID');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }

}
