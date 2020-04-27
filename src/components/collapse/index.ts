import './style.css'

type CollapseProps = {
  isCollapsed?: boolean;
  content?: HTMLElement;
}

class Collapse {
  private label: string;
  private element: HTMLElement;
  private contentWraper: HTMLElement;
  private isCollapsed: boolean;
  constructor(
    label: string,
    params?: CollapseProps
  ) {
    this.label = label;
    this.element = document.createElement('div');
    this.contentWraper = document.createElement('div');
    this.contentWraper.classList.add('downloadAttachment_collapse__content');
    this.isCollapsed = params?.isCollapsed !== undefined;
    this._render(params?.content);
  }


  private _render(content?: HTMLElement) {
    this.element.classList.add('downloadAttachment_collapse');
    this.element.innerHTML = `
      <a class="downloadAttachment_collapse__expander">
        <span class="downloadAttachment_collapse__arrow"></span>
        ${this.label}
      </a>
    `;
    if (content) {
      this.contentWraper.appendChild(content);
    }
    this.element.appendChild(this.contentWraper);
    const expander = this.element.querySelector('.downloadAttachment_collapse__expander') as HTMLElement;
    if (!this.isCollapsed) {
      this.contentWraper.style.maxHeight = '';
      expander.classList.add('active');
    }
    if (expander) {
      expander.onclick = () => {
        this.setCollapsed(!this.isCollapsed);
      };
    }
  }

  render() {
    return this.element;
  }

  setCollapsed(isCollapsed: boolean): void {
    const expander = this.element.querySelector('.downloadAttachment_collapse__expander');
    if (expander) {
      if (isCollapsed) {
        expander.classList.remove('active');
        this.contentWraper.style.maxHeight = '0px';
      } else {
        expander.classList.add('active');
        this.contentWraper.style.maxHeight = this.contentWraper.scrollHeight + 'px';
      }
    }
    this.isCollapsed = isCollapsed;
  }

  setContent(content: HTMLElement) {
    this.contentWraper.innerHTML = '';
    this.contentWraper.appendChild(content);
    if (!this.isCollapsed) {
      this.contentWraper.style.maxHeight = '100%';
    }
  }
}

export default Collapse;