import handleEstimateComponent from './handleEstimateComponent';
import handleFileSelectComponent from './handleFileSelectComponent';
import {PopupBody, NoAttachmentPopupBody} from '../../../../types';
import {MESSAGE} from '../../../../constants';

function handleNoAttachmentField() {
  const popupBodyWrapper = document.createElement('div');
  const popupNoAttachmentLabel = document.createElement('p');
  popupNoAttachmentLabel.innerText = MESSAGE.NO_ATTACHMENT_FIELD;
  popupBodyWrapper.appendChild(popupNoAttachmentLabel);
  return {
    wrapper: popupBodyWrapper,
    content: {
      label: popupNoAttachmentLabel
    },
  };
}

function handlePopupBody(attachmentFields): PopupBody | NoAttachmentPopupBody {
  if (attachmentFields.length === 0) {
    const popupBody = handleNoAttachmentField();
    return popupBody;
  }

  const popupBodyWrapper = document.createElement('div');
  let fileCount = 0;
  attachmentFields.forEach((field) => {
    fileCount += field.value.length;
  });
  const estimateComponent = handleEstimateComponent(fileCount);
  const fileSelectComponent = handleFileSelectComponent(attachmentFields);
  popupBodyWrapper.appendChild(fileSelectComponent.wrapper);
  popupBodyWrapper.appendChild(estimateComponent.element);
  return {
    wrapper: popupBodyWrapper,
    content: {
      fileSelectComponent,
      estimateComponent,
    },
  };
}

export default handlePopupBody;