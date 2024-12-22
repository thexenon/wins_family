import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { useCallback, useState, useEffect } from "react";

import { ScreenHeaderBtn, ErrorView } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/globalStyles";
import { submitComment } from "../../utils/user_api";

const tabs = ["Scripture", "Comments", "Likes"];
// const link = "http://127.0.0.1:3000";
const link = "https://wins-family.onrender.com";

const ScriptureDetails = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  //   const { data, isLoading, error, refetch } = useFetch("job-details", {
  //     job_id: params.id,
  //   });

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState({ comment: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const options = {
    method: "GET",
    url: `${link}/api/v1/scriptures/${params.id}`,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data.data);
      setIsLoading(false);
      setStatus(response.data.status);
    } catch (error) {
      setError(error);
      Alert.alert("Something went wrong.", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Scripture":
        return <ScriptureCard scripture={data} />;
      case "Comments":
        return (
          <FlatList
            data={data.comments}
            renderItem={({ item }) => <CommentCard comment={item} />}
            keyExtractor={(data) => data?._id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            vertical
            showsVerticalScrollIndicator={false}
          />
        );

      case "Likes":
        return (
          <FlatList
            data={data.reactions}
            renderItem={({ item }) => <LikeCard like={item} />}
            keyExtractor={(data) => data?._id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            vertical
            showsVerticalScrollIndicator={false}
          />
        );

      default:
        break;
    }
  };

  const submitMyComment = async () => {
    if (commentText.comment == "") {
      Alert.alert("Error", "Please fill in a comment");
    }

    setSubmitting(true);
    if (isSubmitting) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    try {
      await submitComment({ comment: commentText.comment }, params.id)
        .then((result) => {
          console.log(result);

          if (result.status == "201") {
            Alert.alert("Success", "Comment Submitted");
          } else if (result.status == "fail") {
            Alert.alert(`${result.status.toUpperCase()}`, `${result.message}`);
          } else {
            Alert.alert("Somethin went wrong. Please try again later");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: `${data.title}`,
        }}
      />

      <>
        <ScriptureTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} />
          }>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <ErrorView msg={"Something went wrong. Please try again"} />
          ) : data.length === 0 || data == null ? (
            <ErrorView msg={"No Data!!!"} />
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 20 }}>
              {displayTabContent()}
              <View style={{ flexDirection: "row" }}>
                <View style={styles.searchcontainer}>
                  <View style={styles.commentContainer}>
                    <View style={styles.commentWrapper}>
                      <TextInput
                        style={styles.commentInput}
                        placeholder="Leave a comment"
                        placeholderTextColor={COLORS.black}
                        value={commentText}
                        onChangeText={(e) => setCommentText({ comment: e })}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.commentBtnUpload}
                      onPress={submitMyComment}>
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        style={styles.commentBtnImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentBtnLike}>
                      <Image
                        source={icons.heartOutline}
                        resizeMode="contain"
                        style={styles.commentBtnImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const LikeCard = ({ like }) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentImageContainer}>
        <Image
          source={{ uri: `${link}/img/users/${like?.photo}` }}
          resizeMode="cover"
          style={styles.commentImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.scriptureName}>{like?.name}</Text>
      </View>
      <Image
        source={icons.heartOutline}
        resizeMode="contain"
        style={styles.likeBtnImage}
      />
    </View>
  );
};
const CommentCard = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentImageContainer}>
        <Image
          source={{ uri: `${link}/img/users/${comment?.user?.photo}` }}
          resizeMode="cover"
          style={styles.commentImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.commentName} numberOfLines={1}>
          {comment?.user?.name}
        </Text>
        <Text style={styles.commentComment}>{comment?.comment}</Text>
      </View>
    </View>
  );
};

const ScriptureCard = ({ scripture }) => {
  return (
    <View>
      <Text style={styles.descscriptureSummary}>
        Summary: {scripture?.summary}
      </Text>
      <Image
        source={{ uri: `${link}/img/scriptures/${scripture?.fileSRC}` }}
        resizeMode="cover"
        style={{ height: 200, width: "100%" }}
      />
      <Text style={styles.descscriptureDesc}>{scripture?.description}</Text>

      <Image
        source={{ uri: `${link}/img/scriptures/${scripture?.images[0]}` }}
        resizeMode="cover"
        style={{
          height: 400,
          width: "90%",
          alignSelf: "center",
          marginVertical: 10,
        }}
      />
      <Image
        source={{ uri: `${link}/img/scriptures/${scripture?.images[1]}` }}
        resizeMode="cover"
        style={{
          height: 400,
          width: "90%",
          alignSelf: "center",
          marginVertical: 10,
        }}
      />
      <Image
        source={{ uri: `${link}/img/scriptures/${scripture?.images[3]}` }}
        resizeMode="cover"
        style={{
          height: 400,
          width: "90%",
          alignSelf: "center",
          marginVertical: 10,
        }}
      />
    </View>
  );
};

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.tabbtn(name, activeTab)}
    onPress={onHandleSearchType}>
    <Text style={styles.tabbtnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);
const ScriptureTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabcontainer}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};
export default ScriptureDetails;
