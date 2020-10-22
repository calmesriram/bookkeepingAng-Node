import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
public baseurl:String= "http://localhost:3000"
public hide:boolean;
public invoicedata:any=[];
  constructor(public _snackBar: MatSnackBar,
    public http: HttpClient) {
  
  }
  islogin() {
    if(sessionStorage.getItem("hide")  == "true"){
      this.hide = true;
    }else{
      this.hide = false;
    }

    let token = sessionStorage.getItem("user");
    //  userrole = sessionStorage.getItem("userrole");
    if (token != "" && token != null && token != undefined) {
      // //  this.hide = false;
      return true;
    }
    else {
      // this.hide = true;
      return false
    }
    
  }
  

Getbookproduct(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Book").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
PostLogin(data){  
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Login",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
PostReg(data){  
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Reg",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Postbookproduct(data){
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Book",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Putbookproduct(data,sareecode){
  return new Promise((resolve,reject) => {
    this.http.put(this.baseurl+"/Book/"+sareecode,data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Deletebookproduct(sareecode){
  return new Promise((resolve,reject) => {
    this.http.delete(this.baseurl+"/Book/"+sareecode).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}




  snackmsg(message: string, action ?: string){
    
      this._snackBar.open(message, action, {
        duration: 5000,
      });
    }

  
  
}