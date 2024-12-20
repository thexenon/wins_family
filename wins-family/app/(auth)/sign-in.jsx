import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TextInput,
} from "react-native";

import { COLORS, icons, images, SIZES, FONT } from "../../constants";
import { CustomButton, FormField } from "../../components";
import styles from "../../styles/globalStyles";
// import { getCurrentUser, signIn } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      // await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray }}>
      <ScrollView>
        <View
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}>
          <Image
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              marginTop: 40,
            }}
            source={images.logo}
            resizeMode="contain"
          />

          <Text style={styles.welcome}>Sign In</Text>

          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <TextInput
                inputMode="email"
                keyboardType="default"
                style={styles.textInput}
                value={form.email}
                onChangeText={(e) => setForm({ ...form, email: e })}
                placeholder="Email"
              />
            </View>
          </View>

          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <TextInput
                inputMode="text"
                keyboardType="default"
                style={styles.textInput}
                value={form.password}
                onChangeText={(e) => setForm({ ...form, password: e })}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
          </View>

          <View>
            <Link
              style={(styles.welcomemsg, styles.welcome)}
              href="/forgot-password">
              <Text>Forgot password</Text>
            </Link>
          </View>

          <CustomButton
            color={"#213555"}
            text="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View>
            <Text style={styles.welcomemsg}>Don't have an account?</Text>
            <Link style={(styles.welcomemsg, styles.welcome)} href="/sign-up">
              <Text>Signup</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
