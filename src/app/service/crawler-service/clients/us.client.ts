import axios from 'axios' ;
import * as $ from 'jquery' ;

const http = axios.create() ;

class UsClient {
	host = 'https://www.amazon.com';

	constructor() {
	}

	async execute(query: string): Promise<any> {
		// const qs = `/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${query}`
		// const res = await http.get(this.host + qs)
		// if( res.status !== 200 ) return { success: false } ;
		// this.parse(res.data) ;
		return { success: true ,data: window.localStorage.getItem('aaa') , client: this }
	}

	parse() {
		const el = $('#htmlContainer').find("[data-component-type='s-search-result']")
		console.log(el);
	}
}

export const usClient = new UsClient()
