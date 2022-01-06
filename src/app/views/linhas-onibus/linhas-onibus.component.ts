import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { Onibus } from 'src/app/models/onibus';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-linhas-onibus',
  templateUrl: './linhas-onibus.component.html',
  styleUrls: ['./linhas-onibus.component.scss'],
})
export class LinhasOnibusComponent implements OnInit {
  searchValue!: string;
  onibus: Onibus[] = [];
  page: number = 1;
  itinerarioList: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listarLinhasOnibus();
  }

  listarLinhasOnibus() {
    this.api.getLinhasOnibus().subscribe(
      (res: Onibus[]) => {
        this.toastr.success('Dados carregados com sucesso!');
        this.onibus = res;
      },
      (err) => this.toastr.error('Ops! Erro ao recuperar dados.', 'Erro', err)
    );
  }

  pegarItinerarioPorId(id: any) {
    this.api.getItinerarioPorId(id).subscribe(
      (res) => {
        let data = { ...res };
        let coord = [];

        for (let i in data) {
          coord.push([i, data[i]]);
        }

        let novoArrayCoordenadas = coord;

        let latlongPosicoes = novoArrayCoordenadas.map((posicao) => posicao[1]);

        let map: any;

        let loader = new Loader({
          apiKey: environment.googleMapsApiKey,
          version: 'weekly',
        });

        loader.load().then(() => {
          map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
              center: { lat: -30.1084987, lng: -51.3172251 },
              zoom: 10,
            }
          );

          latlongPosicoes.forEach((item) => {
            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(item.lat, item.lng),
              map: map,
            });
          });
        });
      },
      (err) => this.toastr.error(err.error.message)
    );
  }

  verItinerarioPorId(id: string) {
    this.router.navigate(['itinerario', id]);
    this.pegarItinerarioPorId(this.itinerarioList);
  }
}
