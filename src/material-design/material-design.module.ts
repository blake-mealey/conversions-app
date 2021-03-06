import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '../app-common/app-common.module';

import { MdTextFieldComponent } from './components/md-text-field/md-text-field.component';
import { MdFloatingActionButtonComponent } from './components/md-floating-action-button/md-floating-action-button.component';
import { MdRaisedButtonComponent } from './components/md-raised-button/md-raised-button.component';
import { MdFlatButtonComponent } from './components/md-flat-button/md-flat-button.component';
import { MdListButtonComponent } from './components/md-list-button/md-list-button.component';
import { MdIconButtonComponent } from './components/md-icon-button/md-icon-button.component';
import { MdMenuComponent } from './components/md-menu/md-menu.component';
import { MdRaisedButtonMenuComponent } from './components/md-raised-button-menu/md-raised-button-menu.component';
import { MdIconButtonMenuComponent } from './components/md-icon-button-menu/md-icon-button-menu.component';
import { MdAppBarComponent } from './components/md-app-bar/md-app-bar.component';
import { MdRailComponent } from './components/md-rail/md-rail.component';
import { MdBackdropComponent } from './components/md-backdrop/md-backdrop.component';
import { MdChipComponent } from './components/md-chip/md-chip.component';
import { MdDialogComponent } from './components/md-dialog/md-dialog.component';

import { MdRippleDirective } from './directives/md-ripple/md-ripple.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppCommonModule
  ],
  declarations: [
    // Components
    MdTextFieldComponent,
    MdFloatingActionButtonComponent,
    MdRaisedButtonComponent,
    MdFlatButtonComponent,
    MdListButtonComponent,
    MdIconButtonComponent,
    MdMenuComponent,
    MdRaisedButtonMenuComponent,
    MdIconButtonMenuComponent,
    MdAppBarComponent,
    MdRailComponent,
    MdBackdropComponent,
    MdChipComponent,
    MdDialogComponent,

    // Directives
    MdRippleDirective
  ],
  exports: [
    // Components
    MdTextFieldComponent,
    MdFloatingActionButtonComponent,
    MdRaisedButtonComponent,
    MdFlatButtonComponent,
    MdListButtonComponent,
    MdIconButtonComponent,
    MdMenuComponent,
    MdRaisedButtonMenuComponent,
    MdIconButtonMenuComponent,
    MdAppBarComponent,
    MdRailComponent,
    MdBackdropComponent,
    MdChipComponent,
    MdDialogComponent,

    // Directives
    MdRippleDirective
  ],
  providers: [
  ]
})
export class MaterialDesignModule {}
