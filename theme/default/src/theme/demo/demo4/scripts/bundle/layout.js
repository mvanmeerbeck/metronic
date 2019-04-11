"use strict";

var KTLayout = function() {
    var body;

    var header;
    var headerMenu;
    var headerMenuOffcanvas;
    var mobileHeaderTopbarToggle;

    var asideMenu;
    var asideMenuOffcanvas;

    var scrollTop;

    var pageStickyPortlet;

    // Header
    var initHeader = function() {
        var tmp;
        var headerEl = KTUtil.get('kt_header');
        var options = {
            classic: {
                desktop: true,
                mobile: false
            },
            offset: {
                dekstop: parseInt(KTUtil.css(headerEl, 'height')) + 200
            },
            minimize: {
                desktop: {
                    on: 'kt-header--minimize'
                },
                mobile: false
            }
        };

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
        mobileHeaderTopbarToggle = new KTToggle('kt_header_mobile_topbar_toggler', {
            target: 'body',
            targetState: 'kt-header__topbar--mobile-on',
            togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
        });
    }

    // Aside
    var initAside = function() {
        // init aside left offcanvas
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

        // Handle minimzied aside hover
        if (KTUtil.hasClass(body, 'kt-aside--fixed')) {
            var insideTm;
            var outsideTm;

            KTUtil.addEvent(aside, 'mouseenter', function(e) {
                e.preventDefault();

                if (KTUtil.isInResponsiveRange('desktop') === false) {
                    return;
                }

                if (outsideTm) {
                    clearTimeout(outsideTm);
                    outsideTm = null;
                }

                insideTm = setTimeout(function() {
                    if (KTUtil.hasClass(body, 'kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
                        KTUtil.removeClass(body, 'kt-aside--minimize');
                        
                        // Minimizing class
                        KTUtil.addClass(body, 'kt-aside--minimizing');
                        KTUtil.transitionEnd(body, function() {
                            KTUtil.removeClass(body, 'kt-aside--minimizing');
                        });

                        // Hover class
                        KTUtil.addClass(body, 'kt-aside--minimize-hover');
                        asideMenu.scrollUpdate();
                        asideMenu.scrollTop();
                    }
                }, 50);
            });

            KTUtil.addEvent(aside, 'mouseleave', function(e) {
                e.preventDefault();

                if (KTUtil.isInResponsiveRange('desktop') === false) {
                    return;
                }

                if (insideTm) {
                    clearTimeout(insideTm);
                    insideTm = null;
                }

                outsideTm = setTimeout(function() {
                    if (KTUtil.hasClass(body, 'kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
                        KTUtil.removeClass(body, 'kt-aside--minimize-hover');
                        KTUtil.addClass(body, 'kt-aside--minimize');

                        // Minimizing class
                        KTUtil.addClass(body, 'kt-aside--minimizing');
                        KTUtil.transitionEnd(body, function() {
                            KTUtil.removeClass(body, 'kt-aside--minimizing');
                        });

                        // Hover class
                        asideMenu.scrollUpdate();
                        asideMenu.scrollTop();
                    }
                }, 100);
            });
        }
    }

    // Aside menu
    var initAsideMenu = function() {
        // Init aside menu
        var menu = KTUtil.get('kt_aside_menu');
        var menuDesktopMode = (KTUtil.attr(menu, 'data-ktmenu-dropdown') === '1' ? 'dropdown' : 'accordion');

        // Init scrollable menu container
        var scroll;
        if (KTUtil.attr(menu, 'data-ktmenu-scroll') === '1') {
            scroll = {
                height: function() {
                    var height;

                    if (KTUtil.isInResponsiveRange('desktop')) {
                        height = parseInt(KTUtil.getViewPort().height) - parseInt(KTUtil.actualHeight('kt_header', false)) - parseInt(KTUtil.actualHeight('kt_footer', false));
                        height = height - parseInt(KTUtil.css(menu, 'marginTop')) - parseInt(KTUtil.css(menu, 'marginBottom'));
                    } else {
                        height = parseInt(KTUtil.getViewPort().height);
                    }

                    return height;
                }
            };
        }

        // Init aside menu
        asideMenu = new KTMenu('kt_aside_menu', {
            // vertical scroll
            scroll: scroll,

            // submenu setup
            submenu: {
                desktop: menuDesktopMode,
                tablet: 'accordion', // menu set to accordion in tablet mode
                mobile: 'accordion' // menu set to accordion in mobile mode
            },

            //accordion setup
            accordion: {
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });       
    }

    // Scrolltop
    var initScrolltop = function() {
        var scrolltop = new KTScrolltop('kt_scrolltop', {
            offset: 200,
            speed: 400
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
        return new KTPortlet('kt_page_portlet', {
            sticky: {
                offset: parseInt(KTUtil.css( KTUtil.get('kt_header'), 'height')) + 200,
                zIndex: 90,
                position: {
                    top: function() {
                        if (KTUtil.isInResponsiveRange('desktop')) {
                            return parseInt(KTUtil.css( KTUtil.get('kt_header'), 'height') );
                        } else {
                            return parseInt(KTUtil.css( KTUtil.get('kt_header_mobile'), 'height') );
                        }                        
                    },
                    left: function() {
                        if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
                            return parseInt(KTUtil.css( KTUtil.get('kt_body'), 'paddingLeft'));
                        }

                        return;
                    },
                    right: function() {
                        if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
                            return parseInt(KTUtil.css( KTUtil.get('kt_body'), 'paddingRight'));
                        }

                        return;
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
        },

        getAsideMenu: function() {
            return asideMenu;
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