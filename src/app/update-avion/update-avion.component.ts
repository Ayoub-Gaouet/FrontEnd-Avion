import { Component, OnInit } from '@angular/core';
import { AvionService } from '../avion.service';
import { Avion } from '../model/avion.model';
import { ActivatedRoute,Router } from '@angular/router';
import { Company } from '../model/company.model';
@Component({
  selector: 'app-update-avion',
  templateUrl: './update-avion.component.html',
  styles: [
  ]
})
export class UpdateAvionComponent implements OnInit {
  company! : Company[];
  updatedComId! : number;
  currentAvion = new Avion();
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
  private avionService: AvionService) { }
  ngOnInit(): void {
    this.avionService.listeCompany().
    subscribe(cats => {console.log(cats);
    this.company = cats;
    }
    );
    this.avionService.consulterAvion(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentAvion = prod;
    this.updatedComId = this.currentAvion.company.idCom;
    } ) ;
    }
  updateAvion() {
    this.currentAvion.company = this.company.
    find(com => com.idCom == this.updatedComId)!;
    this.avionService.updateAvion(this.currentAvion).subscribe(av => {
    this.router.navigate(['avions']); }
    );
    }
}
