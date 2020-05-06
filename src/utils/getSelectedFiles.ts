function getSelectedFiles(listCheckboxs, attachmentFields) {
  const selectedFiles: Array<{ fieldCode: any; value: any }> = [];
  listCheckboxs.forEach((field, fieldIndex) => {
    field.fileCheckboxs.forEach((file, fileIndex) => {
      if (file.getChecked()) {
        selectedFiles.push({
          fieldCode: attachmentFields[fieldIndex].fieldCode,
          value: attachmentFields[fieldIndex].value[fileIndex]
        });
      }
    });
  });
  return selectedFiles;
}

export default getSelectedFiles;
