import { User } from './users/user';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { UserService } from "app/main/users/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser: User
  // logged in user.
  constructor(private _userService : UserService, private ApplicationRef : ApplicationRef) {
    this.currentUser=this._userService.currentUser;
  }

  ngOnInit() {
  }


  updatePage(){
    this.currentUser=this._userService.currentUser
    this.ApplicationRef.tick()
  }
  clearSession(){
    this.currentUser = new User;
    this._userService.clearUser(
    this.ApplicationRef.tick() )
  }
}
