import uiUltil from './ultil';

function createPopup(attachmentFields: any) {
  const estimateContent = uiUltil.handleEstimateContent();
  const fileSelectContent = uiUltil.handleFileSelectContent(attachmentFields);
  const popupBody = document.createElement('div');
  const popupTitle = Message.popupTitle(appDetail.name, record.Record_number.value);
  popupBody.appendChild(fileSelectContent.element);
  popupBody.appendChild(estimateContent.element);
  const popupFooter = uiUltil.handlePopupFooter();
  const popup = new Dialog(popupTitle, popupBody, popupFooter);
  return {
    element: popup,
    content: {
      popupBody,
      
    }
  }
}

function createDownloadButton() {

}

function uiController() {
  
}
export default uiController;