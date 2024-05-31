import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ILocation, IRegion, Staff } from '../api.service';
import { Breadcrumb } from '../components/navigation.component';
import { RouterChangeHandlerService } from '../router-change-handler.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Col, ColNameNameSpace } from './table-container.component';
import { Observable } from 'rxjs';

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
  @Input() columns: ColumnVM[] = [];

  displayedColumns!: string[];

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routerChangeHandlerService: RouterChangeHandlerService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource<T>(this.data);
    }
    if (changes['columns']) {
      this.displayedColumns = this.columns.map((c) => c.col);
    }
  }

  /** 導航員工列表
   *廢棄
   */
  gogo(row: T) {
    console.log(row);
    const breadcrumb = {} as Breadcrumb;
    if ('region' in row) {
      breadcrumb.name = row.region;
      console.log(row);
      breadcrumb.breadType = 'region';
      breadcrumb.filterCondition = row.region;
    }

    if ('userName' in row) {
      breadcrumb.name = row.userName;
      breadcrumb.breadType = 'staff';
      breadcrumb.filterCondition = row.userId;
    }

    console.log(breadcrumb);
    this.routerChangeHandlerService.setRouterChangeRouterList(breadcrumb);
    this.router.navigate(['/home', 'fieldStaff'], {
      queryParams: { name: row.region },
    });
  }

  goLocation(row: ILocation) {
    const breadcrumb = {} as Breadcrumb;
    breadcrumb.name = row.region;
    breadcrumb.breadType = 'location';
    breadcrumb.filterCondition = row.location;
    this.routerChangeHandlerService.setRouterChangeRouterList(breadcrumb);
  }
}
export interface ColumnVM {
  col: string;
  colName: string;
}

export type T = IRegion | Staff;
