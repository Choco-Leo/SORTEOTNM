import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTableSTService  } from '../../services/get-table-st.service';

interface GruposData {
  [deporte: string]: {
    [grupo: string]: string[];
  };
}

@Component({
  selector: 'app-result-final',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-final.component.html',
  styleUrl: './result-final.component.css'
})
export class ResultFinalComponent implements OnInit {
  it_Part: string = '';
  deport_select: string = '';
  grupo_Select: string = '';

  grupos: string[] = [];
  gruposData: GruposData = {};

  constructor(private getTableService: GetTableSTService) {}
  ngOnInit() {
    this.onFilterChange();
  }
  onFilterChange() {
    // Llama al servicio para obtener los grupos
    this.getTableService.getGrupos().subscribe({
        next: (response) => {
            if (response && response.data) {
                this.gruposData = response.data;
            }
        },
        error: (error) => {
            console.error('Error al obtener los grupos:', error);
        }
    });
  }
      // Agregar esta propiedad para usar Object en el template
      Object = Object;
}
