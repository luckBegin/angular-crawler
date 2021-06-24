import { LZString as lzs } from './lzs';
import axios from 'axios' ;
const http = axios.create() ;

class BrandClient {
	constructor() {}

	public register(name) {
		const bname = /\s/g.test(name) ? `"${name}"` : name;
		const qz = { p: { search: { sq: [{ te: bname, fi: 'BRAND' }] } },
			type: 'brand', la: 'en', qi: '1-9gJQlPf3V2NCs3HX5/Mu85mKd8xoZSoY6O2TwF+dlRg=',
			queue: 1, _: '11233'
		};
		const data = 'qz=' + lzs.compressToBase64(JSON.stringify(qz));
		return new Promise((resolve, reject) => {
			http.post('https://www3.wipo.int/branddb/jsp/select.jsp', data)
				.then(r => {
					resolve(r.data);
				});
		});
	}
}

export const brandClient = new BrandClient() ;
