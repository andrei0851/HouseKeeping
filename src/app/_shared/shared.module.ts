import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AddHouseDialogComponent } from '../pages/home/add-house-dialog/add-house-dialog.component';
import { TaskCardComponent } from './task-card/task-card.component';
import {MatSelectModule} from '@angular/material/select'; 



@NgModule({
  declarations: [
    NavbarComponent,
    AddHouseDialogComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule,
      MatCardModule,
      FormsModule,
      MatDialogModule,
    RouterModule,
    MatSelectModule
  ],
  exports:[
      NavbarComponent,
      AddHouseDialogComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    TaskCardComponent,
    MatSelectModule
  ]
})
export class SharedModule { }
