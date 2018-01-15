import {Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, ViewChildren} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, Response} from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Worker } from './worker.model';
import { WorkerPopupService } from './worker-popup.service';
import { WorkerService } from './worker.service';

import {MapsAPILoader} from "@agm/core";
import {FormControl} from "@angular/forms";
import {GOOGLE_API_URL} from "../../app.constants";

@Component({
    selector: 'jhi-worker-dialog',
    styles: [`
    agm-map {
      height: 300px;
    }
  `],
    templateUrl: './worker-dialog.component.html'
})
export class WorkerDialogComponent implements OnInit {

    worker: Worker;
    isSaving: boolean;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    public places:any;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        public activeModal: NgbActiveModal,
        private workerService: WorkerService,
        private eventManager: JhiEventManager,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private http:Http
    ) {

    }

    ngOnInit() {
        this.isSaving = false;

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

    searchLocation(){
        console.log("In the search location");
     this.http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&key=AIzaSyDOF23XN2tAVxQxwJgm-80A78bZ88wlx4g")
         .map((res:any)=>{
             console.log("In the search locaiton");
             console.log(res);
         }) ;
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
                    console.log("Place");
                    console.log(place);

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.worker.lattitude=this.latitude.toString();
                    this.worker.longitude=this.longitude.toString();
                    this.worker.location=place.name;
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
