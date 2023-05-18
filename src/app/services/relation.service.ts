import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Relations } from '../models/relation.model';

const API_URL_cloud= 'https://macompta.com.tn:3000/api/relations/'
    const API_URL_test = 'http://localhost:3003/api/relations/'; 

@Injectable({
    providedIn: 'root'
  })
export class relationService {
     
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  window: any;
  private relations: Relations[] = [
    
];

public relations$ = new Subject<Relations[]>();
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }


 // Add Relations to Calender//
     // Add users//
     addrelations(user:Relations[]) {
        return new Promise((resolve, reject) => {
              
            this.http.post(API_URL_cloud+'add_multiple_Relations', user).subscribe(
              (response) => {
                resolve(response);
              },
              (error) => {
                reject(error);
              }
            );
          });
      }
  // Get All Relations //
  getAll() {
    this.http.get(API_URL_cloud).subscribe(
      (relations: Relations[]) => {
        if (relations) {
          this.relations = relations;
          this.emitrelations();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  emitrelations() {
    this.relations$.next(this.relations);
  }
  getRelationreqById(id: string) {
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

  // Delete Single Relation//
  deleteSingleRelation(id) {
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
  modifyRelationById(id: string, Relation: Relations) {
    return new Promise((resolve, reject) => {
      
        
      
      this.http.put(API_URL_cloud+ id, Relation).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  // Get All Relations //
  deleteAllRelations() {
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
  sendsms(description: string) 
  {
    return new Promise((resolve, reject) => {

      this.http.post(API_URL_cloud+ 'sendsms', { description }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
      })
  }
}