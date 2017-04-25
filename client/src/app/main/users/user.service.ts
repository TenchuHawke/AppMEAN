import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Request, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs'


@Injectable()
export class UserService {
  currentUser : User
  USERS : any[]
  errors : String[] =[]
  self = this
  constructor(private http: Http) { 
    this.currentUser = new User
    this.lookupCurrentUser()
    this.errors = []
    
  }

  checkUser(user, callback?) : any {
    let self = this
    this.http.post("/checkUser", user)
      .map((response : Response) => response.json())
      .subscribe(
        data => {
          if (data.errors){
            for (var i = 0; i< data.errors.length; i++){
              self.errors.push(data.errors[i])
            }
            if (callback){
              callback(false)
            }
          } 
          else {
            self.currentUser = data as User
            if (callback){
              callback(true)
            }
          }
        }, 
        e=> {
          if (callback){
            callback(false)
          }},
        () => {

          })
  }

  createUser(user, callback?) : any {
    let self = this
    this.http.post("/createUser", user)
      .map((response : Response) => response.json())
      .subscribe(
        (data)=> {
          if(data.errors){
            for (var error of data.errors){
              self.errors.push(error)
            }
          } else {
            this.currentUser=data.user as User
          }
        }, 
        e=>{}, 
        ()=> {
          if (callback){
            callback()
          }
    })
  }

    printCE(){

  }

  lookupCurrentUser(callback?) : any {
    let self = this
    this.http.get("/lookup")
    .map(result=>result.json()) 
    .subscribe(
      function (result) {
        self.errors = [];
        if (result.error){
          // self.errors.push(result.error)
        } else {
        let temp = result as User; 
        self.currentUser = temp
        }
      },
      function (err) {
      },
      function () {
        if (callback){
          callback()
        }}
    )}

    clearUser(callback?){
      this.currentUser = new User;
      this.http.get("/clear")
      .subscribe(
        ()=>"",
        (e)=>{},
        ()=>{
          if (callback){
            callback()
          }}
      )
    }
}
