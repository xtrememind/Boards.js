import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import {TeamActions} from '../../redux-actions/team.actions';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @select('team') public team$: Observable<any>;
  constructor(private teamAction :TeamActions) { }

  ngOnInit() {
    this.teamAction.getAll();
  }

}
