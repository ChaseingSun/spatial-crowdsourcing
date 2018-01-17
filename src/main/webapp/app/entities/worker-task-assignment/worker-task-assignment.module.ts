import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpacialcrowdsourcingSharedModule } from '../../shared';
import {
    WorkerTaskAssignmentService,
    WorkerTaskAssignmentPopupService,
    WorkerTaskAssignmentComponent,
    WorkerTaskAssignmentDetailComponent,
    WorkerTaskAssignmentDialogComponent,
    WorkerTaskAssignmentPopupComponent,
    WorkerTaskAssignmentDeletePopupComponent,
    WorkerTaskAssignmentDeleteDialogComponent,
    workerTaskAssignmentRoute,
    workerTaskAssignmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...workerTaskAssignmentRoute,
    ...workerTaskAssignmentPopupRoute,
];

@NgModule({
    imports: [
        SpacialcrowdsourcingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkerTaskAssignmentComponent,
        WorkerTaskAssignmentDetailComponent,
        WorkerTaskAssignmentDialogComponent,
        WorkerTaskAssignmentDeleteDialogComponent,
        WorkerTaskAssignmentPopupComponent,
        WorkerTaskAssignmentDeletePopupComponent,
    ],
    entryComponents: [
        WorkerTaskAssignmentComponent,
        WorkerTaskAssignmentDialogComponent,
        WorkerTaskAssignmentPopupComponent,
        WorkerTaskAssignmentDeleteDialogComponent,
        WorkerTaskAssignmentDeletePopupComponent,
    ],
    providers: [
        WorkerTaskAssignmentService,
        WorkerTaskAssignmentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpacialcrowdsourcingWorkerTaskAssignmentModule {}
