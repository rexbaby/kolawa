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
    <ol class="breadcrumb">
      <li *ngFor="let item of breadcrumbs">
        <a
          [routerLink]="[item.url]"
          [queryParams]="item.params"
          routerLinkActive="router-link-active"
          >{{ item.label }}</a
        >
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

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
      const params = child.snapshot.queryParams;

      if (routeURL && label) {
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
}

export interface Breadcrumb {
  /**顯示名稱 */
  name: string;
  /**型態 */
  breadType: string;
  /**過濾條件 */
  filterCondition: string;
}
