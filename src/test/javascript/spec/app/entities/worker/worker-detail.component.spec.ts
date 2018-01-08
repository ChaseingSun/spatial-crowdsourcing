/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerDetailComponent } from '../../../../../../main/webapp/app/entities/worker/worker-detail.component';
import { WorkerService } from '../../../../../../main/webapp/app/entities/worker/worker.service';
import { Worker } from '../../../../../../main/webapp/app/entities/worker/worker.model';

describe('Component Tests', () => {

    describe('Worker Management Detail Component', () => {
        let comp: WorkerDetailComponent;
        let fixture: ComponentFixture<WorkerDetailComponent>;
        let service: WorkerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerDetailComponent],
                providers: [
                    WorkerService
                ]
            })
            .overrideTemplate(WorkerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Worker(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.worker).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
