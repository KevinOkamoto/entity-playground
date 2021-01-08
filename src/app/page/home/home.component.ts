import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisition } from '../../model/requisition.model';
import { RequisitionService } from '../../service/requisition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  requisitions$: Observable<Requisition[]>;

  constructor(private requisitionService: RequisitionService ) {
    this.requisitions$ = requisitionService.entities$;
  }

  ngOnInit(): void {
    this.getRequisitions();
  }

  getRequisitions(): void {
    this.requisitionService.getAll();
  }

}
