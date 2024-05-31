import { NevigationService } from './../nevigation.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs';

interface Bread {
  label: string;
  url: string;
  params?: Params;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    {{ breadcrumbs }}
    <ol class="breadcrumb">
      <li *ngFor="let item of breadcrumbs">
        <button
          class="p-1 bg-lime-400 m-1"
          (click)="go(item)"
          (keyup)="go(item)"
        >
          {{ item.label }} | {{ item.params }}
        </button>
        <br />
        {{ item.url }}
      </li>
    </ol>
  `,
  styles: [
    `
      .breadcrumb {
        @apply flex m-3;
        li {
          @apply block;
          &:not(:last-child):after {
            content: '   |    ';
          }
          a {
            @apply p-2 m-2 bg-blue-300;
          }
        }
      }
    `,
  ],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Bread[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NevigationService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((end) => {
        console.log('end', end);
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
        this.breadcrumbs.unshift({ url: '/', label: '組織' });
        console.log(end);
      });
    // console.log('reset')
    // this.navigationService.bread$.subscribe((params:any) => {
    //   console.log(params)
    //   this.breadcrumbs.push({ url: this.router.url, label: this.router.url,params:params })
    //   console.log(this.breadcrumbs)
    // })
  }
  // "/home/addressBook?region=%E5%8C%97%E9%83%A8"

  ngOnInit(): void {}

  createBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Bread[] = [],
  ): Bread[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      const label = child.snapshot.data['breadcrumb'] || '';
      const params = child.snapshot;

      if (routeURL && label) {
        breadcrumbs.push({
          label,
          url: `${url}/${routeURL}`,
          params,
        });
      }

      if (routeURL && label && params) {
        breadcrumbs.push({
          label,
          url: `${url}/${routeURL}`,
          params,
        });
      }

      return this.createBreadcrumbs(child, `${url}/${routeURL}`, breadcrumbs);
    }

    return breadcrumbs;
  }

  go(item: Bread) {
    const { params } = item;
    const paramsStr = params
      ? Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')
      : '';
    this.router.navigateByUrl(`/home/${item.url}${paramsStr}`, {
      onSameUrlNavigation: 'reload',
    });
  }
}

export interface Breadcrumb {
  /**顯示名稱 */
  name: string;
  /**型態 */
  breadType: string;
  /**過濾條件 */
  filterCondition: string;
}
