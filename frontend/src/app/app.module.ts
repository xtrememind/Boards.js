/** Core modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

/** Pipes */
import { SortByPipe } from './pipes/sort-by.pipe';

/** Redux */
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, store } from './redux-actions/store/store';
import { BoardActions } from './redux-actions/board.actions';
import { CardActions } from './redux-actions/card.actions';
import { ListActions } from './redux-actions/list.actions';
import { TeamAction } from './redux-actions/team.actions';

/** Services */
import { UserService } from './services/user.service';
import { BoardService } from './services/board.service';
import { ListService } from './services/list.service';
import { TeamService } from './services/team.service';

/** Pages */
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamBoardComponent } from './components/team/team-board.component';

/** Other components */
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardNewComponent } from './components/board/board-new/board-new.component';
import { ListHeaderComponent } from './components/board/list-header/list-header.component';
import { BoardCardComponent } from './components/board/board-card/board-card.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { BoardsPreviewComponent } from './components/topbar/boards-preview/boards-preview.component';
import { CardModalComponent } from './components/board/card-modal/card-modal.component';
import { CardModalMembersComponent } from './components/board/card-modal/card-modal-members/card-modal-members.component';
import { CardModalDescriptionComponent } from './components/board/card-modal/card-modal-description/card-modal-description.component';

/** Angular material */
import { MatMenuModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardService } from './services/card.service';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';

import { MatIconModule } from '@angular/material/icon';
import { CardModalTitleComponent } from './components/board/card-modal/card-modal-title/card-modal-title.component';
import { CardModelActivitiesComponent } from './components/board/card-modal/card-model-activities/card-model-activities.component';

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

    TeamBoardComponent,
    TeamDashboardComponent,
    CardModalMembersComponent,
    CardModalDescriptionComponent,
    CardModalTitleComponent,
    CardModelActivitiesComponent
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
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    UserService,
    BoardActions,
    ListActions,
    CardActions,
    AuthGuard,

    BoardService,
    ListService,
    CardService,
    TeamService,
    TeamAction
  ],
  entryComponents: [CardModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
