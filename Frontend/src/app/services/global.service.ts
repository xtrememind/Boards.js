import { Injectable,OnInit } from '@angular/core';


@Injectable()
export class GlobalService implements OnInit {

  name:string;
  ngOnInit() {
    this.name = '';
  }
  
}
