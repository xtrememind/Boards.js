import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CardActions } from '../../../redux-actions/card.actions';
import { ListActions } from '../../../redux-actions/list.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {
  @select('cards') cards$: Observable<any>;

  @Input() card: any;
  @Input() list: any;
  @Input() boardId: any;

  constructor(public dialog: MatDialog, private cardActions: CardActions, private listActions: ListActions) { }
  ngOnInit() {
    this.cardActions.addCardToList(this.card);
  }

  openModal() {
    this.cardActions.get(this.card._id);
    const dialogRef = this.dialog.open(CardModalComponent, {
      width: '750px'
    });

    dialogRef.beforeClose().subscribe(result => {
      console.log(this.list);
      this.listActions.get(this.list._id, this.list.position);
    });
  }

  getMembers(cards) {
    const found = cards.filter(c => c._id === this.card._id)[0];
    if (!found || !found.members) {
      return [];
    }

    return found.members;
  }

  getInitials(name) {
    return name.split(' ').map(n => n[0].toUpperCase()).join('');
  }
}
