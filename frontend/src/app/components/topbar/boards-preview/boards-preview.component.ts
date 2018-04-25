import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BoardsPreviewModalComponent } from '../boards-preview-modal/boards-preview-modal.component';

@Component({
  selector: 'app-boards-preview',
  templateUrl: './boards-preview.component.html',
  styleUrls: ['./boards-preview.component.css']
})
export class BoardsPreviewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit() { }

  openModal() {
    this.dialog.open(BoardsPreviewModalComponent, {
      width: '250px'
    });
  }
}
