import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkerTaskAssignment } from './worker-task-assignment.model';
import { WorkerTaskAssignmentService } from './worker-task-assignment.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-worker-task-assignment',
    templateUrl: './worker-task-assignment.component.html'
})
export class WorkerTaskAssignmentComponent implements OnInit, OnDestroy {
workerTaskAssignments: WorkerTaskAssignment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workerTaskAssignmentService: WorkerTaskAssignmentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workerTaskAssignmentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.workerTaskAssignments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkerTaskAssignments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WorkerTaskAssignment) {
        return item.id;
    }
    registerChangeInWorkerTaskAssignments() {
        this.eventSubscriber = this.eventManager.subscribe('workerTaskAssignmentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
