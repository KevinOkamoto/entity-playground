import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Requisition } from '../model/requisition.model';

@Injectable({ providedIn: 'root' })
export class RequisitionService  extends EntityCollectionServiceBase<Requisition> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Requisition', serviceElementsFactory);
    this.initializeStore();
  }

  private initializeStore(): void {
    this.addManyToCache([{
      id: 'PR_001',
      title: 'First Requisition',
      status: 'draft',
      total: 10,
    }, {
      id: 'PR_002',
      title: 'Second Requisition',
      status: 'draft',
      total: 42,
    }]);

  }
}
