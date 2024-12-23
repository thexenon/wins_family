import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image, TextInput } from "react-native";

import { COLORS, images } from "../../constants";
import styles from "../../styles/globalStyles";
import { CustomButton } from "../../components";
import { user_signup } from "../../utils/user_api";

const SignUp = () => {
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
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      user_signup({
        email: form.email,
        phone: form.phone,
        address: form.address,
        name: form.name,
        password: form.password,
        passwordConfirm: form.confirmpassword,
      })
        .then(async (result) => {
          if (result.status == "200") {
            await AsyncStorage.setItem("jwt", result?.data.token);
            await AsyncStorage.setItem("userUID", result?.data.data.user.id);
            Alert.alert("Welcome", `${result?.data.data.user.name}`);
            router.replace("/home");
          } else if (result.status == "fail") {
            Alert.alert(`${result.status.toUpperCase()}`, `${result.message}`);
          } else {
            Alert.alert("Somethin went wrong. Please try again later");
          }
        })
        .catch((err) => {
          Alert.alert("Error", err);
        });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray }}>
      <ScrollView>
        <View>
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

          <View style={{ marginBottom: 10 }}>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <TextInput
                  inputMode="text"
                  keyboardType="default"
                  style={styles.textInput}
                  value={form.name}
                  onChangeText={(e) => setForm({ ...form, name: e })}
                  placeholder="Fullname"
                  placeholderTextColor={COLORS.black}
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <TextInput
                  inputMode="tel"
                  keyboardType="numeric"
                  style={styles.textInput}
                  value={form.phone}
                  onChangeText={(e) => setForm({ ...form, phone: e })}
                  placeholder="Mobile Number"
                  placeholderTextColor={COLORS.black}
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <TextInput
                  inputMode="text"
                  keyboardType="default"
                  style={styles.textInput}
                  value={form.address}
                  onChangeText={(e) => setForm({ ...form, address: e })}
                  placeholder="Address"
                  placeholderTextColor={COLORS.black}
                  multiline={true}
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <TextInput
                  inputMode="email"
                  keyboardType="default"
                  style={styles.textInput}
                  value={form.email}
                  onChangeText={(e) => setForm({ ...form, email: e })}
                  placeholder="Email"
                  placeholderTextColor={COLORS.black}
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <TextInput
                  inputMode="text"
                  keyboardType="default"
                  style={styles.textInput}
                  value={form.password}
                  onChangeText={(e) => setForm({ ...form, password: e })}
                  placeholder="Password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <TextInput
                  inputMode="text"
                  keyboardType="default"
                  style={styles.textInput}
                  value={form.confirmpassword}
                  onChangeText={(e) => setForm({ ...form, confirmpassword: e })}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={true}
                />
              </View>
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
