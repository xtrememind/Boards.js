import { Component, OnInit, Input } from '@angular/core';
import { CardActions } from '../../../../redux-actions/card.actions';

@Component({
  selector: 'app-card-modal-due',
  templateUrl: './card-modal-due.component.html',
  styleUrls: ['./card-modal-due.component.css']
})
export class CardModalDueComponent implements OnInit {
  @Input() card: any;

  editMode = false;

  constructor(private cardActions: CardActions) { }
  ngOnInit() { }

  save() {
    this.cardActions.changeDueDate(this.card);
  }

  edit(picker) {
    this.editMode = true;
    picker.open();
  }

  remove() {
    this.card.dueDate = null;
    this.cardActions.changeDueDate(this.card);
  }
}
