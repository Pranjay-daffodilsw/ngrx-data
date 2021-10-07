import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    }
  },
};

// const pluralNames = { Post: 'Posts' };

// export const entityConfig: EntityDataModuleConfig = {
//   entityMetadata,
//   pluralNames
// };
