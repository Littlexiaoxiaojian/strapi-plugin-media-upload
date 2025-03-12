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
    path: '/createFolder',
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
    path: '/updateFolder',
    handler: 'controller.updateFolder',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/uploadMedia',
    handler: 'controller.uploadMedia',
    config: {
      policies: [],
    },
  },
];
