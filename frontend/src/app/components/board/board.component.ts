import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { CardActions } from '../../redux-actions/card.actions';
import { ListActions } from '../../redux-actions/list.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @select('board') public board$: Observable<any>;
  @select('lists') public lists$: Observable<any>;

  @Input() boardId: any;

  private movingCard: any;
  private movingList: any;

  constructor(private cardActions: CardActions, private listActions: ListActions) { }
  ngOnInit() { }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragCard(list, card) {
    this.movingCard = {
      card: card,
      originList: list
    };
  }

  dropCard(list, htmlIdx) {
    this.movingCard.destinationList = list;
    this.movingCard.position = htmlIdx;
    this.cardActions.move(this.movingCard);
  }

  dragList(list, listIndex) {
    this.movingList = {
      list: list
    };
  }

  dropList(list, listIndex) {
    this.movingList.position = listIndex;
    this.listActions.move(this.movingList);
  }
}
