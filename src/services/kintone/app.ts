declare const kintone: any;

async function detail() {
  return kintone.api(kintone.api.url('/k/v1/app', true), 'GET', {
    id: getId()
  });
}

function getId() {
  return kintone.app.getId();
}

export default {detail, getId};
