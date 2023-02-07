import { Component } from '@angular/core';
import { EmployeeService, Employee } from 'src/app/services/employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable }    from 'rxjs';

@Component({
  selector: 'app-updatedetails',
  templateUrl: './updatedetails.component.html',
  styleUrls: ['./updatedetails.component.css']
})
export class UpdatedetailsComponent {

  formGroup : FormGroup;
  titleAlert: string = "This field is required";
  employee: any = '';
  

constructor(private formBuilder : FormBuilder) {}

  ngOnInit() {
    this.createForm();    
    this.setChangeValidate(); 
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name':[null,Validators.required],
      'empId':[null, Validators.required],
      'designation':[null, Validators.required],
      'dateOfJoining':[null,Validators.required],
      'validate':''
    });
  } 

  setChangeValidate() {
      this.formGroup.get('validate').valueChanges.subscribe(
        (validate) => {
          if(validate=='1'){
            this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
            this.titleAlert = "You need to specify at least 3 characters";
          }
          else {
            this.formGroup.get('name').setValidators(Validators.required);
          }
          this.formGroup.get('name').updateValueAndValidity();
        }
      )
  }
  get name() {
    return this.formGroup.get('name') as FormControl
  }

  get empId() {
    return this.formGroup.get('empId') as FormControl
  }

  get designation(){
    return this.formGroup.get('designation') as FormControl
  }

  get dateOfJoining(){
    return this.formGroup.get('dateOfJoining') as FormControl
  }


  onSubmit(employee) {
    this.employee=employee;
  }
}
