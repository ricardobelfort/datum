import { Onibus } from 'src/app/models/onibus';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(Onibus: Onibus[], searchValue: string): Onibus[] {
    if (!Onibus || !searchValue) {
      return Onibus;
    }
    return Onibus.filter((onibus) =>
      onibus.nome.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
