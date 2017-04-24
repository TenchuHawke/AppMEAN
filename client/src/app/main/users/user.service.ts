import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Request, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs'

@Injectable()
export class UserService {
  currentUser 
  USERS : any[]
  errors
  constructor(private http: Http) { }

  checkUser(user, callback?){
    console.log ("CheckUser service started")
    this.http.post("/checkUser", user)
      .map((response : Response) => response.json)
      .subscribe(data => {this.currentUser = this.currentUser}, e=> console.log(e),() => console.log("Check Users complete."))
  }

  createUser(user, callback?) {
    console.log ("Creating User Service Started")
    this.http.post("/createUser", user)
      .map((response : Response) => {this.currentUser = response.json})
      .subscribe(()=>this.updateUser(), e=>console.log(e), ()=> console.log("Creating User Service Ended."))
  }
  
  updateUser(callback?){
    this.http.get("/checkCurrentUser")
      .map((response : Response) => response.json)
      .subscribe(data=>
      {
        console.log("success");
        this.lookupCurrentUser()
      }, 
      ()=> console.log("failure"), 
      ()=> console.log("Lookup Complete"))
  }

  // lookupCurrentUser(){
  //   console.log("Lookup - Service")
  //   this.http.get('/lookupCurrentUser')
  //   .map((response: Response)=> response.json)
  //       .subscribe(data=> console.log("beans", data), e=> console.log(e),() => console.log("looked up......."))
    // .map((response : Response) => response.json)
    //   .subscribe(data =>{
    //     this.currentUser = data
    //   },
    //     err => this.errors = err, 
    //     () => console.log("Lookup Complete"))
  // }
    // lookupCurrentUser(){
    // console.log("Lookup User:")
    // return this.http.get('/LookupCU' )
    // .map((response : Response) => response.json)
    // .subscribe(data=> 
    // {
    //   console.log("beans", data)
    //   this.currentUser = data
    // }
    // , e=> console.log(e),() => console.log("looked up......."))
    // }
    lookupCurrentUser() : Promise<User> {
      return this.http.get('/lookupCurrentUser')
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError)
    }

    private handleError(error:any): Promise<any>{
      console.error('and error occurred', error);
      return Promise.reject(error.message || error)
    }
}
