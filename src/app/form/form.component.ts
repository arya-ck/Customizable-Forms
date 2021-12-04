import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  visibleFields: any = [];

  constructor(
    @Inject('configuration') private config: any
  ) { }

  ngOnInit(): void {

    // initialize form component
    this.initializeForm();
  }

  initializeForm(){
    let visibleFields: any = [], formFields: any = {};
    this.config.fields.forEach((field: {id: string, type: string, required?: boolean, validations?: {enable?: any, show?: any}}) => {

      // ensure element is visible and add element to form
      if(!field.validations || !field.validations.show || (field.validations?.show && this.isValid(field.validations.show, 'show'))){
        
        let value;
        if(this.registrationForm.value && this.registrationForm.value[field.id]){ // if form contains value for the field
          value = this.registrationForm.value[field.id];
        } else {  // otherwise add empty value
          value = '';
        }
        
        formFields[field.id] = new FormControl(value, field.required? Validators.required: null);
        visibleFields.push(field);
      }
    });

    // save the visible fields
    this.visibleFields = visibleFields;
    
    // initialize form control
    this.registrationForm = new FormGroup(formFields);

    // for debugging porpose, remove later
    console.log(this.registrationForm);
    
  }

  isValid(validation: {id: string, value: string}, type: string): boolean {

    // if validation is undefined, return default value true
    if(!validation){
      return true;
    }

    let dependentField = validation.id;
    let valid = true;
    let value;

    // get the value of dependent field from registration form
    if(dependentField){
      value = this.registrationForm.get(dependentField)?.value;
    }

    // check is dependency is valid
    valid = value?.toString() == validation.value?.toString();

    return valid;
  }

  detectChange(): void{
    // re-initialize form
    this.initializeForm();
  }
}
