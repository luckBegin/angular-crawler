import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {SearchComponent} from "./search/search.component";
import {ResultComponent} from "./result/result.component";


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'search',
	}, {
		path: 'search',
		component: SearchComponent
	},{
		path: 'result/:area/:name' ,
		component: ResultComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
