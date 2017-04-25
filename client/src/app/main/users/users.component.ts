import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  newUserSwitch : boolean
  @Output() userLoggedIn = new EventEmitter();
  constructor() {
    this.newUserSwitch = false
  }

  ngOnInit() {
  }

  updateSwitch($event) {
    this.newUserSwitch = $event.value
    this.userLoggedIn.emit()
  }
  UserLoggedIn($event){
    this.userLoggedIn.emit("true")
  }
}
