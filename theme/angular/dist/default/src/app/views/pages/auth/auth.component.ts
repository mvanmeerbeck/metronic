// Angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, SplashScreenService } from '../../../core/_base/layout';
// Metronic
import { TranslationService } from '../../../core/_base/metronic';
// Auth
import { AuthNoticeService } from '../../../core/auth';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private translationService: TranslationService,
		private splashScreenService: SplashScreenService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();

		this.splashScreenService.hide();
	}
}
