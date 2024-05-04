import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { Breadcrumb } from './components/navigation.component';

@Injectable({
  providedIn: 'root',
})
export class RouterChangeHandlerService {
  routerChangeRouterList = new BehaviorSubject<Breadcrumb | Breadcrumb[]>([]);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((param) => {
      this.router.events
        .pipe(
          filter(
            (event): event is NavigationEnd => event instanceof NavigationEnd,
          ),
        )
        .subscribe((event) => {
          const breadcrumb = event.url
            .split('/')
            .filter((item) => item)
            .map((item) => ({
              name: item,
              breadType: 'route',
              filterCondition: Object.entries(param).toString(),
            }));

          console.log(breadcrumb);
          this.routerChangeRouterList.next(breadcrumb);
        });
    });
  }

  setRouterChangeRouterList(data: Breadcrumb) {
    this.routerChangeRouterList.next(data);
  }
}
