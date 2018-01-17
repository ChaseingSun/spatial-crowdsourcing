import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WorkerTaskAssignmentComponent } from './worker-task-assignment.component';
import { WorkerTaskAssignmentDetailComponent } from './worker-task-assignment-detail.component';
import { WorkerTaskAssignmentPopupComponent } from './worker-task-assignment-dialog.component';
import { WorkerTaskAssignmentDeletePopupComponent } from './worker-task-assignment-delete-dialog.component';

export const workerTaskAssignmentRoute: Routes = [
    {
        path: 'worker-task-assignment',
        component: WorkerTaskAssignmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkerTaskAssignments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'worker-task-assignment/:id',
        component: WorkerTaskAssignmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkerTaskAssignments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workerTaskAssignmentPopupRoute: Routes = [
    {
        path: 'worker-task-assignment-new',
        component: WorkerTaskAssignmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkerTaskAssignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'worker-task-assignment/:id/edit',
        component: WorkerTaskAssignmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkerTaskAssignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'worker-task-assignment/:id/delete',
        component: WorkerTaskAssignmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkerTaskAssignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
