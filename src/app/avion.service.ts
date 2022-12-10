import { Company } from './model/company.model';
import { Injectable } from '@angular/core';
import { Avion } from './model/avion.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from './config';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class AvionService {
  apiURLCom:string='http://localhost:8081/avions/com';
  avions! : Avion[];
  avion! : Avion[];
  company! :Company[];
  constructor(private http : HttpClient) {
  }
  
  listeCompany():Observable<Company[]>{
    return this.http.get<Company[]>(apiURL+"/com");
    }
  consulterCompany(id:number): Company{
    return this.company.find(com => com.idCom == id)!;
  }

  listeAvions(): Observable<Avion[]> {
    return this.http.get<Avion[]>(apiURL);
  }
  ajouterAvion(av: Avion): Observable<Avion> {
    return this.http.post<Avion>(apiURL, av, httpOptions);
  }

  supprimerAvion(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterAvion(id: number): Observable<Avion> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Avion>(url);
  }
  updateAvion(prod: Avion): Observable<Avion> {
    return this.http.put<Avion>(apiURL, prod, httpOptions);
  }
  rechercherParCompany(idCom: number):Observable<Avion[]> {
    const url = `${apiURL}/avcom/${idCom}`;
    return this.http.get<Avion[]>(url);
    }
}
