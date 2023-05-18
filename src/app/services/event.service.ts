import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Events } from '../models/event.model';



@Injectable({
    providedIn: 'root'
  })
export class ApiServiceService {
    API_URL_cloud= 'https://macompta.com.tn:3000/api/events/'
    API_URL_test = 'http://localhost:3003/api/events/';  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  window: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // Add Event to Calender//
  addEvent(event:Events) {
    return new Promise((resolve, reject) => {
          
        this.http.post(this.API_URL_cloud+'add_events', event).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
  }
 // Add Events to Calender//
 addEvents(event:Event[]) {
  return new Promise((resolve, reject) => {
        
      this.http.post(this.API_URL_cloud+'add_multiple_events', event).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
}
  // Get All Events //
  getAllEvents() {
    return this.http.get(this.API_URL_cloud).
      pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }
  geteventreqById(id: string) {
    return new Promise((resolve, reject) => {
      

      this.http.get(this.API_URL_cloud + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  getcomingEvents() {
    return this.http.get(this.API_URL_cloud+'coming_events').
      pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }
  // Delete Single Event//
  deleteSingleEvent(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.API_URL_cloud + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyeventById(id: string, event: Events) {
    return new Promise((resolve, reject) => {
      
        
      
      this.http.put(this.API_URL_cloud+ id, event).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  // Get All Events //
  deleteAllEvents() {
    return new Promise((resolve, reject) => {
      this.http.delete(this.API_URL_cloud).subscribe(
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