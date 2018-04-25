import { Component, OnInit, Input } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-card-model-activities',
  templateUrl: './card-model-activities.component.html',
  styleUrls: ['./card-model-activities.component.css']
})
export class CardModelActivitiesComponent implements OnInit {
  @Input() card: any;
  @select('activities') public activities$: Observable<any>;

  constructor() { }

  ngOnInit() {
  }

}
