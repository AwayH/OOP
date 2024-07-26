const getData = async (api) => {
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

const getGridStr = (data = [], template = '', str = '') => {
  data.map((each) => str += `<li class="grid__item">${template(each)}</li>`);
  
  return str;
};

export { getData, getGridStr };
