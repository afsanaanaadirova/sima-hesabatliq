import { Input } from "reactstrap";
import SearchIcon from "../../../../assets/images/icons/combined-shape.svg";

export default function TableSearch({
  setSearchValue,
  setCurrentPage,
  placeholder,
  searchValue,
}) {
  return (
    <div className="table-search">
      <Input
        className="search-input"
        value={searchValue}
        placeholder={placeholder}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setCurrentPage(1);
        }}
      />
      <img className="search-icon" src={SearchIcon} />
    </div>
  );
}
