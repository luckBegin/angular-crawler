import {Injectable} from "@angular/core";
import {usClient} from "./clients/us.client";

@Injectable({providedIn: 'root'})
export class CrawlerService {
	async run( area: string, query: string ): Promise<any> {
		const client = this.getClient(area) ;
		return await client.execute(query) ;
	}

	getClient( area: string): any {
		if( area === 'us') return usClient ;
	}
}

