import {saveAs} from 'file-saver';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

declare const kintone: any;

async function downloadAttachmentFiles(selectedFiles: any[], isCreateSubfolder: boolean, zipName: string) {
  const zip = new JSZip();
  // const zipName = FILE_NAME_FORMAT_TYPE();

  try {
    // create blob url
    for (const [index, file] of selectedFiles.entries()) {
      const blobUrl = await addFileURL(file);
      selectedFiles[index].blobUrl = blobUrl;
    }
    // get binary file's data and zip
    for (const file of selectedFiles) {
      const fileData = await JSZipUtils.getBinaryContent(file.blobUrl);

      if (isCreateSubfolder) {
        const subFolder = zip.folder(file.fieldCode);
        subFolder.file(file.value.name, fileData, {binary: true});
      } else {
        zip.file(file.value.name, fileData, {binary: true});
      }
    }
    // download file
    const zipFile = await zip.generateAsync({type: 'blob'});
    await saveAs(zipFile, zipName);
  } catch (error) {
    alert(error);
  }
}

// Get blob url
function addFileURL(file) {
  return new kintone.Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const params = {
      'fileKey': file.value.fileKey
    };
    const url = kintone.api.urlForGet('/k/v1/file', params, false);
    xhr.open('GET', url, true); // async
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response]);
        const wurl = window.URL || window.webkitURL;
        const blobUrl = wurl.createObjectURL(blob);
        resolve(blobUrl);
      } else {
        reject(JSON.parse(xhr.response));
      }
    };
    xhr.send();
  });
}

export default {downloadAttachmentFiles};
