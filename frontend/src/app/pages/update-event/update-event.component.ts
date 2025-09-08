import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventModel, UpdateEventDto } from '../../types/event.type';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-event',
  imports: [
    CommonModule,
    EventFormComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss',
})
export class UpdateEventComponent implements OnInit {
  event: EventModel | null = null;
  loading = false;
  loadingForm = false;
  errorMessage = '';

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // obtener el evento
  ngOnInit(): void {
    // obtener el id
    const id = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    this.errorMessage = '';

    // validar el id
    if (!id) {
      this.errorMessage = 'El id es requerido';
      this.loading = false;
      return;
    }

    // hacer la peticion
    this.eventsService.getEventById(Number(id)).subscribe({
      next: (res) => {
        console.log(res);
        this.event = res;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al cargar el evento';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // actualizar el evento
  onUpdate(event: UpdateEventDto) {
    // validar el evento
    if (!this.event) return;

    this.loadingForm = true;
    this.errorMessage = '';

    // hacer la peticion
    this.eventsService.updateEvent(this.event.id, event).subscribe({
      next: (res) => {
        console.log(res);
        this.snackBar.open('Evento actualizado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          err.error?.message || 'Error al actualizar el evento';
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
