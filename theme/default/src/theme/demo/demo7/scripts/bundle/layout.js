"use strict";

var KTLayout = function() {
    var body;

    var header;
    var headerMenu;
    var headerMenuOffcanvas;

    var asideMenu;
    var asideMenuOffcanvas;
    var asideToggler;

    var asideSecondary;
    var asideSecondaryToggler;

    var scrollTop;

    var pageStickyPortlet;

    // Header
    var initHeader = function() {
        var tmp;
        var headerEl = KTUtil.get('kt_header');
        var options = {
            offset: {},
            minimize: {
                desktop: {
                    on: 'kt-header--minimize'
                },
                mobile: {
                    on: 'kt-header--minimize'
                }
            }
        };

        if (tmp = KTUtil.attr(headerEl, 'data-ktheader-minimize-offset')) {
            options.offset.desktop = tmp;
        }

        if (tmp = KTUtil.attr(headerEl, 'data-ktheader-minimize-mobile-offset')) {
            options.offset.mobile = tmp;
        }

        header = new KTHeader('kt_header', options);
    }

    // Header Menu
    var initHeaderMenu = function() {
        // init aside left offcanvas
        headerMenuOffcanvas = new KTOffcanvas('kt_header_menu_wrapper', {
            overlay: true,
            baseClass: 'kt-header-menu-wrapper',
            closeBy: 'kt_header_menu_mobile_close_btn',
            toggleBy: {
                target: 'kt_header_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        });

        headerMenu = new KTMenu('kt_header_menu', {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200, // accordion toggle slide speed in milliseconds
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    // Header Topbar
    var initHeaderTopbar = function() {
        asideToggler = new KTToggle('kt_header_mobile_topbar_toggler', {
            target: 'body',
            targetState: 'kt-header__topbar--mobile-on',
            togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
        });
    }

    // Aside
    var initAside = function() {
        // Init aside left offcanvas
        var asidBrandHover = false;
        var aside = KTUtil.get('kt_aside');
        var asideBrand = KTUtil.get('kt_aside_brand');
        var asideOffcanvasClass = KTUtil.hasClass(aside, 'kt-aside--offcanvas-default') ? 'kt-aside--offcanvas-default' : 'kt-aside';

        asideMenuOffcanvas = new KTOffcanvas('kt_aside', {
            baseClass: asideOffcanvasClass,
            overlay: true,
            closeBy: 'kt_aside_close_btn',
            toggleBy: {
                target: 'kt_aside_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        }); 
    }

    // Aside menu
    var initAsideMenu = function() {
        // Init aside menu
        var aside = KTUtil.get('kt_aside');
        var menu = KTUtil.get('kt_aside_menu');
        var menuDesktopMode = (KTUtil.attr(menu, 'data-ktmenu-dropdown') === '1' ? 'dropdown' : 'accordion');

        var scroll;

        asideMenu = new KTMenu('kt_aside_menu', {
            // Vertical scroll
            scroll: scroll,

            // Submenu setup
            submenu: {
                desktop: menuDesktopMode,
                tablet: 'accordion', // menu set to accordion in tablet mode
                mobile: 'accordion' // menu set to accordion in mobile mode
            },

            // Accordion setup
            accordion: {
                autoScroll: false, // enable auto scrolling(focus) to the clicked menu item
                expandAll: false   // allow having multiple expanded accordions in the menu
            }
        });

        // Handle full height dropdowns
        if (KTUtil.isInResponsiveRange('desktop')) {
            var query = KTUtil.findAll(aside, '.kt-menu__item--submenu-fullheight .kt-menu__submenu > .kt-menu__wrapper');
            
            for (var i = 0, j = query.length; i < j; i++) {
                var item = query[i];
              
                KTUtil.scrollInit(item, {
                    disableForMobile: true, 
                    resetHeightOnDestroy: true, 
                    handleWindowResize: true,
                    height: function() {  
                        return KTUtil.getViewPort().height; 
                    } 
                });

                // Update scroller on submenu toggle
                asideMenu.on('submenuToggle', function(menu, submenu) {
                    if (submenu && item && item.contains(submenu)) {
                        KTUtil.scrollUpdate(item);
                    }
                });
            }
        }
    }

    // Sidebar toggle
    var initAsideToggler = function() {
        if (!KTUtil.get('kt_aside_toggler')) {
            return;
        }

        asideToggler = new KTToggle('kt_aside_toggler', {
            target: 'body',
            targetState: 'kt-aside--minimize',
            togglerState: 'kt-aside__brand-aside-toggler--active'
        }); 

        asideToggler.on('toggle', function(toggle) {  
            KTUtil.addClass(body, 'kt-aside--minimizing');

            if (KTUtil.get('kt_page_portlet')) {
                pageStickyPortlet.updateSticky();      
            } 

            KTUtil.transitionEnd(body, function() {
                KTUtil.removeClass(body, 'kt-aside--minimizing');
            });

            headerMenu.pauseDropdownHover(800);
            asideMenu.pauseDropdownHover(800);

            // Remember state in cookie
            Cookies.set('kt_aside_toggle_state', toggle.getState());
            // to set default minimized left aside use this cookie value in your 
            // server side code and add "kt-brand--minimize kt-aside--minimize" classes to
            // the body tag in order to initialize the minimized left aside mode during page loading.
        });

        asideToggler.on('beforeToggle', function(toggle) {   
            var body = KTUtil.get('body'); 
            if (KTUtil.hasClass(body, 'kt-aside--minimize') === false && KTUtil.hasClass(body, 'kt-aside--minimize-hover')) {
                KTUtil.removeClass(body, 'kt-aside--minimize-hover');
            }
        });
    }

    // Scrolltop
    var initScrolltop = function() {
        var scrolltop = new KTScrolltop('kt_scrolltop', {
            offset: 300,
            speed: 600
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
        var asideWidth = 255;
        var asideMinimizeWidth = 78;
        var asideSecondaryWidth = 60;
        var asideSecondaryExpandedWidth = 310;

        return new KTPortlet('kt_page_portlet', {
            sticky: {
                offset: parseInt(KTUtil.css( KTUtil.get('kt_header'), 'height')),
                zIndex: 90,
                position: {
                    top: function() {
                        if (KTUtil.isInResponsiveRange('desktop')) {
                            var h = parseInt(KTUtil.css( KTUtil.get('kt_header'), 'height') );
                            
                            if (KTUtil.isInResponsiveRange('desktop') && KTUtil.hasClass(body, 'kt-content-head--fixed') && KTUtil.get('kt_content_head')) {
                                h = h + parseInt(KTUtil.css( KTUtil.get('kt_content_head'), 'height') );
                            }

                            return h;
                        } else {
                            return parseInt(KTUtil.css( KTUtil.get('kt_header_mobile'), 'height') );
                        }                        
                    },
                    left: function() {
                        var left = 0;

                        if (KTUtil.isInResponsiveRange('desktop')) {
                            if (KTUtil.hasClass(body, 'kt-aside--minimize')) {
                                left += asideMinimizeWidth;
                            } else {
                                left += asideWidth;
                            }
                        }

                        left += parseInt(KTUtil.css( KTUtil.get('kt_content_body'), 'paddingLeft'));

                        return left; 
                    },
                    right: function() {
                        var right = 0;

                        if (KTUtil.isInResponsiveRange('desktop')) {                            
                            if (KTUtil.hasClass(body, 'kt-aside-secondary--enabled')) {
                                if (KTUtil.hasClass(body, 'kt-aside-secondary--expanded')) {
                                    right += asideSecondaryExpandedWidth + asideSecondaryWidth;
                                } else {
                                    right += asideSecondaryWidth; 
                                }
                            } else {
                                right += parseInt(KTUtil.css( KTUtil.get('kt_content_body'), 'paddingRight'));
                            }
                        }

                        if (KTUtil.get('kt_aside_secondary')) {
                            right += parseInt(KTUtil.css( KTUtil.get('kt_content_body'), 'paddingRight') );
                        }

                        return right;
                    }
                }
            }
        });
    }

    return {
        init: function() {
            body = KTUtil.get('body');

            this.initHeader();
            this.initAside();
            this.initPageStickyPortlet();

            // Non functional links notice(can be removed in production)
            $('#kt_aside_menu, #kt_header_menu').on('click', '.kt-menu__link[href="#"]', function() {
                if(location.hostname.match('keenthemes.com')) {
                    swal.fire("You have clicked on a dummy link!", "To browse the theme features please refer to the header menu.", "warning");
                } else {
                    swal.fire("You have clicked on a dummy link!", "This demo shows only its unique layout features. <b>Keen's</b> all available features can be re-used in this and any other demos by refering to <b>the default demo</b>.", "warning");
                }
            });
        },

        initHeader: function() {
            initHeader();
            initHeaderMenu();
            initHeaderTopbar();
            initScrolltop();
        },

        initAside: function() { 
            initAside();
            initAsideMenu();
            initAsideToggler();
            
            this.onAsideToggle(function(e) {
                // Update sticky portlet
                if (pageStickyPortlet) {
                    pageStickyPortlet.updateSticky();
                }

                // Reload datatable
                var datatables = $('.kt-datatable');
                if (datatables) {
                    datatables.each(function() {
                        $(this).KTDatatable('redraw');
                    });
                }                
            });
        },

        initPageStickyPortlet: function() {
            if (!KTUtil.get('kt_page_portlet')) {
                return;
            }
            
            pageStickyPortlet = initPageStickyPortlet();
            pageStickyPortlet.initSticky();
            
            KTUtil.addResizeHandler(function(){
                pageStickyPortlet.updateSticky();
            });

            initPageStickyPortlet();
        },

        getAsideMenu: function() {
            return asideMenu;
        },

        onAsideToggle: function(handler) {
            if (typeof asideToggler.element !== 'undefined') {
                asideToggler.on('toggle', handler);
            }
        },

        getAsideToggler: function() {
            return asideToggler;
        },

        closeMobileAsideMenuOffcanvas: function() {
            if (KTUtil.isMobileDevice()) {
                asideMenuOffcanvas.hide();
            }
        },

        closeMobileHeaderMenuOffcanvas: function() {
            if (KTUtil.isMobileDevice()) {
                headerMenuOffcanvas.hide();
            }
        }
    };
}();

$(document).ready(function() {
    KTLayout.init();
});