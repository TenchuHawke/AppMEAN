import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() startReg : boolean
  @Output() updateReg = new EventEmitter();
  @Output() login = new EventEmitter();

  loginUser : User = new User
  currentUser : User

  constructor(private _userService : UserService) {
  }

  ngOnInit() {
    this.currentUser = this._userService.currentUser
    this.loginUser.password = "password"
  }

  StartReg(){
    console.log("StartReg")
    this.startReg = true
    this.updateReg.emit({value: true})
  }

  checkUser(){
    console.log("Check User")
    this._userService.checkUser(this.loginUser, this.LookupCU(function(){ this.notifyLoggedIn()}))
  }

  LookupCU(callback){
    console.log("Lookup User")
    this._userService.lookupCurrentUser()
  }

  notifyLoggedIn(callback){
    console.log("emitting")
    this.login.emit("true")
  }
}
