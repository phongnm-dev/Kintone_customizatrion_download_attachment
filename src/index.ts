import {Button, Dialog, Collapse, Checkbox} from './components';
import {RecordUltil, Message, formatZipName} from './ultil';
import Config from './config';
import {Kintone as KintoneService} from './services';

declare const kintone: any;

(function() {
  type FieldCheckboxs = {
    fieldCode: string;
    fieldCheckbox: Checkbox;
    fileCheckboxs: Checkbox[];
  }

  function createButton() {
    const buttonContainer = kintone.app.record.getSpaceElement(Config.BLANK_SPACE_ID);
    if (buttonContainer) {
      const button = new Button(Message.downloadButton);
      buttonContainer.appendChild(button.render());
      return button;
    }
    return null;
  }

  function createPopupBody(selectAllCheckBox: Checkbox, listCheckboxs: FieldCheckboxs[]) {
    const body = document.createElement('div');
    if (listCheckboxs.length) {
      body.appendChild(selectAllCheckBox.render());
      const fieldWrapper = document.createElement('div');
      fieldWrapper.classList.add('downloadAttachment__fieldsContainer');
      // render field select
      listCheckboxs.forEach((field: FieldCheckboxs, index: number) => {
        // field collapse
        const fieldCollapse = new Collapse(field.fieldCode);
        const collapseContent = document.createElement('div');
        collapseContent.classList.add('downloadAttachment__field');

        fieldWrapper.appendChild(fieldCollapse.render());
        collapseContent.appendChild(field.fieldCheckbox.render());

        field.fileCheckboxs.forEach((fileCheckbox: any) => {
          collapseContent.appendChild(fileCheckbox.render());
        });
        fieldCollapse.setContent(collapseContent);
      });
      body.appendChild(fieldWrapper);
    }
    return body;
  }

  function getSelectedFiles(listCheckboxs: FieldCheckboxs[], attachmentFields: any[]) {
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

  function createEstimateContent(listCheckboxs: FieldCheckboxs[], attachmentFields: any[], selectAllCheckBox: Checkbox, subfolderCheckBox: Checkbox) {
    const estimateContent = document.createElement('div');
    estimateContent.classList.add('downloadAttachment__estimate');
    estimateContent.innerHTML = `
      <p id="downloadAttachment_estimateTitle">
        ${Message.estimateTitle(getSelectedFiles(listCheckboxs, attachmentFields).length)}
      </p>
    `;
    const estimateTitle = estimateContent.querySelector('#downloadAttachment_estimateTitle');
    // register estimate event
    listCheckboxs.forEach((field) => {
      if (estimateTitle) {
        selectAllCheckBox.on('click', () => {
          estimateTitle.innerHTML = Message.estimateTitle(getSelectedFiles(listCheckboxs, attachmentFields).length);
        });
        field.fieldCheckbox.on('click', () => {
          estimateTitle.innerHTML = Message.estimateTitle(getSelectedFiles(listCheckboxs, attachmentFields).length);
        });
        field.fileCheckboxs.forEach((file) => {
          file.on('click', () => {
            estimateTitle.innerHTML = Message.estimateTitle(getSelectedFiles(listCheckboxs, attachmentFields).length);
          });
        });
      }
    });

    const estimateButton = new Button(Message.estimateLabel);

    const fileSizeLabel = document.createElement('p');
    fileSizeLabel.classList.add('downloadAttachments_fileSizeLabel');
    estimateButton.on('click', () => {
      const selectedFiles = getSelectedFiles(listCheckboxs, attachmentFields);
      fileSizeLabel.innerHTML = Message.fileSize(RecordUltil.getTotalFileSize(selectedFiles));
    });

    estimateContent.appendChild(estimateButton.render());
    estimateContent.appendChild(fileSizeLabel);
    estimateContent.appendChild(subfolderCheckBox.render());
    return estimateContent;
  }

  kintone.events.on('app.record.detail.show', async (event: any) => {
    const record = event.record;
    // create footer
    const popupFooter = document.createElement('div');
    popupFooter.classList.add('downloadAttachment__actions');

    // create actions button
    const cancelButton = new Button(Message.cancel, {type: 'dialog-cancel'});
    const saveButton = new Button(Message.download, {type: 'dialog-ok'});
    popupFooter.appendChild(cancelButton.render());
    popupFooter.appendChild(saveButton.render());
    const attachmentFields = RecordUltil.getAttachmentsFields(record);

    // create select all field checkbox
    const selectAllCheckBox = new Checkbox(Message.selectAllFields, 'downloadAttachments_selectAllFields');
    // create list checkbox
    const listCheckboxs: FieldCheckboxs[] = [];
    let popupBody: HTMLElement;
    if (!attachmentFields.length) {
      // render UI
      popupBody = document.createElement('p');
      popupBody.innerHTML = Message.noAttachmentField;
      saveButton.setDisabled(true);
    } else {
      attachmentFields.forEach((field: any, index: number) => {
        const fieldCheckboxs = {} as FieldCheckboxs;
        fieldCheckboxs.fieldCode = field.fieldCode;
        // create checkbox for select all file in field
        fieldCheckboxs.fieldCheckbox = new Checkbox(Message.selectField, `downloadAttachments_selectField__${index}`);
        // create checkbox for file
        fieldCheckboxs.fileCheckboxs = [];
        field.value.forEach((file: any, fileIndex: number) => {
          const fileCheckbox = new Checkbox(file.name, `downloadAttachments_selectFile_${index}_${fileIndex}`);
          fieldCheckboxs.fileCheckboxs.push(fileCheckbox);
        });

        listCheckboxs.push(fieldCheckboxs);
      });
      // register checkbox relation
      listCheckboxs.forEach((field) => {
        selectAllCheckBox.addChild(field.fieldCheckbox);
        field.fileCheckboxs.forEach(fileCheckbox => {
          field.fieldCheckbox.addChild(fileCheckbox);
        });
      });

      // render UI
      popupBody = createPopupBody(selectAllCheckBox, listCheckboxs);
      // create estimate
      // create checkbox check use subfolder
      const subfolderCheckBox = new Checkbox(Message.isCreateSubfolder, 'downloadAttachments_isCreateSubFolder');
      const estimateContent = createEstimateContent(listCheckboxs, attachmentFields, selectAllCheckBox, subfolderCheckBox);
      popupBody.appendChild(estimateContent);
      saveButton.on('click', () => {
        const selectedFile = getSelectedFiles(listCheckboxs, attachmentFields);
        const isCreateSubfolder = subfolderCheckBox.getChecked();
        const zipName = formatZipName(record.Record_number.value);
        KintoneService.Record.downloadAttachmentFiles(selectedFile, isCreateSubfolder, zipName);
      });
    }

    // create dialog
    const appDetail = await KintoneService.App.detail();
    const dialog = new Dialog(Message.popupTitle(appDetail.name, record.Record_number.value), popupBody, popupFooter);
    document.body.appendChild(dialog.render());

    // register footer button event
    cancelButton.on('click', () => {
      dialog.setShow(false);
    });

    // create Download button
    const downloadButton = createButton();
    if (downloadButton) {
      downloadButton.on('click', () => {
        dialog.toogleShow();
      });
    }
  });
})();
