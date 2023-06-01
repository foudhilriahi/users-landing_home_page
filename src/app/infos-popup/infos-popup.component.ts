import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectCountryComponent } from '@angular-material-extensions/select-country';
// import { FileUploader } from 'ngx-file-drop';



@Component({
  selector: 'app-infos-popup',
  templateUrl: './infos-popup.component.html',
  styleUrls: ['./infos-popup.component.css']
})
export class InfosPopupComponent {
  
  infosForm: FormGroup | undefined;
  countrySelect: string | undefined; // Add the countrySelect property
  // uploader: FileUploader;

  constructor(
    public dialogRef: MatDialogRef<InfosPopupComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.initForm();
    
  }

  private initForm() {
    this.infosForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
    });
  }














}
