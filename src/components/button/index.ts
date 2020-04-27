type ButtonProps = {
  type?: 'normal' | 'dialog-ok' | 'dialog-cancel';
  isDisabled?: boolean;
}

class Button {
  private label: string;
  private element: HTMLElement;
  private isDisabled?: boolean;
  private type: 'normal' | 'dialog-ok' | 'dialog-cancel';
  private _onClick?: (params?: any) => void

  constructor(
    label: string,
    params?: ButtonProps
  ) {
    this.label = label;
    this.isDisabled = params?.isDisabled;
    this.type = params?.type ? params.type : 'normal';
    this.element = document.createElement('button');
    this._render();
  }


  private _render() {
    if (this.isDisabled) {
      this.element.className = 'kintoneplugin-button-disabled';
    } else {
      this.element.className = `kintoneplugin-button-${this.type}`;
    }
    this.element.innerText = this.label;
    this.element.onclick = (e) => {
      this._onClick && this._onClick(e);
    };
  }

  render() {
    return this.element;
  }

  setDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    if (this.isDisabled) {
      this.element.className = 'kintoneplugin-button-disabled';
    } else {
      this.element.className = `kintoneplugin-button-${this.type}`;
    }
  }

  on(eventName: string, callback: (params?: any) => void) {
    if (eventName === 'click') {
      this._onClick = callback;
      return;
    }
    this.element.addEventListener(eventName, (e: Event)=>{
      if (this.isDisabled) return;
      callback(e);
    });
  }
}

export default Button;