import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Worker } from './worker.model';
import { WorkerService } from './worker.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-worker',
    templateUrl: './worker.component.html'
})
export class WorkerComponent implements OnInit, OnDestroy {
workers: Worker[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workerService: WorkerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.workers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Worker) {
        return item.id;
    }
    registerChangeInWorkers() {
        this.eventSubscriber = this.eventManager.subscribe('workerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
