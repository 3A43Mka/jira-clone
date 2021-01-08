import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { TaskComponent } from './task/task.component';
import { MenuComponent } from './menu/menu.component';
import { FilterComponent } from './filter/filter.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTaskComponent } from './create-task/create-task.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatChipsModule,
  MatToolbarModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
];
const firebaseConfig = {
  apiKey: "AIzaSyASlQN5UxsXSqa9vOCA5roVIkDk0zAAIlY",
  authDomain: "jira-clone-16d01.firebaseapp.com",
  databaseURL: "https://jira-clone-16d01-default-rtdb.firebaseio.com",
  projectId: "jira-clone-16d01",
  storageBucket: "jira-clone-16d01.appspot.com",
  messagingSenderId: "209886623559",
  appId: "1:209886623559:web:b50754c15577bd0496fe62"
};
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardComponent,
    TaskComponent,
    MenuComponent,
    FilterComponent,
    TaskPageComponent,
    AuthComponent,
    CreateTaskComponent,
    HomeComponent,
  ],
  entryComponents: [CreateTaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    DragDropModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
