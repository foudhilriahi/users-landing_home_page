import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8000/api/companies';

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCompanyById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  createCompany(name: string, description: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { name: name, description: description };
    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  updateCompanyDescription(id: number, description: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json'
    });
    const body = { description: description };
    return this.http.patch(url, body, { headers: headers });
  }
  

  deleteCompany(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
