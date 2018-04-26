import { Component, OnInit } from '@angular/core';
import { BoardActions } from '../redux-actions/board.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  boardId: String = '';
  @select('board') board$: Observable<any>;

  constructor(private boardActions: BoardActions, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.boardId = params['id'];
      this.boardActions.get(this.boardId);
    });
  }

}
