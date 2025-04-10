export default [
  {
    method: 'GET',
    path: '/pluginInfo',
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/folder',
    handler: 'controller.createFolder',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/folders',
    handler: 'controller.getFolders',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/folder',
    handler: 'controller.getFolder',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/folder',
    handler: 'controller.updateFolder',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/upload',
    handler: 'controller.uploadMedia',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/update',
    handler: 'controller.updateMedia',
    config: {
      policies: [],
    },
  },
  {
    method: 'DELETE',
    path: '/folder',
    handler: 'controller.deleteFolder',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/folder-structure',
    handler: 'controller.getFolderStructure',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/bulk-delete',
    handler: 'controller.bulkDelete',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/bulk-move',
    handler: 'controller.bulkMove',
    config: {
      policies: [],
    },
  },
];
