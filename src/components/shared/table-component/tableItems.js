const tableButtons = {
  delete: `<td
    onClick={(e) => {
      setIdForDelete(i.id);
      dispatch(openModal());
    }}>
    <FontAwesomeIcon icon={faTrash} />
  </td>`,

  link: `<td
    onClick={() => {
      localStorage.setItem("prevUrl", window.location);
    }}
  >
    <NavLink
      onClick={() => {
        setReturnedItemFunc({
          mode: i.url,
          id: i.id,
        });
      }}
      style={{ color: "green" }}
    >
      Keçid et <img src={stroke} />
    </NavLink>
  </td>`,
  test: `<div>Mamed</div>`,
};
export default tableButtons;
