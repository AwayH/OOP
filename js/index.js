import * as templates from './templates.js';
import * as utils from './utils.js';

class Employee {
  constructor({ enName, chtName, results, element }) {
    this.enName = enName;
    this.chtName = chtName;
    this.results = results;
    this.element = element;
    this.data = [];
  }

  render() {
    this.element.children[0].textContent = this.chtName;
    this.element.children[1].innerHTML = utils.getGridStr(this.data, templates.card);
  }

  addLoader(parent) {
    const node = document.createElement('div');

    node.classList.add('modal');
    node.innerHTML = templates.loader();
    parent.appendChild(node);
  }

  removeLoader(parent) {
    parent.removeChild(this.element.lastChild);
  }

  async setInit() {
    this.addLoader(this.element);
    this.data = await utils.getData(`https://randomuser.me/api?seed=${this.enName}&results=${this.results}`);
    this.render();
    this.removeLoader(this.element);
  }
}

class EmployeeDesign extends Employee {
  render() {
    this.element.children[0].textContent = this.chtName;
    this.element.children[1].innerHTML = utils.getGridStr(this.data, templates.cardColumn);
  }
}

class EmployeeProject extends Employee {
  constructor({ enName, chtName, results, element, current, size }) {
    super({ enName, chtName, results, element });
    this.current = current - 1;
    this.size = size;
  }

  getBtnsStr = (len, str = '') => {
    for (let i = 0; i < len; i += 1) {
      str += `
        <input
          class="pagination__btn pagination__btn--cancel"
          type="button"
          value="${i + 1}"
          ${i === this.current ? 'disabled' : ''}
        >`;
    }

    return str;
  }

  render() {
    this.element.children[0].textContent = this.chtName;
    this.element.children[1].innerHTML = utils.getGridStr(this.data[this.current], templates.cardColumn2);
    this.element.children[2].innerHTML = this.getBtnsStr(this.data.length);
  }

  getTo2dData = (data, arr = []) => {
    data.forEach((item, i) => {
      if (i % this.size === 0) {
        arr.push([]);
      }
      const index = parseInt(i / this.size, 10);
      arr[index].push(item);
    });

    return arr;
  }

  clickPagination = ({ target }) => {
    const index = parseInt(target.value, 10) - 1;

    if (target.nodeName !== 'INPUT' || this.current === index) return;
    const parent = target.parentNode;
    target.setAttribute('disabled', '');
    parent.children[this.current].removeAttribute('disabled');
    this.current = index;
    parent.previousElementSibling.innerHTML = utils.getGridStr(this.data[this.current], templates.cardColumn2);
  }

  async setInit() {
    super.addLoader(this.element);
    this.data = await utils.getData(`https://randomuser.me/api?seed=${this.enName}&results=${this.results}`);
    this.data = this.getTo2dData(this.data);
    this.render();
    super.removeLoader(this.element);
  }

  setEvent() {
    this.element.addEventListener('click', this.clickPagination);
  }

}

// frontEnd --------------
const frontEndInfo = {
  enName: 'frontEnd',
  chtName: '前端工程師',
  results: 5,
  element: document.querySelector('#FrontEnd'),
};
const frontEnd = new Employee(frontEndInfo);

frontEnd.setInit();

// backEnd --------------
const backEndInfo = {
  enName: 'backEnd',
  chtName: '後端工程師',
  results: 4,
  element: document.querySelector('#BackEnd'),
};
const backEnd = new Employee(backEndInfo);

backEnd.setInit();

// design --------------
const designInfo = {
  enName: 'design',
  chtName: '設計師',
  results: 10,
  element: document.querySelector('#Design'),
};
const design = new EmployeeDesign(designInfo);

design.setInit();

// project ----------------
const projectInfo = {
  enName: 'project',
  chtName: '專案經理人',
  results: 20,
  element: document.querySelector('#Project'),
  current: 1,
  size: 6,
};
const project = new EmployeeProject(projectInfo);

project.setInit();
project.setEvent();
