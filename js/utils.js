const getData = async (api = '') => {
  try {
    const res = await fetch(api);
    const data = await res.json();

    return data.results;
  } catch (err) {
    console.log('API 連線錯誤!');
  } finally {
  }

  return [];
};

const getGridStr = (data = [], template = '', hasFlag = false, str = '') => {
  data.map((each) => str += `<li class="grid__item">${template(each, hasFlag)}</li>`);
  
  return str;
};

const getBtnsStr = (data = [], template = '', current = 0, str = '' ) => {
  data.forEach((each, i) => {
    str += template(i, current);
  });

  return str;
};

export { getData, getGridStr, getBtnsStr };
