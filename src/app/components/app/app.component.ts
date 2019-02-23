/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Pages } from '../../pages';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.pug'
})
export class AppComponent implements OnInit {

  public readonly navigationItems = Pages.All;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitsService.init();
  }

}
