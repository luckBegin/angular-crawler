import axios from 'axios' ;
import * as $ from 'jquery' ;
import {brandClient} from './brand.client';

const http = axios.create() ;
class UsClient {
	host = 'https://www.amazon.com';

	constructor() {}

	async execute(query: string): Promise<any> {
		const qs = `/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${query}`;
		const res = await http.get(this.host + qs);
		if( res.status !== 200 ) {return { success: false } ;}
		return { success: true ,data: res.data , client: this };
		// this.parse(res.data) ;
		// return { success: true ,data: window.localStorage.getItem('aaa') , client: this }
	}

	parse() {
		const el = $('#htmlContainer').find('[data-component-type=\'s-search-result\']');
		const data = [];
		el.each( ( i , item ) => {
			const src = $(item).find('.s-image').attr('src') ;
			const title = $(item).find($('span.a-color-base.a-text-normal')).text();
			const price = $(item).find($('span.a-offscreen')).html();
			const href = $(item).find($('a.a-link-normal.s-no-outline')).attr('href');
			const link = this.host + href ;
			data.push({
				src , title , price , href , link ,
				index: i , brandHTML: '' , load: 'false' ,brandList: [],brandName: '' , error:''
			});
		});
		return data ;
	}

	loadBrand( item: any ) {
		item.load = 'pending';
		this.loadDetail( item ) ;
	};

	private async loadDetail( item ) {
		const link = item.link ;
		const res = await http.get(link) ;
		if( res.status !== 200 ) {
			item.load = false ;
			item.error = '获取商品详情失败' ;
			return ;
		}
		item.brandHTML = res.data ;

		setTimeout(() => {
			this.parseDetail(item);
		}, 500);
	}

	private parseDetail( item ) {
		const c = $('#detail-' + item.index );
		const el = c.find('#ppd') ;
		let brandTag = el.find($(':contains(品牌)')).last();

		if( brandTag.length !== 0 ) {
			return this.handleWithTag(brandTag , item);
		}

		const detailTag = c.find('#prodDetails') ;
		brandTag = detailTag.find($(':contains(制造商)')).last();

		if(brandTag.length !== 0 ) {
			return this.handleWithTag(brandTag,item);
		}

		const feature = c.find('#detailBullets_feature_div');
		brandTag = feature.find($(':contains(制造商)')).last();

		if(brandTag.length !== 0 ) {
			return this.handleWithTag(brandTag,item);
		}

		item.load = 'complete' ;
	}

	handleWithTag(brandTag,item) {
		const tagName = brandTag.get(0).tagName ;

		if(tagName === 'A') {
			const text = tagName.text() || '';
			const match = text.match('(品牌: )(.*)') ;
			const brandName = match[2];
			item.brandName = brandName ;
		}

		if( tagName === 'TH') {
			let tag = brandTag.siblings().text();
			if( tag ) {
				tag = tag.replace(/\r\n/g,'');
				tag = tag.replace(/\n/g,'');
			}
			item.brandName = tag ;
		}

		if( tagName === 'SPAN') {
			const parent = brandTag.parent().get(0).tagName ;
			if( parent === 'TD') {
				let tag = brandTag.parent().siblings().find('span').text() ;
				if( tag ) {
					tag = tag.replace(/\r\n/g,'');
					tag = tag.replace(/\n/g,'');
				}
				item.brandName = tag ;
			}

			if( parent === 'SPAN') {
				let tag = brandTag.siblings().text();
				if( tag ) {
					tag = tag.replace(/\r\n/g,'');
					tag = tag.replace(/\n/g,'');
				}
				item.brandName = tag ;
			}

			if( parent === 'LI' ) {
				let tag = brandTag.text();
				if( tag ) {
					tag = tag.replace(/\r\n/g,'');
					tag = tag.replace(/\n/g,'');
				}
				item.brandName = tag ;
			}
		}
		this.getRegister(item);
	}

	getRegister(item) {
		brandClient.register(item.brandName)
			.then( (r: any) => {
				const brands = r.facet_counts.facet_fields.SOURCE || {};
				const arr = [];
				Object.keys(brands).forEach( key => {
					if( brands[key] > 0 ) {arr.push(key.replace('TM',''));}
				});
				item.brandList = arr ;
				item.load = 'complete' ;
			});
	}
}

export const usClient = new UsClient() ;
