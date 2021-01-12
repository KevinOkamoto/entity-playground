import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityService, EntityServiceBuilderService } from 'src/app/service/entity-builder.service';
import { Requisition } from '../../model/requisition.model';
import { RequisitionService } from '../../service/requisition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  service: EntityService<Requisition>;

  requisitions$: Observable<Requisition[]>;

  constructor(private eb: EntityServiceBuilderService ) {
    this.service = this.eb.create<Requisition>('Requisition');
    this.requisitions$ = this.service.connect();
  }

  ngOnInit(): void {
    this.getRequisitions();
  }

  getRequisitions(): void {
    this.service.getAll();
  }

}
