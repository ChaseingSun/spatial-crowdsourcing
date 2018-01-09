import {Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Worker } from './worker.model';
import { WorkerService } from './worker.service';
import { Principal, ResponseWrapper } from '../../shared';
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";

@Component({
    selector: 'jhi-worker',
    templateUrl: './worker.component.html'
})
export class WorkerComponent implements OnInit, OnDestroy {
workers: Worker[];
    currentAccount: any;
    eventSubscriber: Subscription;

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private workerService: WorkerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
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


        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();
        console.log("init this.serachElementRef");
        console.log(this.searchElementRef);
        //load Places Autocomplete
        this.loadMap();

    }

    loadMap() {
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    setCurrentPosition(){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom=12;
            });
        }
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
