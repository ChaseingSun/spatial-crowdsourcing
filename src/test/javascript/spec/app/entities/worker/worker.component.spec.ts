/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerComponent } from '../../../../../../main/webapp/app/entities/worker/worker.component';
import { WorkerService } from '../../../../../../main/webapp/app/entities/worker/worker.service';
import { Worker } from '../../../../../../main/webapp/app/entities/worker/worker.model';

describe('Component Tests', () => {

    describe('Worker Management Component', () => {
        let comp: WorkerComponent;
        let fixture: ComponentFixture<WorkerComponent>;
        let service: WorkerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerComponent],
                providers: [
                    WorkerService
                ]
            })
            .overrideTemplate(WorkerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Worker(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
