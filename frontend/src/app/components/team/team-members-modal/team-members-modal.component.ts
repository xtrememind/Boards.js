import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BoardActions } from '../../../redux-actions/board.actions';
import { TeamAction } from '../../../redux-actions/team.actions';
import { select } from 'ng2-redux';
import { UserActions } from '../../../redux-actions/user.actions';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members-modal.component.html',
  styleUrls: ['./team-members-modal.component.css']
})
export class TeamMembersModalComponent implements OnInit {
  @select('users') public users$: Observable<any>;

  constructor(public dialogRef: MatDialogRef<TeamMembersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private teamActions: TeamAction, private userActions: UserActions) { }

  ngOnInit() {
    this.userActions.getAll();
  }

  close(): void {
    this.dialogRef.close();
  }

  addUser(users, userId) {

    //if nothing selected
    if (userId == 'EMPTYVALUE') {
      return;
    }

    if (!this.data.members) {
      this.data.members = [];
    }

    //If the user is already a member
    if (this.data.members.some(m => m._id && m._id == userId)) {
      return;
    }

    const user = users.filter(u => u._id == userId)[0];
    this.teamActions.addMember(this.data, user);
    this.data.members.push(user);
  }
}
