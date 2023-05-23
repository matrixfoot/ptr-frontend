import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Carouselmodel } from '../models/settings';
import { CarouselService } from '../services/settings';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { read, utils } from "xlsx"
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { compconfService } from '../services/compconf.service';
import { User } from '../models/user.model';
import { Compconf } from '../models/compconf.model';
import { CommunService } from '../services/commun';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-insert-compconf-file',
  templateUrl: './insert-compconf-file.component.html',
  styleUrls: ['./insert-compconf-file.component.scss']
})
export class InsertCompconfFileComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: false})
  public viewPort: CdkVirtualScrollViewport;
  displayStyle: string;
  settedfiltreditems: any[];
  displaysearch='none';
  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }
  currentUser: User;
  loading=false;
 file: any;
 uploadEvent: any;
 arrayBuffer: string | ArrayBuffer;
 compconfsSub: Subscription;
 Compconf: Compconf;
  compconfform: FormGroup;
  jsondata: any=[];
  currentItemsToShow= [];
  optionValue:any
  filtreditems=[];
 constructor(private token: TokenStorageService,private compconfservice: compconfService,private userservice: UserService,
  private formBuilder: FormBuilder,private commun: CommunService,
   private router: Router,) {}
  ngOnInit() {
    this.currentUser = this.token.getUser();
    
  }
  myFunction1() {
    var checkbox:any = document.getElementById("myCheck1");
    var text2 = document.getElementById("bodycontainer1");
    if (checkbox.checked == true){
      text2.style.display = "block";
    } else {
      Swal.fire({
        title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout de compconfs, voulez vous continuer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Réinitialiser',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) { 
          this.jsondata=[]
          text2.style.display = "none";
        }
        else{
          checkbox.checked = true
          text2.style.display = "block";
        }
      }).catch(() => {
        Swal.fire('opération non aboutie!');
      });
    }
  }
  onFileChange2(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    let fileReader = new FileReader();
    var arr = new Array();
    fileReader.onload = (e) => {
      //@ts-ignore
      const guestList = fileReader.result.split(/\r?\n/);
      for (var i = 0; i != guestList.length; ++i)
        arr.push(
          {
            doctype:'compconf',
            userId:this.currentUser.userId,
            MERCHANTIDENTIFICATION:guestList[i].substring(0,10),
            BATCHIDENTIFICATION:guestList[i].substring(10,16),
            INVOICENUMBER:guestList[i].substring(16,22),
            CARDHOLDERNUMBER:guestList[i].substring(22,41),
            MERCHANTSECTOR:guestList[i].substring(41,42),
            CHANNELTRANSACTIONID:guestList[i].substring(42,43),
            OPERATIONCODE:guestList[i].substring(43,44),
            TRANSACTIONCODE:guestList[i].substring(44,46),
            TRANSACTIONAMOUNT:guestList[i].substring(46,55),
            CARDEXPIRYDATE:guestList[i].substring(55,59),
            PROCESSINGDATE:guestList[i].substring(59,65),
            TRANSACTIONDATE:guestList[i].substring(65,71),
            AUTHORIZATIONCODE:guestList[i].substring(71,77),
            REMITTANCEDATE:guestList[i].substring(77,83),
            MERCHANTCATEGORIECODE:guestList[i].substring(83,87),
            FILLER:guestList[i].substring(87,89),
            ACQUIRERBANKIDENTIFICATION:guestList[i].substring(89,94),
            LOCALCARDSYSTEMNETWORK:guestList[i].substring(94,95),
            ISSUERBANKIDENTIFICATION:guestList[i].substring(95,100),
            ACQUIRERREFERENCENUMBER:guestList[i].substring(100,123),
            TRANSACTIONORDERUSAGECODE:guestList[i].substring(123,125),
            MERCHANTNAME:guestList[i].substring(125,150),
            SETTLEMENTAMOUNT:guestList[i].substring(150,159),
            TRANSACTIONTIME:guestList[i].substring(159,163),
            FILLER2:guestList[i].substring(163,167),
            ENDOFRECORD:guestList[i].substring(167,168),
          }
          );
        console.log(arr);
        this.jsondata=arr
        console.log(arr.length)
        this.buildData(this.jsondata.length)
        this.displaysearch = "block";

    };
   
    fileReader.readAsText(this.file);
  }
  
  save()

  {
    this.loading = true;
    console.log(this.jsondata)
    this.compconfservice.create(this.jsondata).then(
      (data:any) => {
        this.loading = false;
  console.log(this.jsondata)        
  Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'fichiers ajoutées avec succès!',
          showConfirmButton: false,
          timer: 6000 
        });
            this.reloadPage();
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
        this.jsondata[n]
      )
    }
    currentIndex += ITEMS_RENDERED_AT_ONCE;
  }, INTERVAL_IN_MS)
}
onPageChange($event) {
  this.currentItemsToShow =  this.jsondata.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
}
filtercompconf()
{
  this.displayStyle = "block";
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
reloadPage(): void {
  
  setTimeout(() => window.location.reload(), 3000);
  
}
}
