import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css',
  providers: [DatePipe],
})
export class GenericTableComponent<T> implements OnInit, AfterViewInit {
  @Input() columns: string[] = [];
  @Input() data: T[] = [];
  @Input() headers: string[] = [];
  @Input() actions?: {
    view?: (row: T) => void;
    edit?: (row: T) => void;
    delete?: (row: T) => void;
  };
  dataSource!: MatTableDataSource<T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data || []);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data || [];
    }
  }
}
