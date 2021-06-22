import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		TranslateModule,
		FormsModule,
		BrowserAnimationsModule
	],
	exports: [
		TranslateModule,
		FormsModule,
		NzButtonModule
	]
})
export class SharedModule {}
