import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss'],
})
export class ItinerarioComponent implements OnInit {
  map: any;

  @Input() listaCoordenadas: any[] = [];

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -26.9076324, lng: -49.0733416 },
        zoom: 14,
      });
    });
  }
}
