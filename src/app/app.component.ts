import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild('musica', { static: true })
  musica!: ElementRef<HTMLAudioElement>;

  regaloAbierto = false;
  musicaActiva = false;

  fotoActual = 0;

  fotos = [
    'assets/fotos/foto-1.jpeg',
    'assets/fotos/foto-2.jpeg',
    'assets/fotos/foto-3.jpeg',
    'assets/fotos/foto-4.jpeg'
  ];

  intervaloCarrusel: any;

  ngAfterViewInit(): void {
    const audio = this.musica.nativeElement;

    audio.preload = 'auto';
    audio.volume = 0.7;
    audio.load();
  }

  abrirRegalo(): void {
    this.regaloAbierto = true;

    this.iniciarMusica();
    this.iniciarCarrusel();

    setTimeout(() => {
      document.getElementById('regalo')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  }

  iniciarMusica(): void {
    const audio = this.musica.nativeElement;

    audio.play()
      .then(() => {
        this.musicaActiva = true;
      })
      .catch(() => {
        console.log('El navegador bloqueó el autoplay.');
      });
  }

  alternarMusica(): void {
    const audio = this.musica.nativeElement;

    if (audio.paused) {
      this.iniciarMusica();
    } else {
      audio.pause();
      this.musicaActiva = false;
    }
  }

  iniciarCarrusel(): void {
    this.detenerCarrusel();

    this.intervaloCarrusel = setInterval(() => {
      this.cambiarFoto(1);
    }, 4000);
  }

  detenerCarrusel(): void {
    if (this.intervaloCarrusel) {
      clearInterval(this.intervaloCarrusel);
    }
  }

  cambiarFoto(direccion: number): void {
    this.fotoActual =
      (this.fotoActual + direccion + this.fotos.length) %
      this.fotos.length;
  }

  irAFoto(indice: number): void {
    this.fotoActual = indice;
  }

  ngOnDestroy(): void {
    this.detenerCarrusel();
  }
}