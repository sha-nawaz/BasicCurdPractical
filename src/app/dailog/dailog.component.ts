import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DailogComponent {

  employeForm!: FormGroup;
  actionBtn: string = "Save";
  employe: any = {};

  constructor(private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService, private dailofRef: MatDialogRef<DailogComponent>) { };

  ngOnInit() {

    this.employeForm = this.formbuilder.group({
      firstName: [null, [Validators.required,Validators.minLength(2),Validators.pattern('^[a-zA-Z]+$'),]],
      lastName: [null, [Validators.required,Validators.minLength(2),Validators.pattern('^[a-zA-Z]+$'),]],
      emailId: [null, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      country: ['', Validators.required],
    })
    console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "update"
      this.employeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeForm.controls['emailId'].setValue(this.editData.emailId);
      this.employeForm.controls['mobileNumber'].setValue(this.editData.mobileNumber);
      this.employeForm.controls['country'].setValue(this.editData.country);
    };

  };
  get FirstName(): FormControl {
    return this.employeForm.get('firstName') as FormControl
  };

  get LastName(): FormControl {
    return this.employeForm.get('lastName') as FormControl
  };
  get Email(): FormControl {
    return this.employeForm.get('emailId') as FormControl
  };

  get MobileNo(): FormControl {
    return this.employeForm.get('mobileNumber') as FormControl
  };
  get Country(): FormControl {
    return this.employeForm.get('country') as FormControl
  };
  addEmploye() {

    if (!this.editData) {
      if (this.employeForm.valid) {

        this.api.postEmployeService(this.employeForm.value).subscribe({
          next: (res) => {
            alert("product added sucessfully");
            console.log(res);

            this.employe = Object.assign(this.employe, this.employeForm.value)
            localStorage.setItem('employe', JSON.stringify(this.employe))
            this.employeForm.reset();
            this.dailofRef.close('save')
          },
          error: () => {
            alert("error while adding the product")
          },
        });
      };
    }
    else {
      this.updateEmploye()
    }
  };

  updateEmploye() {

    this.api.updateEmployeService(this.employeForm.value, this.editData.id).subscribe({
      next: (res) => {
        console.log(res);
          alert("data hasbeen updated sucessfully");

        this.employe = Object.assign(this.employe, this.employeForm.value)
        localStorage.setItem('employe', JSON.stringify(this.employe))

        this.employeForm.reset();
        this.dailofRef.close("update");
      },
      error: () => {
        alert("erroe while updating the record")
      }
    });
  };
};

