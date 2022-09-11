import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
  NormalBreadcrumb,
  NormalButton,
  NormalTable,
  NormalModal,
} from "../../../components/common";
import { UsersCard, UsersFrom } from "../../../components/pages";
import { USER_TYPE } from "../../../services/constants";
import {jwtDecodeDetails} from '../../../services/utilities'
import { getAllUser } from "../../../api/user";
// import './models.scss'

export const Users = () => {
  const params = useParams();
  const [isFormLoader, setIsFormLoader] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [isAdduserModal, setIsAdduserModal] = useState(false);
  const [editFormObj, setEditFormObj] = useState({});
  const [currentUserData, setCurrentUserData] = useState(jwtDecodeDetails());
  const columnData = [
    {
      label: "S.no",
      key: "index",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Eamil",
      key: "email",
    },
    {
      label: "Phone",
      key: "phone",
    },

    {
      label: "User Type",
      key: "instituteBranch",
    },

    {
      label: "Status",
      key: "status",
    },

    {
      label: "Action",
      key: "",
    },
  ];

  useEffect(() => {
    handleUserList();
  }, []);

  const handleUserList = () => {
    try {
      setIsFormLoader(true);

      getAllUser()
        .then((data) => {
          console.log("--------->", data);
          setIsFormLoader(false);
          if (data?.length > 0) {
            setUsersList(data);
          }
        })
        .catch((error) => {
          setIsFormLoader(false);
        });
    } catch (e) {
      setIsFormLoader(false);
    }
  };

  const handleAddUser = () => {
    setIsAdduserModal(true);
  };

  const handleUserModuleClose = (isSuccess) => {
    setIsAdduserModal(false);
    if(isSuccess){
      handleUserList();
    }
  };

  const onGetEditData = (data) => {
    setIsAdduserModal(true);
    setEditFormObj({...data})



  };

  const handleOpenDeleteAlert = () => {};

  return (
    <div className="modal-page">
      <NormalBreadcrumb
        className="mb-0"
        label={"Users"}
        rightSideBtn={true}
        buttonLabel="Add new"
        onBtnClick={handleAddUser}
      />

      <div className="row mt-5">
        {/* {usersList?.map((data) => (
          <div className="col-md-3">
            <UsersCard data={data} />
          </div>
        ))} */}

        <NormalTable
          // className='table-sm'
          columnData={columnData}
          count={200}
          pageNo={2}
          rowsPerPage={25}
          onChangePagination={(e, v) => console.log("---", v)}
          rowRender={() => {
            return usersList.map((data, i) => (
              <tr style={{height: '56px'}}>
                <td>{i + 1}</td>
                <td>
                  {" "}
                  <a href="#">
                    {data.first_name} {data?.last_name}
                  </a>
                </td>
                <td>{data.emailid}</td>
                <td>{data.mobile}</td>
                <td>{USER_TYPE?.find(({value})=>value === data.user_type)?.label}</td>
                <td>{data.status}</td>

                <td>
                  {(currentUserData?.userObj?.user_type === 1 || (currentUserData?.userObj?.user_type === 2 &&  currentUserData?.userObj?.userId===data?.userId) ) &&  <IconButton
                    color="success"
                    onClick={() => onGetEditData(data)}
                  >
                    <CreateIcon />
                  </IconButton>}
                 
                  {/* <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteAlert(data)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </td>
              </tr>
            ));
          }}
        />
      </div>

      <NormalModal
        toggle={handleUserModuleClose}
        title="Add user"
        className="modal-dialog-right modal-right modal-xl"
        isShow={isAdduserModal}
      >
        <UsersFrom toggle={handleUserModuleClose} editFormObj={editFormObj} />
      </NormalModal>
    </div>
  );
};
