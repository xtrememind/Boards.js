import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgRedux, select } from 'ng2-redux';
import { BoardActions } from '../../../redux-actions/board.actions';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(private http: Http, private boardActions: BoardActions) { }

  ngOnInit() {
    this.boardActions.getAll();
  }
}
