import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requisition } from '../model/requisition.model';

export interface EntityChange<T> {
  target: T;
  prop: string;
  value: any;
}

@Injectable({ providedIn: 'root' })
export class RequisitionService  extends EntityCollectionServiceBase<Requisition> {

  public entityChange$: Subject<EntityChange<Requisition>> = new Subject();

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Requisition', serviceElementsFactory);
  }

  connectById(id: string): Observable<Requisition> {
    return this.collection$.pipe(
      map(collection => {
        if (collection.entities[id]) {
          const target = Object.assign({}, collection.entities[id]);
          return new Proxy(target, this._createProxyHandler());
        }
        return null;
      }),
    );
  }

  save(req: Requisition): void {
    this.update(req);
  }

  private _createProxyHandler(): any {
    const handler = {
      set: (target, prop, value): boolean => {
        this._triggerHooks(target, prop, value);
        target[prop] = value;
        return true;
      }
    };
    return handler;
  }

  private _triggerHooks(target: Requisition, prop: string, value: any): void {
    this._log(prop, value);
    // broadcast an entity change event
    this.entityChange$.next({ target, prop, value});
  }

  private _log(prop: string, value: any): void {
    console.log('Setting property "' + prop + '" to "' + value + '"');
  }

}
