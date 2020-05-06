const MESSAGE = {
  downloadButton: 'Download Attachments',
  selectAllFields: 'Select all fields',
  selectField: 'Select field',
  estimateLabel: 'Estimate',
  cancel: 'Cancel',
  download: 'Download',
  noAttachmentField: 'No attachment fields found in record.',
  isCreateSubfolder: 'Create subfolder for each attachment field?',
  popupTitle: (appName: string, recordId: number) => `Download attachments for record ${recordId} 
    in app ${appName}`,
  estimateTitle: (fileCount: string | number) => `${fileCount} files will be added to a compressed zip file for download.
  Your browser or network may have download file size or type limitations.
  Estimate compressed file size?`,
  fileSize: (fileSize: string | number) => `File size: ${fileSize}`
};

export default MESSAGE;
