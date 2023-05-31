import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { concat, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Decfiscmens } from '../models/dec-fisc-mens';
import { Router } from '@angular/router';
import { Workgab } from '../models/workgab.model';
import { compconfService } from '../services/compconf.service';
import { FormBuilder } from '@angular/forms';
import { CommunService } from '../services/commun';
import { ExcelService } from '../services/excel.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-view-workgab',
  templateUrl: './view-workgab.component.html',
  styleUrls: ['./view-workgab.component.scss']
})
export class ViewWorkgabComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, {static: false})
  public viewPort: CdkVirtualScrollViewport;
  displayStyle: string;
  settedfiltreditems: any[]=[];
  displaysearch='none';
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
  public workgabs: Workgab[] = [];
  compconfsSub: Subscription;
  showitems:false
  currentItemsToShow: any=[];
  filtreditems: any=[];
  optionValue='';
  option1Value='';
  option2Value='';
  option3Value='';
  option4Value='';

  constructor(private token: TokenStorageService,private formBuilder: FormBuilder,
    private UserService: UserService,
    private commun: CommunService,private com: compconfService,
    private router: Router,
    private excelService:ExcelService) { }

  ngOnInit() {
    this.loading=true
    this.currentUser = this.token.getUser();
    this.compconfsSub = this.com.workgabs$.subscribe(
      (workgabs) => {
        this.workgabs = workgabs;
        this.loading = false;
        this.currentItemsToShow=this.workgabs.slice(0,100)
        this.displaysearch="block"

      },
      (error) => {
        this.loading = false;
      }
    );
    this.token.getToken()?this.getallworkgabs():''
  }
  getallworkgabs() {                                            
    this.com.getWorkgabs().then(
      (data:any) => {
        this.loading = false;
        this.buildData(this.workgabs.length)
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
        this.workgabs[n]
      )
    }
    currentIndex += ITEMS_RENDERED_AT_ONCE;
  }, INTERVAL_IN_MS)
}
onPageChange($event) {
  this.currentItemsToShow =  this.workgabs.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
}
avance()
{
  let rech=document.getElementById("recherche")
  this.optionValue==''?
  rech.style.display=='none':
this.optionValue=''
}
filterworkgabs()
{
  let cri1=''
  let cri2=''
  let cri3:Date
  this.displayStyle = "none";
  this.option1Value!=''?cri1=this.option1Value:cri1=''
  this.option2Value!=''?cri2=this.option2Value:cri2=''  
  
  this.currentItemsToShow.forEach((element)=>
  {
    this.option3Value!=''||this.option4Value!=''?cri3=new Date(element.TRANSACTIONDATE.substring(2,4)+'.'+
    element.TRANSACTIONDATE.substring(0,2)+'.'+'-20'+element.TRANSACTIONDATE.substring(4,6)):''  
    console.log(cri3)
  }
  )  

  console.log(cri3)
/*this.filtreditems=this.workgabs.filter((element)=> 
{
  this.option1Value!=''?element.MERCHANTIDENTIFICATION==this.option1Value:

})
  this.filtreditems.push(
    this.commun.findByValue2(this.currentItemsToShow,this.optionValue)
  )
  this.settedfiltreditems= this.filtreditems.filter((obj, index) => {
    return index === this.filtreditems.findIndex(o => obj === o);
  });*/
}
closePopup()
{
  this.displayStyle = "none";
 
}

}
