import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer, reducers, effects } from './store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { NotesProvider } from './notes/providers/notes.provider';
import { FormSelectProvider } from './shared/providers/form-select.provider';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { SpinnerOverlayWrapperComponent } from './core/components/spinner-overlay-wrapper/spinner-overlay-wrapper.component';


const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
@NgModule({
  declarations: [AppComponent, SpinnerComponent, SpinnerOverlayWrapperComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreRouterConnectingModule,
    SharedModule,
    AuthModule,
    TasksModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    environment.development ? StoreDevtoolsModule.instrument() : [],
    ModalModule.forRoot(),
  ],
  providers: [NotesProvider, FormSelectProvider, { provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
