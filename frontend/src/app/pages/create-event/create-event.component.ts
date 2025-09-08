import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { CreateEventDto } from '../../types/event.type';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-event',
  imports: [CommonModule, EventFormComponent, ErrorMessageComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
  loadingForm = false;
  errorMessage = '';

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // crear nuevo evento
  onCreate(event: CreateEventDto) {
    this.loadingForm = true;
    this.errorMessage = '';

    // hacer la peticion
    this.eventsService.createEvent(event).subscribe({
      next: (res) => {
        console.log(res);
        this.snackBar.open('Evento creado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al crear el evento';
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 4000,
        });
        this.loadingForm = false;
      },
      complete: () => {
        this.loadingForm = false;
      },
    });
  }
}
