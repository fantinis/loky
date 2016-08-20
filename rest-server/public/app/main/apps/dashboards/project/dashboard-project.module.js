 (function ()
{
    'use strict';


    angular
        .module('app.dashboards.project', [])
        .config(config);


    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_project', {
            url      : '/dashboard-project',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/project/dashboard-project.html',
                    controller : 'DashboardProjectController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.project@get');
                },
                SensorsDatas: function (msApi)
                {
                    return msApi.resolve('dashboard.sensorsDatas@query')    
                }
            },
            bodyClass: 'dashboard-project'
        });


        // Api
        msApiProvider.register('dashboard.project', ['app/data/dashboard/project/data.json']);
        msApiProvider.register('dashboard.sensorsDatas', ['https://89.36.210.97:3040/data']);
    }


})();