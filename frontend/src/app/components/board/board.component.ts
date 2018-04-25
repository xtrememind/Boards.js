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

  /*
  {
    type: 'list' / 'card',
    content: { list, position } / { card, originList, destinationList, position }
  }
  */
  private moving: any = {
    type: 'void'
  };

  constructor(private cardActions: CardActions, private listActions: ListActions) { }
  ngOnInit() { }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragCard(list, card) {
    this.moving = {
      type: 'card',
      content: {
        card: card,
        originList: list
      }
    };
  }

  dragList(list, listIndex) {
    this.moving = {
      type: 'list',
      content: {
        list: list
      }
    };
  }

  drop(list, listIdx, cardIdx) {
    if (this.moving.type === 'void') {
      return;
    }

    if (this.moving.type === 'card') {
      if (cardIdx === -99) {
        return;
      }

      this.moving.content.destinationList = list;
      this.moving.content.position = cardIdx;
      this.cardActions.move(this.moving.content);
    } else {
      this.moving.content.position = listIdx;
      this.listActions.move(this.moving.content);
    }

    this.moving.type = 'void';
  }
}
