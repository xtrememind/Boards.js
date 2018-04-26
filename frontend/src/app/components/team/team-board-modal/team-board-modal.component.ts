import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BoardActions } from '../../../redux-actions/board.actions';

@Component({
  selector: 'app-team-board-modal',
  templateUrl: './team-board-modal.component.html',
  styleUrls: ['./team-board-modal.component.css']
})
export class TeamBoardModalComponent implements OnInit {

  boardName = '';

  constructor(public dialogRef: MatDialogRef<TeamBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private boardActions: BoardActions) { }

  ngOnInit() { }

  save() {
    this.boardActions.post({
      team: this.data._id,
      name: this.boardName
    });

    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
