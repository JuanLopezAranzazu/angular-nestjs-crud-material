export interface CreateEventDto {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface UpdateEventDto {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface EventModel extends CreateEventDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}
