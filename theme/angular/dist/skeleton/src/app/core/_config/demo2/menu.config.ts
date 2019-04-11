export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Components',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: []
				},
				{
					title: 'Applications',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: []
				},
				{
					title: 'Custom',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: []
				},
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
					title: 'Layout Builder',
					root: true,
					icon: 'flaticon2-expand',
					page: 'builder'
				},
				{section: 'Custom'},
				{
					title: 'Custom Link',
					root: true,
					icon: 'flaticon2-link',
					bullet: 'dot',
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
