import registerCheckboxRelation from './registerCheckboxRelation';
import registerTooglePopup from './registerTooglePopupEvent';
import registerEstimateEvent from './registerEstimateEvent';
import registerDownloadEvent from './registerDownloadEvent';
import {UI, AttachmentField} from '../../types';
import {formatZipName} from '../../utils';

function registerEventController(ui: UI, attachmentFields: AttachmentField[], recordNumber: number) {
  const popupBody = ui.downloadPopup.content.popupBody;
  const popupFooter = ui.downloadPopup.content.popupFooter;
  const fileSelectComponent = popupBody.content.fileSelectComponent;
  const estimateComponent = popupBody.content.estimateComponent;

  registerTooglePopup({
    openButton: ui.downloadButton,
    closeButton: popupFooter.content.cancelButton,
    popup: ui.downloadPopup.element
  });

  registerCheckboxRelation(fileSelectComponent.content);

  registerEstimateEvent({
    fileSelectComponent,
    estimateComponent,
    attachmentFields
  });

  registerDownloadEvent({
    saveButton: popupFooter.content.saveButton,
    subfolderCheckBox: estimateComponent.content.subfolderCheckBox,
    listCheckboxs: fileSelectComponent.content.listCheckboxs,
    attachmentFields: attachmentFields,
    zipName: formatZipName(recordNumber)
  });
}

export default registerEventController;
