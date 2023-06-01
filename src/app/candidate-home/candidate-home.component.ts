import{ Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { MatDialog } from '@angular/material/dialog';
import { InfosPopupComponent } from '../infos-popup/infos-popup.component';
import { CvPopupComponent } from '../cv-popup/cv-popup.component';
import { map } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { NgxPaginationModule} from 'ngx-pagination';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import * as jwt_decode from 'jwt-decode'; // Import the jwt-decode library
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { MatMenuModule } from '@angular/material/menu';

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}
@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css']
})
export class CandidateHomeComponent implements OnInit {

  // loggedInUsername: string = '';
  showProfileForm: boolean = false;
  profileEditMode: boolean = false;
  users: any[] = [];
  profileForm!: FormGroup;
  showCVSection: boolean = false;
  experiences: any[] = [];

  







  selectedMiniForm: string | undefined;
  addCVForm: FormGroup;
  createdCVs: any[];






  public showOffersList: boolean = false;
  public offers: any[] = [];

  



  



 



Logout(): void {
  // Perform any logout logic here (e.g., clearing session data, etc.)
  localStorage.removeItem('token');
  localStorage.removeItem('loginType');
  localStorage.removeItem('userId');
  localStorage.removeItem('companyId');
  // Redirect to the login page
  this.router.navigate(['/login']);

}
  constructor(private formBuilder: FormBuilder,private fb: FormBuilder,private dialog: MatDialog,private router: Router,private http: HttpClient) {
    this.addCVForm = this.fb.group({
      position: ['', Validators.required],
      about: ['', Validators.required],
      isPublic: [false],
      experience: [0, Validators.required] // Set the default value as 0 or any valid number
    });
    this.createdCVs = [];
    

    





  }
  ngOnInit(): void {
    
    this.profile();
    // this.loggedInUsername = localStorage.getItem('username') || '';
    this.profileForm = this.fb.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      username: ['']
    });

    this.fetchCreatedCVs();


    this.fetchOffers();
    
  }
  

  
  profile(): void {
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
   
    if (token) {
      const decodedToken: any = jwt_decode.default(token);
      const username = decodedToken.username; // Adjust the property name based on your JWT token structure

      this.http.get('http://localhost:8000/api/users').subscribe(
        (response: any) => {
          this.users = response['hydra:member'];

          // Find the user that has a matching username
          const matchingUser = this.users.find((user: any) => user.username === username);

          if (matchingUser) {
            // Matching user found
            console.log('User Username:', username);
            localStorage.setItem('username', username);
            const userId = matchingUser['@id']; // Access the user ID from the @id property
            console.log('User ID:', userId);

            // Update the stored user ID in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            // Set the initial form data
            this.profileForm.patchValue({
              email: matchingUser.email,
              firstname: matchingUser.firstname,
              lastname: matchingUser.lastname,
              username: matchingUser.username
            });

            this.showProfileForm = false; // Show the profile form
            this.profileEditMode = false; // Disable edit mode initially
          } else {
            // No matching user found
            console.log('No matching user found');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Token is null');
    }
  }

  editProfile(): void {
    this.profileEditMode = true; // Enable edit mode
  }

  saveProfile(): void {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
  
    // Get the updated profile data from the form
    const updatedProfileData = {
      email: this.profileForm.value.email,
      firstname: this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      username: this.profileForm.value.username
    };
  
    // Perform the API request to update the user profile using the updatedProfileData and userId
    this.http.put(`http://localhost:8000${userId}`, updatedProfileData).subscribe(
      (response) => {
        alert('OK User profile modified successfully')
        // Handle the success response, if needed
        console.log('User profile modified successfully');
  
        // Disable edit mode and display a success message
        this.profileEditMode = false;
      },
      (error) => {
        // Handle the error response, if needed
        console.error('Error updating user profile:', error);
      }
    );
  }

  cancelEdit(): void {
    this.profileEditMode = false; // Disable edit mode
  }

  enableEdit(): void {
    this.profileEditMode = true;
  }
 
toggleProfileForm(): void {
  this.showProfileForm = !this.showProfileForm;
}




cv() {
  throw new Error('Method not implemented.');
  }

  showMiniForm(formName: string) {
    this.selectedMiniForm = formName;
  }








  fetchCreatedCVs() {
    this.http.get('http://localhost:8000/api/cvs').subscribe(
      (response: any) => {
        console.log('Fetched created CVs successfully:', response);
        this.createdCVs = response['hydra:member'];
      },
      (error: any) => {
        console.error('Failed to fetch created CVs:', error);
      }
    );
  }




  saveCV() {
  if (this.addCVForm && this.addCVForm.valid) {
    const newCV = this.addCVForm.value;
    newCV.isPublic = this.addCVForm.get('isPublic')?.value === true; // Perform null check

    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    if (userId) {
      const numericUserId = userId.split('/').pop(); // Extract numeric ID from user ID
      const user = '/api/users/' + numericUserId; // Create user object with proper @id format
      newCV.user = user; // Assign user object to newCV.user
    }

    this.http.post('http://localhost:8000/api/cvs', newCV).subscribe(
      (response: any) => {
        alert('CV ADDED OK')
        console.log('CV saved successfully:', response);
        this.createdCVs.push(response); // Add the new CV to the list
        this.addCVForm.reset();
      },
      (error: any) => {
        console.error('Failed to save CV:', error);
      }
    );
  }
}
editCV(cvId: string) {
 
}

deleteCV(cvId: string) {
  // Send a DELETE request to remove the CV based on cvId
  this.http.delete('http://localhost:8000/api/cvs/' + cvId).subscribe(
    (response: any) => {
      alert('CV DELETED OK')
      console.log('CV deleted successfully:', response);
      // Remove the deleted CV from the createdCVs array
      this.createdCVs = this.createdCVs.filter(cv => cv.id !== cvId);
    },
    (error: any) => {
      console.error('Failed to delete CV:', error);
    }
  );
}

























fetchOffers(): void {
  this.http.get('http://localhost:8000/api/offers').subscribe(
    (response: any) => {
      console.log('Fetched offers successfully:', response);
      this.offers = response['hydra:member'];
    },
    (error: any) => {
      console.error('Failed to fetch offers:', error);
    }
  );
}

toggleOffersList(): void {
  this.showOffersList = !this.showOffersList;
}

applyOffer(offer: any): void {
  // Implement the logic for applying to an offer
  console.log('Applying to offer:', offer);
}










































































}