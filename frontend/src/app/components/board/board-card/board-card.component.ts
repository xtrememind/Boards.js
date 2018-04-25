import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CardActions } from '../../../redux-actions/card.actions';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {

  @Input() card: any;

  constructor(public dialog: MatDialog, private cardActions: CardActions) { }
  ngOnInit() { }

  openModal() {
    this.cardActions.get(this.card._id);
    const dialogRef = this.dialog.open(CardModalComponent, {
      width: '750px',
      data: this.card
    });
  }
}
