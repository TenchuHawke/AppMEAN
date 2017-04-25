export class User {
    public email : string
    public userName : string
    public firstName : string
    public lastName : string
    public password : string
    public passwordConfirm : string
    public _id : string
    public createdAt = Date
    public updatedAt = Date
    
    constructor (_id?, email?, username?, firstname?, lastname?, password?){
        this.email=email
        this.userName=username
        this.firstName=firstname
        this.lastName=lastname
        this.password=password
        this._id = _id
    }
}
