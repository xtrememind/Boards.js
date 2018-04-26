import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { TeamAction } from '../redux-actions/team.actions';
import { MatDialog } from '@angular/material';
import { TeamBoardModalComponent } from '../components/team/team-board-modal/team-board-modal.component';
import { TeamMembersModalComponent } from '../components/team/team-members-modal/team-members-modal.component';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {

  @select('team') team$: Observable<any>;
  constructor(public dialog: MatDialog, private teamAction: TeamAction) { }

  ngOnInit() {
    this.teamAction.get();
  }

  openBoardModal(team) {
    const dialogRef = this.dialog.open(TeamBoardModalComponent, {
      width: '750px',
      data: team
    });

    dialogRef.beforeClose().subscribe(result => {
      this.teamAction.get();
    });
  }

  openMembersModal(team) {
    const dialogRef = this.dialog.open(TeamMembersModalComponent, {
      width: '750px',
      data: team
    });

    dialogRef.beforeClose().subscribe(result => {
      console.log('congratulations, you updated a team and nothing happened XD');
    });
  }
}
