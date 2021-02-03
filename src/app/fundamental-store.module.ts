import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { DefaultDataServiceConfig, EntityDataModule, EntityDataModuleConfig, EntityMetadataMap, HttpUrlGenerator } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { ENTITY_MODEL } from './fundamental-store.decorators';

export class EntityModelBase { }

export type Class<T>  = new(...args: any[]) => T;

export interface FundamentalEntityModelMap {
  [index: string]: Class<EntityModelBase>;
}

export interface FundamentalStoreConfig {
  serviceRoot: string;
  serviceTimeout?: number;
  entities: FundamentalEntityModelMap;
}
export const ENTITY_MODEL_MAP = new InjectionToken<FundamentalEntityModelMap>('ENTITY MODEL MAP');


function _createEntityDataConfig(conf: FundamentalStoreConfig): EntityDataModuleConfig {
  const entityMetadata: EntityMetadataMap = {};
  const pluralNames: any = {};
  for (const entity in conf.entities) {
    if (conf.entities.hasOwnProperty(entity)) {
      entityMetadata[entity] = {};
      const props = Reflect.getMetadata(ENTITY_MODEL, conf.entities[entity]);
      if (props && props.plural) {
        pluralNames[entity] = props.plural;
      }
    }
  }
  console.log('PLURALS', pluralNames)
  return { entityMetadata, pluralNames };
}

@NgModule({
  imports: [
    EntityDataModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ]
})
export class FundamentalStoreModule {
  static forRoot(conf: FundamentalStoreConfig): ModuleWithProviders<FundamentalStoreModule> {

    // configure ngrx EntityDataModule
    const entityDataModuleConfig = _createEntityDataConfig(conf);
    const entityDataModule = EntityDataModule.forRoot(entityDataModuleConfig);
    const defaultDataServiceConfig: DefaultDataServiceConfig = {
      root: conf.serviceRoot,
      timeout: conf.serviceTimeout || 3000,
    };

    const providers = [
      ...entityDataModule.providers,
      { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
      { provide: ENTITY_MODEL_MAP, useValue: conf.entities },
    ];
    const module = {
      ngModule: FundamentalStoreModule,
      providers,
    };
    return module;
  }

}
