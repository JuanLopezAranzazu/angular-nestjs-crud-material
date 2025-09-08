import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventModel } from '../../types/event.type';

@Component({
  selector: 'app-event-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit {
  @Input() initialData: EventModel | null = null;
  @Input() loadingForm = false;
  @Output() formSubmit = new EventEmitter<any>();

  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group(
      {
        name: [
          this.initialData?.name || '',
          [Validators.required, Validators.minLength(3)],
        ],
        description: [this.initialData?.description || ''],
        startDate: [this.initialData?.startDate || '', Validators.required],
        endDate: [this.initialData?.endDate || '', Validators.required],
      },
      { validators: this.dateRangeValidator }
    );
  }

  // validar que la fecha final > fecha inicial
  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const start = control.get('startDate')?.value;
    const end = control.get('endDate')?.value;

    if (start && end && new Date(start) > new Date(end)) {
      control.get('endDate')?.setErrors({ dateRangeInvalid: true });
      return { dateRangeInvalid: true };
    } else {
      const errors = control.get('endDate')?.errors;
      if (errors) {
        delete errors['dateRangeInvalid'];
        if (Object.keys(errors).length === 0) {
          control.get('endDate')?.setErrors(null);
        }
      }
    }
    return null;
  }

  // enviar el formulario
  submitForm(): void {
    if (this.eventForm.valid) {
      this.formSubmit.emit(this.eventForm.value);
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  get f() {
    return this.eventForm.controls;
  }
}
