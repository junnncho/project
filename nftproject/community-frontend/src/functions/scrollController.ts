export const scrollController = (
  scroll: boolean,
  setScroll: (state: boolean) => void
) => {
  window.addEventListener("scroll", () => {
    let activeClass = false || window.scrollY > 10;
    setScroll(activeClass || scroll);
  });
};
