import { Component, OnInit } from '@angular/core';
import { TeamAction } from '../../../redux-actions/team.actions';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  createMode = false;
  constructor(private teamActions: TeamAction) { }

  ngOnInit() {
  }

  create() {
    this.createMode = true;
  }

  save(event) {
    this.teamActions.post({ name: event.target.value });
    this.createMode = false;
  }

  reset() {
    this.createMode = false;
  }
}
