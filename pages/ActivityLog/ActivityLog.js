import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  screenHeight,
  Image,
  ActivityIndicator,
} from "react-native";
import Header from "../../Components/Header";
import { Picker } from "@react-native-picker/picker";
import { Dimensions } from "react-native";

export default function ActivityLog() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2021);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { Height } = Dimensions.get("window");
  const months = [
    { name: "January", val: 1 },
    { name: "February", val: 2 },
    { name: "March", val: 3 },
    { name: "April", val: 4 },
    { name: "May", val: 5 },
    { name: "June", val: 6 },
    { name: "July", val: 7 },
    { name: "August", val: 8 },
    { name: "September", val: 9 },
    { name: "October", val: 10 },
    { name: "November", val: 11 },
    { name: "December", val: 12 },
  ];
  const years = [
    { name: "2021", val: 2021 },
    { name: "2020", val: 2020 },
    { name: "2019", val: 2019 },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://sof.abpweddings.com/mats/activity/read/2180746/${selectedYear}/${selectedMonth}/0.json`,
      {
        method: "GET",
        //Request Type
      }
    )
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        setData(responseJson.activityDocuments);
        setIsLoading(false);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        console.error(error);
        setIsLoading(false);
      });
  }, [selectedMonth, selectedYear]);

  const getPretyDate = (name) => {
    const dateObject = new Date(parseInt(name));
    var Showmonth = months[dateObject.getMonth()].name;
    var Showday = dateObject.getDate();
    var showYear = dateObject.getFullYear();
    return Showmonth + " " + Showday + "," + showYear;
  };

  const getPretyTime = (time) => {
    let data = new Date(time);
    let hrs = data.getHours();
    let mins = data.getMinutes();
    if (hrs <= 9) hrs = "0" + hrs;
    if (mins < 10) mins = "0" + mins;
    let postTime = hrs + ":" + mins;
    if (parseInt(hrs) >= 12) postTime += " P.M.";
    else postTime += " A.M.";
    return postTime;
  };
  return (
    <ScrollView>
      <Header />
      <View style={styles.AppBody}>
        <View style={styles.DropdownContainer}>
          <View style={styles.DropdownContainer2}>
            <View>
              <Text>Year</Text>
            </View>
            <View style={styles.PickerContainer}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedYear(itemValue)
                }
              >
                {years.map((year) => {
                  return (
                    <Picker.Item
                      label={year.name}
                      value={year.val}
                      key={year.val}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.DropdownContainer2}>
            <Text>Month</Text>
            <View style={styles.PickerContainer}>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedMonth(itemValue)
                }
              >
                {months.map((month) => {
                  return (
                    <Picker.Item
                      label={month.name}
                      value={month.val}
                      key={month.val}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
        {!isLoading ? (
          <View>
            {data ? (
              Object.keys(data).map((name, index) => {
                return (
                  <View style={styles.dayContainer} key={index}>
                    <Text style={styles.activityDateText} key={index}>
                      {getPretyDate(name)}
                    </Text>
                    <View>
                      {Object.values(data)[index].map((innerdata) => {
                        return (
                          <View
                            key={innerdata.id}
                            style={styles.activityLogContainer}
                          >
                            <Image
                              source={{ uri: "https://picsum.photos/80/80" }}
                              style={{ width: 50, height: 50, marginRight: 20 }}
                            />
                            <View style={styles.activityLogContainerText}>
                              <Text style={styles.activityLogText}>
                                {innerdata.actionType}
                              </Text>
                              <Text style={styles.activityLogText}>
                                {innerdata.description}
                              </Text>
                              <Text style={styles.activityLogTime}>
                                {getPretyTime(innerdata.createdOn)}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })
            ) : (
              <View>
                <Text style={styles.EmptyText}>
                  No records found Select Diffrent Timeline
                </Text>
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="#0000ff"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  AppBody: {
    padding: 20,
    backgroundColor: "#ebe6e6",
  },
  DropdownContainer: {
    display: "flex",
    flexDirection: "row",
  },
  DropdownContainer2: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  PickerContainer: {
    width: "80%",
  },
  dayContainer: {
    marginTop: 20,
  },
  activityLogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  activityLogContainerText: {
    width: "60%",
  },
  activityLogText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  activityLogTime: {
    fontSize: 10,
    color: "gray",
  },
  activityDateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b02020",
  },
  activityIndicator: {
    marginTop: 200,
    marginBottom: 500,
  },
  EmptyText: {
    marginTop: 200,
    marginBottom: 500,
  },
});
