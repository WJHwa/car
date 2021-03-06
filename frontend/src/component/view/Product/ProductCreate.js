import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getOriginList,
  getSeriesList,
  getModelList,
} from "../../../utils/getList";
import { useSnackbar } from "notistack";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  container: {
    marginTop: "25px",
    paddingTop: "10px",
    paddingBottom: "30px",
    marginBottom: "40px",
    background: "#E0E0E0",
    borderRadius: "15px",
    WebkitBoxShadow: "27px 50px 50px -20px rgba(89,89,89,0.39)",
  },
  gridContainer: {
    marginTop: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    marginBottom: "20px",
    background: "white",
    borderRadius: "15px",
    display: "flex",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    marginTop: "15px",
    paddingBottom: "15px",
    fontWeight: "bold",
  },
  button: {
    paddingTop: "25px",
    paddingBottom: "25px",
    fontSize: "20px",
    background: "#2E3B55",
  },
  menu: {
    margin: "8px",
    minWidth: "180px",
  },
});
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 200,
    },
  },
};

function ProductCreate() {
  const [origin, setOrgin] = useState("");
  const [produce, setProduce] = useState("");
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [size, setSize] = useState("");
  const [gear, setGear] = useState("");
  const [produceList, setProduceList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [inputs, setInputs] = useState({
    year: "",
    fuel: "",
    accident: "",
    color: "",
    price: "",
    km: "",
    month: "",
    car_num: "",
    contents: "",
  });
  const [image, setImage] = useState([]);

  const { price, year, color, fuel, km, month, car_num, accident, contents } =
    inputs;

  const navigate = useNavigate();
  const classes = styles();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  function onChangeInput(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const values = [
    { name: "????????????", values: "car_num", value: car_num },
    { name: "??????", values: "price", value: price },
    { name: "??????", values: "year", value: year },
    { name: "??????", values: "color", value: color },
    { name: "??????", values: "fuel", value: fuel },
    { name: "?????????", values: "km", value: km },
    { name: "?????????", values: "month", value: month },
    { name: "????????????", values: "accident", value: accident },
  ];

  function addImages(e) {
    let nowSelectImage = e.target.files;

    let file = [];
    for (let i = 0; i < nowSelectImage.length; i++) {
      file.push(nowSelectImage[i]);
    }
    setImage([...file]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    let kms = km.replace(",", "");
    if (kms !== km) {
      return enqueueSnackbar("??????????????? ',' ?????? ??????????????????.", {
        variant: "info",
      });
    }
    let data = {
      price,
      year,
      color,
      fuel,
      km,
      month,
      car_num,
      accident,
      contents,
      origin,
      series,
      model,
      produce,
      size,
      gear,
    };
    let formData = new FormData();

    for (const key of Object.keys(image)) {
      formData.append("file", image[key]);
    }
    formData.append("data", JSON.stringify(data));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const res = await axiosInstance.post("/productCreate", formData, config);
    if (res.data) {
      enqueueSnackbar("????????? ??????????????????.", { variant: "success" });
      return navigate("/admin/carlist");
    } else {
      return enqueueSnackbar("????????? ????????? ??????????????????.", {
        variant: "info",
      });
    }
  }

  async function retouch(e) {
    e.preventDefault();

    let data = {
      price,
      year,
      color,
      fuel,
      km,
      month,
      car_num,
      accident,
      contents,
      origin,
      series,
      model,
      produce,
      size,
      gear,
    };

    const res = await axios.put("/productCreate", data);
    if (!res.data) {
      return enqueueSnackbar("????????? ????????? ??????????????????.", {
        variant: "info",
      });
    }
    enqueueSnackbar("?????? ???????????????.", { variant: "success" });
    return navigate("/admin/carlist");
  }

  useEffect(() => {
    if (location.state) {
      const {
        accident,
        car_num,
        color,
        contents,
        fuel,
        gear,
        km,
        origin,
        price,
        size,
        year,
        series,
        model,
        produce,
      } = location.state;
      setInputs({
        ...inputs,
        ["car_num"]: car_num,
        ["color"]: color,
        ["contents"]: contents,
        ["fuel"]: fuel,
        ["km"]: km,
        ["month"]: month,
        ["price"]: price,
        ["year"]: year,
        ["accident"]: accident,
      });
      setOrgin(origin);
      setSize(size);
      setGear(gear);
      setProduceList(getOriginList(origin));
      setProduce(produce);
      setSeriesList(getSeriesList(produce));
      setSeries(series);
      setModelList(getModelList(series));
      setModel(model);
    }
  }, []);

  return (
    <>
      <Container component={"main"} maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
        <Container maxWidth={"md"} className={classes.container}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "22px",
              marginTop: "15px",
              paddingBottom: "15px",
              fontWeight: "bold",
            }}
          >
            ?????? ??????
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{
              marginTop: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
              marginBottom: "20px",
              background: "white",
              borderRadius: "15px",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Grid item xs={6} md={3} lg={6}>
              <Typography>????????????</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>????????????</InputLabel>
                <Select
                  onChange={(e) => {
                    setOrgin(e.target.value);
                    setProduceList(getOriginList(e.target.value));
                  }}
                  value={origin}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>?????????</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  MenuProps={MenuProps}
                  onChange={(e) => {
                    setProduce(e.target.value);
                    setSeriesList(getSeriesList(e.target.value));
                  }}
                  value={produce}
                >
                  {produceList.map((v) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>?????????</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  MenuProps={MenuProps}
                  onChange={(e) => {
                    setSeries(e.target.value);
                    setModelList(getModelList(e.target.value));
                  }}
                  value={series}
                >
                  {seriesList.map((v) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>?????????</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  MenuProps={MenuProps}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  {modelList.map((v) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>??????</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>??????</InputLabel>
                <Select
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  value={size}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="????????????">????????????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>?????????</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  onChange={(e) => {
                    setGear(e.target.value);
                  }}
                  value={gear}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {values.map((v) => {
              return (
                <Grid item xs={6} md={3} lg={6} key={v.name}>
                  <Typography>{v.name}</Typography>
                  <TextField
                    name={v.values}
                    type={"text"}
                    margin="normal"
                    label={v.name}
                    value={v.value}
                    size="small"
                    onChange={onChangeInput}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "22px",
              marginTop: "15px",
              paddingBottom: "15px",
              fontWeight: "bold",
            }}
          >
            ??? ??????
          </Typography>
          <Grid container className={classes.gridContainer}>
            <FormControl fullWidth sx={{ ml: 3, mr: 3 }}>
              <TextField
                label="???????????? ??? ???????????? ???????????? ???????????????."
                required
                name="contents"
                margin="normal"
                multiline
                value={contents}
                onChange={onChangeInput}
                rows={5}
              />
            </FormControl>
          </Grid>
          {!location.state ? (
            <Grid>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "22px",
                  marginTop: "15px",
                  paddingBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                ????????????
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={"15px"}
                color="text.secondary"
              >
                * ????????? ????????? ???????????? ?????? ????????????. *
              </Typography>
              <Grid container className={classes.gridContainer}>
                <FormControl
                  fullWidth
                  sx={{ ml: 3, mr: 3, mt: 2, mb: 2 }}
                  onChange={addImages}
                >
                  <TextField
                    type="file"
                    hidden
                    inputProps={{
                      multiple: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          {!location.state ? (
            <Grid mb={3}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "22px",
                  marginTop: "15px",
                  paddingBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                ???????????????
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={"15px"}
                color="text.secondary"
              ></Typography>
              <Grid container className={classes.gridContainer}>
                <FormControl
                  fullWidth
                  sx={{ ml: 3, mr: 3, mt: 2, mb: 2 }}
                  onChange={(e) => image.push(e.target.files[0])}
                >
                  <TextField type="file" hidden />
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          <Grid container mt={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                paddingTop: "25px",
                paddingBottom: "25px",
                fontSize: "20px",
                background: "#2E3B55",
              }}
              onClick={location.state ? retouch : onSubmit}
            >
              {location.state ? "????????????" : "????????????"}
            </Button>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default ProductCreate;
