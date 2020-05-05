import {Collapse, Checkbox} from '../../../components';
import {Message} from '../../../ultil';

type FieldCheckboxs = {
  fieldCode: string;
  fieldCheckbox: Checkbox;
  fileCheckboxs: Checkbox[];
}
type Params = {
  listCheckboxs: FieldCheckboxs[];
  selectAllCheckBox: Checkbox;
}

function handleFileSelectContent(attachmentFields) {
  const element = document.createElement('div');
  const listCheckboxs: FieldCheckboxs[] = [];
  const selectAllCheckBox = new Checkbox(Message.selectAllFields, 'downloadAttachments_selectAllFields');

  // create list checkbox for each field
  attachmentFields.forEach((field: any, index: number) => {
    const fieldCheckboxs = createFieldCheckboxList(field, index);
    listCheckboxs.push(fieldCheckboxs);
  });

  element.appendChild(selectAllCheckBox.render());
  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('downloadAttachment__fieldsContainer');
  // render field collapse
  listCheckboxs.forEach((field: FieldCheckboxs, index: number) => {
    const fieldCollapse = createFieldCollapse(field, index);
    fieldWrapper.appendChild(fieldCollapse.render());
  });

  return {
    element,
    content: {
      selectAllCheckBox,
      listCheckboxs
    }
  };
}

function createFieldCheckboxList(field, index) {
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
  return fieldCheckboxs;
}

function createFieldCollapse(field: FieldCheckboxs, index: number) {
  // field collapse
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

export default handleFileSelectContent;