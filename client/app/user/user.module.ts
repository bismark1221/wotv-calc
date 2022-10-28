import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
    /*NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    UiSwitchModule,
    ,
    SharedModule*/
  ],
  declarations: [
    UserComponent
  ],
  providers: [
  ],
})
export class UserModule { }
