import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  createOffer(offerData: any) {
    const url = `${this.baseUrl}/offers`; // Update with the appropriate endpoint URL
    return this.http.post(url, offerData);
  }

  getOffer(id: number) {
    const url = `${this.baseUrl}/offers/${id}`;
    return this.http.get(url);
  }

  updateOffer(id: number, offerData: any) {
    const url = `${this.baseUrl}/offers/${id}`;
    return this.http.put(url, offerData);
  }

  deleteOffer(id: number) {
    const url = `${this.baseUrl}/offers/${id}`;
    return this.http.delete(url);
  }

































  
  // Add other methods for different API operations as needed
}