import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
// import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

declare var require: any;    
// var $ = require("jquery");
const numberWords = require('number-words');
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  rupessinwords:any;
  rupessinwords2:any;
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    let temp =0;
    // this.api.invoicedata = [{"_id":"5f8febae33be5508e38aacc5","title":"CBSE All In One Science ","author":"CBSE","summary":"not Enabled","isbn":"978-8174505118","bookname":"science book","duedate":"2020-10-28T18:30:00.000Z","bookid":"yiAgQTz40","__v":0,"collected":{"productname":"science book","qty":10,"dis":100},"total":1000},{"_id":"5f8ff1ea717b6b108fbaa8bf","title":"social civis","author":"CBSE","summary":"not Enabled","isbn":"8174505118","bookname":"Social Text Book for class X","duedate":"2020-10-26T18:30:00.000Z","bookid":"5idZAGbRo","__v":0,"collected":{"productname":"Social Text Book for class X","qty":12,"dis":41},"total":492}]
    // console.log(this.api.invoicedata)
    this.api.invoicedata.forEach(element => {
      temp += element.total
      console.log(element.total)
    });
    console.log(temp)
    this.rupessinwords2 = temp;
    // this.api.billingarray_sareeprod = {"customerdetails":{"_id":"5f893afd4a8eb2001728f72b","customername":"santhoush ","phoneumber":"12345679","address":"salem,tamilnadu,india,south india","emailid":"san@gamil.com","adhaarid":"21365480","date":"2020-10-18T18:30:00.000Z","customerid":"jbxgKwLw4","__v":0},"tabledatadet":[{"_id":"5f8d33a614712100171d0c80","sareeproductname":"demo","sareeqty":500,"sareerate":1350,"sareecode":"555","sareehsncode":"8245","date":"2020-10-22T18:30:00.000Z","sareeproductid":"KuyjqOlhv","__v":0,"collected":{"productname":"555","qty":1,"dis":25},"total":1325},{"_id":"5f8d248ce9a1a82f242873f9","sareeproductname":"silk","sareeqty":10,"sareerate":50,"sareecode":"silk100","sareehsncode":"HSN001","date":"2020-10-16T18:30:00.000Z","sareeproductid":"A2Jz8bsMq","__v":0,"collected":{"productname":"silk100","qty":2,"dis":0},"total":100}],"tax_details":{"totamt":1425,"taxamt":"67.86","tottaxpercent":5,"cgsttax":"33.93","sgsttax":"33.93","roundoff":1357,"totamtwithtax":1357.14}}
    this.rupessinwords = numberWords.convert(temp)
    // console.log(this.rupessinwords)
    // console.log(    this.api.billingarray_sareeprod ,"**********")
//     $.noConflict();

//     $(document).ready(function() {
//     $('#example').DataTable( {
//         dom: 'Bfrtip',
//         buttons: [
//             'copy', 'csv', 'excel', 'pdf', 'print'
//         ]
//     } );
// } );
setTimeout(() => {
  this.printdata();
}, 3000);
  }

  printdata(){
    // let printContents, popupWin;
    // printContents = document.getElementById('example').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
    // popupWin.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    // popupWin.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
    // popupWin.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
    // popupWin.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
    // popupWin.document.write(printContents);
    // popupWin.document.close();

    var printlme = document.getElementById("example");
    var wme = window.open("","","width=900,height=700,toolbar=0,scrollbars=0,status=0,top=0,left=0,height=100%,width=auto");
    wme.document.open();
    
    wme.document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
    wme.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    wme.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
    wme.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
    wme.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
    wme.document.write(printlme.innerHTML);
    // wme.document.write(printlme.outerHTML);
    wme.document.close();
    wme.focus();
    wme.print();
    // wme.close();
  }

}
