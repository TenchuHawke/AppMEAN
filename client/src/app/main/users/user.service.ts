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
    console.log ("CheckUser service started")
    this.http.post("/checkUser", user)
      .map((response : Response) => response.json())
      .subscribe(
        data => {
          console.log("Data:", data)
          if (data.errors){
            console.log (data)
            for (var i = 0; i< data.errors.length; i++){
              self.errors.push(data.errors[i])
              console.log(data.errors[i])
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
          console.log(e)
          if (callback){
            callback(false)
          }},
        () => {console.log("Check Users complete.")

          })
  }

  createUser(user, callback?) : any {
    let self = this
    console.log ("Creating User Service Started")
    this.http.post("/createUser", user)
      .map((response : Response) => response.json())
      .subscribe(
        (data)=> {
          console.log("Data:",data)
          if(data.errors){
            for (var error of data.errors){
              self.errors.push(error)
            }
          } else {
            this.currentUser=data.user as User
          }
          console.log("User successfully created")}, 
        e=>console.log("bobo"), 
        ()=> {
          console.log("Creating User Service Ended.")
          if (callback){
            callback()
          }
    })
  }

    printCE(){
    console.log("Print Errors: ", this.errors)

  }

  lookupCurrentUser(callback?) : any {
    console.log("starting lookup")
    let self = this
    this.http.get("/lookup")
    .map(result=>result.json()) 
    .subscribe(
      function (result) {
        self.errors = [];
        if (result.error){
          console.log("Error:",  result.error)
          // self.errors.push(result.error)
        } else {
        let temp = result as User; 
        console.log("returned successfully:", temp)
        self.currentUser = temp
        console.log("Logged In :", self.currentUser)
        }
      },
      function (err) {console.log(err)},
      function () {
        console.log("Lookup Complete")
        if (callback){
          callback()
        }}
    )}

    clearUser(callback?){
      this.currentUser = new User;
      console.log("cleared current user")
      this.http.get("/clear")
      .subscribe(
        ()=>"",
        (e)=>console.log(e),
        ()=>{
          console.log("Session Cleared")
          if (callback){
            callback()
          }}
      )
    }
}
