import {Component} from "@angular/core";
import {MsgService} from "../service/msg.service";
import {Router} from "@angular/router";

@Component({
	selector: 'search',
	templateUrl: './search.component.html' ,
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	constructor(
		private readonly msg: MsgService ,
		private readonly router: Router
	) {
	}

	area: string = '' ;
	name: string = '' ;

	search() {
		if( !this.area ) return this.msg.warn('请选择地区') ;
		if( !this.name ) return this.msg.warn('请输入名称') ;
		this.router.navigate([`result/${this.area}/${this.name}`]) ;
	}
}
