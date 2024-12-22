import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { ErrorView } from "../../components";
import styles from "../../styles/globalStyles";
import { COLORS } from "../../constants";

const Stream = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeSpace}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView>
          <ErrorView
            msg={
              "No Live Streams Ongoing at the Moment. Kindly come back later. "
            }
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Stream;
