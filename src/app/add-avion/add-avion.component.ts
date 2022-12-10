import { Company } from './../model/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AvionService } from './../avion.service';
import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion.model';

@Component({
  selector: 'app-add-avion',
  templateUrl: './add-avion.component.html',
  styleUrls: ['./add-avion.component.css']
})
export class AddAvionComponent implements OnInit {
  newAvion = new Avion();
  company!: Company[];
  newIdCom!: number;
  constructor(private avionService: AvionService, private activatedRoute: ActivatedRoute,private Router: Router,) { }

  ngOnInit(): void {
    this.avionService.listeCompany().
    subscribe(cats => {this.company = cats;
      console.log(cats);
    }
    );
    }
  addAvion() {
    this.newAvion.company = this.company.find(com => com.idCom == this.newIdCom)!;
    this.avionService.ajouterAvion(this.newAvion)
      .subscribe(av => {
        console.log(av);
        this.Router.navigate(['avions']);
      });
  }

}
