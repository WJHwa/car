import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MenuOnClick from "../../../utils/MenuOnClick";
import {
  getOriginList,
  getSeriesList,
  getModelList,
} from "../../../utils/getList";
import { useSnackbar } from "notistack";
import ImgSlider from "../ImgSlider/ImgSlider";
import ProductListItem from "./ProductListItem";
import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 200,
    },
  },
};

const styles = makeStyles({
  mainmenu: {
    background: "#FDD431",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  categoryBox: {
    border: "1px solid #F0F0F0",
    fontSize: "15px",
    paddingLeft: "5px",
    marginRight: "5px",
    paddingTop: "5px",
    width: 240,
    height: "100%",
    marginBottom: "5px",
  },
  headerBox: { color: "black", marginRight: "10px" },
  categorybutton: {
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid #F0F0F0",
  },
});

function ProductList() {
  const [origin, setOrgin] = useState("");
  const [produce, setProduce] = useState("");
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [produceList, setProduceList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [list, setList] = useState([]);
  const [lists, setLists] = useState([]);

  const location = useLocation();
  const theme = useTheme();
  const medio = useMediaQuery(theme.breakpoints.down("md"));
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();

  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }

  async function onClick(v, list) {
    if (v === "??????") {
      setOrgin(v);
    }
    if (v === "??????") {
      setOrgin(v);
    }
    if (v === "??????") {
      setOrgin(v);
    }

    let result = await MenuOnClick(v, [...list]);
    if (result.length === 0) {
      return Alerts(
        "???????????? ????????? ?????? ?????? ????????? ?????? ????????? ?????????. ????????? ??????????????? ????????????.",
        "info"
      );
    }
    return setLists(result);
  }

  function Allselect() {
    setOrgin("");
    return setLists(list);
  }

  async function searchOnClick(e) {
    e.preventDefault();

    let data = [origin, produce, series, model];

    const res = await axiosInstance.get(`/productlist/${JSON.stringify(data)}`);
    if (!res) {
      return Alerts(
        "??????????????? ???????????? ??? ????????? ??????????????????.?????? ??????????????????.",
        "info"
      );
    }

    if (res.data.length === 0) {
      return Alerts(
        "???????????? ????????? ?????? ?????? ????????? ?????? ????????? ?????????. ????????? ??????????????? ????????????.",
        "info"
      );
    }

    setLists(res.data);
  }
  async function get() {
    let res = await axiosInstance.get("/productlist");
    if (!res.data) {
      return Alerts(
        "??????????????? ???????????? ??? ????????? ??????????????????.?????? ??????????????????.",
        "info"
      );
    }
    return setList(res.data);
  }

  useEffect(() => {
    if (location.state !== null) {
      let data = location.state.map((v) => v.value);
      (async function search() {
        const res = await axiosInstance.get(
          `/productlist/${JSON.stringify(data)}`
        );
        if (!res) {
          return Alerts(
            "??????????????? ???????????? ??? ????????? ??????????????????.?????? ??????????????????.",
            "info"
          );
        }

        if (res.data.length === 0) {
          Alerts(
            "???????????? ????????? ?????? ?????? ????????? ?????? ????????? ?????????.????????? ??????????????? ????????????.",
            "info"
          );
          get();
        }
        setLists(res.data);
      })();
      location.state.map((v) => {
        switch (v.name) {
          case "origin":
            setProduceList(getOriginList(v.value));
            return setOrgin(v.value);
          case "produce":
            setSeriesList(getSeriesList(v.value));
            return setProduce(v.value);
          case "series":
            setModelList(getModelList(v.value));
            return setSeries(v.value);
          case "model":
            return setModel(v.value);
        }
      });
    }
    get();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 3 }}>
        {!medio ? (
          <Grid item={true} className={classes.mainmenu} lg={12} xs={0} sm={6}>
            {[
              "??????",
              "??????",
              "??????",
              "??????",
              "??????",
              "??????",
              "?????????",
              "??????",
              "??????",
              "SUV",
              "????????????",
            ].map((v) => {
              return (
                <Button
                  key={v}
                  size="large"
                  className={classes.headerBox}
                  onClick={() =>
                    v === "??????" ? Allselect() : onClick(v, [...list])
                  }
                >
                  {v}
                </Button>
              );
            })}
          </Grid>
        ) : (
          <></>
        )}

        <Grid container justifyContent={"center"} mb={2}>
          <Grid item className={classes.categoryBox}>
            ??????
            <FormControl
              variant="standard"
              size={"large"}
              sx={{ m: 1, width: 200 }}
            >
              <InputLabel>??????</InputLabel>
              <Select
                name="origin"
                onChange={(e) => {
                  setOrgin(e.target.value);
                  setProduceList(getOriginList(e.target.value));
                  setProduce("");
                  setSeries("");
                  setModel("");
                }}
                value={origin}
              >
                <MenuItem value={"??????"}>??????</MenuItem>
                <MenuItem value={"??????"}>??????</MenuItem>
                <MenuItem value={"??????"}>??????</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.categoryBox}>
            ?????????
            <FormControl
              variant="standard"
              size={"large"}
              sx={{ m: 1, width: 200 }}
            >
              <InputLabel>?????????</InputLabel>
              <Select
                name="produce"
                MenuProps={MenuProps}
                onChange={(e) => {
                  setProduce(e.target.value);
                  setSeriesList(getSeriesList(e.target.value));
                  setSeries("");
                  setModel("");
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
          <Grid item className={classes.categoryBox}>
            ?????????
            <FormControl
              variant="standard"
              size={"large"}
              sx={{ m: 1, width: 200 }}
            >
              <InputLabel>?????????</InputLabel>
              <Select
                name="series"
                MenuProps={MenuProps}
                onChange={(e) => {
                  setSeries(e.target.value);
                  setModelList(getModelList(e.target.value));
                  setModel("");
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
          <Grid item className={classes.categoryBox}>
            ?????????
            <FormControl
              variant="standard"
              size={"large"}
              sx={{ m: 1, width: 200 }}
            >
              <InputLabel>?????????</InputLabel>
              <Select
                name="model"
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
        </Grid>
        <Grid mb={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={(e) => searchOnClick(e)}
          >
            ????????????
          </Button>
        </Grid>
        <Grid container className={classes.categorybutton}>
          {[
            "???????????????",
            "???????????????",
            "???????????????",
            "??????????????????",
            "??????????????????",
            "???????????????",
            "???????????????",
          ].map((v) => (
            <Button
              key={v}
              size="small"
              sx={{ fontWeight: "bold" }}
              onClick={() => onClick(v, [...list])}
            >
              {v}
            </Button>
          ))}
        </Grid>

        {/* ????????? ???????????? ?????? */}
        <ProductListItem list={list} lists={lists} />
      </Container>
      <ImgSlider list={list} lists={lists} />
    </>
  );
}

export default ProductList;
