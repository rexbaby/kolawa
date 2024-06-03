import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ILocation, IRegion, Staff } from '../api.service';
import { Breadcrumb } from '../components/navigation.component';
import { RouterChangeHandlerService } from '../router-change-handler.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <mat-table [dataSource]="dataSource" class="w-full">
      <!-- Position Column -->
      <ng-container [matColumnDef]="column.col" *ngFor="let column of columns">
        <th mat-header-cell *matHeaderCellDef>{{ column.colName }}</th>
        <td mat-cell *matCellDef="let element">
          <div [ngSwitch]="column.col">
            <ng-container *ngSwitchCase="'isValid'">
              <ng-container
                *ngTemplateOutlet="
                  isValidColumnTemplate;
                  context: { $implicit: element }
                "
              >
              </ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="'action'">
              <ng-container
                *ngTemplateOutlet="
                  actionColumnTemplate;
                  context: { $implicit: element }
                "
              >
              </ng-container>
            </ng-container>

            <ng-container *ngSwitchDefault>{{
              element[column.col]
            }}</ng-container>
          </div>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </mat-table>
  `,
  styles: [],
})
export class TableComponent {
  @Input() data: T[] = [];
  @Input() actionColumnTemplate!: TemplateRef<unknown>;
  @Input() isValidColumnTemplate!: TemplateRef<unknown>;
  @Input() columns: ColumnVM[] = [];

  displayedColumns!: string[];

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource<T>(this.data);
    }
    if (changes['columns']) {
      this.displayedColumns = this.columns.map((c) => c.col);
    }
  }
}
export interface ColumnVM {
  col: string;
  colName: string;
}

export type T = IRegion | Staff;
