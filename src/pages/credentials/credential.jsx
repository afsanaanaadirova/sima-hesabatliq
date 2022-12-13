import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/shared/table-component/table-component";
import Pagination from "../../components/shared/pagination/pagination";
import { getallCredentials, deleteCredential } from "../../core/api";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../core/store/modal-slice";
import editIcon from "../../assets/images/common/Vector.png";
import deleteIcon from "../../assets/images/common/delete.png";
import Submitbutton from "../../components/shared/button/submit-button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./credentials.scss";
import ModalComponent from "../../components/shared/modal/modal";
import { ModalBody, Button } from "reactstrap";

function Credential() {
  const PageSize = process.env.REACT_APP_PAGE_SIZE;
  const excludedHeader = ["url", "id"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [credentials, setCredentials] = useState([]);
  const dispatch = useDispatch();
  const [idForDelete, setIdForDelete] = useState("");

  useEffect(() => {
    getCredentials();
  }, []);
  const history = useNavigate();

  const handlerRouter = () => {
    history("/add-customer");
  };

  const isCloseModal = () => {
    dispatch(closeModal());
  };

  const deleteData = async (id) => {
    await deleteCredential(id);
    getCredentials();
  };

  const getCredentials = async () => {
    const response = await getallCredentials();
    setCredentials(
      response.data.map((dt) => ({
        ...dt,
        render: () => (
          <div>
            <img
              onClick={(e) => {
                setIdForDelete(dt.id);
                dispatch(openModal());
              }}
              className="deleteIcon"
              src={deleteIcon}
            />
            <Link to={`/edit/${dt.id}`}>
              <img className="editIcon" src={editIcon} />
            </Link>
          </div>
        ),
      }))
    );
  };

  const currentTableData = useMemo(() => {
    let filterData = credentials;
    if (searchValue) {
      filterData = [
        ...filterData.filter((item) => {
          return item.agency.toLowerCase().includes(searchValue.toLowerCase());
        }),
      ];
    }
    setTotalCount(filterData.length);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [credentials, searchValue, currentPage]);

  return (
    <div className="container__page wth-100">
      <div className="container__page--title">
        <h3>Müştəri siyahısı</h3>
        <Submitbutton onClick={handlerRouter}>Müştəri əlavə et</Submitbutton>
      </div>
      <TableComponent
        data={currentTableData}
        excluded={excludedHeader}
      ></TableComponent>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ModalComponent>
        <ModalBody className="modal__deletebody">
          <h5> Silmək istədiyinizə əminsinizmi?</h5>
          <div className="modal__btn">
            <Button
              className="modal__btn--delete"
              onClick={() => {
                isCloseModal();
                deleteData(idForDelete);
              }}
            >
              Bəli
            </Button>
            <Button
              className="modal__btn--cancel"
              onClick={() => {
                isCloseModal();
              }}
            >
              Xeyr
            </Button>
          </div>
        </ModalBody>
      </ModalComponent>
    </div>
  );
}

export default Credential;
