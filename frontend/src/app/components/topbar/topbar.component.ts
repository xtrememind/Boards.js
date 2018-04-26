import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  userName:string="";
  constructor(private global :GlobalService) { }

  ngOnInit() {
    this.userName=localStorage.getItem('name');
    console.log(this.userName);
  }

}
