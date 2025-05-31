import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      userNick: ['', [Validators.required]],
      passWD: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userNick, passWD } = this.loginForm.value;
      
      this.authService.login(userNick, passWD).subscribe({
        next: (response) => {
          // Verificamos la estructura correcta de la respuesta
          if (response && response.user && response.user.success) {
            this.router.navigate(['/registerGrupoST']);
          } else {
            alert('Error en la autenticación');
          }
        },
        error: (error) => {
          console.error('Error de inicio de sesión:', error);
          if (error.status === 401) {
           alert('Usuario o contraseña incorrectos');
          } else if (error.status === 500) {
            alert('Error en el servidor. Por favor, intente más tarde');
          } else {
            alert('Error al intentar iniciar sesión');
          }
        }
      });
    }
  }
}