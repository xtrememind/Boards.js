import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {

  @Input() card: any;

  constructor() { }
  ngOnInit() { }

  openModal() {
    alert('Card modal');
  }
}
