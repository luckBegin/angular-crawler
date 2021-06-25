import { LZString as lzs } from './lzs';
import axios from 'axios' ;

const electron = require('electron');

const http = axios.create() ;
class BrandClient {
	constructor() {
	}

	public register(name) {
		debugger
		const bname = /\s/g.test(name) ? `"${name}"` : name;
		const qz = { p: { search: { sq: [{ te: bname, fi: 'BRAND' }] } },
			type: 'brand', la: 'en', qi: '1-9gJQlPf3V2NCs3HX5/Mu85mKd8xoZSoY6O2TwF+dlRg=',
			queue: 1, _: '11233'
		};

		const data = 'qz=' + lzs.compressToBase64(JSON.stringify(qz));
		return new Promise((resolve, reject) => {
			const net = electron.remote.net;
			const request =  net.request({
				method: 'POST',
				protocol: 'https:',
				hostname: 'www3.wipo.int',
				port: 443,
				path: '/branddb/jsp/select.jsp'
			})
			request.setHeader('Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8')
			request.setHeader('Referer' , 'https://www3.wipo.int')
			request.on('response', (response) => {
				response.on('data', (chunk) => {
					const data = chunk.toString()
					try {
						if (typeof data === "string") {
							resolve(JSON.parse(data))
						}
					}catch (e) {
						resolve({});
					}
				})
				response.on('end', () => {
					debugger
					resolve({})
				})
			})
			request.end(data)

			// http.post('https://www3.wipo.int/branddb/jsp/select.jsp', data , {
			// 	headers: {
			// 		host: 'www3.wipo.int' ,
			// 		referer: 'www3.wipo.int'
			// 	}
			// })
			// 	.then(r => {
			// 		resolve(r.data);
			// 	});
		});
	}
}

export const brandClient = new BrandClient() ;
