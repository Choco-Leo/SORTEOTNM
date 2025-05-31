import { HeaderComponent } from '../../shared/header/header.component';
import { Component, HostListener,OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  showScrollButton = false;
  
  @HostListener('window:scroll')
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
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {    
  this.authService.isLoggedIn().subscribe(loggedIn => {
    
    if (loggedIn) {
      this.router.navigate(['/registerGrupoST']);
    }else{
      this.router.navigate(['/loginST']);
    }
  });
}
}
