import { Component, HostListener } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderPublicComponent } from '../../shared/header-public/header-public.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [FooterComponent, HeaderPublicComponent, RouterOutlet],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {
  showScrollButton = false;

  @HostListener('window:scroll',[])
  onWindowScroll() {
    const scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = scrollHeight > window.innerHeight / 2;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
