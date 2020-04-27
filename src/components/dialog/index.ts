import './style.css';

class Dialog {
  private header: string;
  private element: HTMLElement;
  private isShow: boolean;

  constructor(
    header: string,
    body: HTMLElement,
    footer: HTMLElement,
  ) {
    this.header = header;
    this.element = document.createElement('div');
    this.isShow = false;
    this._render(body, footer);
  }


  private _render(body: HTMLElement, footer: HTMLElement) {
    this.element.classList.add('downloadAttachmentModal');
    this.element.innerHTML = `
      <div class="downloadAttachment__wrapper">
        <div class="downloadAttachment__header">
          <span class="downloadAttachment__close">&times;</span>
          <h2 class="downloadAttachment__title">
            ${this.header}
          </h2>
        </div>
        <div class="downloadAttachment__body">
        </div>
        <div class="downloadAttachment__footer">
        </div>
      </div>
    `;
    const bodyWrapper = this.element.querySelector('.downloadAttachment__body');
    if (bodyWrapper) bodyWrapper.appendChild(body);
    const footerWrapper = this.element.querySelector('.downloadAttachment__footer');
    if (footerWrapper) footerWrapper.appendChild(footer);
    const closeBtn = this.element.querySelector('.downloadAttachment__close') as HTMLElement;
    if (closeBtn) {
      closeBtn.onclick = () => {
        this.setShow(false);
      };
    }
  }

  toogleShow(): void {
    this.isShow = !this.isShow;
    if (this.isShow) this.element.style.display = 'block';
    else this.element.style.display = 'none';
  }

  setShow(isShow: boolean) {
    if (isShow !== this.isShow) {
      this.toogleShow();
    }
  }

  render() {
    return this.element;
  }
}

export default Dialog;