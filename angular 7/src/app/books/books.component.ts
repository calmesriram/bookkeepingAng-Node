import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
// import { SocialAuthService } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";
var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  displayedColumns:any = ['sno','bookname','title', 'author','isbn','summary','duedate','update','delete'];
  // customertable;
  dataSource = new MatTableDataSource(ELEMENT_DATA);  
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);  
  btnhideshow:Boolean;
  pcodedisable:Boolean;
  booksForm: FormGroup;
  // user: SocialUser;
  // loggedIn: boolean;
  constructor(public api:ApiService,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });

    this.booksForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      summary: ['', Validators.required],
      isbn: ['', Validators.required],
      bookname:['', Validators.required],
      duedate: ['', Validators.required],
      bookid: ['', Validators.required]
      });

    this.getbookproduct();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource.filter) 
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource2.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource2.filter) 
  }

  getbookproduct(){
  this.api.Getbookproduct().then((data:any) =>{
    console.log(data.data.length)
    if(data.data.length == 0){
       this.api.snackmsg("No Record(s) Found","Close")
    }
    if( data.status == true && data.data.length != 0){
      console.log(data)
let lowqtyproduct:any=[];
let qtyproduct:any=[];

data.data.forEach(async (items) => {
        if(await items.sareeqty == 0){
          lowqtyproduct.push(items)
        }else{
          qtyproduct.push(items)
        }
      });
      // this.btnhideshow = false;
      this.dataSource = new MatTableDataSource(qtyproduct);
      this.dataSource2 = new MatTableDataSource(lowqtyproduct);
    }
console.log(data);

  }).catch(err =>{
    // this.btnhideshow = false;
    // this.api.snackmsg("Hail","close")
  })
}

onSubmit() {
  console.log(this.booksForm.value)
  if(this.booksForm.value.title == null || this.booksForm.value.title == "" && 
  this.booksForm.value.author == null || this.booksForm.value.author == "" && 
  this.booksForm.value.summary == null || this.booksForm.value.summary == "" && 
  this.booksForm.value.isbn == null || this.booksForm.value.isbn == "" && 
  this.booksForm.value.bookname == null || this.booksForm.value.bookname == "" &&
  this.booksForm.value.duedate == null || this.booksForm.value.duedate == ""){
    this.api.snackmsg("Please fill all the fields","close");
    return;
  }else{
    this.api.Postbookproduct(this.booksForm.value).then((data)=>{
      // console.log(data)
      this.getbookproduct();
      this.booksForm.reset();
      this.api.snackmsg(data["msg"],"close");
  
    }).catch(e =>{
      console.log(e)
      this.api.snackmsg(e,"close");
      this.getbookproduct();
    })
  } 
  
}
Cancel(){
  this.btnhideshow = false;
  this.booksForm.reset();
  this.pcodedisable = false;
}


Delete(para){
  this.btnhideshow = false;
  // this.api.Deletesareeproduct(para.sareecode).then(res =>{
  //   if(res["status"]== true){
  //     this.getsareeproduct();
  //   this.api.snackmsg(res["msg"],"close");
  // }
  // }).catch(e =>{
  //   this.api.snackmsg(e,"close");
  // })
}
loaddata(para){
  console.log(para)
  // this.booksForm.controls.sareecode.disable;
this.btnhideshow = true;
this.pcodedisable = true;
this.booksForm.controls.title.setValue(para.title);
this.booksForm.controls.author.setValue(para.author);
this.booksForm.controls.summary.setValue(para.summary);
this.booksForm.controls.isbn.setValue(para.isbn);
this.booksForm.controls.bookname.setValue(para.bookname);
this.booksForm.controls.duedate.setValue(para.duedate);
this.booksForm.controls.bookid.setValue(para.bookid);
// this.booksForm['other'] = para;
}
Update(){
console.log(this.booksForm.value)
  this.api.Putbookproduct(this.booksForm.value,this.booksForm.controls.bookid.value).then(res =>{
    // console.log(res)
    if(res['status'] == true){
      this.api.snackmsg(res["msg"],"close");
      this.btnhideshow = false;
      this.pcodedisable=false;
      this.getbookproduct();
      this.booksForm.reset();
    }
  }).catch(e =>{
    console.log(e)
    this.api.snackmsg(e,"close");
    this.btnhideshow = false;
    this.pcodedisable = false;
    this.getbookproduct();
  })
}
}
