function getAttachmentsFields(record: any) {
  // get attchment fields of record
  const attachmentFields: any[] = [];
  for (const field in record) {
    if (record[field].type === 'FILE') {
      const item = {
        fieldCode: field,
        value: record[field].value
      };
      attachmentFields.push(item);
    }
  }
  return attachmentFields;
}

function getTotalFileSize(fileList: any[]) {
  let totalSize = 0;

  fileList.forEach((file) => {
    totalSize += parseInt(file.value.size, 10);
  });

  let fileSize = '';
  if (totalSize < 999) { // less than 1KB
    fileSize = String(totalSize) + 'B';
  } else if (totalSize < 999999) { // less than 1MB
    fileSize = (totalSize / 1000) + 'K';
  } else if (totalSize < 999999999) { // less than 1GB
    fileSize = (totalSize / 1000) + 'M';
  } else {
    // Limit to 1GB
    fileSize = '>1GB';
  }
  return fileSize;
  // return file size
}

export default {getAttachmentsFields, getTotalFileSize};
