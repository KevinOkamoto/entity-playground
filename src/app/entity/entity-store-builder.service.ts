import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceFactory
} from '@ngrx/data';
import { EntityStore } from './entity-store';

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
