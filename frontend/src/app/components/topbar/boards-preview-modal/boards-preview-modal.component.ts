import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-boards-preview-modal',
  templateUrl: './boards-preview-modal.component.html',
  styleUrls: ['./boards-preview-modal.component.css']
})
export class BoardsPreviewModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BoardsPreviewModalComponent>) { }

  ngOnInit() { }
}
