

// Gestionemos (userS3VigproTramite)


// export async function uploadFile(myUrl, myKey, file) {
// export async function uploadFile(myUrl, data) {
//   try {
//     const myBucket = `${API.url_bucket_upload}/${myUrl}`;
//     const paramsAWS = {
//       Bucket: myBucket,
//       Key: data.name_archivo,
//       ACL: 'public-read',
//       // ContentType: data.file.type === 'application/pdf' ? 'application/pdf' : 'image/jpeg',
//       ContentType: data.file.type,
//       // ContentEncoding: 'base64',
//       Body: data.file,
//     };
//     // const insertImage = await s3.putObject(paramsAWS).promise();
//     return insertImage;
//   } catch (error) {
//     return false;
//   }
// }
// export async function deleteFile(myUrl, name) {
//   try {
//     const myBucket = `${API.url_bucket_upload}/${myUrl}`;
//     const paramsAWS = {
//       Bucket: myBucket,
//       Key: name,
//     };
//     const deleteImage = await s3.deleteObject(paramsAWS).promise();
//     return deleteImage;
//   } catch (error) {
//     return false;
//   }
// }
// export async function deleteFolder(myKey) {
  // try {
  //     const myBucket = `${API.url_bucket_upload}/${myUrl}`;
  //     const paramsAWS = {
  //         Bucket: myBucket,
  //         Key: myKey,
  //         // Prefix: myKey,
  //     }
  //     // -------------------------
  //     const listedObjects = await s3.listObjects(paramsAWS).promise();
  //     if (listedObjects.Contents.length === 0) return;
  //     const deleteParams = {
  //         Bucket: myBucket,
  //         Delete: { Objects: [] }
  //     };
  //     listedObjects.Contents.forEach(({ content }) => {
  //         deleteParams.Delete.Objects.push({ Key: content.Key });
  //     });
  //     const deleteImage = await s3.deleteObjects(deleteParams).promise();
  //     return deleteImage;
  //     // ----------------------
  // } catch (error) {
  //     return false
  // }
// }
