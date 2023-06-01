import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { NgxPaginationModule} from 'ngx-pagination';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import * as jwt_decode from 'jwt-decode'; // Import the jwt-decode library


@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})




export class CompanyHomeComponent {
  //hedha username mil local storage bae3d login n3aytoulou fil ngONit
  username: string | null | undefined;
  
  editMode: boolean = false;


  
  showProfileForm: boolean = false;
  profileEditMode: boolean = false;
  companyProfile: any = {};
  companyId!: string; 
  company:any[] = [];


 
  selectedFile: File | Blob | string | null = null;
  existingImage: string | null = null;




  


  
  offers: any[] = [];
  pagedOffers: any[] = [];
  pageSize = 2;
  currentPage = 1;
  newOffer: any = {}; // Define the newOffer object
  showAddOfferForm: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // showOffersList: boolean = false;
  showOffers : boolean= false;
  thumbnailUrl!: string;
  



  applications: any[] = [];
  showApplicationsList: boolean = false;

  constructor(private dialog: MatDialog,private router: Router,private http: HttpClient,private companyService: CompanyService) {

   
  }



  ngOnInit(): void {
    // this.offers = [];
    this.username = localStorage.getItem('username');
    this.updatePageData();

    this.fetchExistingImage();
    

  }


addOffer(): void {

  this.showAddOfferForm = true; // Show the new offer form
 
}

adddOffer(offerData: any): void {
   

  this.newOffer.contract = 'CDI';

  this.showAddOfferForm = true;
  const newOffer = {
   

    
    position: offerData.position,
    address: offerData.address,
    description: offerData.description,
    requiredexperience: offerData.requiredexperience,
    expiresAt: offerData.expiresAt,
     publishedAt: new Date().toISOString(),
    salaryMin: offerData.salaryMin,
    salaryMax: offerData.salaryMax,
    contract: offerData.contract,
    status: 'Open',
    positions: offerData.positions
  };

  this.http.post('http://localhost:8000/api/offers', newOffer)
    .subscribe(
      (response) => {
        alert("OK")
        console.log('Offer added successfully:', response);
        // Perform any additional logic or updates after successful addition

        // Optionally, you can update the local offers array and
        // fetch the updated list of offers from the database
        this.offres();
      },
      (error) => {
        console.log('Error adding offer:', error);
        // Handle the error appropriately
      }
    );
}


updatePageData(): void {
  this.pagedOffers = this.offers;
}

onPageChange(pageEvent: PageEvent): void {
  this.currentPage = pageEvent.pageIndex;
  this.updatePageData();
}
  cancelAddOffer(): void {
    this.showAddOfferForm = false;
  }


offres(): void {
  this.showOffers = !this.showOffers;
  this.http.get('http://localhost:8000/api/offers').subscribe(
    (response: any) => {
       this.offers = response['hydra:member'];
      //this.offers = response.data.offers;
      this.updatePageData();

      console.log(this.offers);
    },
    (error) => {
      console.log(error);
    }
  );
}





