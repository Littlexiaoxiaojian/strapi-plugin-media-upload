import type { Core } from '@strapi/strapi';
import { yup } from '@strapi/utils';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-media-upload')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },

  // create a folder
  async createFolder(ctx) {
    const folderNameSchema = yup.object({
      name: yup.string().required('Name is required').min(1, 'Name cannot be empty'),
    });

    try {
      // get folder name from the request body
      await folderNameSchema.validate(ctx.request.body);
      const folderName = ctx.request.body.name;
      const parentId = ctx.request.body.parentId ?? null;

      // get folder service
      const folderService = strapi.plugins.upload.services.folder;
      const folder = await folderService.create({
        name: folderName,
        parent: parentId,
      });
      ctx.body = folder;
    } catch (err) {
      ctx.body = err;
    }
  },

  // get folders
  async getFolders(ctx) {
    try {
      const parentId = ctx.request.query.parentId ?? null;
      const folders = await strapi.query('plugin::upload.folder').findMany({
        where: {
          parent: parentId,
        },
      });
      ctx.body = folders;
    } catch (err) {
      ctx.body = err;
    }
  },

  // update folder name
  async updateFolder(ctx) {
    const updateFolderSchema = yup.object({
      id: yup.number().required('Id is required'),
      name: yup.string().required('Name is required').min(1, 'Name cannot be empty'),
      parentId: yup.number(),
    });

    try {
      // get folder id and name from the request body
      await updateFolderSchema.validate(ctx.request.body);
      const folderId = ctx.request.body.id;
      const folderName = ctx.request.body.name;
      const parentId = ctx.request.body.parentId ?? null;

      // check if folder exists
      const existingFolder = await strapi.query('plugin::upload.folder').findOne({
        where: { id: folderId },
      });
      if (!existingFolder) {
        ctx.status = 404;
        ctx.body = { error: 'Folder not found' };
        return;
      }

      // get or create api user
      let apiUser = await strapi.query('admin::user').findOne({ where: { username: 'API USER' } });
      if (apiUser === null) {
        apiUser = await strapi.query('admin::user').create({
          data: {
            username: 'API USER',
            isActive: 1,
            roles: ['1'],
          },
        });
      }

      // update folder
      const folderService = strapi.plugins.upload.services.folder;
      const folder = await folderService.update(
        folderId,
        {
          name: folderName,
          parent: parentId,
        },
        {
          user: {
            id: apiUser.id,
          },
        }
      );
      ctx.body = folder;
    } catch (err) {
      ctx.body = err;
    }
  },

  // upload media to a specific folder
  async uploadMedia(ctx) {
    try {
      // get files
      const { files } = ctx.request;
      const folderId = ctx.request.body.folderId;

      // name of input (key)
      const file = files['file'];

      // create image using the upload plugin
      const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
        data: {
          fileInfo: {
            name: file['originalFilename'],
            folder: folderId,
          },
        },
        files: file,
      });
      console.log('Uploaded file:', uploadedFiles);

      // send response
      ctx.status = 200;
      ctx.body = {
        data: uploadedFiles,
      };
    } catch (err) {
      ctx.body = err;
    }
  },
});

export default controller;
