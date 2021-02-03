import { EntityModelBase, FundamentalStoreConfig } from './fundamental-store.module';
import { EntityModel } from './fundamental-store.decorators';

@EntityModel({
})
export class Requisition extends EntityModelBase {
}

@EntityModel({
})
export class LineItem extends EntityModelBase {
}

export const storeConfig: FundamentalStoreConfig = {
  serviceRoot: 'http://localhost:3000',
  serviceTimeout: 3000,
  entities: {
    Requisition,
    LineItem,
  },
};
