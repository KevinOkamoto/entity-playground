import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityStore, EntityStoreBuilderService } from 'src/app/entity';
import { Requisition } from '../../model/requisition.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  store: EntityStore<Requisition>;

  requisitions$: Observable<Requisition[]>;

  constructor(private eb: EntityStoreBuilderService ) {
    this.store = this.eb.create<Requisition>('Requisition');
    this.requisitions$ = this.store.connect();
  }

  ngOnInit(): void {
    this.getRequisitions();
  }

  getRequisitions(): void {
    this.store.getAll();
  }

}
