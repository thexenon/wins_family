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
import styles from "../../styles/globalStyles";
// import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  // const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    phone: "",
    address: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      // const result = await createUser(form.email, form.password, form.username);
      // setUser(result);
      // setIsLogged(true);

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

          <Text style={styles.welcome}>Sign Up</Text>

          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <TextInput
                inputMode="text"
                keyboardType="default"
                style={styles.textInput}
                value={form.name}
                onChangeText={(e) => setForm({ ...form, name: e })}
                placeholder="Fullname"
              />
            </View>
          </View>

          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <TextInput
                inputMode="tel"
                keyboardType="numeric"
                style={styles.textInput}
                value={form.phone}
                onChangeText={(e) => setForm({ ...form, phone: e })}
                placeholder="Mobile Number"
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <TextInput
                inputMode="text"
                keyboardType="default"
                style={styles.textInput}
                value={form.address}
                onChangeText={(e) => setForm({ ...form, address: e })}
                placeholder="Address"
                multiline={true}
              />
            </View>
          </View>

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

          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <TextInput
                inputMode="text"
                keyboardType="default"
                style={styles.textInput}
                value={form.confirmpassword}
                onChangeText={(e) => setForm({ ...form, confirmpassword: e })}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
            </View>
          </View>

          <CustomButton
            color={"#213555"}
            text="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View>
            <Text style={styles.welcomemsg}>Already have an account?</Text>
            <Link style={styles.spaceDown} href="/sign-in">
              <Text style={styles.welcome}>SignIn</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
