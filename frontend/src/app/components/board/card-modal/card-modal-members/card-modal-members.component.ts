import { Component, OnInit, Input } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { UserActions } from '../../../../redux-actions/user.actions';
import { CardActions } from '../../../../redux-actions/card.actions';

@Component({
  selector: 'app-card-modal-members',
  templateUrl: './card-modal-members.component.html',
  styleUrls: ['./card-modal-members.component.css']
})
export class CardModalMembersComponent implements OnInit {

  @select('users') public users$: Observable<any>;

  @Input() card: any;

  constructor(private userActions: UserActions, private cardActions: CardActions) { }

  ngOnInit() {
    this.userActions.getAll();
  }

  getInitials(name) {
    return name.split(' ').map(n => n[0].toUpperCase()).join('');
  }

  addUser(user) {
    this.cardActions.addMember(this.card, user);
  }

  removeUser(user){
    this.cardActions.removeMember(this.card, user);
  }
}
