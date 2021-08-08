import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';

import {MatIconRegistry, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { YaspListProvider } from 'src/app/services/YaspListProvider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { YlistComponent } from './ylist/ylist.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StorageModule } from '@ngx-pwa/local-storage';
import { DialogAddListComponent } from './dialog-add-list/dialog-add-list.component';
import { FormsModule } from '@angular/forms';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm';
import { DialogAddItemComponent } from './dialog-add-item/dialog-add-item.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LangService } from './services/lang.service';
import { DialogLangselComponent } from './dialog-langsel/dialog-langsel-component';

import {DragDropModule} from '@angular/cdk/drag-drop';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YlistComponent,
    DialogAddListComponent,
    DialogAddItemComponent,
    DialogConfirmComponent,
    DialogLangselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StorageModule.forRoot({ IDBNoWrap: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    DialogAddListComponent,
    DialogAddItemComponent,
    DialogConfirmComponent,
    DialogLangselComponent
  ],
  providers: [ HttpClient, YaspListProvider, LangService ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
