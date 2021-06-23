import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CrawlerService} from "../service/crawler-service/crawler.service";
import {MsgService} from "../service/msg.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
	selector: 'search',
	templateUrl: './result.component.html' ,
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{
	constructor(
		private activeRoute: ActivatedRoute ,
		private service: CrawlerService ,
		private msg: MsgService ,
		private sanitized: DomSanitizer
	) {

	}

	ngOnInit(): void {
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
	html: any = '' ;
	client: any ;
	async invokeService() {
		const url = this.areaMap[this.area].url
		this.html = '' ;
		const res = await this.service.run(this.area , this.name);
		if( !res.success ) return this.msg.error('获取亚马逊结果异常') ;
		this.html = this.sanitized.bypassSecurityTrustHtml(res.data );

		setTimeout(() => {
			const data = res.client.parse();
			this.client = res.client ;
			this.list = data ;
			this.loading = false ;
		} , 500);
	}

	copy(text) {
		let textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			let successful = document.execCommand('copy');
			this.msg.success('链接复制成功') ;
			document.body.removeChild(textArea);
		} catch (err) {
			this.msg.error('复制失败,原因:' + err)
			document.body.removeChild(textArea);
		}
	}

	back() {
		history.back();
	}

	getHTML(item) {
		if( !item.brandHTML ) return '' ;
		return this.sanitized.bypassSecurityTrustHtml( item.brandHTML );
	}

	queryBrand( item: any ) {
		this.client.loadBrand( item );
	}
}