  Logout(): void {
    // Perform any logout logic here (e.g., clearing session data, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('loginType');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  


  deleteOffer(offerId: string): void {
    const endpoint = `http://localhost:8000/api/offers/${offerId}`;
  
    this.http.delete(endpoint)
      .subscribe(
        () => {
          alert("OK")
          console.log('Offer deleted successfully');
          // Update the offers array to reflect the changes after successful deletion
          this.offres();
        },
        (error) => {
          console.log('Error deleting offer:', error);
          // Handle the error appropriately
        }
      );
  }



  modifyOffer(offer: any): void {
    const endpoint = `http://localhost:8000/api/offers/${offer.Id}`;

    this.http.put(endpoint, offer)
      .subscribe(
        (response) => {
          alert("OK")
          console.log("Offer modified successfully:", response);
          // Add any additional logic or updates you want to perform after modifying the offer
        },
        (error) => {
          console.log("Error modifying offer:", error);
          // Handle the error appropriately
        }
      );
  }
  



  clusterOffer(offer: any): void {
    const endpoint = `http://localhost:8000/api/offers/${offer.id}`;
  
    // Update the offer status to "Closed"
    offer.status = "Closed";
  
    this.http.put(endpoint, offer)
      .subscribe(
        (response) => {
          alert("OK")
          console.log("Offer clustered successfully:", response);
        },
        (error) => {
          console.log("Error clustering offer:", error);
          // Handle the error appropriately
        }
      );
  }


  saveOffer(offer: any): void {
    const endpoint = `http://localhost:8000/api/offers/${offer.id}`;
  
    this.http.put(endpoint, offer)
      .subscribe(
        (response) => {
          alert("OK")
          console.log("Offer modified successfully:", response);
          offer.editMode = false; // Disable edit mode after saving
        },
        (error) => {
          console.log("Error modifying offer:", error);
          // Handle the error appropriately
        }
      );
  }
  
  cancelEdit(offer: any): void {
    offer.editMode = false;
  }


















 

  

  profile(): void {
   

    const companyId = localStorage.getItem('companyId');
    if (companyId) {
      this.http.get(`http://localhost:8000/api/companies/${companyId}`).subscribe(
        (response: any) => {
          this.companyProfile = response; // Assign the company profile data to the component property
          this.showProfileForm = true; // Show the profile form
          this.profileEditMode = false; // Disable edit mode initially
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('companyId is null');
    }




    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
  
    if (token) {
      const decodedToken: any = jwt_decode.default(token);
  
      const username = decodedToken.username; // Adjust the property name based on your JWT token structure
  
      this.http.get('http://localhost:8000/api/companies').subscribe(
        (response: any) => {
          this.company = response['hydra:member'];
  
          // Find the company that has a matching username
          const matchingCompany = this.company.find((c: any) => c.name === username);
  
          if (matchingCompany) {
            // Matching company found
            console.log('Company Username:', username);
            console.log('Company ID:', matchingCompany.id);
  
            // Update the stored company ID in localStorage
            localStorage.setItem('companyId', matchingCompany.id);
          } else {
            // No matching company found
            console.log('No matching company found');
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
  
  // saveProfile(): void {
  //   const companyId = localStorage.getItem('companyId');
  
  //   if (companyId) {
  //     const endpoint = `http://localhost:8000/api/companies/${companyId}`;
  
  //     this.http.put(endpoint, this.companyProfile).subscribe(
  //       (response) => {
  //         console.log('Company profile modified successfully:', response);
  //         this.profileEditMode = false; // Disable edit mode after saving
  //       },
  //       (error) => {
  //         console.log('Error modifying company profile:', error);
  //       }
  //     );
  //   } else {
  //     console.log('companyId is null');
  //   }
  // }
  // saveProfile(): void {
  //   const companyId = localStorage.getItem('companyId');
  
  //   if (companyId && this.selectedFile) {
  //     const fileData = new FormData();
  //     fileData.append('file', this.selectedFile);
  
  //     this.http.post('http://localhost:8000/api/media_objects', fileData).subscribe(
  //       (response: any) => {
  //         const fileId = response['@id']; // Get the file ID from the response
  
  //         const profileData = {
  //           description: this.companyProfile.description,
  //           address: this.companyProfile.address,
  //           activity: this.companyProfile.activity,
  //           file: fileId // Assign the file ID to the company's "file" property
  //         };
  
  //         const endpoint = `http://localhost:8000/api/companies/${companyId}`;
  
  //         this.http.put(endpoint, profileData).subscribe(
  //           () => {
  //             console.log('Company profile modified successfully');
  //             this.profileEditMode = false; // Disable edit mode after saving
  //           },
  //           (error) => {
  //             console.log('Error modifying company profile:', error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.log('Error uploading file:', error);
  //       }
  //     );
  //   } else {
  //     console.log('companyId is null or selectedFile is missing');
  //   }
  // }
  saveProfile(): void {
    const companyId = localStorage.getItem('companyId');
  
    if (companyId && this.selectedFile) {
      const fileData = new FormData();
      fileData.append('file', this.selectedFile);
  
      this.http.post('http://localhost:8000/api/media_objects', fileData).subscribe(
        (response: any) => {
          const fileId = response['@id']; // Get the file ID from the response
  
          const profileData = {
            description: this.companyProfile.description,
            address: this.companyProfile.address,
            activity: this.companyProfile.activity,
            file: fileId // Assign the file ID to the company's "file" property
          };
  
          const endpoint = `http://localhost:8000/api/companies/${companyId}`;
  
          this.http.put(endpoint, profileData).subscribe(
            () => {
              console.log('Company profile modified successfully');
              this.profileEditMode = false; // Disable edit mode after saving
  
              // Update the thumbnail URL with the uploaded image URL
              this.thumbnailUrl = `http://localhost:8000${fileId}`; // Adjust the URL as per your server configuration
            },
            (error) => {
              console.log('Error modifying company profile:', error);
            }
          );
        },
        (error) => {
          console.log('Error uploading file:', error);
        }
      );
    } else {
      console.log('companyId is null or selectedFile is missing');
    }
  }
  

  fetchExistingImage(): void {
    const companyId = localStorage.getItem('companyId');
    if (companyId) {
      const endpoint = `http://localhost:8000/api/companies/${companyId}`;
  
      this.http.get(endpoint).subscribe(
        (response: any) => {
          // Retrieve the file URL from the response
          const fileUrl = response.file;
          this.existingImage = fileUrl ? `http://localhost:8000${fileUrl}` : null;
        },
        (error) => {
          console.log('Error fetching existing image:', error);
        }
      );
    }
  }


  





  canceelEdit(): void {
    this.profileEditMode = false; // Disable edit mode
    
  }


  



  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  addProfilePhoto(event: any): void {
    const file: File = event.target.files[0];

    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:8000/api/media_objects', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);

        // Update the current company's file_id with the response
        this.companyProfile.file_id = response.id;

        // Save the updated company profile
        this.saveProfile();
      },
      (error) => {
        console.log('Error uploading file:', error);
        // Handle the error appropriately
      }
    );
  }









  fetchApplications() {
    this.http.get('http://localhost:8000/api/users').subscribe(
      (response: any) => {
        console.log('Fetched applications successfully:', response);
        this.applications = response['hydra:member'];
      },
      (error: any) => {
        console.error('Failed to fetch applications:', error);
      }
    );
  }
  Applications() {
    this.fetchApplications();
    // Toggle the visibility of the applications list
    this.showApplicationsList = !this.showApplicationsList;
  }

  acceptUser(){}
  rejectUser(){}
view(){}






}  
  




























