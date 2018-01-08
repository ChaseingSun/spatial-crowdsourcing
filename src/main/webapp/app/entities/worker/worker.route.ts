import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WorkerComponent } from './worker.component';
import { WorkerDetailComponent } from './worker-detail.component';
import { WorkerPopupComponent } from './worker-dialog.component';
import { WorkerDeletePopupComponent } from './worker-delete-dialog.component';

export const workerRoute: Routes = [
    {
        path: 'worker',
        component: WorkerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'worker/:id',
        component: WorkerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workerPopupRoute: Routes = [
    {
        path: 'worker-new',
        component: WorkerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'worker/:id/edit',
        component: WorkerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'worker/:id/delete',
        component: WorkerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Workers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
