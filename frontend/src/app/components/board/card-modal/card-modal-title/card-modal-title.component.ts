import { Component, OnInit, Input } from '@angular/core';
import { CardActions } from '../../../../redux-actions/card.actions';

@Component({
  selector: 'app-card-modal-title',
  templateUrl: './card-modal-title.component.html',
  styleUrls: ['./card-modal-title.component.css']
})
export class CardModalTitleComponent implements OnInit {
  editMode: Boolean = false;
  previousName: String;

  @Input() card: any;

  constructor(private cardActions: CardActions) { }

  ngOnInit() {
  }

  edit() {
    this.editMode = true;
    this.previousName = this.card.name;
  }

  save(event) {
    this.card.name = event.target.value;
    this.cardActions.changeName(this.card);
    this.editMode = false;
  }

  reset() {
    if (this.editMode) {
      this.card.name = this.previousName;
      this.editMode = false;
    }
  }

}
