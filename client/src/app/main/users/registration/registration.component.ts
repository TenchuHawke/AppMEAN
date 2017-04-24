import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() startReg : boolean
  @Output() updateReg = new EventEmitter();
  @Output() login = new EventEmitter();
  
  createdUser : User = new User;
  
  constructor(private _userService: UserService) { }

  ngOnInit(  ) {
    this.createdUser.password = "password"
    this.createdUser.passwordConfirm = "password"
  }

  StopReg(){
    console.log("stopReg")
    this.startReg = false
    this.updateReg.emit({value: false})
  }

  createUser(){
    console.log("Start Create User")
    this._userService.createUser(this.createdUser);
    this.login.emit("true")
  }
}
