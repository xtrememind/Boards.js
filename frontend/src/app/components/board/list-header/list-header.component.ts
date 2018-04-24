import { Component, OnInit, Input } from '@angular/core';
import { ListActions } from '../../../../redux-actions/list.actions';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {
  createMode: Boolean = false;

  @Input() list: any;

  constructor(private listActions: ListActions) { }
  ngOnInit() { }

  create() {
    this.createMode = true;
  }

  reset() {
    this.createMode = false;
  }

  save(event) {
    this.list.name = event.target.value;
    this.listActions.put(this.list);
    event.target.value = '';
    this.reset();
  }
}
