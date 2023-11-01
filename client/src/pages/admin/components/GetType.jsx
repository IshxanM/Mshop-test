import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { getAllType, deleteType } from "../../../redux/features/type/typeSlice";
import Pagination from "react-bootstrap/Pagination";
import { useConfirmationDialog } from "material-ui-confirmation";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import EditModalType from "./EditModalType";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const GetType = () => {
  const dispatch = useDispatch();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [page, setPage] = useState(1);
  const { getConfirmation } = useConfirmationDialog();
  const types = useSelector((state) => state.type.types);
  const { status } = useSelector((state) => state.type);

  useEffect(() => {
    if (status) {
      toast(status);
    }
    dispatch(getAllType());
  }, [status]);

  const handleChange = (id) => {
    dispatch(deleteType({ id }));
    dispatch(getAllType());
    if (status) {
      toast(status);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      {types.types ? (
        types.types.length === 0 ? (
          <h1 className="d-flex justify-content-center ">Нет типов</h1>
        ) : (
          <Grid item xs={12} md={6}>
            <Demo>
              <List dense={dense}>
                {types.types
                  ? types.types
                      .filter((item, idx) => {
                        return page == 1
                          ? idx < 3
                          : idx < page * 3 && idx > page * 3 - 3 - 1;
                      })
                      .map((type) => (
                        <div
                          key={type.id}
                          className="border-bottom border-primary"
                        >
                          <ListItem
                            secondaryAction={
                              <div className="type__icon_btn">
                                <EditModalType
                                  typeId={type.id}
                                  typeName={type.name}
                                />

                                <IconButton
                                  onClick={() => {
                                    getConfirmation({
                                      body: "Вы действительно хотите удалить?",
                                      onAccept: () => {
                                        handleChange(type.id);
                                      },
                                      onDecline: () => {},
                                      dialogProps: {
                                        onClose: true,
                                      },
                                      acceptButtonProps: {
                                        autoFocus: false,
                                        variant: "contained",
                                      },
                                      declineText: "Отмена",
                                      acceptText: "Да",
                                    });
                                  }}
                                  edge="end"
                                  aria-label="delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            }
                          >
                            <div>
                              <ListItemText
                                primary={type.name}
                                secondary={secondary ? type.name : null}
                              />
                            </div>
                          </ListItem>
                        </div>
                      ))
                  : ""}
              </List>
            </Demo>
          </Grid>
        )
      ) : (
        ""
      )}

      <Pagination className="mt-5 pagin-center">
        {new Array(Math.ceil((types.types ? types.types.length : 0) / 3))
          .fill(null)
          .map((item, idx) => (
            <Pagination.Item
              onClick={() => {
                setPage(idx + 1);
              }}
              active={page === idx + 1}
              key={idx}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
      </Pagination>
    </Box>
  );
};
export default GetType;
