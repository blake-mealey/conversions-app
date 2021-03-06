import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { MenuItem } from './menu-item';
import { UserInputService } from '../../../app-common/services/user-input.service';
import { SubscriberComponent } from '../../../app-common/components/subscriber-component';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { popIn, popOut } from '../../../app-common/animations';

@Component({
  selector: 'md-menu',
  styleUrls: [
    './md-menu.component.scss'
  ],
  templateUrl: './md-menu.component.pug',
  animations: [
    trigger('popIn', [
      state('open', style({})),

      transition(':enter', [
        useAnimation(popIn)
      ]),

      transition(':leave', [
        useAnimation(popOut)
      ])
    ])
  ]
})
export class MdMenuComponent extends SubscriberComponent implements OnInit, AfterViewInit {

  private static readonly SEARCH_ICON = 'search';
  private static readonly CANCEL_ICON = 'cancel';

  @Input() searchEnabled: boolean = false;
  @Input() items: Array<MenuItem>;
  displayedItems: Array<MenuItem>;

  private _open: boolean;
  get open(): boolean {
    return this._open;
  }
  @Input() set open(open: boolean) {
    this._open = open;
    if (open && this.inputElement) {
      this.searchValue = '';
      this.selectedIndex = 0;
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 5);
    }
  }

  @Output() itemSelected = new EventEmitter<any>();
  @Output() closed = new EventEmitter();

  selectedIndex: number;
  searchIcon: string = MdMenuComponent.SEARCH_ICON;

  _searchValue: string;
  get searchValue(): string {
    return this._searchValue;
  }
  set searchValue(searchValue: string) {
    this._searchValue = searchValue.toLowerCase();
    if (this.searchValue) {
      this.searchIcon = MdMenuComponent.CANCEL_ICON;
      this.displayedItems = this.items.filter((item: MenuItem) => {
        return item.displayName.toLowerCase().indexOf(this.searchValue) > -1;
      });
    } else {
      this.searchIcon = MdMenuComponent.SEARCH_ICON;
      this.displayedItems = this.items;
    }
    if (this.displayedItems.length == 0) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = Math.min(Math.max(this.selectedIndex, 0), this.displayedItems.length - 1);
    }
  }

  @ViewChild('input') inputElement: ElementRef;

  constructor(private elementRef: ElementRef,
              private userInputService: UserInputService) {
    super();

    this.subscriptions.push(userInputService.mouseClick$.subscribe((event) => {
      if (this.open && !this.elementRef.nativeElement.contains(event.target)) {
        this.closed.emit();
      }
    }));
  }

  ngOnInit(): void {
    this.displayedItems = this.items;
  }

  onSearchIconClick() {
    this.searchValue = '';
  }

  onItemClick(item: MenuItem) {
    if (item.enabled) {
      this.itemSelected.emit(item.data);
      this.closed.emit();
    }
  }

  ngAfterViewInit(): void {
    if (!this.inputElement) { return; }

    this.inputElement.nativeElement.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowDown':
          this.selectedIndex = (this.selectedIndex + 1) % this.displayedItems.length;
          break;
        case 'ArrowUp':
          if (--this.selectedIndex < 0) this.selectedIndex += this.displayedItems.length;
          break;
        case 'Enter':
          if (this.selectedIndex > -1) {
            this.onItemClick(this.displayedItems[this.selectedIndex]);
          }
          break;
      }
    });
  }

}
