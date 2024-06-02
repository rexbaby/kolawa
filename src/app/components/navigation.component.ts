import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterModule,
} from '@angular/router';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { query } from '@angular/animations';
import { NavigationService } from '../navigation.service';

interface Bread {
  label: string;
  url: string;
  [key: string]: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ol class="breadcrumb">
      <li *ngFor="let item of breadcrumbs; let i = index" class="">
        <ng-container *ngIf="i > 0">
          <button
            class="p-2 m-2 bg-blue-300 w-[120px] p-1"
            (click)="go(item)"
            (keyup)="go(item)"
          >
            {{ item.label
            }}{{ item['queryParam'] ? ' | ' + item['queryParam'] : '' }}
          </button>
          <br />
          {{ item.url }}
        </ng-container>
      </li>
    </ol>
  `,
  styles: [
    `
      .breadcrumb {
        @apply flex m-3;
      }
    `,
  ],
})
export class BreadcrumbComponent {
  breadcrumbs: Bread[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        map((event: NavigationEnd) => event.urlAfterRedirects),
      )
      .subscribe((url: string) => {
        const urlAfterRedirects = decodeURI(url);
        this.breadcrumbs = this.createBread(urlAfterRedirects);
        this.navigationService.next(this.breadcrumbs.slice(-1)[0].label);
      });
  }

  createBread(urlAfterRedirects: string) {
    const queryParamsBefore = urlAfterRedirects.split('?')[0];
    const queryParamsAfter = urlAfterRedirects.split('?')[1];

    const a = queryParamsBefore.split('/').map((item, index) => {
      return {
        label: this.getName(item),
        urlPart: item,
        url: '',
      };
    });

    a.forEach((item, index) => {
      item.url = a
        .slice(0, index)
        .map((item) => item.urlPart)
        .join('/')
        .concat(`/${item.urlPart}`);
    });

    if (!queryParamsAfter) {
      return a;
    }
    const b = queryParamsAfter.split('&').map((item) => ({
      label: item.split('=')[0],
      queryParam: item.split('=')[1],
      urlPart: a.slice(-1)[0].url,
      url: '',
    }));
    b.forEach((item, index) => {
      if (index === 0) {
        item.url = `${item.urlPart}?${item.label}=${item.queryParam}`;
        return;
      }
      item.url = b[index - 1].url + `&${item.label}=${item.queryParam}`;
    });
    const bread = [...a, ...b];
    console.log(bread);
    return bread;
  }

  getName(item: string): any {
    return item;
  }

  go(item: Bread) {
    this.router.navigateByUrl(item.url, {});
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

// import { NevigationService } from './../nevigation.service';
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   ActivatedRoute,
//   NavigationEnd,
//   Params,
//   Router,
//   RouterModule,
// } from '@angular/router';
// import { filter } from 'rxjs';

// interface Bread {
//   label: string;
//   url: string;
//   params?: Params;
// }

// @Component({
//   selector: 'app-navigation',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   template: `
//     {{ breadcrumbs }}
//     <ol class="breadcrumb">
//       <li *ngFor="let item of breadcrumbs">
//         <button
//           class="p-1 bg-lime-400 m-1"
//           (click)="go(item)"
//           (keyup)="go(item)"
//         >
//           {{ item.label }} | {{ item.params }}
//         </button>
//         <br />
//         {{ item.url }}
//       </li>
//     </ol>
//   `,
//   styles: [
//     `
//       .breadcrumb {
//         @apply flex m-3;
//         li {
//           @apply block;
//           &:not(:last-child):after {
//             content: '   |    ';
//           }
//           a {
//             @apply p-2 m-2 bg-blue-300;
//           }
//         }
//       }
//     `,
//   ],
// })
// export class BreadcrumbComponent implements OnInit {
//   breadcrumbs: Bread[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private navigationService: NevigationService,
//   ) {
//     this.router.events
//       .pipe(filter((event) => event instanceof NavigationEnd))
//       .subscribe((end) => {
//         console.log('end', end);
//         this.breadcrumbs = this.createBreadcrumbs(this.route.root);
//         this.breadcrumbs.unshift({ url: '/', label: '組織' });
//         console.log(end);
//       });
//     // console.log('reset')
//     // this.navigationService.bread$.subscribe((params:any) => {
//     //   console.log(params)
//     //   this.breadcrumbs.push({ url: this.router.url, label: this.router.url,params:params })
//     //   console.log(this.breadcrumbs)
//     // })
//   }
//   // "/home/addressBook?region=%E5%8C%97%E9%83%A8"

//   ngOnInit(): void {}

//   createBreadcrumbs(
//     route: ActivatedRoute,
//     url = '',
//     breadcrumbs: Bread[] = [],
//   ): Bread[] {
//     const children: ActivatedRoute[] = route.children;

//     if (children.length === 0) {
//       return breadcrumbs;
//     }

//     for (const child of children) {
//       const routeURL = child.snapshot.url
//         .map((segment) => segment.path)
//         .join('/');
//       const label = child.snapshot.data['breadcrumb'] || '';
//       const params = child.snapshot;

//       if (routeURL && label) {
//         breadcrumbs.push({
//           label,
//           url: `${url}/${routeURL}`,
//           params,
//         });
//       }

//       if (routeURL && label && params) {
//         breadcrumbs.push({
//           label,
//           url: `${url}/${routeURL}`,
//           params,
//         });
//       }

//       return this.createBreadcrumbs(child, `${url}/${routeURL}`, breadcrumbs);
//     }

//     return breadcrumbs;
//   }

//   go(item: Bread) {
//     const { params } = item;
//     const paramsStr = params
//       ? Object.keys(params)
//           .map((key) => `${key}=${params[key]}`)
//           .join('&')
//       : '';
//     this.router.navigateByUrl(`/home/${item.url}${paramsStr}`, {
//       onSameUrlNavigation: 'reload',
//     });
//   }
// }

// export interface Breadcrumb {
//   /**顯示名稱 */
//   name: string;
//   /**型態 */
//   breadType: string;
//   /**過濾條件 */
//   filterCondition: string;
// }
