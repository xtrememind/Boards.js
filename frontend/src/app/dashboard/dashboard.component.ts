import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() data = [];
  @Output() taskChanged = new EventEmitter<any>();
  @Output() createTask = new EventEmitter<any>();
  @Output() createList = new EventEmitter<void>();

  private movingTask: any;

  constructor(private http: Http) { }
  ngOnInit() { }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(list, task) {
    this.movingTask = {
      list: list,
      task: task
    };
  }

  drop(list, htmlIdx) {
    this.removeMovingTask(this.movingTask);
    this.insertMovingTask(this.movingTask, list, htmlIdx);
  }

  removeMovingTask(movingTask) {
    const index = movingTask.list.tasks.indexOf(movingTask.task);
    movingTask.list.tasks.splice(index, 1);
  }

  insertMovingTask(movingTask, list, htmlIdx) {
    if (htmlIdx === -1) {
      htmlIdx = list.tasks.length;
    }

    list.tasks.splice(htmlIdx, 0, movingTask.task);

    movingTask.task.position = htmlIdx;
    this.taskChanged.emit({
      list: list,
      task: movingTask.task
    });
  }

  newTask(list) {
    this.createTask.emit(list);
  }

  newList() {
    this.createList.emit();
  }
}
