// Angular
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'kt-code-preview',
	templateUrl: './code-preview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodePreviewComponent {
	// Public properites
	@Input() title: any;
	@Input() htmlCode: any;
	@Input() tsCode: any;
	@Input() scssCode: any;
}
