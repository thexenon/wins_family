import { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from "../constants";
import styles from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      isUserLoggedIn();
    }, 5000);
  });

  const isUserLoggedIn = async () => {
    const token = await AsyncStorage.getItem("jwt");
    if (!token) {
      router.replace("/auth");
    } else {
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.gray,
      }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            textAlign: "center",
          }}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.churchName}>
            Wins Family Chapel International
          </Text>

          <Image
            style={{ height: 400, width: "100%", alignSelf: "center" }}
            source={images.logo}
            resizeMode="contain"
          />

          <Text style={styles.welcomemsg}>
            We are glad that you are joining us
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Splash;
