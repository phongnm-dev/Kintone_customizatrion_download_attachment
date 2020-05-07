function getPopupTitle(appName: string, recordId: number) {
  const title = `Download attachments for record ${recordId} in app ${appName}`;
  return title;
}

function getEstimateTitle(fileCount: string | number) {
  const title = `
    ${fileCount} files will be added to a compressed zip file for download.
    Your browser or network may have download file size or type limitations.
    Estimate compressed file size?
  `;
  return title;
}

function getFileSizeLabel(fileSize: string | number) {
  const label = `File size: ${fileSize}`;
  return label;
}

function getBlankFieldNotFoundMessage(fieldId: string) {
  const message = `Download attachment plugin: Blank field #${fieldId} was not found`;
  return message;
}

export default {getFileSizeLabel, getEstimateTitle, getPopupTitle, getBlankFieldNotFoundMessage};
