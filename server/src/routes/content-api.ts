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
];
