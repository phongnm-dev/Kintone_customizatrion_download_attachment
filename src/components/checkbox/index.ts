type CheckboxProps = {
  defaultChecked?: boolean;
  childs?: Checkbox[];
  parent?: Checkbox;
  value?: string;
}

class Checkbox {
  private label: string;
  private element: HTMLElement;
  private value?: string | boolean;
  private checked: boolean;
  private id: string;
  private childs: Checkbox[];
  private parent?: Checkbox;

  private _onClick?: (params?: any) => void

  constructor(
    label: string,
    id: string,
    params?: CheckboxProps
  ) {
    this.label = label;
    this.checked = params?.defaultChecked === undefined;
    this.value = params?.value;
    this.id = id;
    this.childs = params?.childs ? params?.childs : [];
    this.parent = params?.parent;
    this.element = document.createElement('div');
    this._render();
  }


  private _render() {
    this.element.className = 'kintoneplugin-input-checkbox';
    this.element.innerHTML = `
      <span class="kintoneplugin-input-checkbox-item">
        <input
          id="${this.id}"
          type="checkbox"
          checked="${this.checked ? 'checked' : ''}"
          value="${this.value}"
        />
        <label for="${this.id}">${this.label}</label>
      </span>
    `;
    const input = this.element.querySelector('input');
    if (input) {
      input.onchange = (e) => {
        this.checked = (e.target as HTMLInputElement).checked;
      };
    }
    const label = this.element.querySelector(`#${this.id}`);
    if (label) {
      label.addEventListener('click', () => {
        setTimeout(() => {
          this.propChecked(this.checked);
        }, 0);
      });
    }
  }

  render() {
    return this.element;
  }

  private _setChecked(checked: boolean): void {
    const input = this.element.querySelector('input');
    if (input) {
      this.checked = checked;
      input.checked = checked;
      input.dispatchEvent(new Event('change'));
    }
  }

  getChecked() {
    return this.checked;
  }

  addChild(child: Checkbox) {
    this.childs.push(child);
    child._setParent(this);
  }

  private _setParent(parent: Checkbox) {
    this.parent = parent;
  }

  propDown() {
    this.childs.forEach((child) => {
      child._setChecked(this.checked);
      child.propDown();
    });
  }

  propUP(type: boolean) {
    if (this.parent) {
      if (type) this.parent.checkChilds();
      else {
        this.parent._setChecked(false);
        this.parent.propUP(false);
      }
    }
  }

  private checkChilds() {
    let checked = true;
    this.childs.forEach((child) => {
      if (!child.getChecked()) checked = false;
    });
    if (this.checked !== checked) {
      this._setChecked(checked);
      this.propUP(checked);
    }
  }

  propChecked(checked: boolean) {
    const input = this.element.querySelector('input');
    if (input) {
      this.checked = checked;
      input.checked = checked;
      this.propUP(checked);
      this.propDown();
    }
    this._onClick && this._onClick(checked);
  }

  on(eventName: string, callback: (params?: any) => void) {
    if (eventName === 'click') {
      this._onClick = callback;
      return;
    }
    this.element.addEventListener(eventName, (e: Event)=>{
      callback(e);
    });
  }
}

export default Checkbox;