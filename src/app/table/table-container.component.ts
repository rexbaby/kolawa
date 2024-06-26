import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  RouterModule,
  Router,
  Route,
  ActivatedRoute,
  NavigationStart,
  ActivationEnd,
} from '@angular/router';
import { ApiService, IRegion, Staff } from '../api.service';
import { Breadcrumb } from '../components/navigation.component';
import { TableComponent, T, ColumnVM } from './table.component';
import {
  Observable,
  Subject,
  Subscription,
  filter,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { NavigationService } from '../navigation.service';
import { PermissionPipe } from '../shared/permission.pipe';
@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TableComponent,
    NgIf,
    PermissionPipe,
  ],
  template: `
    <div class="bg-yellow-400 m-2" *ngIf="data">
      <app-table
        [data]="data"
        [columns]="columns"
        [actionColumnTemplate]="actionColumnTemplate"
        [isValidColumnTemplate]="isValidColumnTemplate"
      ></app-table>
      page : {{ page }} data :
    </div>

    <ng-template #tempAddressBook let-element>
      <button class="btn-primary" (click)="goRegionUserList(element)">
        區域查看
      </button>
      <button class="btn-primary" (click)="routerChangeTo(element)">
        人員列表
      </button>
    </ng-template>

    <ng-template #tempFieldStaff let-element>
      <button class="btn-primary" (click)="editMember(element)">編輯</button>
      <button
        *ngIf="element && element?.superiorNumber"
        class="btn-primary"
        (click)="routerChangeToSubordinate(element)"
      >
        轄下
      </button>
    </ng-template>

    <ng-template #tempUnderJurisdiction let-element>
      <button class="btn-primary" (click)="editMember(element)">編輯</button>
      <button class="btn-primary" (click)="routerChangeToSubordinate(element)">
        轄下
      </button>
    </ng-template>

    <ng-template #isValidColumnTemplate let-element>
      {{ element | permission }}
    </ng-template>
  `,

  styles: [
    `
      .btn-primary {
        @apply py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75;
      }
    `,
  ],
})
export class TableContainerComponent {
  @ViewChild('actionColumnTemplate')
  actionColumnTemplate!: TemplateRef<unknown>;
  @ViewChild('tempFieldStaff', { static: false, read: TemplateRef })
  tempFieldStaff!: TemplateRef<unknown>;
  @ViewChild('tempAddressBook', { static: false, read: TemplateRef })
  tempAddressBook!: TemplateRef<unknown>;
  @ViewChild('tempUnderJurisdiction', { static: false, read: TemplateRef })
  tempUnderJurisdiction!: TemplateRef<unknown>;

  page = 1;
  data!: T[];
  routeList: Breadcrumb[] = [];
  columns!: ColumnVM[];
  position = '';
  queryParams: { [key: string]: string } = {};
  params: unknown;
  navigationEvent!: Subscription;
  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((res): res is ActivationEnd => res instanceof ActivationEnd))
      .subscribe((res) => {
        this.queryParams = res.snapshot.queryParams;
      });

    this.route.queryParams.subscribe((res) => {
      this.queryParams = res;
    });
  }

  ngOnInit(): void {
    this.navigationEvent = this.navigationService
      .getBread()
      .pipe()
      .subscribe((res: string) => {
        this.reload(res);
      });
  }

  ngOnDestroy(): void {
    if (this.navigationEvent) {
      this.navigationEvent.unsubscribe();
    }
  }
  /**
   *
   *
   * @param {string} res 麵包屑最後一個項目label
   * @return {*}  {void}
   * @memberof TableContainerComponent
   */
  reload(res: string): void {
    switch (res) {
      case 'home':
      case 'addressBook':
        this.getRegion();
        return;
      case 'region':
        if (this.queryParams['region']) {
          this.goRegionAddressBook();
        } else {
          console.error('queryParams region is undefined');
        }
        return;
      case 'superiorNumber':
        if (this.queryParams['superiorNumber']) {
          this.getSubordinate();
        } else {
          console.error('queryParams superiorNumber is undefined');
        }
        return;
      case 'fieldStaff':
        this.getFieldStaff();
        return;
    }
  }

  getFieldStaff() {
    this.api.getFieldStaff().subscribe((res) => {
      this.setTableData(res);
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

  /**區域人員列表 */
  goRegionAddressBook() {
    this.api
      .postUserAddressBook(this.queryParams['region'])
      .subscribe((res) => {
        this.setTableData(res);
        this.actionColumnTemplate = this.tempUnderJurisdiction;
        this.cdr.detectChanges();
      });
  }

  routerChangeTo(rowData: IRegion) {
    this.router.navigate(['home', 'addressBook'], {
      queryParams: { region: rowData.region },
    });
  }

  /** 區域查看 */
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

    this.data = data;
    this.cdr.detectChanges();
  }
  /**編輯 */
  editMember(_t16: any) {
    console.log('//TODO: 編輯');
  }
  /**轄下 */
  routerChangeToSubordinate(item: Staff) {
    const url = this.router.url.split('?')[0];
    const id = item.userId;
    this.router.navigate(url.split('/'), {
      queryParams: { superiorNumber: id },
      queryParamsHandling: 'merge',
    });
  }

  getSubordinate() {
    const api$ = this.queryParams['region']
      ? this.api.postUserAddressBook(this.queryParams['region'])
      : this.api.getFieldStaff();

    api$
      .pipe(
        map((res) => {
          const a = res.filter(
            (item) =>
              item.superiorNumber === this.queryParams['superiorNumber'],
          );
          return a;
        }),
      )
      .subscribe((res) => {
        if (res.length === 0) {
          window.alert('沒有下屬');
          return;
        }
        this.setTableData(res);
        this.cdr.detectChanges();
      });
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
  superiorNumber = 'superiorNumber',
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
    superiorNumber: '上級Id',
  };
}
