import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SpacialcrowdsourcingTaskModule } from './task/task.module';
import { SpacialcrowdsourcingWorkerModule } from './worker/worker.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SpacialcrowdsourcingTaskModule,
        SpacialcrowdsourcingWorkerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpacialcrowdsourcingEntityModule {}
