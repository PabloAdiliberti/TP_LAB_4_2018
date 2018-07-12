import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appEstado]'
})
export class EstadoDirective implements OnInit{
  @Input() estado : string;
  elEstado : string;
  elemento : ElementRef;

  constructor(el: ElementRef) {
    this.elemento = el;  
  }

  ngOnInit(){
    if(this.estado == 'Cancelado'){
      this.elemento.nativeElement.style.backgroundColor= 'rgb(238, 233, 232)';
      this.elemento.nativeElement.style.color= 'rgb(148,145,144)';
      this.elemento.nativeElement.style.fontWeight= '500';
    }
      
    else if(this.estado == 'Finalizado'){
      this.elemento.nativeElement.style.backgroundColor= 'rgb(238, 233, 232)';
      this.elemento.nativeElement.style.color= 'rgb(148,145,144)';
      this.elemento.nativeElement.style.fontWeight= '500';
    }
  }

}