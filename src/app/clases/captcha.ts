import {Md5} from 'ts-md5/dist/md5';

export class Captcha {
    hoy : Date;
    captcha : string;
    rta : string;
    valido : boolean;

    constructor() {
        this.rta='';
        
    }
    Generar(){
        this.hoy = new Date();
        this.captcha = Md5.hashAsciiStr(this.hoy.getTime().toString()).toString();
        this.captcha = this.captcha.substring(1,7);
    }

    Verificar(){
        if(this.rta == this.captcha)
           this.valido = true;
        else 
            this.valido = false;
    }
}