import { Inject, Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, normalizeRoot, Pluralizer } from "@ngrx/data";
import { ENTITY_MODEL_MAP, FundamentalEntityModelMap } from './fundamental-store.module';

@Injectable()
export class FundamentalStoreUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(
    private myPluralizer: Pluralizer,
    @Inject(ENTITY_MODEL_MAP) private entityModelMap: FundamentalEntityModelMap,
  ) {
    super(myPluralizer);
  }

  protected getResourceUrls(entityName: string, root: string): HttpResourceUrls {
    const entityCls = this.entityModelMap[entityName];

    // get entity model meta data

    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      const nRoot = normalizeRoot(root);
      const url = `${nRoot}/${this.myPluralizer.pluralize(
        entityName
      )}/`.toLowerCase();
      resourceUrls = {
        entityResourceUrl: url,
        collectionResourceUrl: url
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;

  }
}
