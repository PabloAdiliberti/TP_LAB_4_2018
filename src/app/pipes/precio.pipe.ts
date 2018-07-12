import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';


@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  transform(value: any, fin: any): any {
    if(value == undefined || value == null )
    {  
      return "";
    }
    if(fin == 1)
    {
      return "$ " + value + '.-';
    }
    else 
      return "El precio aproximado es $ " + (value * 0.02).toFixed(2) + '.-';
  }

}




