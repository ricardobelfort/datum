import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { Lotacao } from 'src/app/models/lotacao';

@Component({
  selector: 'app-linhas-lotacao',
  templateUrl: './linhas-lotacao.component.html',
  styleUrls: ['./linhas-lotacao.component.scss'],
})
export class LinhasLotacaoComponent implements OnInit {
  searchValue!: string;
  lotacao: Lotacao[] = [];
  page: number = 1;

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.listarLinhasLotacao();
  }

  listarLinhasLotacao() {
    this.api.getLinhasLotacao().subscribe(
      (res) => {
        this.toastr.success('Dados carregados com sucesso!');
        this.lotacao = res;
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
}
