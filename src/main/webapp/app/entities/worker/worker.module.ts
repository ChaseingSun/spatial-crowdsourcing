import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SpacialcrowdsourcingSharedModule} from '../../shared';
import {
    WorkerComponent, WorkerDeleteDialogComponent, WorkerDeletePopupComponent, WorkerDetailComponent,
    WorkerDialogComponent, WorkerPopupComponent, workerPopupRoute, WorkerPopupService, workerRoute, WorkerService,
} from './';

const ENTITY_STATES = [
    ...workerRoute,
    ...workerPopupRoute,
];

@NgModule({
    imports: [
        SpacialcrowdsourcingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkerComponent,
        WorkerDetailComponent,
        WorkerDialogComponent,
        WorkerDeleteDialogComponent,
        WorkerPopupComponent,
        WorkerDeletePopupComponent,
    ],
    entryComponents: [
        WorkerComponent,
        WorkerDialogComponent,
        WorkerPopupComponent,
        WorkerDeleteDialogComponent,
        WorkerDeletePopupComponent,
    ],
    providers: [
        WorkerService,
        WorkerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpacialcrowdsourcingWorkerModule {}
