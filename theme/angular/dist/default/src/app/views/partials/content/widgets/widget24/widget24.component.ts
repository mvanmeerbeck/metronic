import { Component, Input, OnInit } from '@angular/core';
import { SparklineChartOptions } from '../../../../../core/_base/metronic';

@Component({
	selector: 'kt-widget24',
	templateUrl: './widget24.component.html',
	styleUrls: ['./widget24.component.scss']
})
export class Widget24Component implements OnInit {

	@Input() value: string | number;
	@Input() desc: string;
	@Input() options: SparklineChartOptions;

	constructor() {
	}

	ngOnInit() {
	}

}
