const card = ({ picture, name, email }) => `
    <div class="card">
      <div class="card__imgs">
        <img class="card__img img-resp" src="${picture.large}">
      </div>
      <div class="card__intro">
        <p class="card__desc card__desc--name">${name.first} ${name.last}</p>
        <p class="card__desc card__desc--email">${email}</p>
      </div>
    </div>`;

const cardColumn = ({ picture, name, gender, nat, location }) => `
  <div class="card card-column">
    <div class="card__imgs">
      <img class="card__img img-resp" src="${picture.large}">
    </div>
    <div class="card__intro">
      <p class="card__desc card__desc--name">${name.first} ${name.last}</p>
      <p class="card__desc card__desc--gender">${gender}</p>
      <img
        class="card__img img-resp"
        src="https://flagcdn.com/32x24/${nat.toLowerCase()}.png"
        srcset="https://flagcdn.com/64x48/${nat.toLowerCase()}.png 2x,
          https://flagcdn.com/96x72/${nat.toLowerCase()}.png 3x"
        width="32"
        height="24"
        alt="${location.country}">
    </div>
  </div>`;

const cardColumn2 = ({ picture, name, gender }) => `
  <div class="card card-column">
    <div class="card__imgs">
      <img class="card__img img-full" src="${picture.large}">
    </div>
    <div class="card__intro">
      <p class="card__desc card__desc--name">${name.first} ${name.last}</p>
      <p class="card__desc card__desc--gender">${gender}</p>
    </div>
  </div>`;

const loader = () => `
  <div class="loader">
    <div class="loader-rotatePlane"></div>
    <p class="loader__desc">資料下載中...請稍後！</p>
  </div>`;

export { card, cardColumn, cardColumn2, loader };
