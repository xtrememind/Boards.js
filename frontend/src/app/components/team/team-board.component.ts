import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-bard',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.css']
})
export class TeamBoardComponent implements OnInit {

  @Input() board: any;
  constructor(private _router:Router) { }

  ngOnInit() {
    
  }

  navigate(){
    console.log(`${this.board._id} click`);
    this._router.navigate([`/dashboard/${this.board._id}`]);
  }

}
