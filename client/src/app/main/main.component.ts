import { User } from './users/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from "app/main/users/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser: User
  // logged in user.
  constructor(private _userService : UserService) {
    this.currentUser=null;
  }

  ngOnInit() {
  }

  authUser(){
    console.log("authUser()")
  }
  updatePage(){
    console.log("Update Page...")
    this.currentUser = this._userService.currentUser;
  }
}
