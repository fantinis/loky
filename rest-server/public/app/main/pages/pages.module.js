(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.auth.login',            
            'app.pages.auth.register',            
            'app.pages.auth.forgot-password',
            'app.pages.auth.reset-password',         
            'app.pages.error-404',
            'app.pages.error-500',            
            'app.pages.maintenance',
            'app.pages.profile'            
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('pages', {
            title : 'PAGES',
            group : true,
            weight: 2
        });
    }
})();