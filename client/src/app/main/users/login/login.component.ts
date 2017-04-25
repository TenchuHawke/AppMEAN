import { Http, Request, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs'
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

  loginUser : User = new User()
  currentUser  = this._userService.currentUser

  constructor(private http: Http, private _userService : UserService) {
  }

  ngOnInit() {
    // this.loginUser.password = "password"
    
  }

  StartReg(){
    this.startReg = true
    this.updateReg.emit({value: true})
  }

  checkUser(){
    var self = this
    this._userService.errors = []
    this._userService.checkUser(this.loginUser, (result)=>{
        self.notifyLoggedIn();
    })
  }

  notifyLoggedIn(callback?){
    this.login.emit("true")
  }
}
