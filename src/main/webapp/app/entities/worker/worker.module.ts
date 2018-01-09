import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpacialcrowdsourcingSharedModule } from '../../shared';
import {
    WorkerService,
    WorkerPopupService,
    WorkerComponent,
    WorkerDetailComponent,
    WorkerDialogComponent,
    WorkerPopupComponent,
    WorkerDeletePopupComponent,
    WorkerDeleteDialogComponent,
    workerRoute,
    workerPopupRoute,
} from './';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const ENTITY_STATES = [
    ...workerRoute,
    ...workerPopupRoute,
];

@NgModule({
    imports: [
        SpacialcrowdsourcingSharedModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        /*AgmCoreModule.forRoot({
            apiKey:'AIzaSyAkIG_7Gsl3yqKhoyXuG0yy8BhSxmxCtJ0'
        }),*/
        AgmCoreModule.forRoot({
            apiKey:'AIzaSyAkIG_7Gsl3yqKhoyXuG0yy8BhSxmxCtJ0'
        }),
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
