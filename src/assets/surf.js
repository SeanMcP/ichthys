const iframe = document.querySelector("iframe");
const [previous, random, next] = document.querySelectorAll("button");
const urls = iframe.dataset.urls.split(",");
let index = parseInt(iframe.dataset.index);

function setIndex(i) {
  index = i;
  iframe.src = urls[index];
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("i", index);
  history.replaceState(null, null, "?" + searchParams.toString());
}

const i = new URLSearchParams(location.search).get("i");
if (i) {
  index = parseInt(i);
}

goTo(index);

function goTo(index) {
  iframe.src = urls[index];
  setIndex(index);
}

next.addEventListener("click", () => {
  let nextIndex = 0;
  if (index + 1 < urls.length) {
    nextIndex = index + 1;
  }
  goTo(nextIndex);
});

previous.addEventListener("click", () => {
  let previousIndex = urls.length - 1;
  if (index - 1 >= 0) {
    previousIndex = index - 1;
  }
  goTo(previousIndex);
});

random.addEventListener("click", () => {
  let randomIndex = index;
  while (randomIndex === index) {
    randomIndex = Math.floor(Math.random() * urls.length);
  }
  goTo(randomIndex);
});
