import handleEstimateComponent from './handleEstimateComponent';
import handleFileSelectComponent from './handleFileSelectComponent';

function handlePopupBody(attachmentFields) {
  let fileCount = 0;
  attachmentFields.forEach((field) => {
    fileCount += field.value.length;
  });
  const estimateComponent = handleEstimateComponent(fileCount);
  const fileSelectComponent = handleFileSelectComponent(attachmentFields);
  const popupBody = document.createElement('div');
  popupBody.appendChild(fileSelectComponent.wrapper);
  popupBody.appendChild(estimateComponent.element);
  return {
    wrapper: popupBody,
    content: {
      fileSelectComponent,
      estimateComponent
    }
  };
}

export default handlePopupBody;