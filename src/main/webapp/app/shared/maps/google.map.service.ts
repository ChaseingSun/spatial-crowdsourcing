import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MapsAPILoader} from "@agm/core";

@Injectable()
export class GoogleMapService{
    constructor(private mapsAPILoader: MapsAPILoader){}

   /* getPlaces(location:string):Observable<string[]>{
        this.mapsAPILoader.load().then(()=>{
           let places[] = new google.maps.places.PlacesService(location)
        });
    }*/


}
