import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  params?: Params;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumb: Breadcrumb[] = [];
  ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  ROUTE_DATA_BREADCRUMB_IGNORE = 'breadcrumbIgnore';
  ROUTE_DATA_BREADCRUMB_ICON = 'icon';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumb = this.getBreadcrumbs(root);
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string= '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    const children: ActivatedRoute[] = route.children;
    if ( children.length === 0 ) {
      return breadcrumbs;
    }

    for ( const child of children ) {
      if ( child.outlet !== PRIMARY_OUTLET ) {
        continue;
      }
      if ( !child.snapshot.data.hasOwnProperty(this.ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      if (!child.snapshot.data[this.ROUTE_DATA_BREADCRUMB_IGNORE]) {
        const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

        url += `/${routeURL}`;

        const breadcrumb: Breadcrumb = {
          label: child.snapshot.data[this.ROUTE_DATA_BREADCRUMB],
          params: child.snapshot.params,
          url: `${url}`,
          icon: child.snapshot.data[this.ROUTE_DATA_BREADCRUMB_ICON]
        };
        breadcrumbs.push(breadcrumb);

        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

}
