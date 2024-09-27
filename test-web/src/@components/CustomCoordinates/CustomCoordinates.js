import { Typography, Grid, IconButton } from "@mui/material";
import { TrashIcon } from "../FuseSvgIcon";
import CustomButton from "../CustomButton";
import CustomTextField from "../CustomTextField";
import Divider from "@mui/material/Divider";
import formatNumber from "app/utils/functions/formatNumber";

const CustomCoordinates = (props) => {
  const {
    coordenada,
    setCoordenada,
    arrayCoor,
    setArrayCoor,
    handledChangeCoordenadas,
    handleDesAdd,
  } = props;

  const valueCorde =
    coordenada.tipc_lat_grad.length +
    coordenada.tipc_lat_min.length +
    coordenada.tipc_lat_seg.length +
    coordenada.tipc_lon_grad.length +
    coordenada.tipc_lon_min.length +
    coordenada.tipc_lon_seg.length +
    coordenada.tipc_alt.length;

  const disabledCoor =
    coordenada.tipc_lat_grad === "" ||
    coordenada.tipc_lat_min === "" ||
    coordenada.tipc_lat_seg === "" ||
    coordenada.tipc_lon_grad === "" ||
    coordenada.tipc_lon_min === "" ||
    coordenada.tipc_lon_seg === "" ||
    coordenada.tipc_alt === "" ||
    valueCorde > 50;

  const changeNumberCoor = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setCoordenada({ ...coordenada, [prop]: event.target.value });
    } else {
      const t = Math.sign(event.target.value);
      if (!Number.isNaN(t) || event.target.value === "-") {
        setCoordenada({ ...coordenada, [prop]: event.target.value });
      }
    }
  };

  const deleteItem = (i) => () => {
    const newItem = [...arrayCoor];
    newItem.splice(i, 1);
    setArrayCoor(newItem);
  };

  const addCoordenada = (item) => async () => {
    setArrayCoor(arrayCoor.concat(item));
    setCoordenada({
      tipc_lat_grad: "",
      tipc_lat_min: "",
      tipc_lat_seg: "",
      tipc_lon_grad: "",
      tipc_lon_min: "",
      tipc_lon_seg: "",
      tipc_alt: "",
    });
  };

  const disabledGuardar = arrayCoor?.length < 1;

  return (
    <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12 w-full overflow-x-scroll">
      <div className="flex mb-16" style={{ minWidth: 850 }}>
        <div className="w-3/4 mr-8 flex">
          <div
            style={{ backgroundColor: "#EEF7FF" }}
            className="w-1/2 h-60 flex justify-center items-center mr-8"
          >
            <Typography className="text-18 text-primary font-bold">
              Latitud
            </Typography>
          </div>
          <div
            style={{ backgroundColor: "#EEF7FF" }}
            className="w-1/2 h-60 flex justify-center items-center ml-8"
          >
            <Typography className="text-18 text-primary font-bold">
              Longitud
            </Typography>
          </div>
        </div>
        <div className="w-1/4 ml-8 flex">
          <div
            style={{ backgroundColor: "#EEF7FF" }}
            className="w-1/2 h-60 flex justify-center items-center mr-8"
          >
            <Typography className="text-18 text-primary font-bold">
              Altitud
            </Typography>
          </div>
          <div className="w-1/2 ml-8" />
        </div>
      </div>
      <div className="flex mb-16" style={{ minWidth: 850 }}>
        <div className="w-3/4 mr-8 flex">
          <div className="w-1/2 flex mr-8">
            <div className="mr-8 w-full">
              <CustomTextField
                label="Grados"
                style={{ minWidth: 0 }}
                value={coordenada.tipc_lat_grad}
                onChange={changeNumberCoor("tipc_lat_grad")}
              />
            </div>
            <div className="mx-8 w-full">
              <CustomTextField
                label="Minutos"
                style={{ minWidth: 0 }}
                value={coordenada.tipc_lat_min}
                onChange={changeNumberCoor("tipc_lat_min")}
              />
            </div>
            <div className="ml-8 w-full">
              <CustomTextField
                label="Segundos"
                style={{ minWidth: 0 }}
                value={coordenada.tipc_lat_seg}
                onChange={changeNumberCoor("tipc_lat_seg")}
              />
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center ml-8">
            <div className="mr-8 w-full">
              <CustomTextField
                label="Grados"
                style={{ minWidth: 0 }}
                value={coordenada.tipc_lon_grad}
                onChange={changeNumberCoor("tipc_lon_grad")}
              />
            </div>
            <div className="mx-8 w-full">
              <CustomTextField
                label="Minutos"
                style={{ minWidth: 0 }}
                value={coordenada.tipc_lon_min}
                onChange={changeNumberCoor("tipc_lon_min")}
              />
            </div>
            <div className="ml-8 w-full">
              <CustomTextField
                label="Segundos"
                style={{ minWidth: 0 }}
                value={coordenada.tipc_lon_seg}
                onChange={changeNumberCoor("tipc_lon_seg")}
              />
            </div>
          </div>
        </div>
        <div className="w-1/4 ml-8 flex">
          <div className="w-1/2 flex justify-center items-center mr-8">
            <CustomTextField
              label="Metros"
              style={{ minWidth: 0 }}
              value={coordenada.tipc_alt}
              onChange={changeNumberCoor("tipc_alt")}
            />
          </div>
          <div className="w-1/2 ml-8 flex items-center">
            <CustomButton
              width="full"
              height="medium"
              label="Agregar"
              className="secondary"
              onClick={addCoordenada(coordenada)}
              disabled={disabledCoor}
            />
          </div>
        </div>
      </div>
      {arrayCoor?.length > 0
        ? arrayCoor?.map((coord, i) => {
            return (
              <div key={coord?.tipc_lat_grad}>
                <Divider style={{ borderColor: "#D1E3F5" }} />
                <div className="flex ">
                  <div className="w-3/4 mr-8 flex">
                    <div className="w-1/2 flex mr-8">
                      <div className="mr-8 w-full flex justify-center items-center">
                        <Typography style={{ color: "#647F97" }}>
                          {formatNumber(coord?.tipc_lat_grad)}
                        </Typography>
                      </div>
                      <div className="mx-8 w-full flex justify-center items-center">
                        <Typography style={{ color: "#647F97" }}>
                          {formatNumber(coord?.tipc_lat_min)}
                        </Typography>
                      </div>
                      <div className="ml-8 w-full flex justify-center items-center">
                        <Typography style={{ color: "#647F97" }}>
                          {formatNumber(coord?.tipc_lat_seg)}
                        </Typography>
                      </div>
                    </div>
                    <div className="w-1/2 flex justify-center items-center ml-8">
                      <div className="mr-8 w-full flex justify-center items-center">
                        <Typography style={{ color: "#647F97" }}>
                          {formatNumber(coord?.tipc_lon_grad)}
                        </Typography>
                      </div>
                      <div className="mx-8 w-full flex justify-center items-center">
                        <Typography style={{ color: "#647F97" }}>
                          {formatNumber(coord?.tipc_lon_min)}
                        </Typography>
                      </div>
                      <div className="ml-8 w-full flex justify-center items-center">
                        <Typography style={{ color: "#647F97" }}>
                          {formatNumber(coord?.tipc_lon_seg)}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4 ml-8 flex">
                    <div className="w-1/2 flex justify-center items-center mr-8">
                      <Typography style={{ color: "#647F97" }}>
                        {formatNumber(coord?.tipc_alt)}
                      </Typography>
                    </div>
                    <div className="w-1/2 ml-8 flex justify-center items-center">
                      <div>
                        <IconButton className="" onClick={deleteItem(i)}>
                          <TrashIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}

      <Divider
        style={{
          borderColor: "#D1E3F5",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      />
      <Grid
        container
        spacing={4}
        style={{
          paddingTop: "15px",
          paddingBottom: "10px",
          justifyContent: "right",
        }}
      >
        {handleDesAdd && (
          <Grid item xs={2} style={{}}>
            <CustomButton
              width="full"
              height="medium"
              label="Volver"
              className="outlinePrimary"
              onClick={() => handleDesAdd()}
              // disabled={disabledCoor}
            />
          </Grid>
        )}
        {handledChangeCoordenadas && (
          <Grid item xs={2} style={{}}>
            <CustomButton
              width="full"
              height="medium"
              label="Guardar"
              className="primary"
              onClick={handledChangeCoordenadas}
              disabled={disabledGuardar}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CustomCoordinates;
