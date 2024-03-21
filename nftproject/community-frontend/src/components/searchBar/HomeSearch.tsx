export const HomeSearch = () => {
  return (
    <div className="HomeSearch">
      <input
        type="text"
        className="inputBox"
        placeholder="Search community, profile"
      ></input>
      <button type="submit" className="searchButton">
        <i className="bx bx-search"></i>
      </button>
    </div>
  );
};
