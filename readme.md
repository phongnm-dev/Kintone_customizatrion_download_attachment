Kintone Customization - Download record's attachment
====

Written in TypeScript
## How to build
### Requirement
```
* Node.js
* Git
```
```
$ git clone https://github.com/phongnm-dev/Kintone_practice_2.git
$ cd Kintone_customizatrion_download_attachment
$ npm install
$ npm run build
```
Output
```
./dist/Kintone_customization_downloadAttachment.min.css
./dist/Kintone_customization_downloadAttachment.min.js
```
## Usage:

```console
$ kintone-plugin-packer [OPTIONS] PLUGIN_DIR
```
After build,
- Upload dist/Kintone_customization_downloadAttachment.min.css & dist/Kintone_customization_downloadAttachment.min.js to Kintone app - JavaScript and CSS Customization.
- Add blank field to your Kintone Application and specify blank field ID in ./src/config/index.ts
- Click on button render in blank space to open download popup.
- Select file and click download button.
related document: [Kintone customization css and javascript](https://get.kintone.help/k/en/user/app_settings/js_customize.html)

## Config:
./src/config/index.ts
| Name | Type | Description |
| ------------- |:-------------:| -----:|
| SPECIFIC_TEXT | String | Text to include in file name.|
| SEPARATOR_CHARACTER  | String | Separator character for file name, value must be one of allowed values:<br/>[-, =, +, $,_]<br/>Default:  -|
| FILE_NAME_FORMAT_TYPE | Interger | Options for file name format with mapping</br>value: format:</br>1: [AppID] + [Record ID] + [Config-1] + [current datetime]</br>2: [Record ID] + [Config-1] + [current datetime]</br>3: [Config-1] + [current datetime]</br>Default: 1. [AppID] + [Record ID] + [Config-1] + [current datetime]

## License:
MIT Licence
