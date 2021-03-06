/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerDialogComponent } from '../../../../../../main/webapp/app/entities/worker/worker-dialog.component';
import { WorkerService } from '../../../../../../main/webapp/app/entities/worker/worker.service';
import { Worker } from '../../../../../../main/webapp/app/entities/worker/worker.model';

describe('Component Tests', () => {

    describe('Worker Management Dialog Component', () => {
        let comp: WorkerDialogComponent;
        let fixture: ComponentFixture<WorkerDialogComponent>;
        let service: WorkerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerDialogComponent],
                providers: [
                    WorkerService
                ]
            })
            .overrideTemplate(WorkerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Worker(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.worker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Worker();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.worker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
