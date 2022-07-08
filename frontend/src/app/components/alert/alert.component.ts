import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: string =""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialogRef<AlertComponent>, private router: Router){}

  ngOnInit(): void {
    setTimeout(() =>
    {
        this.dialog.close();

    },
    5000);

  }

  close(){
    this.dialog.close();
  }


}
