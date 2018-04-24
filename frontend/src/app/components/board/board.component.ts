import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @select('board') public board$: Observable<any>;

  // TODO: This is a test
  @select('lists') public lists$: Observable<any>;
  @select('cards') public cards$: Observable<any>;





  private movingCard: any;

  constructor(private http: Http) { }
  ngOnInit() {

    this.lists$.subscribe(a => {
      console.log('list created', a);
    });

    this.cards$.subscribe(a => {
      console.log('card created', a);
    });

  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(list, card) {
    this.movingCard = {
      list: list,
      card: card
    };
  }

  drop(list, htmlIdx) {
    this.removeMovingCard(this.movingCard);
    this.insertMovingCard(this.movingCard, list, htmlIdx);
  }

  removeMovingCard(movingCard) {
    const index = movingCard.list.tasks.indexOf(movingCard.card);
    movingCard.list.tasks.splice(index, 1);
  }

  insertMovingCard(movingCard, list, htmlIdx) {
    if (htmlIdx === -1) {
      htmlIdx = list.tasks.length;
    }

    list.tasks.splice(htmlIdx, 0, movingCard.card);

    movingCard.card.position = htmlIdx;
    // this.cardChanged.emit({
    //   list: list,
    //   card: movingCard.card
    // });
  }
}
