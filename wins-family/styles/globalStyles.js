import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../constants";

const styles = StyleSheet.create({
  // Global
  spaceDown: {
    marginBottom: 50,
  },
  // Welcome
  welcome: {
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontFamily: FONT.bold,
    margin: 10,
  },
  welcomemsg: {
    alignSelf: "center",
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontStyle: "italic",
    alignItems: "center",
    textAlign: "center",
    margin: 10,
  },
  churchName: {
    alignSelf: "center",
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    fontFamily: FONT.bold,
    alignItems: "center",
    textAlign: "center",
  },
  //   Buttons
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#F37453",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: "#F37453",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnBtn: (bgColor) => ({
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    backgroundColor: bgColor,
  }),
  btnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },

  // Text Inputs
  textContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    // textAlign: "center",
    // marginTop: SIZES.large,
    // width: "90%",
    // // height: 20,
  },
  textWrapper: {
    backgroundColor: COLORS.white,
    margin: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: 45,
  },
  textInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: SIZES.medium,
  },

  // Home Styles
  homecontainer: {
    paddingHorizontal: 10,
  },
  homeheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  homeheaderTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  homeheaderBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  homecardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },

  // Home Search
  searchcontainer: {
    width: "100%",
    backgroundColor: COLORS.gray,
    paddingTop: 15,
    paddingBottom: 25,
  },

  searchwelcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    alignSelf: "center",
    marginVertical: 10,
  },
  searchsearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchsearchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchsearchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchsearchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchsearchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },

  // Scripture Card
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 120,
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
