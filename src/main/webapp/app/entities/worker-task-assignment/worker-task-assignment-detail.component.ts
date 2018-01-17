import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WorkerTaskAssignment } from './worker-task-assignment.model';
import { WorkerTaskAssignmentService } from './worker-task-assignment.service';

@Component({
    selector: 'jhi-worker-task-assignment-detail',
    templateUrl: './worker-task-assignment-detail.component.html'
})
export class WorkerTaskAssignmentDetailComponent implements OnInit, OnDestroy {

    workerTaskAssignment: WorkerTaskAssignment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private workerTaskAssignmentService: WorkerTaskAssignmentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWorkerTaskAssignments();
    }

    load(id) {
        this.workerTaskAssignmentService.find(id).subscribe((workerTaskAssignment) => {
            this.workerTaskAssignment = workerTaskAssignment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkerTaskAssignments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'workerTaskAssignmentListModification',
            (response) => this.load(this.workerTaskAssignment.id)
        );
    }
}
