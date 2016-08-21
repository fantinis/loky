(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // App            
            'app.dashboards',
            
            // Pages
            'app.pages',

            //dependencies & libraries necessary
            'nvd3',
            'datatables'

        ]);
})();