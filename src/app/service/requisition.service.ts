import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requisition, RequisitionStatus } from '../model/requisition.model';

@Injectable({ providedIn: 'root' })
export class RequisitionService  extends EntityCollectionServiceBase<Requisition> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Requisition', serviceElementsFactory);
    this.initializeStore();
  }

  connectById(id: string): Observable<RequisitionModel> {
    return this.collection$.pipe(
      map(collection => new RequisitionModel(collection.entities[id], this)),
    );
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

export class ObjectModel<T> {

  constructor(
    protected object: T,
    protected service: EntityCollectionServiceBase<T>,
  ) { }

  save(): void {
    // save model to store -> call ngrx co
    this.service.update(this.object);
  }
}

export class RequisitionModel extends ObjectModel<Requisition> {
  id: string;
  title: string;
  status: RequisitionStatus;
  total: number;

  constructor(
    protected object: Requisition,
    protected service: EntityCollectionServiceBase<Requisition>,
  ) {
    super(object, service);
    this.id = object.id;
    this.title = object.title;
    this.status = object.status;
    this.total = object.total;
  }

}

