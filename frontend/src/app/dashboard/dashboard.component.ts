import { Component, OnInit } from '@angular/core';
import { BoardActions } from '../redux-actions/board.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @select('board') board$: Observable<any>;

  constructor(private boardActions: BoardActions) { }

  ngOnInit() {
    this.boardActions.get('5adfa5719ae5575279bcf137');
  }

}
