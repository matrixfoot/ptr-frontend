import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Compconf } from '../models/compconf.model';

const API_URL_cloud= 'https://ptr-backend.onrender.com/api/compconfs/'
const API_URL_test = 'http://localhost:3002/api/compconfs/'; 
@Injectable({
    providedIn: 'root'
  })
export class compconfService {
     
  headers = new HttpHeaders().set('Content-Type', 'application/json',);
  currentUser = {};
  window: any;
  private compconfs: Compconf[] = [
    
];

public compconfs$ = new Subject<Compconf[]>();
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  create(compconf: Compconf[]) {
    return new Promise((resolve, reject) => {
      
      this.http.post(API_URL_cloud+'createcompconf/', compconf).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyById(id: string, compconf: Compconf) {
    return new Promise((resolve, reject) => {
      this.http.put(API_URL_cloud+ id, compconf).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getcompconfs() {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_test).subscribe(
        (compconfs: Compconf[]) => {
          if (compconfs) {
            this.compconfs = compconfs;
            this.emitcompconfs();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    )
  }

  emitcompconfs() {
    this.compconfs$.next(this.compconfs);
  }
  getById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  deleteById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+ id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }  
  deletecompconfs() {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}