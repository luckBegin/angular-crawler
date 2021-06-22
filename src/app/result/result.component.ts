import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CrawlerService} from "../service/crawler-service/crawler.service";
import {MsgService} from "../service/msg.service";

@Component({
	selector: 'search',
	templateUrl: './result.component.html' ,
	styleUrls: ['./result.component.scss']
})
export class ResultComponent {
	constructor(
		private activeRoute: ActivatedRoute ,
		private service: CrawlerService ,
		private msg: MsgService
	) {
		this.activeRoute.params.subscribe( q => {
			this.area = q.area ;
			this.name = q.name ;
			this.areaName = this.areaMap[q.area].name ;

			this.invokeService()
		})
	}

	area: string = '' ;
	name: string = '' ;
	areaName: string = '' ;

	areaMap = {
		"uk": { name: '英国站' , url : 'amazon.co.uk' } ,
		"us": { name: '美国站' , url : 'amazon.com' } ,
		"cn": { name: '中国站' , url : 'www.amazon.cn' } ,
		"ca": { name: '加拿大站' , url : 'www.amazon.ca' } ,
		"mx": { name: '墨西哥' , url : 'www.amazon.com.mx' } ,
		"de": { name: '德国站' , url : 'www.amazon.de' } ,
		"fr": { name: '法国站' , url : 'www.amazon.fr' } ,
		"jp": { name: '日本站' , url : 'www.amazon.co.jp' }
	}

	list: any[] = [] ;
	loading: boolean = true ;
	html: string = '' ;
	async invokeService() {
		const url = this.areaMap[this.area].url
		this.html = '' ;
		const res = await this.service.run(this.area , this.name);
		if( !res.success ) return this.msg.error('获取亚马逊结果异常') ;
		this.html = res.data ;

		setTimeout(() => {
			res.client.parse()
		} , 500);
	}
}
