import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, Route } from '@angular/router';
import { ApiService, IRegion } from '../api.service';
import { Breadcrumb } from '../components/navigation.component';
import { TableComponent, T, ColumnVM } from './table.component';
import { Observable, of } from 'rxjs';
import { NevigationService } from '../nevigation.service';
@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TableComponent, NgIf],
  template: `
    <div class="bg-yellow-400 m-2" *ngIf="data && actionColumnTemplate">
      <app-table
        [data]="data"
        [columns]="columns"
        [actionColumnTemplate]="actionColumnTemplate"
      ></app-table>
      page : {{ page }} data :
    </div>

    <ng-template #tempAddressBook let-element>
      <button class="bg-blue-200" (click)="goRegionAddressBook(element)">
        區域人員
      </button>
      <button class="bg-blue-200" (click)="goRegionUserList(element)">
        人員列表
      </button>
    </ng-template>

    <ng-template #tempFieldStaff let-element>
      <div class="bg-blue-200">組織人員按鈕</div>
    </ng-template>
  `,
  styles: [],
})
export class TableContainerComponent {
  @ViewChild('actionColumnTemplate')
  actionColumnTemplate!: TemplateRef<unknown>;
  @ViewChild('tempFieldStaff', { static: false, read: TemplateRef })
  tempFieldStaff!: TemplateRef<unknown>;
  @ViewChild('tempAddressBook', { static: false, read: TemplateRef })
  tempAddressBook!: TemplateRef<unknown>;

  page = 1;
  data!: T[];
  routeList: Breadcrumb[] = [];
  columns!: ColumnVM[];
  position = '';
  queryParams: unknown;

  constructor(
    private api: ApiService,
    private router: Router,
    private navigationService: NevigationService,
    private cdr: ChangeDetectorRef,
  ) {
    this.position = this.router.routerState.snapshot.url
      .split('/')
      .slice(-1)[0];
  }

  ngAfterViewInit(): void {
    this.reload();
  }

  reload(): void {
    switch (this.position) {
      case 'addressBook':
        this.getRegion();
        return;
      case 'fieldStaff':
        this.getFieldStaff();
        return;
    }
  }

  getFieldStaff() {
    this.api.getFieldStaff().subscribe((res) => {
      this.setTableData(res);
      this.cdr.detach();
      this.actionColumnTemplate = this.tempFieldStaff;
      this.cdr.detectChanges();
    });
  }

  getRegion() {
    this.api.getRegion().subscribe((res) => {
      this.setTableData(res);
      this.actionColumnTemplate = this.tempAddressBook;
      this.cdr.detectChanges();
    });
  }

  /**區域查看 */
  goRegionAddressBook(rowData: IRegion) {
    this.router.navigate(['home', 'addressBook'], {
      queryParams: { region: rowData.region },
    });
    this.navigationService.addBread({ region: rowData.region });

    this.api.postUserAddressBook(rowData.region).subscribe((res) => {
      console.log(res);
      this.setTableData(res);
      this.actionColumnTemplate = this.tempAddressBook;
      this.cdr.detectChanges();
    });
  }

  /** 區域人員列表 */
  goRegionUserList(rowData: IRegion) {
    this.router.navigate(['home', 'region'], {
      queryParams: { region: rowData.region },
    });
  }

  setTableData(data: T[]) {
    if (data.length === 0) {
      window.alert('空字串');
      return;
    }
    const list = Object.keys(data[0]).map((item) => ({
      col: item,
      colName: ColNameNameSpace.colName[item as Col],
    }));
    list.push({ col: 'action', colName: '動作' });

    this.columns = list;
    console.log(this.columns);

    this.data = data;
    this.cdr.detectChanges(); // Add this line
  }
}

export enum Col {
  createDate = 'createDate',
  id = 'id',
  userName = 'userName',
  userId = 'userId',
  region = 'region',
  locationNumber = 'locationNumber',
  gender = 'gender',
  phone = 'phone',
  jobName = 'jobName',
  arrivalDate = 'arrivalDate',
  isValid = 'isValid',
  SuperiorNumber = 'SuperiorNumber',
}

export type ColNameType = {
  [key in Col]: string;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ColNameNameSpace {
  export const colName: ColNameType = {
    id: '編號',
    createDate: '創建日期',
    userName: '姓名',
    userId: '代號',
    region: '區域',
    locationNumber: '處代號',
    gender: '性別',
    phone: '電話',
    jobName: '職稱',
    arrivalDate: '入值日期',
    isValid: '狀態',
    SuperiorNumber: '操作',
  };
}
function mpa(arg0: (data: any) => boolean): any {
  throw new Error('Function not implemented.');
}
