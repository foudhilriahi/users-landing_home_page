import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  showProfile = false;
  companyName!: string;
  companyAddress!: string;
  companyActivity!: string;
  companyDescription!: string;
  companyLogoUrl!: string;

  constructor(private http: HttpClient) {}

  profile(): void {
    this.showProfile = true;
    // Fetch the company details from the API and populate the form fields
    this.http.get<any>('api/company') // Replace 'api/company' with the correct API endpoint for fetching the company details
      .subscribe(data => {
        this.companyName = data.name;
        this.companyAddress = data.address;
        this.companyActivity = data.activity;
        this.companyDescription = data.description;
        this.companyLogoUrl = data.logo.fileUrl; // Assuming the API response contains the logo file URL
      });
  }

  uploadLogo(event: any): void {
    const file = event.target.files[0];
    // Implement logic to upload the logo file and handle the response
    // You can use the HttpClient to send a POST request to the API endpoint responsible for uploading the logo
  }

  saveProfile(): void {
    // Implement logic to save the updated profile details
    // You can use the HttpClient to send a PUT request to the API endpoint responsible for updating the company details
  }

  cancelProfile(): void {
    this.showProfile = false;
    // Reset the form fields if needed
  }
}
