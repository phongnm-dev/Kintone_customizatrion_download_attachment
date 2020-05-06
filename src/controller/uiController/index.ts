import handleDownloadButton from './handleDownloadButton';
import handleDownloadPopup from './handleDownloadPopup';
import {AttachmentField} from '../../types';

type Params = {
  attachmentFields: AttachmentField[];
  appName: string;
  recordNumber: number;
  blankFieldElement: HTMLElement;
}

function uiController(params: Params) {
  const downloadPopup = handleDownloadPopup({
    attachmentFields: params.attachmentFields,
    appName: params.appName,
    recordNumber: params.recordNumber
  });
  const downloadButton = handleDownloadButton(params.blankFieldElement);
  document.body.appendChild(downloadPopup.element.render());
  return {
    downloadPopup,
    downloadButton
  };
}
export default uiController;
