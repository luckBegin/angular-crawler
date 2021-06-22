import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Injectable, OnInit} from '@angular/core' ;
@Injectable({
	providedIn: 'root'
})
export class MsgService {
	constructor(
		private msg: NzMessageService,
		private notify: NzNotificationService
	) {
	}

	warn(msg: string): void {
		this.msg.create('warning', msg);
	}

	error(msg: string): void {
		this.msg.create('error', msg);
	}

	success(msg: string): void {
		this.msg.create('success', msg);
	}

	notifySuccess(title: string, msg: string) {
		this.notify.create('success', title, msg);
	}

	notifyWarn(title: string, msg: string) {
		this.notify.create('warning', title, msg);
	}

	notifyErr(title: string, msg: string) {
		this.notify.create('error', title, msg);
	}
}
