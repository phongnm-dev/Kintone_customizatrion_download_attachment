import {Collapse, Checkbox} from '../../../../components';
import {MESSAGE} from '../../../../constants';
import {FieldCheckboxs, AttachmentField, FileSelectComponent} from '../../../../types';

function createFieldCheckboxList(field: AttachmentField, index: number) {
  const fieldCheckboxs = {} as FieldCheckboxs;
  fieldCheckboxs.fieldCode = field.fieldCode;
  fieldCheckboxs.fieldCheckbox = new Checkbox(MESSAGE.SELECT_FIELD, `downloadAttachments_selectField__${index}`);
  fieldCheckboxs.fileCheckboxs = [];
  field.value.forEach((file: any, fileIndex: number) => {
    const fileCheckbox = new Checkbox(file.name, `downloadAttachments_selectFile_${index}_${fileIndex}`);
    fieldCheckboxs.fileCheckboxs.push(fileCheckbox);
  });
  return fieldCheckboxs;
}

function createFieldCollapse(field: FieldCheckboxs) {
  const fieldCollapse = new Collapse(field.fieldCode);
  const collapseContent = document.createElement('div');
  collapseContent.classList.add('downloadAttachment__field');

  collapseContent.appendChild(field.fieldCheckbox.render());

  field.fileCheckboxs.forEach((fileCheckbox: any) => {
    collapseContent.appendChild(fileCheckbox.render());
  });
  fieldCollapse.setContent(collapseContent);

  return fieldCollapse;
}

function handleFileSelectComponent(attachmentFields: AttachmentField[]) {
  const wrapper = document.createElement('div');
  const listCheckboxs: FieldCheckboxs[] = [];
  const selectAllCheckBox = new Checkbox(MESSAGE.SELECT_ALL_FIELDS, 'downloadAttachments_selectAllFields');

  // create list checkbox for each field
  attachmentFields.forEach((field: any, index: number) => {
    const fieldCheckboxs = createFieldCheckboxList(field, index);
    listCheckboxs.push(fieldCheckboxs);
  });

  wrapper.appendChild(selectAllCheckBox.render());
  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('downloadAttachment__fieldsContainer');
  // render field collapse
  listCheckboxs.forEach((field: FieldCheckboxs, index: number) => {
    const fieldCollapse = createFieldCollapse(field);
    fieldWrapper.appendChild(fieldCollapse.render());
  });
  wrapper.appendChild(fieldWrapper);

  return {
    wrapper,
    content: {
      selectAllCheckBox,
      listCheckboxs
    }
  } as FileSelectComponent;
}

export default handleFileSelectComponent;