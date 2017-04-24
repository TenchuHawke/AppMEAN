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
    
    constructor (){
        this.email=""
        this.userName=""
        this.firstName=""
        this.lastName=""
        this.password=""
    }
}
