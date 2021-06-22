import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {CoreModule} from './core/core.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import {AppComponent} from './app.component';
import {SharedModule} from "./shared.module";
import {SearchComponent} from "./search/search.component";
import {NgZorroAntdModule} from "./ng-zorro-antd.module";
import {ResultComponent} from "./result/result.component";

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
	declarations: [AppComponent , SearchComponent,ResultComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		CoreModule,
		AppRoutingModule,
		SharedModule,
		NgZorroAntdModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
