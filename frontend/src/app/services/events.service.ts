import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEventDto, EventModel, UpdateEventDto } from '../types/event.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) { }

  // obtener los eventos
  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  // obtener un evento por id
  getEventById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/${id}`);
  }

  // crear un nuevo evento
  createEvent(event: CreateEventDto): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl, event);
  }

  // actualizar un evento
  updateEvent(id: number, event: UpdateEventDto): Observable<EventModel> {
    return this.http.patch<EventModel>(`${this.apiUrl}/${id}`, event);
  }

  // eliminar un evento
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
