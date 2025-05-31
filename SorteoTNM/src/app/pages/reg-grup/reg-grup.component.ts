import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GetTableSTService } from '../../services/get-table-st.service';

interface GruposData {
  [deporte: string]: {
    [grupo: string]: string[];
  };
}

@Component({
  selector: 'app-reg-grup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reg-grup.component.html',
  styleUrl: './reg-grup.component.css'
})

export class RegGrupComponent implements OnInit {
  // Declaración de propiedades
  it_Part: string = '';
  deport_select: string = '';
  grupo_Select: string = '';
    
  // Declaración de propiedades para grupos
  grupos: string[] = [];
  gruposData: GruposData = {};
  filteredData: GruposData = {};

  // Formulario para registro
  regGrupForm!: FormGroup;

  // Constructor para inyectar servicios 
  constructor(
    private getTableService: GetTableSTService,
        private fb: FormBuilder
    ) {}

    
    ngOnInit() {
    this.generarGrupos();
    this.onFilterChange();
    this.initRegistroForm();
  }

  // Inicialización del formulario de registro
  initRegistroForm() {
    this.regGrupForm = this.fb.group({
      it_Part: ['', [Validators.required]],
      deport_select: ['', [Validators.required]],
      grupo_Select: ['', [Validators.required]],
    });
  }

  // Método para registrar un grupo
  registrarGrupo() {
    if (this.regGrupForm.valid) {
      const formData = this.regGrupForm.value;
            
      this.getTableService.registrarGrupo(formData).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Grupo registrado exitosamente');
            // Reiniciar el formulario con valores vacíos
            this.regGrupForm.patchValue({
              it_Part: '',
              deport_select: '',
              grupo_Select: ''
            });
            this.onFilterChange(); // Actualizar la lista de grupos
          } else {
            alert('Error al registrar el grupo: ' + response.message);
          }
        },error: (error) => {
          console.error('Error al registrar grupo:', error);
          alert('Error al intentar registrar el grupo');
        }
      });
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }
  //Metodo para enviar el formulario
  onSubmit() {
    if (this.regGrupForm.valid) {
        const formData = this.regGrupForm.value;
        
        
        // Llamar al método para registrar el grupo
        this.registrarGrupo();
    } else {
        alert('Por favor, complete todos los campos requeridos');
    }
}

  // Método para generar grupos
  generarGrupos() {
    for (let i = 65; i <= 90; i++) {
      this.grupos.push(`G${String.fromCharCode(i)}`);
    }
  }
  // Método para manejar cambios en los filtros
  onFilterChange() {
    // Llama al servicio para obtener los grupos
    this.getTableService.getGrupos().subscribe({
        next: (response) => {
            if (response && response.data) {
                this.gruposData = response.data;
                this.aplicarFiltros();
            }
        },
        error: (error) => {
            console.error('Error al obtener los grupos:', error);
        }
    });
  }
  // Método para aplicar filtros
  aplicarFiltros() {
  this.filteredData = {};
  
  Object.entries(this.gruposData).forEach(([deporte, grupos]) => {
      if (this.deport_select && deporte !== this.deport_select) {
          return;
      }

      this.filteredData[deporte] = {};
      
      Object.entries(grupos).forEach(([grupo, instituciones]) => {
          if (this.grupo_Select && grupo !== this.grupo_Select) {
              return;
          }

          // Si no hay filtro de institución o si alguna institución coincide, mantenemos el grupo completo
          if (!this.it_Part || instituciones.some(inst => inst === this.it_Part)) {
              this.filteredData[deporte][grupo] = instituciones;
          }
      });

      if (Object.keys(this.filteredData[deporte]).length === 0) {
          delete this.filteredData[deporte];
      }
  });
  }
  limpiarFiltros() {
    this.it_Part = '';
    this.deport_select = '';
    this.grupo_Select = '';
    this.onFilterChange();
  }

// Agregar esta propiedad para usar Object en el template
Object = Object;
}
