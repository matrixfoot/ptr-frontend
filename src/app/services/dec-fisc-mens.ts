import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Decfiscmens } from '../models/dec-fisc-mens';
const API_URL_test = 'http://localhost:3003/api/decfiscmens/';
const API_URL_cloud= 'https://macompta.com.tn:3000/api/decfiscmens/'
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class DecfiscmensService {
    
    
    constructor(private http: HttpClient) { }
    public decfiscmenss: Decfiscmens[] = [
    
    ];
    public decfiscmenss$ = new Subject<Decfiscmens[]>();
 

    getdecfiscmenss() {
        this.http.get(API_URL_cloud).subscribe(
          (decfiscmenss: Decfiscmens[]) => {
            if (decfiscmenss) {
              this.decfiscmenss = decfiscmenss;
              this.emitdecfiscmenss();

            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitdecfiscmenss() {
        this.decfiscmenss$.next(this.decfiscmenss);
      }
      getDecfiscmensreqById(id: string) {
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
      getdecfiscmens(userId: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_cloud  ,{userId}).subscribe(
            (decfiscmenss: Decfiscmens[]) => {
              if (decfiscmenss) {
                this.decfiscmenss = decfiscmenss;
                this.emitdecfiscmenss();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      
    geexistenttdecfiscmens(userId: string,annee:string,mois:string) 
    {
return new Promise((resolve, reject) => {
        this.http.post(API_URL_cloud+'/anneemois/',{userId,annee,mois}).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error); 
          }
        );
      });

      }
      
      create(decfiscmens: Decfiscmens) {
        return new Promise((resolve, reject) => {
          
          this.http.post(API_URL_cloud+'createdecfiscmens', decfiscmens).subscribe(
            (response) => {
              resolve(response);

            },
            (error) => {
              reject(error);
            },
          );
        });
      }
    
     
    
      modify(id: string, decfiscmensreq: Decfiscmens, image: File | string) {
        return new Promise((resolve, reject) => {
          let decfiscmensreqData: Decfiscmens | FormData;
          if (typeof image === 'string') {
            
            decfiscmensreqData = decfiscmensreq;
          } else {
            decfiscmensreqData = new FormData();
            decfiscmensreqData.append('decfiscmensreq', JSON.stringify(decfiscmensreq));
            decfiscmensreqData.append('image', image, decfiscmensreq.email);
          }
          this.http.put(API_URL_cloud + id, decfiscmensreqData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      modifydecfiscmensreqById(id: string, decfiscmens: Decfiscmens) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+ id, decfiscmens).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        }); 
      }
      completedecfiscmensreqById(id: string, decfiscmens: Decfiscmens) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'modify/'+ id, decfiscmens).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      deletedecfiscmensById(id: string) {
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
      deletedecfiscmenss() {
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
