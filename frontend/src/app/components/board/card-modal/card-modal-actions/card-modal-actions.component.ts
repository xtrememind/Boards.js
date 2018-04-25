import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CardActions } from '../../../../redux-actions/card.actions';

@Component({
  selector: 'app-card-modal-actions',
  templateUrl: './card-modal-actions.component.html',
  styleUrls: ['./card-modal-actions.component.css']
})
export class CardModalActionsComponent implements OnInit {

  @Input() card: any;

  @Output() archive = new EventEmitter<any>();

  constructor(private cardActions: CardActions) { }

  ngOnInit() {
  }

  doArchive() {
    this.cardActions.delete(this.card);
    this.archive.emit(this.card);
  }
}
