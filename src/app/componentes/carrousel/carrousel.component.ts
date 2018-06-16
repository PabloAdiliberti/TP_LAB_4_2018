import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GalleriaModule} from 'primeng/galleria';
import {GrowlModule,Message} from 'primeng/primeng';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  images: any[];
    
  ngOnInit() {
      this.images = [];
      this.images.push({source:'assets/Imagenes/auto1.jpg', alt:'Nos destacamos por cumplir con la necesidades de nuestros clientes', title:'Gran cantidad de transportes.'});
      this.images.push({source:'assets/Imagenes/auto2.jpg', alt:'Autos de primera linea', title:'Vehículos Ejecutivos'});
      this.images.push({source:'assets/Imagenes/auto3.jpg', alt:'Autos con gran comodidad', title:'Amplio espacio para usted y su equipaje'});
      this.images.push({source:'assets/Imagenes/auto4.jpg', alt:'', title:'Camionetas'});
      this.images.push({source:'assets/Imagenes/auto5.jpg', alt:'', title:'Furgonetas'});
  }

}
