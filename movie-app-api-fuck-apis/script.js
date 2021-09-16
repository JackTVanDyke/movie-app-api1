const form = document.querySelector("#search-form");
const showContainer = document.querySelector(".show-container");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchInput = form.elements.query.value;
  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchInput}`
  );
  deleteContent();
  addContent(res.data);
  console.dir(res.data);
});

const deleteContent = () => {
  const divs = document.querySelectorAll(".content");
  for (let div of divs) {
    div.remove();
  }
};

const addContent = (shows) => {
  for (let result of shows) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const link = document.createElement("a");
    const tit = document.createElement("p");
    div.classList.add("content");
    img.src = result.show.image.medium;
    link.href = result.show.url;
    tit.textContent =
      `${result.show.name}` + ` - ${result.show.rating.average}/10`;
    showContainer.append(div);
    div.append(img);
    div.append(link);
    link.append(tit);
  }
};
