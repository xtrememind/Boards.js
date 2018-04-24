import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { CardActions } from '../../../redux-actions/card.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @select('board') public board$: Observable<any>;

  private movingCard: any;

  constructor(private http: Http, private cardActions: CardActions) { }
  ngOnInit() { }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(list, card) {
    this.movingCard = {
      card: card,
      originList: list
    };
  }

  drop(list, htmlIdx) {
    this.movingCard.destinationList = list;
    this.movingCard.position = htmlIdx;
    this.cardActions.move(this.movingCard);
  }
}
