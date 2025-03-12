# Strapi Plugin Media Upload

> A plugin that help you upload media to a specific folder using api in strapi.

---

## Features

- Upload files to a specific folder structure.
- Manage folders and files through API.
- Easy integration with Strapi projects.

## Installation
```bash
npm i strapi-plugin-media-upload
```

## Configuration
After installation, the plugin will be automatically enabled.

## Usage

Upload media files to a specific folder using the provided API endpoints.

### Folders Manager
#### 1.Query Folders
   - `GET /<strapiprefix>/media/folders`
   - Query Params: 
     - parentId (optional): ID of the parent folder, return root folders if not fill.
#### 2.Create Folder
   - `POST /<strapiprefix>/media/folder`
   - Request Body: 
        ```
        {
            "name": "New Folder", // Required, folder name
            "parentId": 1         // Optional, ID of the parent folder
        }
        ```
#### 3.Update Folder
   - `PUT /<strapiprefix>/media/folder`
   - Request Body: 
        ```
        {
            "id": 1,              // Required, ID of the folder to update,
            "name": "New Folder", // Required, folder name
            "parentId": 1         // Optional, new parent folder ID
        }
        ```

### Media Uploader
#### 1.Upload Media
   - `POST /<strapiprefix>/media/upload`
   - Request Body:
     - file (multipart/form-data): The file to upload.
     - folderId (optional): ID of the folder where the file should be uploaded.

## Compatibility

This plugin is compatible with Strapi `5.0.0` and above.

## Issues

If you encounter any issues, please report them [here](https://woa.com/intl/intl_cgi/strapi-plugin-media-upload/issues).

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Author

**Eli Liu**  
Email: [Mr.liu93@outlook.com](mailto:Mr.liu93@outlook.com)  
GitHub: [Littlexiaoxiaojian](https://github.com/Littlexiaoxiaojian)
