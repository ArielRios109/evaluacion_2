import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contenido-qr',
  templateUrl: './contenido-qr.page.html',
  styleUrls: ['./contenido-qr.page.scss'],
})
export class ContenidoQrPage implements OnInit {
  qrContent: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      //this.qrContent = params.get('qrContent');
    });
  }
}
