import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SortByPipe } from './pipes/sort-by.pipe';

import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, store } from '../redux-actions/store/store';
import { BoardActions } from '../redux-actions/board.actions';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { TestComponent } from './components/test/test.component';
import { BoardNewComponent } from './components/board/board-new/board-new.component';
import { CardActions } from '../redux-actions/card.actions';
import { ListActions } from '../redux-actions/list.actions';
import { ListHeaderComponent } from './components/board/list-header/list-header.component';
import { BoardCardComponent } from './components/board/board-card/board-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TestComponent,
    SortByPipe,
    BoardNewComponent,
    ListHeaderComponent,
    BoardCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [
    BoardActions,
    ListActions,
    CardActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
