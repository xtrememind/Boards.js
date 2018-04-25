import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { TeamAction } from '../redux-actions/team.actions';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {

  @select('team') team$: Observable<any>;
  constructor(private teamAction:TeamAction) { }

  ngOnInit() {
    this.teamAction.get();
  }

}
