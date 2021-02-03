export const ENTITY_MODEL = Symbol('ENTITY_MODEL');

export interface EntityModelConfig {
  plural?: string;
}

export function EntityModel(config?: EntityModelConfig): (target) => void {
  return (target): void => {
    if (config) {
      Reflect.defineMetadata(ENTITY_MODEL, config, target);
    }
  };
}
