import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-modal-description',
  templateUrl: './card-modal-description.component.html',
  styleUrls: ['./card-modal-description.component.css']
})
export class CardModalDescriptionComponent implements OnInit {
  @Input() card: any;

  constructor() { }

  ngOnInit() {
  }

}
