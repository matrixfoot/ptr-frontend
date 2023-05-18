import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Deccomptabilite } from '../models/dec-comptabilite';
const API_URL_test= 'http://localhost:3003/api/deccomptabilite/';
const API_URL_cloud= 'https://macompta.com.tn:3000/api/deccomptabilite/'
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class DeccomptabiliteService {
    
    
    constructor(private http: HttpClient) { }
    public deccomptabilites: Deccomptabilite[] = [
    
    ];
    public deccomptabilites$ = new Subject<Deccomptabilite[]>();
 

    getdeccomptabilites() {
        this.http.get(API_URL_cloud).subscribe(
          (deccomptabilites: Deccomptabilite[]) => {
            if (deccomptabilites) {
              this.deccomptabilites = deccomptabilites;
              this.emitdeccomptabilites();

            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitdeccomptabilites() {
        this.deccomptabilites$.next(this.deccomptabilites);
      }
      getDeccomptabilitereqById(id: string) {
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
      getdeccomptabilite(userId: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_cloud  ,{userId}).subscribe(
            (deccomptabilites: Deccomptabilite[]) => {
              if (deccomptabilites) {
                this.deccomptabilites = deccomptabilites;
                this.emitdeccomptabilites();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      
    geexistenttdeccomptabilite(userId: string,annee:string,mois:string) 
    {
return new Promise((resolve, reject) => {
        this.http.post(API_URL_cloud+'anneemois/',{userId,annee,mois}).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error); 
          }
        );
      });

      }
      create(deccomptabilite: Deccomptabilite, image3: File[], image5: File[], image6: File[]) {
        return new Promise((resolve, reject) => {
          const deccomptabiliteData = new FormData();
          const filtredautre3=this.filterByValue(deccomptabilite.autre3,'true')
          const filtredautre5=this.filterByValue(deccomptabilite.autre5,'true')
          const filtredautre6=this.filterByValue(deccomptabilite.autre6,'true')

          deccomptabiliteData.append('deccomptabilite', JSON.stringify(deccomptabilite));
          
            for (let i = 0; i < image3.length; i++)
            {
              deccomptabiliteData.append('image', image3[i],'t'+filtredautre3[i].type+filtredautre3[i].fournisseur+filtredautre3[i].numerofacture+deccomptabilite.mois+deccomptabilite.annee); 
            }
          
         
            for (let i = 0; i < image5.length; i++)
            {
              deccomptabiliteData.append('image', image5[i],'t'+filtredautre5[i].type+filtredautre5[i].annee+filtredautre5[i].mois); 
            }
          
            for (let i = 0; i < image6.length; i++)
            {
              deccomptabiliteData.append('image', image6[i],'t'+filtredautre6[i].type+filtredautre6[i].matricule+deccomptabilite.mois+deccomptabilite.annee); 
            }
          console.log(deccomptabiliteData)
          
        
          this.http.post(API_URL_cloud+'/createdeccomptabilite/', deccomptabiliteData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      createwithoutfile(deccomptabilite: Deccomptabilite) {
        return new Promise((resolve, reject) => {
          
          this.http.post(API_URL_cloud+'/createdeccomptabilite/', deccomptabilite).subscribe(
            (response) => {
              resolve(response);

            },
            (error) => {
              reject(error);
            },
          );
        });
      }
     
     
    
      modify(id: string,deccomptabilite: Deccomptabilite, image3: File[], image5: File[], image6: File[]) {
        return new Promise((resolve, reject) => {
          const deccomptabiliteData = new FormData();
        const filtredautre3=this.filterByValue(deccomptabilite.autre3,'true')
        const filtredautre5=this.filterByValue(deccomptabilite.autre5,'true')
        const filtredautre6=this.filterByValue(deccomptabilite.autre6,'true')
        deccomptabiliteData.append('deccomptabilite', JSON.stringify(deccomptabilite));
        
        filtredautre3.forEach((item, index) => 
        {     
          image3.forEach((element, pos) => 
          {  
            if(element.name==item.numeropiece)
{
  deccomptabiliteData.append('image', element,'t'+item.type+item.fournisseur+item.numerofacture+deccomptabilite.mois+deccomptabilite.annee); 
}
          }
          ) 
       })
       filtredautre5.forEach((item, index) => 
        {     
          image5.forEach((element, pos) => 
          {  
            if(element.name==item.numeropiece)
{
  deccomptabiliteData.append('image', element,'t'+item.type+item.annee+item.mois); 
}
          }
          ) 
       })
       filtredautre6.forEach((item, index) => 
        {     
          image6.forEach((element, pos) => 
          {  
            if(element.name==item.numeropiece)
{
  deccomptabiliteData.append('image', element,'t'+item.type+item.matricule+deccomptabilite.mois+deccomptabilite.annee); 
}
          }
          ) 
       })       
        console.log(deccomptabilite)
         this.http.put(API_URL_cloud + id, deccomptabiliteData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      completedeccomptabilitereqById(id: string, deccomptabilite: Deccomptabilite) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'modify/'+ id, deccomptabilite).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      deletedeccomptabiliteById(id: string) {
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
      deletedeccomptabilites() {
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
      filterByValue(array, value) {
        if(array!=undefined)
        {
          return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
        }     
       }
       filterByValue2(array, value) {
        if(array!=undefined)
        {
          return array.find((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
        }     
       }
    }
