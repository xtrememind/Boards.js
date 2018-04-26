import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { TeamAction } from '../../../redux-actions/team.actions';

@Component({
  selector: 'app-boards-preview',
  templateUrl: './boards-preview.component.html',
  styleUrls: ['./boards-preview.component.css']
})
export class BoardsPreviewComponent implements OnInit {
  @select('team') team$: Observable<any>;

  visible = false;

  constructor(public dialog: MatDialog, private teamActions: TeamAction) { }
  
  ngOnInit() {
    this.teamActions.get();
  }

  toggle() {
    this.visible = !this.visible;
  }
}
