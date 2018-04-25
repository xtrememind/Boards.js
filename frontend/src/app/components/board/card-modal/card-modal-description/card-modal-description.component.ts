import { Component, OnInit, Input } from '@angular/core';
import { CardActions } from '../../../../redux-actions/card.actions';

@Component({
  selector: 'app-card-modal-description',
  templateUrl: './card-modal-description.component.html',
  styleUrls: ['./card-modal-description.component.css']
})
export class CardModalDescriptionComponent implements OnInit {
  editMode: Boolean = false;

  @Input() card: any;

  private previousDescription: String;

  constructor(private cardActions: CardActions) { }

  ngOnInit() {
  }

  edit() {
    this.previousDescription = this.card.description;
    this.editMode = true;
  }

  save() {
    this.cardActions.changeDescription(this.card);
    this.editMode = false;
  }

  reset() {
    this.card.description = this.previousDescription;
    this.editMode = false;
  }
}
