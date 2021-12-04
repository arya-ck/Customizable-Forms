import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
  @Input() control: any;
  @Input() parentForm: FormGroup = new FormGroup({});
  @Input() disabled = false;
  @Output() detectChange: EventEmitter<void> = new EventEmitter();

  get required(){
    return this.parentForm.get(this.control.id)?.validator;
  }

  get invalid(){
    // check whether form input field is invalid
    if(this.parentForm.touched && this.parentForm.get(this.control.id)?.errors){
      let errors = this.parentForm.get(this.control.id)?.errors || {};
      return errors['required'];
    }
    return false;
  }

  valueChanged(){

    // emit event to inform the parent component about the change
    this.detectChange.emit();
  }
}
