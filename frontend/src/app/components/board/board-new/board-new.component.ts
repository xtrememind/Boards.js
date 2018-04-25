import { Component, OnInit, Input } from '@angular/core';
import { CardActions } from '../../../redux-actions/card.actions';
import { ListActions } from '../../../redux-actions/list.actions';

@Component({
  selector: 'app-board-new',
  templateUrl: './board-new.component.html',
  styleUrls: ['./board-new.component.css']
})
export class BoardNewComponent implements OnInit {
  createMode: Boolean = false;

  @Input() position: Number;
  @Input() collection: String;
  @Input() parent: String;

  constructor(private cardActions: CardActions, private listActions: ListActions) { }
  ngOnInit() { }

  create() {
    this.createMode = true;
  }

  reset() {
    this.createMode = false;
  }

  save(event) {
    const action = this.findAction(this.collection);
    action.post({
      name: event.target.value,
      parent: this.parent,
      position: this.position
    });

    event.target.value = '';
  }

  findAction(collectionName) {
    if (collectionName === 'cards') {
      return this.cardActions;
    } else {
      return this.listActions;
    }
  }
}
