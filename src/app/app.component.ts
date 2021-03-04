import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class AppComponent {
  constructor(private http: HttpClient){};
  title = 'hackeramp';
}
