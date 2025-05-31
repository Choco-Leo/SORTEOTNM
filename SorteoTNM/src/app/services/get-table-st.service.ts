import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTableSTService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  //PIDE TODOS LOS GRUPOS DEPENDIENDO DEL FILTRO
  getGrupos(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, {});
  }
  //ENVIA EL GRUPO A REGISTRAR Y ACTUALIZA LA TABLA
  registrarGrupo(formData: any) {
    return this.http.post<any>(`${this.baseUrl}registerGrupoST`, formData, {
      withCredentials: true
    });
  }
  //PIDE LOS GRUPOS PARA EDITARLOS POR ID DEPENDIENDO DEL FILTRO SELECCIONADO
  getGruposID(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}edit-GruposST`, {}, {
      withCredentials: true
    });
  }
  //ELIMINA EL GRUPO DE LA BASE DE DATOS
  deleteGruposID(id: string) {
    const options = {
      withCredentials: true
    };
    return this.http.delete<any>(`${this.baseUrl}edit-GruposST/${id}`, options);
  }
  //ACTUALIZA EL GRUPO DE LA BASE DE DATOS
  putGruposID(formData: any){
    return this.http.put<any>(`${this.baseUrl}edit-GruposST`, formData, {
      withCredentials: true
    })
  }
}
