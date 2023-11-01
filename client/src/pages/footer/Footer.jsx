import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import "./index.css";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#3f51b5",
        color: "white",
        marginTop: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="text-color" gutterBottom>
              О нас
            </Typography>
            <Typography variant="body2" className="text-color">
              Официальный сайт сети магазинов бытовой техники и электроники
              Mshop
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="text-color" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2" className="text-color">
              г. Ульяновск, ул 12 Сентября, д 108
            </Typography>
            <Typography variant="body2" className="text-color">
              Email: Mshop@mail.ru
            </Typography>
            <Typography variant="body2" className="text-color">
              Телефон: +7 999 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="text-color" gutterBottom>
              Мы в сетях
            </Typography>
            <Link href="#" color="inherit">
              <Facebook />
            </Link>
            <Link href="#" color="inherit" sx={{ pl: 1, pr: 1 }}>
              <Instagram />
            </Link>
            <Link href="#" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" className="text-color" align="center">
            {"Copyright © "}
            <Link className="text-color" href="#">
              Mshop
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
