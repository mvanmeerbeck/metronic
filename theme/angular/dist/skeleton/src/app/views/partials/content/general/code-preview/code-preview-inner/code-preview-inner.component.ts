// Angular
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'kt-code-preview-inner',
	templateUrl: './code-preview-inner.component.html'
})
export class CodePreviewInnerComponent implements OnInit {
	// Public properties
	@Input() title: any;
	@Input() htmlCode: any;
	@Input() tsCode: any;
	@Input() scssCode: any;

	/**
	 * Component constructor
	 *
	 * @param sanitizer sanitizer
	 */
	constructor(private sanitizer: DomSanitizer) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() { }
}
