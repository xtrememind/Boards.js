import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-modal-members',
  templateUrl: './card-modal-members.component.html',
  styleUrls: ['./card-modal-members.component.css']
})
export class CardModalMembersComponent implements OnInit {
  @Input() card: any;

  constructor() { }

  ngOnInit() {
  }

  getInitials(name) {
    return name.split(' ').map(n => n[0].toUpperCase()).join('');
  }
}
