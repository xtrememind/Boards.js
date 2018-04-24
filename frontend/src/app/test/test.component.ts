import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  lists = [];
  events = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/v1/lists').subscribe(data => {
      this.lists = data.json();
    });
  }

  taskChanged(event) {
    this.http.put(`http://localhost:3000/v1/lists/${event.list.id}/tasks/${event.task.id}`, event.task).subscribe(ok => {
    });
  }

  createTask(list) {
    alert('new task on list ' + list.name);
  }

  createList() {
    alert('new list');
  }
}
