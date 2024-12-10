// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   apiEndPoint: string = 'https://localhost:7200/api/';

//   constructor(private http: HttpClient) { }

//   registerUser(obj: any) {
//     return this.http.post(this.apiEndPoint +'user/register', obj)
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   apiEndPoint: string = 'https://localhost:7200/api/';

//   constructor(private http: HttpClient) { }

//   registerUser(obj: any): Observable<any> {
//     return this.http.post(this.apiEndPoint + 'users/register', obj); 
//   }

//   login(obj: any) {
//     return this.http.post(this.apiEndPoint +'users/login', obj)
//   }




 
//   GetActiveJobs() {
//     return this.http.get(this.apiEndPoint + 'JobListing')
//   } 


//   // Get all companies
//   getCompanies(): Observable<any[]> {
//     console.log('Calling API to fetch companies');
//     return this.http.get<any[]>(`${this.apiEndPoint}Company`);
//   }

  
//     // Fetch all employers
//   getEmployers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiEndPoint}Employers`);
//   }


//   // Create a new company
//   createCompany(companyData: any): Observable<any> {
   
//     return this.http.post<any>(`${this.apiEndPoint}Company`, companyData);
//   }
//   // Create a new employer
//   createEmployer(employer: any): Observable<any> {
//     return this.http.post<any>(`${this.apiEndPoint}Employers`, employer);
//   }



//   // Create a new job
//   createJob(jobData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiEndPoint}Joblisting`, jobData);
//   }

//   // Fetch user details by ID
//   getUserById(userId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiEndPoint}users/${userId}`);
//   }
// }





// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { UserService } from 'src/app/service/user.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   apiEndPoint: string = 'https://localhost:7200/api/';

//   constructor(
//     private http: HttpClient,
//     private jwtHelper: JwtHelperService,
//     private userService: UserService
//   ) {}

//   // Register a new user
//   registerUser(obj: any): Observable<any> {
//     return this.http.post(this.apiEndPoint + 'users/register', obj); 
//   }

//   // Login user
//   login(obj: any) {
//     return this.http.post(this.apiEndPoint + 'users/login', obj);
//   }

//   // Fetch active job listings
//   getActiveJobs() {
//     return this.http.get(this.apiEndPoint + 'JobListing');
//   }

//   // Get all companies
//   getCompanies(): Observable<any[]> {
//     console.log('Calling API to fetch companies');
//     return this.http.get<any[]>(`${this.apiEndPoint}Company`);
//   }

//   // Fetch all employers
//   getEmployers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiEndPoint}Employers`);
//   }

//   // Create a new company
//   createCompany(companyData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiEndPoint}Company`, companyData);
//   }

//   // Create a new employer
//   createEmployer(employer: any): Observable<any> {
//     return this.http.post<any>(`${this.apiEndPoint}Employers`, employer);
//   }

//   // Create a new job
//   createJob(jobData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiEndPoint}Joblisting`, jobData);
//   }

//   // Fetch user details by ID
//   getUserById(userId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiEndPoint}users/${userId}`);
//   }

//   // Decode JWT token
//   decodeToken(token: string): any {
//     try {
//       return this.jwtHelper.decodeToken(token);
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return null;
//     }
//   }

//   // Get user role from token
//   getUserRoleFromToken(): string | null {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       const decodedToken = this.decodeToken(token);
//       return decodedToken ? decodedToken.role : null; // Assuming 'role' exists in the token payload
//     }
//     return null;
//   }

//   // Get user ID from token
//   getUserIdFromToken(): number | null {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       const decodedToken = this.decodeToken(token);
//       return decodedToken ? decodedToken.userId : null; // Assuming 'userId' exists in the token payload
//     }
//     return null;
//   }
// }



















import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiEndPoint: string = 'https://localhost:7200/api/';
  jwtHelper = new JwtHelperService(); // Instantiating JwtHelperService directly

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(obj: any): Observable<any> {
    return this.http.post(this.apiEndPoint + 'users/register', obj); 
  }

  // Login user
  login(obj: any) {
    return this.http.post(this.apiEndPoint + 'users/login', obj);
  }

  // Fetch active job listings
  GetActiveJobs() {
    return this.http.get(this.apiEndPoint + 'JobListing');
  }

  // Get all companies
  getCompanies(): Observable<any[]> {
    console.log('Calling API to fetch companies');
    return this.http.get<any[]>(`${this.apiEndPoint}Company`);
  }

  // Fetch all employers
  getEmployers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiEndPoint}Employers`);
  }

  // Create a new company
  createCompany(companyData: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}Company`, companyData);
  }

  // Create a new employer
  createEmployer(employer: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}Employers`, employer);
  }

  // Create a new job
  createJob(job: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}Joblisting`, job);
  }

  // Fetch user details by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}users/${userId}`);
  }

  // Decode JWT token
  private decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get user role from token
  getUserRoleFromToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.role : null; // Assuming 'role' exists in the token payload
    }
    return null;
  }

  // Get user ID from token
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.userId : null; // Assuming 'userId' exists in the token payload
    }
    return null;
  }
}
