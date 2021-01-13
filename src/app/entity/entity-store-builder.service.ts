import { Injectable } from '@angular/core';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory
} from '@ngrx/data';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EntityChange<T> {
  target: T;
  prop: string;
  value: any;
}

export class EntityStore<T> {

  public entityChange$: Subject<EntityChange<T>> = new Subject();

  constructor(
    private service: EntityCollectionService<T>,
  ) { }

  connect(): Observable<T[]> {
    return this.service.entities$;
  }

  connectById(id: string): Observable<T> {
    return this.service.collection$.pipe(
      map(collection => {
        if (collection.entities[id]) {
          const target = Object.assign({}, collection.entities[id]);
          return new Proxy(target, this._createProxyHandler());
        }
        return null;
      }),
    );
  }

  save(obj: T): void {
    this.service.update(obj);
  }

  getAll(): void {
    this.service.getAll();
  }

  getByKey(key: string): void {
    this.service.getByKey(key);
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

  private _triggerHooks(target: T, prop: string, value: any): void {
    this._log(prop, value);
    // broadcast an entity change event
    this.entityChange$.next({ target, prop, value});
  }

  private _log(prop: string, value: any): void {
    console.log('Setting property "' + prop + '" to "' + value + '"');
  }

}

@Injectable({ providedIn: 'root' })
export class EntityStoreBuilderService {

  constructor(
    private ef: EntityCollectionServiceFactory,
  ) {}

  create<T>(name: string): EntityStore<T> {
    const es = this.ef.create<T>(name);
    return new EntityStore<T>(es);
  }
}
