import { Component, inject, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @HostListener('window:scroll')onWindowScroll() {
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  private authService = inject(AuthService);
  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        // ¡Solo redirige cuando el backend ya cerró sesión!
        window.location.href = '/loginST';
      },
      error: err => {
        // Si quieres, igual puedes redirigir aunque haya error
        console.error('Error al cerrar sesión', err);
        window.location.href = '/loginST';
      }
    });
  }
}