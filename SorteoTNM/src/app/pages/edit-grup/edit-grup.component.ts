import { Component, OnInit,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GetTableSTService } from '../../services/get-table-st.service';
import { Router } from '@angular/router';

interface IdInstituto {
  [key: string]: string;
}

interface GrupoData {
  ids: IdInstituto[];
}

interface GruposData {
  [deporte: string]: {
    [grupo: string]: GrupoData;
  };
}


@Component({
  selector: 'app-edit-grup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-grup.component.html',
  styleUrl: './edit-grup.component.css'
})
export class EditGrupComponent implements OnInit {

  it_Part: string = '';
  deport_select: string = '';
  grupo_Select: string = '';
  
  grupos: string[] = [];
  gruposData: GruposData = {};
  filteredData: GruposData = {};

  editForm = {
    id: '',
    it_Part: '',
    deport_select: '',
    grupo_Select: ''
  };
  showScrollButton = false;
  
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = scrollHeight > window.innerHeight / 2;
  }

  regGrupForm!: FormGroup;

  constructor(
    private getTableService: GetTableSTService,
    private router: Router
  ) {}

  ngOnInit() {
    this.generarGrupos();
    this.onFilterChange();
  }

  onFilterChange() {
    this.getTableService.getGruposID().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.gruposData = response.data;
          this.aplicarFiltros();
        }
      },
      error: (error) => {
        console.error('Error al obtener los grupos:', error);
        if (error.status === 401) {
          alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  aplicarFiltros() {
    this.filteredData = {};
    
    Object.entries(this.gruposData).forEach(([deporte, grupos]) => {
      if (this.deport_select && deporte !== this.deport_select) {
        return;
      }

      this.filteredData[deporte] = {};
      
      Object.entries(grupos).forEach(([grupo, grupoData]) => {
        if (this.grupo_Select && grupo !== this.grupo_Select) {
          return;
        }

        // Si no hay filtro de institución o si alguna institución en el grupo coincide,
        // mantenemos el grupo completo
        if (!this.it_Part || 
            grupoData.ids.some(idObj => Object.values(idObj)[0] === this.it_Part)) {
          this.filteredData[deporte][grupo] = {
            ids: grupoData.ids // Mantenemos todos los IDs del grupo
          };
        }
      });

      if (Object.keys(this.filteredData[deporte]).length === 0) {
        delete this.filteredData[deporte];
      }
    });
}

  generarGrupos() {
    for (let i = 65; i <= 90; i++) {
      this.grupos.push(`G${String.fromCharCode(i)}`);
    }
  }

  eliminarGrupo() {
    if (!this.editForm.id) {
      alert('Por favor, seleccione un grupo para eliminar');
      return;
    }
    console.log('ID a eliminar:', this.editForm.id);
    
    if (confirm('¿Está seguro que desea eliminar este grupo?')) {
      this.getTableService.deleteGruposID(this.editForm.id).subscribe({
        
        next: (response) => {
          if (response.success) {
            alert('Grupo eliminado exitosamente');
            this.onFilterChange();
          } else {
            alert('Error al eliminar el grupo');
          }
        },
        error: (error) => {
          console.error('Error al eliminar el grupo:', error);
          alert('Error al eliminar el grupo');
        }
      });
    }
  }

  seleccionarGrupo(deporte: string, grupo: string, idObj: any) {
    const id = Object.keys(idObj)[0];
    const instituto = Object.values(idObj)[0];
    
    // Mantenemos el formato original sin modificar
    this.editForm = {
        id: id,
        deport_select: deporte,
        grupo_Select: grupo,
        it_Part: instituto as string
    };
  }

  actualizarGrupo() {
    if (!this.editForm.id) {
        alert('Por favor, seleccione un grupo para editar');
        return;
    }
    // Enviamos los datos sin modificar su formato
    this.getTableService.putGruposID(this.editForm).subscribe({
        next: (response) => {
          
            if (response.success) {
                alert('Grupo actualizado exitosamente');
                this.onFilterChange();
            } else {
                alert('Error al actualizar el grupo');
            }
        },
        error: (error) => {
            console.error('Error al actualizar el grupo:', error);
            alert('Error al actualizar el grupo');
        }
    });
  }

  ejecutarActualizacion() {
    this.actualizarGrupo();
    this.limpiarFormulario();
  }
  ejecutarEliminacion() {
    this.eliminarGrupo();
    this.limpiarFormulario();
  }
  limpiarFormulario() {
    // Limpiar el formulario de edición
    this.editForm = {
      id: '',
      deport_select: '',
      grupo_Select: '',
      it_Part: ''
    };

    // Limpiar los filtros de búsqueda y selectores
    this.it_Part = '';
    this.deport_select = '';
    this.grupo_Select = '';

    // Limpiar los selectores del formulario
    const selectores = ['editInstituto', 'editDeporte', 'editGrupo', 'instituto', 'deporte', 'categoria'];
    selectores.forEach(id => {
      const elemento = document.getElementById(id) as HTMLSelectElement;
      if (elemento) {
        elemento.value = '';
      }
    });
  }
  limpiarFiltros() {
    this.it_Part = '';
    this.deport_select = '';
    this.grupo_Select = '';
    this.onFilterChange();
  }
  scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }
  hasInstituto(deporte: string, grupo: string, index: number): boolean {
    const grupoData = this.filteredData[deporte]?.[grupo];
    return grupoData?.ids && index < grupoData.ids.length;
  }

  getInstitutoNombre(deporte: string, grupo: string, index: number): string {
    const instituto = this.filteredData[deporte]?.[grupo]?.ids?.[index];
    return instituto ? Object.values(instituto)[0] : '';
  }

  isSelected(deporte: string, grupo: string, index: number): boolean {
    const instituto = this.filteredData[deporte]?.[grupo]?.ids?.[index];
    return instituto ? this.editForm.id === Object.keys(instituto)[0] : false;
  }
  Object =  Object
}
