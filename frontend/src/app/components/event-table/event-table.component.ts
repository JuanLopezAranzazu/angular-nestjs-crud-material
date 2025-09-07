import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventModel } from '../../types/event.type';

@Component({
  selector: 'app-event-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [DatePipe],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.scss',
})
export class EventTableComponent implements AfterViewInit {
  @Input() events: EventModel[] = [];
  @Output() edit = new EventEmitter<EventModel>();
  @Output() delete = new EventEmitter<EventModel>();

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<EventModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.events;
  }

  onEdit(event: EventModel) {
    this.edit.emit(event);
  }

  onDelete(event: EventModel) {
    this.delete.emit(event);
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
