import { React, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import { CustomContext } from "../utils/context";
import Skeleton from "@mui/material/Skeleton";
import ModalEditUser from "../components/modal/ModalEditUser";

const MyProfile = () => {
  const { authUser } = useContext(CustomContext);

  return (
    <div>
      <h1 className="name_page">Моя страница</h1>
      <div className="profile__body">
        <Card>
          <div className="my-name__info">Мои данные</div>
          <hr />
          <CardContent className="profile__content">
            {authUser ? (
              <div>
                <Typography gutterBottom variant="h6" component="h2">
                  Имя: {authUser.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Телефон: {authUser.phone}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Email: {authUser.email}
                </Typography>
              </div>
            ) : (
              <Skeleton animation="wave" />
            )}
          </CardContent>

          <CardActions className="profile__edit__btn">
            <ModalEditUser />
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
