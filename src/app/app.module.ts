import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import * as formconfiguration from '../form.json';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'configuration',
      useValue: formconfiguration
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
