import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Userdeleted } from '../models/user-deleted.model';
const API_URL_test = 'http://localhost:3000/api/users/';
const API_URL_cloud= 'https://rich-tan-bear-belt.cyclic.app/api/users/'
@Injectable({ providedIn: 'root' })
export class UserService {
  filtred: User[] = []
    constructor(private http: HttpClient) { }
    private users: User[] = [
    ];
    private usersdeleted: Userdeleted[] = [
    ];
    public users$ = new Subject<User[]>();
    public usersdeleted$ = new Subject<Userdeleted[]>();
 





    
    getAll() {
        this.http.get(API_URL_cloud).subscribe(
          (users: User[]) => {
            if (users) {
              this.users = users;
              this.emitusers();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      getAlldeleted() {
        this.http.get(API_URL_cloud+'deletedusers/all/').subscribe(
          (usersdeleted: Userdeleted[]) => {
            if (usersdeleted) {
              this.usersdeleted = usersdeleted;
              
              this.emitusersdeleted();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      emitusers() {
        this.users$.next(this.users);
      }
      emitusersdeleted() {
        this.usersdeleted$.next(this.usersdeleted);
      }
   
     // Add users//
 addusers(user:User[]) {
  return new Promise((resolve, reject) => {
        
      this.http.post(API_URL_cloud+'add_multiple_users', user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
}
      
      getUserById(id: string) {
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
      getUserdeletedById(id: string) {
        return new Promise((resolve, reject) => {
          

          this.http.get(API_URL_cloud + 'deleteduser/'+id).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      
      modifyUserwithimageById(id: string, user: User, image: File | string) {
        return new Promise((resolve, reject) => {
          let userData: User | FormData;
          if (typeof image === 'string') {
            user.ficheUrl = image;
            userData = user;
          } else {
            userData = new FormData();
            userData.append('user', JSON.stringify(user));
            userData.append('image', image, user.email);
          }
          this.http.put(API_URL_cloud + id, userData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
   
      modifyUserById(id: string, user: User) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+ id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      completeUserById(id: string, user: User) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'complete/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      desactivateUser(id: string, user: User) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'desactivate/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      liberateUser(id: string, user: User) {
        return new Promise((resolve, reject) => { 
          this.http.put(API_URL_cloud+'nostandby/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      deletetemporarUser(id: string) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.delete(API_URL_cloud+'temporardelete/'+id).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      restaureUser(id: string) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.delete(API_URL_cloud+'restaure/'+id).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      activateUser(id: string, user: User) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'activate/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      standbyUser(id: string, user: User) {
        return new Promise((resolve, reject) => {
          this.http.put(API_URL_cloud+'standby/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      connectUser(id: string, user: User) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'connect/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      disconnectUser(id: string, user: User) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'disconnect/'+id, user).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    deleteUserById(id: string) {
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
    verifyEmail(token: string) 
    {
      return new Promise((resolve, reject) => {
        this.http.post(API_URL_cloud+ 'verify-email', { token }).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    forgotPassword(email: string) 
  {
    return new Promise((resolve, reject) => {
      this.http.post(API_URL_cloud+ 'forgot-password', { email }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  validateResetToken(token: string) 
  {
    return new Promise((resolve, reject) => {
      this.http.post(API_URL_cloud+ 'validate-reset-token', { token }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  resetPassword(token: string, password: string, confirmPassword: string) 

  {
    return new Promise((resolve, reject) => {
      this.http.post(API_URL_cloud+ 'reset-password', { token, password, confirmPassword }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getuserbyfirstname(firstname: string) 
  {
    
      this.http.post(API_URL_cloud+ 'filteruserfirstname', { firstname }).subscribe(
        (users: User[]) => {
          if (users) {
            this.users = users;
            this.emitusers();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    
  }
  getuserbylastname(lastname: string) 
  {
    
      this.http.post(API_URL_cloud+ 'filteruserlastname', { lastname }).subscribe(
        (users: User[]) => {
          if (users) {
            this.users = users;
            this.emitusers();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    
  }
  getuserbyemail(email: string) 
  {
    
      this.http.post(API_URL_cloud+ 'filteruseremail', { email }).subscribe(
        (users: User[]) => {
          if (users) {
            this.users = users;
            this.emitusers();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    
  }
  }