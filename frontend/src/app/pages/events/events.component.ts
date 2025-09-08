import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../services/events.service';
import { EventModel } from '../../types/event.type';
import { EventTableComponent } from '../../components/event-table/event-table.component';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    EventTableComponent,
    MatButtonModule,
    MatIconModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events: EventModel[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  // obtener los eventos
  getEvents() {
    this.loading = true;
    this.errorMessage = '';

    // hacer la peticion
    this.eventsService.getEvents().subscribe({
      next: (res) => {
        console.log(res);
        this.events = res;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al cargar los eventos';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // ir a la vista de actualizar
  handleEdit(event: EventModel) {
    this.router.navigate(['/update', event.id]);
  }

  // eliminar el evento
  handleDelete(event: EventModel) {
    this.errorMessage = '';

    // hacer la peticion
    this.eventsService.deleteEvent(event.id).subscribe({
      next: () => {
        this.events = this.events.filter((e) => e.id !== event.id);
        this.snackBar.open('Evento eliminado exitosamente', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al eliminar el evento';
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 4000,
        });
      },
    });
  }

  // ir a la vista para crear
  handleCreate() {
    this.router.navigate(['/create']);
  }
}
