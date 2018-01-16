import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SpacialcrowdsourcingTaskModule } from './task/task.module';
import { SpacialcrowdsourcingWorkerModule } from './worker/worker.module';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SpacialcrowdsourcingWorkerTaskAssignmentModule } from './worker-task-assignment/worker-task-assignment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SpacialcrowdsourcingTaskModule,
        SpacialcrowdsourcingWorkerModule,
        ReactiveFormsModule,
        SpacialcrowdsourcingWorkerTaskAssignmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpacialcrowdsourcingEntityModule {}
