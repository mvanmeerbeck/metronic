import { KtDialogService } from './../../../../../core/_base/layout';
// Angular
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
// RXJS
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'kt-portlet-header',
	styleUrls: ['portlet-header.component.scss'],
	template: `
		<div class="kt-portlet__head-label" [hidden]="noTitle">
			<span class="kt-portlet__head-icon" #refIcon [hidden]="hideIcon">
				<ng-content *ngIf="!icon" select="[ktPortletIcon]"></ng-content>
				<i *ngIf="icon" [ngClass]="icon"></i>
			</span>
			<ng-content *ngIf="!title" select="[ktPortletTitle]"></ng-content>
			<h3 *ngIf="title" class="kt-portlet__head-title" [innerHTML]="title"></h3>
		</div>
		<div class="kt-portlet__head-toolbar" #refTools [hidden]="hideTools">
			<ng-content select="[ktPortletTools]"></ng-content>
		</div>`
})
export class PortletHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
	// Public properties
	// append html class to the portlet header
	@Input() class: string;
	// a simple title text
	@Input() title: string;
	// icon name to be added to the i tag
	@Input() icon: string;
	// remove title container
	@Input() noTitle: boolean;
	// enable sticky portlet header
	@Input() sticky: boolean;
	// enable loading to display
	@Input() viewLoading$: Observable<boolean>;
	viewLoading: boolean = false;

	@HostBinding('class') classes: string = 'kt-portlet__head';

	@ViewChild('refIcon') refIcon: ElementRef;
	hideIcon: boolean;

	@ViewChild('refTools') refTools: ElementRef;
	hideTools: boolean;

	private subscriptions: Subscription[] = [];

	constructor(private el: ElementRef, private ktDialogService: KtDialogService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// append custom class
		this.classes += this.class ? ' ' + this.class : '';

		// hide icon's parent node if no icon provided
		this.hideIcon = this.refIcon.nativeElement.children.length === 0;

		// hide tools' parent node if no tools template is provided
		this.hideTools = this.refTools.nativeElement.children.length === 0;

	}

	ngAfterViewInit(): void {
		// initialize loading dialog
		if (this.viewLoading$) {
			const loadingSubscription = this.viewLoading$.subscribe(res => this.toggleLoading(res));
			this.subscriptions.push(loadingSubscription);
		}
	}

	toggleLoading(_incomingValue: boolean) {
		this.viewLoading = _incomingValue;
		if (_incomingValue && !this.ktDialogService.checkIsShown()) {
			this.ktDialogService.show();
		}

		if (!this.viewLoading && this.ktDialogService.checkIsShown()) {
			this.ktDialogService.hide();
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
