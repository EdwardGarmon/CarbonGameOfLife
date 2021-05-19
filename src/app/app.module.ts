import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

import {GridModule, ButtonModule, HeaderModule, CheckboxModule, TilesModule, InputModule} from 'carbon-components-angular';
import { HeaderComponent } from './header/header.component';

import {BeeModule, PlayFilledModule, RedoModule, StopFilledModule} from '@carbon/icons-angular';
import { ControlsComponent } from './controls/controls.component';
import { CheckBoxesComponent } from './controls/check-boxes/check-boxes.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HeaderComponent,
    ControlsComponent,
    CheckBoxesComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    ButtonModule,
    HeaderModule,
    RedoModule,
    PlayFilledModule,
    BeeModule,
    StopFilledModule,
    CheckboxModule,
    TilesModule,
    InputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
