import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetTableSTService  } from '../../services/get-table-st.service';

interface GruposData {
  [deporte: string]: {
    [grupo: string]: string[];
  };
}

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
    it_Part: string = '';
    deport_select: string = '';
    grupo_Select: string = '';
    
    grupos: string[] = [];
    gruposData: GruposData = {};
    filteredData: GruposData = {};

    constructor(private getTableService: GetTableSTService) {}

    ngOnInit() {
        this.generarGrupos();
        this.onFilterChange();
    }

    generarGrupos() {
        for (let i = 65; i <= 90; i++) {
          this.grupos.push(`G${String.fromCharCode(i)}`);
        }
    }

    onFilterChange() {
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

    Object = Object;
}
