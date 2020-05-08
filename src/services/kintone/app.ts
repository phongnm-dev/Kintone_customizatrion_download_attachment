declare const kintone: any;

function getId() {
  return kintone.app.getId();
}

async function getDetail() {
  return kintone.api(kintone.api.url('/k/v1/app', true), 'GET', {
    id: getId()
  });
}

function getFormFields() {
  const body = {
    app: getId()
  };
  return kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', body);
}

export default {getDetail, getId, getFormFields};
