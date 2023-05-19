import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Contact } from '../models/contact.model';
const API_URL_test = 'http://localhost:3000/api/contactreqs/';
const API_URL_cloud= 'https://macompta.com.tn:3002/api/contactreqs/'
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class ContactService {
    
    
    constructor(private http: HttpClient) { }
    private contactreqs: Contact[] = [
    
    ];
    public contactreqs$ = new Subject<Contact[]>();
 

    getContactreqs() {
        this.http.get(API_URL_test).subscribe(
          (contactreqs: Contact[]) => {
            if (contactreqs) {
              this.contactreqs = contactreqs;
              this.emitContactreqs();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitContactreqs() {
        this.contactreqs$.next(this.contactreqs);
      }
      getContactreqById(id: string) {
        return new Promise((resolve, reject) => {
          

          this.http.get(API_URL_test + id).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error); 
            }
          );
        });
      }
      getContact(email: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_test +'contact' ,{email}).subscribe(
            (contacts: Contact[]) => {
              if (contacts) {
                this.contactreqs = contacts;
                this.emitContactreqs();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      getContactreqssup(date: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_test +'filtercontactreqsup' ,{date}).subscribe(
            (contactreqs: Contact[]) => {
              if (contactreqs) {
                this.contactreqs = contactreqs;
                this.emitContactreqs();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      getContactreqsinf(date: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_test +'filtercontactreqinf' ,{date}).subscribe(
            (contactreqs: Contact[]) => {
              if (contactreqs) {
                this.contactreqs = contactreqs;
                this.emitContactreqs();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      
    
      create(contact: Contact, image: File) {
        return new Promise((resolve, reject) => {
          const contactData = new FormData();
          contactData.append('contact', JSON.stringify(contact));
          contactData.append('image', image, contact.firstname);
          this.http.post(API_URL_test+'createcontactreq', contactData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      createwithoutimage(contact: Contact) {
        return new Promise((resolve, reject) => {
          
          this.http.post(API_URL_test+'createcontactreqwithoutimage', contact).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      comunicatewithuser(contact: Contact) {
        return new Promise((resolve, reject) => {
          
          this.http.post(API_URL_test+'comunicatewithuser', contact).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
     
    
      modify(id: string, contactreq: Contact, image: File | string) {
        return new Promise((resolve, reject) => {
          let contactreqData: Contact | FormData;
          if (typeof image === 'string') {
            contactreq.ficheUrl = image;
            contactreqData = contactreq;
          } else {
            contactreqData = new FormData();
            contactreqData.append('contactreq', JSON.stringify(contactreq));
            contactreqData.append('image', image, contactreq.email);
          }
          this.http.put(API_URL_test + id, contactreqData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      modifycontactreqById(id: string, contactreq: Contact) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_test+ id, contactreq).subscribe(
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
