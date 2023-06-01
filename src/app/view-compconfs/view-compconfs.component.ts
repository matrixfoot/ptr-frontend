import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { concat, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Decfiscmens } from '../models/dec-fisc-mens';
import { Router } from '@angular/router';
import { Compconf } from '../models/compconf.model';
import { compconfService } from '../services/compconf.service';

import { FormBuilder } from '@angular/forms';
import { CommunService } from '../services/commun';
import { ExcelService } from '../services/excel.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TokenStorageService } from '../services/token-storage.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-view-compconfs',
  templateUrl: './view-compconfs.component.html',
  styleUrls: ['./view-compconfs.component.scss']
})
export class ViewCompconfsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: false})
  public viewPort: CdkVirtualScrollViewport;
  displayStyle: string;
  settedfiltreditems: any[]=[];
  displaysearch='none';
  compconfsnormal: Compconf[];
  compconfssecond: Compconf[];
  compconfschargeback: Compconf[];
  currentItemsToShownormal: Compconf[];
  currentItemsToShowsecond: Compconf[];
  currentItemsToShowchargeback: Compconf[];
  optionValue='';
  option1Value='';
  option2Value='';
  option3Value=null;
  option4Value=null;
  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }
  currentUser: User;
  public loading: boolean;
  public users: User[] = [];
  public compconfs: Compconf[] = [];
  compconfsSub: Subscription;
  showitems:false
  currentItemsToShow: any=[];
  filtreditems: any=[];
  constructor(private token: TokenStorageService,private formBuilder: FormBuilder,
    private UserService: UserService,
    private commun: CommunService,private com: compconfService,
    private router: Router,
    private excelService:ExcelService) { }

  ngOnInit() {
    this.loading=true
    this.currentUser = this.token.getUser();
    this.compconfsSub = this.com.compconfs$.subscribe(
      (compconfs) => {
        this.compconfs = compconfs;
        this.loading = false;
        this.compconfsnormal=this.compconfs.filter((item) => item.TRANSACTIONCODE=="08"&&item.PRESENTMENTINDICATOR!="R"
        ||item.TRANSACTIONCODE=="05"&&item.PRESENTMENTINDICATOR!="R"||item.TRANSACTIONCODE=="06"&&item.PRESENTMENTINDICATOR!="R"
        ||item.TRANSACTIONCODE=="07"&&item.PRESENTMENTINDICATOR!="R")
        this.compconfssecond=this.compconfs.filter((item) => item.TRANSACTIONCODE=="08"&&item.PRESENTMENTINDICATOR=="R"
        ||item.TRANSACTIONCODE=="05"&&item.PRESENTMENTINDICATOR=="R"||item.TRANSACTIONCODE=="06"&&item.PRESENTMENTINDICATOR=="R"
        ||item.TRANSACTIONCODE=="07"&&item.PRESENTMENTINDICATOR=="R")
        this.compconfschargeback=this.compconfs.filter((item) => item.TRANSACTIONCODE=="15"||item.TRANSACTIONCODE=="17"
        ||item.TRANSACTIONCODE=="18")
        this.currentItemsToShownormal=this.compconfsnormal.slice(0,100)
        this.currentItemsToShowsecond=this.compconfssecond.slice(0,100)
        this.currentItemsToShowchargeback=this.compconfschargeback.slice(0,100)
console.log(this.currentItemsToShownormal)
console.log(this.currentItemsToShowsecond)
console.log(this.currentItemsToShowchargeback)

        this.compconfs.length>0?this.displaysearch="block":''
      },
      (error) => {
        this.loading = false;
      }
    );
    this.token.getToken()?this.getallcompconfs():''
  }
  filtervalue(value:string):string
  {
    let view:string
    value=='T'?view='TPE/ECOM':
    value=='G'?view='GAB':
    value==''||value=='O'||value=='M'?view='Manual':
    value=='R'?view='Recharge GAB':
    value=='Z'?view='Mobile':
    value=='05'?view='Achat':
    value=='06'?view='crédit':
    value=='07'?view='Cash Advance':
    value=='08'?view='Retrait':
    value=='15'?view='Impayé GAB':
    value=='17'?view='Impayé CASH ADVANCE':
    value=='18'?view='Impayé GAB':
    value=='1'?view='1st CHARGEBACK':
    value=='2'?view='2nd CHARGEBACK':
    value
    return view
  }
  getallcompconfs() {                                            
    this.com.getcompconfs().then(
      (data:any) => {
        this.loading = false;
        this.buildData(this.compconfs.length)
      },
      (error) => {
        this.loading = false;    
      }
   );
 } 
 buildData(length: number) {
  const ITEMS_RENDERED_AT_ONCE = 5000;
  const INTERVAL_IN_MS = 1000;

  let currentIndex = 0;

  const interval = setInterval(() => {
    const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;
    for (let n = currentIndex; n <= nextIndex ; n++) 
    {
      if (n >= length) {
        clearInterval(interval);
        break;
      }
      this.currentItemsToShow.push(
        this.compconfs[n]
      )
    }
    currentIndex += ITEMS_RENDERED_AT_ONCE;
  }, INTERVAL_IN_MS)
}
onPageChange($event) {
  this.currentItemsToShownormal =  this.compconfsnormal.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  this.currentItemsToShowsecond =  this.compconfssecond.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  this.currentItemsToShowchargeback =  this.compconfschargeback.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);

}
avance()
{
  let rech=document.getElementById("recherche")
  this.optionValue==''?
  rech.style.display=='none':
  this.optionValue=''
}

filtercompconf()
{
 
  let filtredbyid=[]
  let filtredbycarte=[]
  let filtredbyinf=[]
  let filtredbysup=[]
  let filtredbyvalue=[]
  this.filtreditems=[]
  this.displayStyle = "block"; 
this.optionValue!=''?filtredbyvalue=this.commun.filterByValue(this.compconfs,this.optionValue):filtredbyvalue=[]
this.option1Value!=''?filtredbyid=this.commun.filterByValue(this.compconfs,this.option1Value):filtredbyid=[]
this.option2Value!=''?this.compconfs.forEach((element)=> 
{
  CryptoJS.AES.decrypt(element.CARDHOLDERNUMBER, '****************').toString(CryptoJS.enc.Utf8)==this.option2Value?filtredbycarte.push(element):''
}
):filtredbycarte=[] 
this.option3Value?
filtredbyinf=this.compconfs.filter((element)=> new Date(element.TRANSACTIONDATE.substring(2,4)+'.'+
element.TRANSACTIONDATE.substring(0,2)+'.'+'-20'+element.TRANSACTIONDATE.substring(4,6)) >=this.option3Value):filtredbyinf=[]
this.option4Value?
filtredbysup=this.compconfs.filter((element)=> new Date(element.TRANSACTIONDATE.substring(2,4)+'.'+
element.TRANSACTIONDATE.substring(0,2)+'.'+'-20'+element.TRANSACTIONDATE.substring(4,6)) <= this.option4Value):filtredbysup=[]

this.filtreditems=this.filtreditems.concat(filtredbyid,filtredbycarte,filtredbyinf,filtredbysup,filtredbyvalue)
  this.settedfiltreditems= this.filtreditems.filter((obj, index) => {
    return index === this.filtreditems.findIndex(o => obj === o);
  });
}
closePopup()
{
  this.displayStyle = "none";
}
}
