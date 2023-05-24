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
  currentItemsToShow: any=[];
  filtreditems: any=[];
  optionValue: any;
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
      },
      (error) => {
        this.loading = false;
      }
    );
    console.log(this.currentUser)
    this.token.getToken()?this.getallcompconfs():''
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
  this.currentItemsToShow =  this.compconfs.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
}
filtercompconf()
{
  this.displayStyle = "none";
  this.filtreditems.push(
    this.commun.findByValue2(this.currentItemsToShow,this.optionValue)
  )
  this.settedfiltreditems= this.filtreditems.filter((obj, index) => {
    return index === this.filtreditems.findIndex(o => obj === o);
  });}
closePopup()
{
  this.displayStyle = "none";
 
}
}
