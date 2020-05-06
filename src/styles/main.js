import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  mainContainer: {
    display: "flex",
    marginTop: "10px",
    backgroundColor: "#fff",
    padding: "20px",
  },

  mainLeft: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "0 0 230px",
  },

  mainRight: {
    display: "flex",
    flex: "auto",
    flexFlow: "row wrap",
    paddingTop: "10px",
    marginLeft: "10px",
  },

  title: {
    fontSize: "26px",
    lineHeight: "26px",
    fontWeight: "300",
    margin: "10px 0 35px",
    padding: "0",
  },

  chooseLevel: {
    fontSize: "22px",
    lineHeight: "22px",
    fontWeight: "300",
    marginTop: "10px",
  },

  buttonGroup: {
    marginBottom: "30px",
  },

  button: {
    width: "100%",
    marginBottom: "15px",
  },

  mainCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: "1 1 200px",
    width: "200px",
    margin: "0px 5px 20px 5px",
  },

  mainImg: {
    flex: "1 1 auto",
    justifyContent: "space-between",
  },

  mainTitle: {
    flex: "1 1 auto",
    justifyContent: "space-between",
  },

  previewImg: {
    width: "100%",
  },

  mainActions: {
    height: "50px",
    flex: "1 1 auto",
    justifyContent: "space-between",
  },

  loading: {
    fontSize: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
  },

  ratingIcon: {
    width: 28,
    height: 28,
  },
});
