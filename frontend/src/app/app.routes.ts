import { Routes } from '@angular/router';

// paginas
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { MissingComponent } from './pages/missing/missing.component';

export const routes: Routes = [
  { path: '', component: EventsComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'update/:id', component: UpdateEventComponent },
  { path: '**', component: MissingComponent },
];
