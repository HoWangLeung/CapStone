import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "99%",
    Height: "100%",
    marginTop: "15px"
  },
  inputFile: {
    display: "none"
  },
  pointer: {
    cursor: "pointer"
  }
});

export default function CustomerPicture(props) {
  const classes = useStyles();
  let fileInput = React.createRef();
  const handleEdit = () => {
    props.handleEdit();
  };
  const handleImageSubmit = e => {
    console.log(e.target.files);

    // console.log(fileInput.current.files[0].name);
  };

  return (
    <Card align="center" className={classes.root}>
      <CardActionArea onClick={handleImageSubmit}>
        <label for="file-input">
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="300"
            width="auto"
            image="https://images.unsplash.com/photo-1495568995596-9e40959aa178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            title="Contemplative Reptile"
            className={classes.pointer}
          />

          <CardContent className={classes.pointer}>
            <Typography gutterBottom variant="h5" component="h2">
              Welcome
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Thank you for your continuous support! Hope you have a nice day!
              If you have any question, just email us
            </Typography>
          </CardContent>
        </label>
        <input
          className={classes.inputFile}
          id="file-input"
          type="file"
          ref={fileInput}
          onChange={handleImageSubmit}
        />
      </CardActionArea>

      <CardActions>
        <Button onClick={handleEdit} size="small" color="primary">
          Edit Profile
        </Button>
      </CardActions>
    </Card>
  );
}
