import { Component, OnInit, Output } from '@angular/core';
import { Captcha } from '../../clases/captcha';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  captcha : Captcha;
  constructor() {
    this.captcha = new Captcha();
   }

   ngOnInit() {
    this.Generar();
  }

  Generar(){
    this.captcha.Generar();
    this.captcha.rta = '';
  }

  @Output() valorCaptcha:EventEmitter<boolean> = new EventEmitter<boolean>();
  
  Validar(event) {
    this.captcha.Verificar();
    this.valorCaptcha.emit(this.captcha.valido);
  }

}
