const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient =
  BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );

const containerClient =
  blobServiceClient.getContainerClient(
    //process.env.AZURE_STORAGE_CONTAINER
    process.env.AZURE_CONTAINER_NAME
  );

async function uploadImage(fileBuffer, fileName, mimeType) {

  const blobName =
    `${Date.now()}-${fileName}`;

  const blockBlobClient =
    containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: mimeType
    }
  });

  return blockBlobClient.url;
}

module.exports = {
  uploadImage
};



