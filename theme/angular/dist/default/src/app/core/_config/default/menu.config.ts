export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pages',
					'root': true,
					'icon-': 'flaticon-add',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'alignment': 'left',
					'translate': 'MENU.PAGES',
					'submenu': {
						'type': 'classic',
						'alignment': 'left',
						'items': [
							{
								'title': 'My Account',
								'icon': 'flaticon-file',
								'page': 'index'
							},
							{
								'title': 'Task Manager',
								'icon': 'flaticon-diagram',
								'badge': {
									'type': 'kt-badge--success',
									'value': '2'
								}
							},
							{
								'title': 'Team Manager',
								'icon': 'flaticon-business',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'bullet': 'line',
									'items': [
										{
											'title': 'Add Team Member',
											'icon': ''
										},
										{
											'title': 'Edit Team Member',
											'icon': ''
										},
										{
											'title': 'Delete Team Member',
											'icon': ''
										},
										{
											'title': 'Team Member Reports',
											'icon': ''
										},
										{
											'title': 'Assign Tasks',
											'icon': ''
										},
										{
											'title': 'Promote Team Member',
											'icon': ''
										}
									]
								}
							},
							{
								'title': 'Projects Manager',
								'page': '#',
								'icon': 'flaticon-chat-1',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'bullet': 'dot',
									'items': [
										{
											'title': 'Latest Projects',
											'icon': ''
										},
										{
											'title': 'Ongoing Projects',
											'icon': ''
										},
										{
											'title': 'Urgent Projects',
											'icon': ''
										},
										{
											'title': 'Completed Projects',
											'icon': ''
										},
										{
											'title': 'Dropped Projects',
											'icon': ''
										}
									]
								}
							},
							{
								'title': 'Create New Project',
								'icon': 'flaticon-users'
							}
						]
					}
				},
				{
					'title': 'Features',
					'root': true,
					'icon-': 'flaticon-line-graph',
					'toggle': 'click',
					'alignment': 'left',
					'translate': 'MENU.FEATURES',
					'submenu': {
						'type': 'mega',
						'width': '1000px',
						'alignment': 'left',
						'columns': [
							{
								'heading': {
									'heading': true,
									'title': 'Task Reports',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Latest Tasks',
										'icon': 'flaticon-map'
									},
									{
										'title': 'Pending Tasks',
										'icon': 'flaticon-user'
									},
									{
										'title': 'Urgent Tasks',
										'icon': 'flaticon-clipboard'
									},
									{
										'title': 'Completed Tasks',
										'icon': 'flaticon-graphic-1'
									},
									{
										'title': 'Failed Tasks',
										'icon': 'flaticon-graphic-2'
									}
								]
							},
							{
								'bullet': 'line',
								'heading': {
									'heading': true,
									'title': 'Profit Margins',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Overall Profits',
										'icon': ''
									},
									{
										'title': 'Gross Profits',
										'icon': ''
									},
									{
										'title': 'Nett Profits',
										'icon': ''
									},
									{
										'title': 'Year to Date Reports',
										'icon': ''
									},
									{
										'title': 'Quarterly Profits',
										'icon': ''
									},
									{
										'title': 'Monthly Profits',
										'icon': ''
									}
								]
							},
							{
								'bullet': 'dot',
								'heading': {
									'heading': true,
									'title': 'Staff Management',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Top Management',
										'icon': ''
									},
									{
										'title': 'Project Managers',
										'icon': ''
									},
									{
										'title': 'Development Staff',
										'icon': ''
									},
									{
										'title': 'Customer Service',
										'icon': ''
									},
									{
										'title': 'Sales and Marketing',
										'icon': ''
									},
									{
										'title': 'Executives',
										'icon': ''
									}
								]
							},
							{
								'heading': {
									'heading': true,
									'title': 'Tools',
									'icon': '',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Analytical Reports',
										'icon': ''
									},
									{
										'title': 'Customer CRM',
										'icon': ''
									},
									{
										'title': 'Operational Growth',
										'icon': ''
									},
									{
										'title': 'Social Media Presence',
										'icon': ''
									},
									{
										'title': 'Files and Directories',
										'icon': ''
									},
									{
										'title': 'Audit & Logs',
										'icon': ''
									}
								]
							}
						]
					}
				},
				{
					'title': 'Apps',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'alignment': 'left',
					'translate': 'MENU.APPS',
					'submenu': {
						'type': 'classic',
						'alignment': 'left',
						'items': [
							{
								'title': 'Reporting',
								'icon': 'flaticon-business'
							},
							{
								'title': 'Social Presence',
								'page': 'components/datatable_v1',
								'icon': 'flaticon-computer',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'items': [
										{
											'title': 'Reached Users',
											'icon': 'flaticon-users'
										},
										{
											'title': 'SEO Ranking',
											'icon': 'flaticon-interface-1'
										},
										{
											'title': 'User Dropout Points',
											'icon': 'flaticon-lifebuoy'
										},
										{
											'title': 'Market Segments',
											'icon': 'flaticon-graphic-1'
										},
										{
											'title': 'Opportunity Growth',
											'icon': 'flaticon-graphic'
										}
									]
								}
							},
							{
								'title': 'Sales & Marketing',
								'icon': 'flaticon-map'
							},
							{
								'title': 'Campaigns',
								'icon': 'flaticon-graphic-2',
								'badge': {
									'type': 'kt-badge--success',
									'value': '3'
								}
							},
							{
								'title': 'Deployment Center',
								'page': '',
								'icon': 'flaticon-infinity',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'items': [
										{
											'title': 'Merge Branch',
											'icon': 'flaticon-add',
											'badge': {
												'type': 'kt-badge--danger',
												'value': '3'
											}
										},
										{
											'title': 'Version Controls',
											'icon': 'flaticon-signs-1'
										},
										{
											'title': 'Database Manager',
											'icon': 'flaticon-folder'
										},
										{
											'title': 'System Settings',
											'icon': 'flaticon-cogwheel-2'
										}
									]
								}
							}
						]
					}
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'My Page', // <= Title of the page
					desc: 'Some my description goes here', // <= Description of the page
					root: true,
					page: 'my-page', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon
				},
				{
					title: 'Layout Builder',
					root: true,
					icon: 'flaticon2-expand',
					page: 'builder'
				},
				{section: 'Components'},
				{
					title: 'Google Material',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-browser-2',
					submenu: [
						{
							title: 'Form Controls',
							bullet: 'dot',
							submenu: [
								{
									title: 'Auto Complete',
									page: 'material/form-controls/autocomplete',
									permission: 'accessToECommerceModule'
								},
								{
									title: 'Checkbox',
									page: 'material/form-controls/checkbox'
								},
								{
									title: 'Radio Button',
									page: 'material/form-controls/radiobutton'
								},
								{
									title: 'Datepicker',
									page: 'material/form-controls/datepicker'
								},
								{
									title: 'Form Field',
									page: 'material/form-controls/formfield'
								},
								{
									title: 'Input',
									page: 'material/form-controls/input'
								},
								{
									title: 'Select',
									page: 'material/form-controls/select'
								},
								{
									title: 'Slider',
									page: 'material/form-controls/slider'
								},
								{
									title: 'Slider Toggle',
									page: 'material/form-controls/slidertoggle'
								}
							]
						},
						{
							title: 'Navigation',
							bullet: 'dot',
							submenu: [
								{
									title: 'Menu',
									page: 'material/navigation/menu'
								},
								{
									title: 'Sidenav',
									page: 'material/navigation/sidenav'
								},
								{
									title: 'Toolbar',
									page: 'material/navigation/toolbar'
								}
							]
						},
						{
							title: 'Layout',
							bullet: 'dot',
							submenu: [
								{
									title: 'Card',
									page: 'material/layout/card'
								},
								{
									title: 'Divider',
									page: 'material/layout/divider'
								},
								{
									title: 'Expansion panel',
									page: 'material/layout/expansion-panel'
								},
								{
									title: 'Grid list',
									page: 'material/layout/grid-list'
								},
								{
									title: 'List',
									page: 'material/layout/list'
								},
								{
									title: 'Tabs',
									page: 'material/layout/tabs'
								},
								{
									title: 'Stepper',
									page: 'material/layout/stepper'
								},
								{
									title: 'Default Forms',
									page: 'material/layout/default-forms'
								},
								{
									title: 'Tree',
									page: 'material/layout/tree'
								}
							]
						},
						{
							title: 'Buttons & Indicators',
							bullet: 'dot',
							submenu: [
								{
									title: 'Button',
									page: 'material/buttons-and-indicators/button'
								},
								{
									title: 'Button toggle',
									page: 'material/buttons-and-indicators/button-toggle'
								},
								{
									title: 'Chips',
									page: 'material/buttons-and-indicators/chips'
								},
								{
									title: 'Icon',
									page: 'material/buttons-and-indicators/icon'
								},
								{
									title: 'Progress bar',
									page: 'material/buttons-and-indicators/progress-bar'
								},
								{
									title: 'Progress spinner',
									page: 'material/buttons-and-indicators/progress-spinner'
								},
								{
									title: 'Ripples',
									page: 'material/buttons-and-indicators/ripples'
								}
							]
						},
						{
							title: 'Popups & Modals',
							bullet: 'dot',
							submenu: [
								{
									title: 'Bottom sheet',
									page: 'material/popups-and-modals/bottom-sheet'
								},
								{
									title: 'Dialog',
									page: 'material/popups-and-modals/dialog'
								},
								{
									title: 'Snackbar',
									page: 'material/popups-and-modals/snackbar'
								},
								{
									title: 'Tooltip',
									page: 'material/popups-and-modals/tooltip'
								}
							]
						},
						{
							title: 'Data table',
							bullet: 'dot',
							submenu: [
								{
									title: 'Paginator',
									page: 'material/data-table/paginator'
								},
								{
									title: 'Sort header',
									page: 'material/data-table/sort-header'
								},
								{
									title: 'Table',
									page: 'material/data-table/table'
								}
							]
						}
					]
				},
				{
					title: 'Ng-Bootstrap',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-digital-marketing',
					submenu: [
						{
							title: 'Accordion',
							page: 'ngbootstrap/accordion'
						},
						{
							title: 'Alert',
							page: 'ngbootstrap/alert'
						},
						{
							title: 'Buttons',
							page: 'ngbootstrap/buttons'
						},
						{
							title: 'Carousel',
							page: 'ngbootstrap/carousel'
						},
						{
							title: 'Collapse',
							page: 'ngbootstrap/collapse'
						},
						{
							title: 'Datepicker',
							page: 'ngbootstrap/datepicker'
						},
						{
							title: 'Dropdown',
							page: 'ngbootstrap/dropdown'
						},
						{
							title: 'Modal',
							page: 'ngbootstrap/modal'
						},
						{
							title: 'Pagination',
							page: 'ngbootstrap/pagination'
						},
						{
							title: 'Popover',
							page: 'ngbootstrap/popover'
						},
						{
							title: 'Progressbar',
							page: 'ngbootstrap/progressbar'
						},
						{
							title: 'Rating',
							page: 'ngbootstrap/rating'
						},
						{
							title: 'Tabs',
							page: 'ngbootstrap/tabs'
						},
						{
							title: 'Timepicker',
							page: 'ngbootstrap/timepicker'
						},
						{
							title: 'Tooltips',
							page: 'ngbootstrap/tooltip'
						},
						{
							title: 'Typehead',
							page: 'ngbootstrap/typehead'
						}
					]
				},
				{section: 'Applications'},
				{
					title: 'eCommerce',
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					root: true,
					permission: 'accessToECommerceModule',
					submenu: [
						{
							title: 'Customers',
							page: 'ecommerce/customers'
						},
						{
							title: 'Products',
							page: 'ecommerce/products'
						},
					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: 'user-management/users'
						},
						{
							title: 'Roles',
							page: 'user-management/roles'
						}
					]
				},
				{section: 'Custom'},
				{
					title: 'Error Pages',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-attention',
					submenu: [
						{
							title: 'Error Page - 1',
							page: 'error/error-v1'
						},
						{
							title: 'Error Page - 2',
							page: 'error/error-v2'
						},
						{
							title: 'Error Page - 3',
							page: 'error/error-v3'
						},
						{
							title: 'Error Page - 4',
							page: 'error/error-v4'
						},
						{
							title: 'Error Page - 5',
							page: 'error/error-v5'
						},
						{
							title: 'Error Page - 6',
							page: 'error/error-v6'
						},
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
