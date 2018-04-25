import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-boards-preview',
  templateUrl: './boards-preview.component.html',
  styleUrls: ['./boards-preview.component.css']
})
export class BoardsPreviewComponent implements OnInit {

  visible = false;

  constructor(public dialog: MatDialog) { }
  ngOnInit() { }

  toggle() {
    this.visible = !this.visible;
  }
}
