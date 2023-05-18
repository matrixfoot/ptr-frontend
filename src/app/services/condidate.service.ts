import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Condidate } from '../models/condidate.model';
const API_URL_test = 'http://localhost:3003/api/condidates/';
const API_URL_cloud= 'https://macompta.com.tn:3000/api/condidates/'
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class CondidateService {
    
    
    constructor(private http: HttpClient) { }
    private condidates: Condidate[] = [
    
    ];
    public condidates$ = new Subject<Condidate[]>();
 

    getCondidates() {
        this.http.get(API_URL_cloud).subscribe(
          (condidates: Condidate[]) => {
            if (condidates) {
              this.condidates = condidates;
              this.emitCondidates();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitCondidates() {
        this.condidates$.next(this.condidates);
      }
      getCondidateById(id: string) {
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
      getCondidate(email: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_cloud +'condidate' ,{email}).subscribe(
            (condidates: Condidate[]) => {
              if (condidates) {
                this.condidates = condidates;
                this.emitCondidates();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
    
      
    
      create(condidate: Condidate, image: File) {
        return new Promise((resolve, reject) => {
          const condidateData = new FormData();
          condidateData.append('condidate', JSON.stringify(condidate));
          condidateData.append('image', image, condidate.firstname);
          this.http.post(API_URL_cloud+'createcondidate', condidateData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
     
    
      modify(id: string, condidate: Condidate, image: File | string) {
        return new Promise((resolve, reject) => {
          let condidateData: Condidate | FormData;
          if (typeof image === 'string') {
            condidate.ficheUrl = image;
            condidateData = condidate;
          } else {
            condidateData = new FormData();
            condidateData.append('condidate', JSON.stringify(condidate));
            condidateData.append('image', image, condidate.email);
          }
          this.http.put(API_URL_cloud + id, condidateData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      modifycondidateById(id: string, condidate: Condidate) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+ id, condidate).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      deleteCondidate(id: string) {
        return new Promise((resolve, reject) => {
          this.http.delete(API_URL_cloud + id).subscribe(
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
