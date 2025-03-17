import type { Core } from '@strapi/strapi';
import { yup } from '@strapi/utils';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('media')
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
      ctx.status = 500;
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
        populate: {
          children: {
            count: true,
          },
          files: {
            count: true,
          },
        },
      });
      ctx.body = folders;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // get folder by id
  async getFolder(ctx) {
    // Define validation schema for folder ID
    const folderIdSchema = yup.object({
      id: yup
        .number()
        .required('Folder ID is required')
        .positive('Folder ID must be a positive number'),
    });

    try {
      // Validate query parameters
      await folderIdSchema.validate(ctx.request.query);
      const folderId = ctx.request.query.id;
      const folderService = strapi.plugins.upload.services.folder;
      const folder = await strapi.query('plugin::upload.folder').findOne({
        where: { id: folderId },
        populate: {
          parent: true,
          children: {
            count: true,
          },
          files: {
            count: true,
          },
        },
      });
      ctx.body = folder;
    } catch (err) {
      ctx.status = 500;
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
      ctx.status = 500;
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
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // update media
  async updateMedia(ctx) {
    try {
      // get file info
      const fileId = ctx.request.body.id;
      const name = ctx.request.body.name;
      const alternativeText = ctx.request.body.alternativeText;
      const caption = ctx.request.body.caption;
      const folderId = ctx.request.body.folderId;

      // update file using the upload plugin
      const updatedFile = await strapi.plugins.upload.services.upload.updateFileInfo(fileId, {
        name: name,
        alternativeText: alternativeText,
        caption: caption,
        folder: folderId,
      });
      console.log('Uploaded file:', updatedFile);

      // send response
      ctx.status = 200;
      ctx.body = {
        data: updatedFile,
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // delete folder
  async deleteFolder(ctx) {
    try {
      // get folder id
      const folderId = ctx.request.query.id;
      console.log('Folder ids:', folderId);

      // delete folder
      const folderService = strapi.plugins.upload.services.folder;
      const deletedFolders = await folderService.deleteByIds(folderId);

      // send response
      ctx.status = 200;
      ctx.body = deletedFolders;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // get folder structure
  async getFolderStructure(ctx) {
    try {
      // get folder structure
      const folderService = strapi.plugins.upload.services.folder;
      const folders = await folderService.getStructure();

      // send response
      ctx.status = 200;
      ctx.body = folders;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },
});

export default controller;
