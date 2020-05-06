import {FieldCheckboxs} from '../../types';
import {Checkbox} from '../../components';

type Params = {
  selectAllCheckBox: Checkbox;
  listCheckboxs: FieldCheckboxs[];
}

function registerCheckboxRelation(params: Params) {
  params.listCheckboxs.forEach(field => {
    params.selectAllCheckBox.addChild(field.fieldCheckbox);
    field.fileCheckboxs.forEach(fileCheckbox => {
      field.fieldCheckbox.addChild(fileCheckbox);
    });
  });
}

export default registerCheckboxRelation;
