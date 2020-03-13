import React from "react";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import CurrentOrderCard from "./CurrentOrder";
import OrderHistoryCard from "./OrderHistory";
import CustomerInfo from "./CustomerInfo";
import CustomerPicture from "./CustomerPicture";
import EditProfileForm from "./EditProfileForm";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function Profile() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const [show, setShow] = React.useState(false);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "Male",
    address1: "",
    address2: "",
    district: "",
    area: "",
    password1: "",
    password2: ""
  });
  const handleEdit = () => {
    setShow(!show);
  };

  const handleChange = value => e => {
    console.log([value]);
    console.log(e.target.value);

    setState(prevState => ({ ...prevState, [value]: e.target.value }));
    console.log(state);
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleSubmit = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
        setSuccess(true);

        let {
          firstName,
          lastName,
          gender,
          age,
          phone,
          address1,
          address2,
          district,
          area,
          password1,
          password2
        } = state;
        if (password1 === password2 && password1 && password2 !== "") {
          let token = localStorage.token;
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          axios
            .put(
              `${process.env.REACT_APP_API_SERVER}/api/customerInfo`,
              {
                firstName,
                lastName,
                gender,
                age,
                phone,
                address1,
                address2,
                district,
                area,
                password1
              },
              config
            )
            .then(data => {
              setTimeout(() => {
                setShow(!show);
                setSuccess(false);
              }, 1500);
            })
            .catch(e => console.log(e));
        } else {
          alert("password not match");
        }
      }, 1500);
    }
  };

  return (
    <Grid container direction="row" spacing={0}>
      <Grid item md={4}>
        <CustomerPicture handleEdit={handleEdit} />
      </Grid>
      <Grid item md={8} align="center">
        {show === true ? null : <CustomerInfo />}

        {show === true ? (
          <EditProfileForm
            handleChange={handleChange}
            handleEdit={handleEdit}
            handleSubmit={handleSubmit}
            circular={<CircularProgress size={20} />}
            loading={loading}
            success={success}
          />
        ) : null}
        <br />

        <CurrentOrderCard />
        <br />

        <OrderHistoryCard />
      </Grid>
    </Grid>
  );
}
