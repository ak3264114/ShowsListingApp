import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import { Paper, TextField } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "100px",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewSummery = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);


  const handleClick = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };


  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [summery, setSummery] = useState();
  let { id } = useParams();
  useEffect(() => {
    let url = `https://api.tvmaze.com/shows/${id}`;
    fetch(url)
      .then((res) =>
        res
          .json()
          .then((result) => {
            setSummery(result);
            console.log(result);
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
    console.log("summery", summery);
  }, []);
  return (
    <>
      <div className="" style={{ display: "flex" }}>
        <div className="" style={{ display: "inline" }}>
          <img src={summery?.image?.original} alt="" height="500px" />
        </div>
        <div className="" style={{ display: "inline", margin: "5% 5% 5% 10%" }}>
          <h1>{summery?.name}</h1>
          <br />
          <p style={{ fontSize: "16px", fontWeight: "500" }}>
            {summery?.summary.replace(/<\/?[^>]+>/gi, "")}
          </p>
          <div style={{ textAlign: "center", marginTop: "20%" }}>
            <button onClick={handleOpen} style={{ border: "none" }}>
              <Button buttonName="Book ticket" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Paper elevation={0} />
          <TextField
            id="outlined-disabled"
            label="Movie Name"
            defaultValue={summery?.name}
            sx={{ margin: "20px 80px" }}
          />
          <div className="">
            <TextField
              id="outlined-disabled"
              label="First Name"
              variant="outlined"
              sx={{ margin: "20px 80px" }}
            />
            <TextField
              id="outlined-disabled"
              label="Last Name"
              variant="outlined"
              sx={{ margin: "20px 80px" }}
            />
            <TextField
              id="outlined-disabled"
              label="Email"
              variant="outlined"
              sx={{ margin: "20px 80px" }}
            />
          </div>
          <Paper />
          <div
            className="buttons"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              className="button"
              onClick={handleClick}
              style={{ margin: "20px" }}
            >
              Submit
            </button>
            <button
              className="button"
              onClick={handleClose}
              style={{ margin: "20px" }}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ViewSummery;
