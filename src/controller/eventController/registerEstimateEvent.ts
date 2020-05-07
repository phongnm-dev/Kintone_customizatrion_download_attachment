import {RecordUtil, TextUltil} from '../../utils';
import {MESSAGE} from '../../constants';
import getSelectedFiles from '../../utils/getSelectedFiles';
import {FileSelectComponent, EstimateComponent, AttachmentField} from '../../types';

type Params = {
  fileSelectComponent: FileSelectComponent;
  estimateComponent: EstimateComponent;
  attachmentFields: AttachmentField[];
}

function registerEstimateEvent(params: Params) {
  const fileSelectContent = params.fileSelectComponent.content;
  const estimateContent = params.estimateComponent.content;
  const estimateTitle = estimateContent.title;
  const fileSizeLabel = estimateContent.fileSizeLabel;
  const estimateButton = estimateContent.button;

  fileSelectContent.selectAllCheckBox.on('click', () => {
    const selectedFileCount = getSelectedFiles(fileSelectContent.listCheckboxs, params.attachmentFields).length;
    estimateTitle.innerText = TextUltil.getEstimateTitle(selectedFileCount);
  });

  fileSelectContent.listCheckboxs.forEach((field) => {
    field.fieldCheckbox.on('click', () => {
      const selectedFileCount = getSelectedFiles(fileSelectContent.listCheckboxs, params.attachmentFields).length;
      estimateTitle.innerText = TextUltil.getEstimateTitle(selectedFileCount);
    });
    field.fileCheckboxs.forEach((file) => {
      file.on('click', () => {
        const selectedFileCount = getSelectedFiles(fileSelectContent.listCheckboxs, params.attachmentFields).length;
        estimateTitle.innerText = TextUltil.getEstimateTitle(selectedFileCount);
      });
    });
  });

  estimateButton.on('click', () => {
    const selectedFiles = getSelectedFiles(fileSelectContent.listCheckboxs, params.attachmentFields);
    fileSizeLabel.innerText = TextUltil.getFileSizeLabel(RecordUtil.getTotalFileSize(selectedFiles));
  });
}

export default registerEstimateEvent;
