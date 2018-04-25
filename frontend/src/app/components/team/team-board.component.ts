import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-team-bard',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.css']
})
export class TeamBoardComponent implements OnInit {

  @Input() board: any;
  constructor() { }

  ngOnInit() {
    
  }

  navigate(){
    console.log(`${this.board._id} click`);
  }

}
