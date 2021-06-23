import { LZString as lzs } from './lzs';
import axios from 'axios' ;
const http = axios.create() ;

class BrandClient {
	constructor() {}

	public register(name) {
		const bname = /\s/g.test(name) ? `"${name}"` : name;
		const qz = { p: { search: { sq: [{ te: bname, fi: 'BRAND' }] } },
			type: 'brand', la: 'en', qi: '1-FUglIW75lwt3K7q2WCo9u4x6kBzJnAasR1mdK6QTexA=',
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
