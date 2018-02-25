import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchListItemComponent } from './search-list-item/search-list-item.component';
import { SetTokenComponent } from './set-token/set-token.component';


// END Angular Material Imports

const appRoutes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'search', component: SearchComponent},
  { path: 'setApiToken', component: SetTokenComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SearchBarComponent,
    SearchListComponent,
    SearchListItemComponent,
    SetTokenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    StoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
