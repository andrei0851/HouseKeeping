import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddHouseDialogComponent } from 'src/app/pages/home/add-house-dialog/add-house-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  token!: string | null;
  household!: string | null;
  houseName!: string;

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.household=localStorage.getItem('household');
    console.log(this.household);
  }

  openAdd(){
    const dialogRef = this.dialog.open(AddHouseDialogComponent,{data: {name: this.houseName}});
    dialogRef.afterClosed().subscribe(result => {
      this.houseName = result;
    });
  }

}
