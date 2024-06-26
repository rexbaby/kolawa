import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemberEditorComponent } from './member-editor.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
  ],
  template: `
    <div class="flex gap-2 m-2 justify-end">
      <mat-form-field>
        <mat-select [(ngModel)]="criteria.location" placeholder="區域">
          <mat-option [value]="item" *ngFor="let item of region">{{
            item
          }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-select [(ngModel)]="criteria.affair" placeholder="處代碼">
          <mat-option [value]="item" *ngFor="let item of affairOpts">{{
            item
          }}</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button (click)="onSearch()">搜尋</button>
      <button mat-raised-button (click)="add()">新增</button>
    </div>
  `,
  styles: [],
})
export class SearchBarComponent {
  criteria: ISearch = {
    location: '',
    affair: '',
  };
  constructor(public dialog: MatDialog) {}

  onSearch() {
    console.log('//TODO:');
  }

  add() {
    this.dialog.open(MemberEditorComponent, {
      data: {
        mode: 'A',
      },
      width: '500px',
    });
  }

  region = [];
  affairOpts = ['affairA', 'affairB', 'affairC', 'affairD'];
}

export interface ISearch {
  location: string;
  affair: string;
}

export enum LocationEnum {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

export const LocationName = {
  N: '北部地區',
  E: '東部地區',
  S: '南部地區',
  W: '東部地區',
};
