import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Worker } from './worker.model';
import { WorkerPopupService } from './worker-popup.service';
import { WorkerService } from './worker.service';

@Component({
    selector: 'jhi-worker-dialog',
    templateUrl: './worker-dialog.component.html'
})
export class WorkerDialogComponent implements OnInit {

    worker: Worker;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private workerService: WorkerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.worker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workerService.update(this.worker));
        } else {
            this.subscribeToSaveResponse(
                this.workerService.create(this.worker));
        }
    }

    private subscribeToSaveResponse(result: Observable<Worker>) {
        result.subscribe((res: Worker) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Worker) {
        this.eventManager.broadcast({ name: 'workerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-worker-popup',
    template: ''
})
export class WorkerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workerPopupService: WorkerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workerPopupService
                    .open(WorkerDialogComponent as Component, params['id']);
            } else {
                this.workerPopupService
                    .open(WorkerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
