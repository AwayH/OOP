import * as templates from './templates.js';
import * as utils from './utils.js';

class Employee {
  constructor({ enName, chtName, results, columns, element }) {
    this.enName = enName;
    this.chtName = chtName;
    this.results = results;
    this.columns = columns;
    this.element = element;
    this.url = `https://randomuser.me/api?seed=${this.enName}&results=${this.results}`;
    this.data = [];
  }

  renderName() {
    const node = document.createElement('h2');

    node.className = 'base__title';
    node.textContent = this.chtName;
    this.element.appendChild(node);
  }

  renderList() {
    const node = document.createElement('ul');
    
    node.className = `base__ls row grid grid-${this.columns}`;
    node.innerHTML = utils.getGridStr(this.data, templates.card);
    this.element.appendChild(node);
  }

  addLoader() {
    const node = document.createElement('div');

    node.className = 'modal';
    node.innerHTML = templates.loader();
    this.element.appendChild(node);
  }

  removeLoader() {
    this.element.removeChild(this.element.firstChild);
  }

  async setInit() {
    this.addLoader();
    this.data = await utils.getData(this.url);
    this.renderName();
    this.renderList();
    this.removeLoader();
  }
}

class EmployeeDesign extends Employee {
  renderList() {
    const node = document.createElement('ul');
    
    node.className = `base__ls row grid grid-${this.columns}`;
    node.innerHTML = utils.getGridStr(this.data, templates.cardColumn);
    this.element.appendChild(node);
  }
}

class EmployeeProject extends Employee {
  constructor({ enName, chtName, results, columns, element, current, hasFlag }) {
    super({ enName, chtName, results, columns, element });
    this.current = current - 1;
    this.hasFlag = hasFlag;
  }

  get2dData = (data, arr = []) => {
    data.forEach((item, i) => {
      if (i % this.columns === 0) {
        arr.push([]);
      }
      const index = parseInt(i / this.columns, 10);
      arr[index].push(item);
    });

    return arr;
  }

  renderList() {
    const node = document.createElement('ul');
    
    node.className = `base__ls row grid grid-${this.columns}`;
    node.innerHTML = utils.getGridStr(this.data[this.current], templates.cardColumn, this.hasFlag);
    this.element.appendChild(node);
  }

  renderPagination() {
    const node = document.createElement('div');

    node.className = 'pagination';
    node.innerHTML = utils.getBtnsStr(this.data, templates.paginationBtn, this.current);
    this.element.appendChild(node);
  }

  clickPagination = ({ target }) => {
    const index = parseInt(target.value, 10) - 1;
    const parent = target.parentNode;

    target.setAttribute('disabled', '');
    parent.children[this.current].removeAttribute('disabled');
    this.current = index;
    parent.previousElementSibling.innerHTML = utils.getGridStr(this.data[this.current], templates.cardColumn, this.hasFlag);
  }

  async setInit() {
    super.addLoader();
    this.data = await utils.getData(this.url);
    this.data = this.get2dData(this.data);
    super.renderName();
    this.renderList();
    this.renderPagination();
    super.removeLoader();
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
  columns: 3,
  element: document.querySelector('#FrontEnd'),
};
const frontEnd = new Employee(frontEndInfo);

frontEnd.setInit();

// backEnd --------------
const backEndInfo = {
  enName: 'backEnd',
  chtName: '後端工程師',
  results: 4,
  columns: 2,
  element: document.querySelector('#BackEnd'),
};
const backEnd = new Employee(backEndInfo);

backEnd.setInit();

// design --------------
const designInfo = {
  enName: 'design',
  chtName: '設計師',
  results: 10,
  columns: 8,
  element: document.querySelector('#Design'),
};
const design = new EmployeeDesign(designInfo);

design.setInit();

// project ----------------
const projectInfo = {
  enName: 'project',
  chtName: '專案經理',
  results: 20,
  columns: 6,
  element: document.querySelector('#Project'),
  current: 2,
  hasFlag: true,
};
const project = new EmployeeProject(projectInfo);

project.setInit();
project.setEvent();
