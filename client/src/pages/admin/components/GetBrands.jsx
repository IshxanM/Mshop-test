import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrand,
  deleteBrand,
} from "../../../redux/features/brand/brandSlice";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Form from "react-bootstrap/Form";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Pagination from "react-bootstrap/Pagination";
import { useConfirmationDialog } from "material-ui-confirmation";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import EditModalBrand from "./EditModalBrand";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const GetBrands = () => {
  const dispatch = useDispatch();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [page, setPage] = useState(1);
  const { getConfirmation } = useConfirmationDialog();
  const brands = useSelector((state) => state.brand.brands);
  const { status } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  const handleChange = (id) => {
    dispatch(deleteBrand({ id }));
    dispatch(getAllBrand());
    if (status) {
      toast(status);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      {brands.brand ? (
        brands.brand.length === 0 ? (
          <h1 className="d-flex justify-content-center ">Нет брендов</h1>
        ) : (
          <Grid item xs={12} md={6}>
            <Demo>
              <List dense={dense}>
                {brands.brand
                  ? brands.brand
                      .filter((item, idx) => {
                        return page == 1
                          ? idx < 3
                          : idx < page * 3 && idx > page * 3 - 3 - 1;
                      })
                      .map((brand) => (
                        <div
                          key={brand.id}
                          className="border-bottom border-primary"
                        >
                          <ListItem
                            secondaryAction={
                              <div className="type__icon_btn">
                                <EditModalBrand
                                  brandId={brand.id}
                                  brandName={brand.name}
                                />

                                <IconButton
                                  onClick={() => {
                                    getConfirmation({
                                      body: "Вы действительно хотите удалить?",
                                      onAccept: () => {
                                        handleChange(brand.id);
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
                                primary={brand.name}
                                secondary={secondary ? brand.name : null}
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
        {new Array(Math.ceil((brands.brand ? brands.brand.length : 0) / 3))
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
export default GetBrands;
