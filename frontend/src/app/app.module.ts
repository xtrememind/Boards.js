/** Core modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './auth.guard';

/** Pipes */
import { SortByPipe } from './pipes/sort-by.pipe';

/** Redux */
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, store } from './redux-actions/store/store';
import { BoardActions } from './redux-actions/board.actions';
import { CardActions } from './redux-actions/card.actions';
import { ListActions } from './redux-actions/list.actions';

/** Services */
import { UserService } from './services/user.service';

/** Pages */
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/** Other components */
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardNewComponent } from './components/board/board-new/board-new.component';
import { ListHeaderComponent } from './components/board/list-header/list-header.component';
import { BoardCardComponent } from './components/board/board-card/board-card.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { BoardsPreviewComponent } from './components/topbar/boards-preview/boards-preview.component';
import { CardModalComponent } from './components/board/card-modal/card-modal.component';
import { BoardsPreviewModalComponent } from './components/topbar/boards-preview-modal/boards-preview-modal.component';

/** Angular material */
import { MatMenuModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SortByPipe,
    BoardNewComponent,
    ListHeaderComponent,
    BoardCardComponent,
    HomeComponent,
    DashboardComponent,
    TopbarComponent,
    BoardsPreviewComponent,
    CardModalComponent,
    BoardsPreviewModalComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    BoardActions,
    ListActions,
    CardActions,
    AuthGuard
  ],
  entryComponents: [CardModalComponent, BoardsPreviewModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
