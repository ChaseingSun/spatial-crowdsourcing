import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SpacialcrowdsourcingSharedModule} from '../../shared';
import {
    TaskComponent, TaskDeleteDialogComponent, TaskDeletePopupComponent, TaskDetailComponent, TaskDialogComponent,
    TaskPopupComponent, taskPopupRoute, TaskPopupService, taskRoute, TaskService,
} from './';

const ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        SpacialcrowdsourcingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaskComponent,
        TaskDetailComponent,
        TaskDialogComponent,
        TaskDeleteDialogComponent,
        TaskPopupComponent,
        TaskDeletePopupComponent,
    ],
    entryComponents: [
        TaskComponent,
        TaskDialogComponent,
        TaskPopupComponent,
        TaskDeleteDialogComponent,
        TaskDeletePopupComponent,
    ],
    providers: [
        TaskService,
        TaskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpacialcrowdsourcingTaskModule {}
