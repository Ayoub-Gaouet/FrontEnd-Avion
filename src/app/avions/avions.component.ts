import { Company } from './../model/company.model';
import { Component, OnInit } from '@angular/core';
import { AvionService } from '../avion.service';
import { Avion } from '../model/avion.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {
  avions!: Avion[];
  company!:Company[];
  constructor(private avionService: AvionService,public authService: AuthService) {
  }

  ngOnInit(): void {
    this.chargerAvions();
  }

  chargerAvions() {
    this.avionService.listeAvions().subscribe(av => {
      console.log(av);
      this.avions = av;
    }
    );
  }
  supprimerAvion(a: Avion) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.avionService.supprimerAvion(a.idAvions!).subscribe(() => {
        console.log("avion supprimé");
        this.chargerAvions();
      });
  }
}