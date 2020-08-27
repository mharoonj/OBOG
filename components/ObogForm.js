import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import {
  View,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Icon,
  Title,
  Picker,
  Spinner
} from "native-base";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import Joi from "react-native-joi";
import firebase from './Firebase';
import {
  nameSchema,
  emailSchema,
  numberSchema,
  addressSchema,
  dateSchema,
  genderSchema,
  schoolNameSchema,
} from "./Schemas";
import { SuccessToast, DangerToast } from "./MyToast";
console.disableYellowBox = true;
const { width, height } = Dimensions.get("window");

export default class ObogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      name_error: "",
      email: "",
      email_error: "",
      number: "",
      number_error: "",
      address: "",
      address_error: "",
      schoolName: "",
      schoolName_error: "",
      startYear: "",
      startYear_error: "",
      endYear: "",
      endYear_error: "",
      gender: "",
      gender_error: "",
      current: 0,
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      selected: undefined,
      error: "",
      submitted: true
    };
  }



  strSplit(date) {
    if (date) {
      return new Date(date).toDateString();
    }
    return "";
  }
  showStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: true });
  };

  showEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: true });
  };
  hideEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: false });
  };
  hideStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: false });
  };

  handleStartDatePicked = async (date) => {
    await this.setState({ startYear: date });
    // console.log("A date has been picked: ", this.state.startdate);
    this.hideStartDateTimePicker();
  };
  handleEndDatePicked = async (date) => {
    await this.setState({ endYear: date });
    // console.log("A date has been picked: ", this.state.enddate);
    this.hideEndDateTimePicker();
  };
  onChangeInput = (name, value) => {
    this.setState((state) => ({ [name]: value }));
  };
  onValueChange(value) {
    this.setState({
      gender: value,
    });
  }
  arrayComponentList = () => {
    var items = [
      <View>
        <Item
          style={{ width: width * 0.85, marginLeft: 0 }}
          key={0}
          error={this.state.name_error ? true : false}
        >
          <Ionicons
            style={{ paddingLeft: 5 }}
            name="md-person"
            size={24}
            color="black"
          />
          <Input
            style={{ paddingLeft: 20 }}
            value={this.state.name}
            onChangeText={(text) => this.onChangeInput("name", text)}
            placeholder="Your Name"
          />
          {/* <Icon name="checkmark-circle" /> */}
        </Item>
      </View>,
      <Item
        style={{ width: width * 0.85, marginLeft: 0, marginTop: 10 }}
        key={1}
      >
        <MaterialIcons
          style={{ paddingLeft: 5 }}
          name="email"
          size={24}
          color="black"
        />
        <Input
          style={{ paddingLeft: 20 }}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(text) => this.onChangeInput("email", text)}
        />
        {/* <Icon name="checkmark-circle" /> */}
      </Item>,

      <Item style={{ width: width * 0.85, marginLeft: 0 }} key={2}>
        <Ionicons name="ios-phone-portrait" size={24} color="black" />
        <Input
          style={{ paddingLeft: 20 }}
          placeholder="Phone Number"
          value={this.state.number}
          onChangeText={(text) => this.onChangeInput("number", text)}
        />
        {/* <Icon name="checkmark-circle" /> */}
      </Item>,

      <Item style={{ width: width * 0.85, marginLeft: 0 }} key={3}>
        <MaterialIcons name="home" size={24} color="black" />
        <Input
          style={{ paddingLeft: 20 }}
          placeholder="Address"
          value={this.state.address}
          onChangeText={(text) => this.onChangeInput("address", text)}
        />
        {/* <Icon name="checkmark-circle" /> */}
      </Item>,

      <Item style={{ width: width * 0.85, marginLeft: 0 }} key={1}>
        <MaterialIcons name="school" size={24} color="black" />
        <Input
          style={{ paddingLeft: 20 }}
          placeholder="Name of School"
          value={this.state.schoolName}
          onChangeText={(text) => this.onChangeInput("schoolName", text)}
        />
        {/* <Icon name="checkmark-circle" /> */}
      </Item>,
      <View
        style={{
          marginLeft: 25,
          marginRight: 25,
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: width * 0.9,
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.9 }}>
            <Button
              bordered
              info
              onPress={this.showStartDateTimePicker}
              style={{
                borderColor: this.state.startYear_Error ? "red" : "blue",
                width: width * 0.7,
              }}
            >
              <Text>
                Start Date :{" "}
                {this.state.startYear
                  ? this.strSplit(this.state.startYear)
                  : "Select date"}
              </Text>
            </Button>
            <DateTimePicker
              isVisible={this.state.isStartDateTimePickerVisible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideStartDateTimePicker}
            />
          </View>
        </View>

        <View
          style={{
            width: width * 0.9,
            marginTop: 10,
            justifyContent: "center",
          }}
        ></View>
        <View style={{ flex: 1 }}>
          <Button
            bordered
            info
            onPress={this.showEndDateTimePicker}
            style={{
              borderColor: this.state.endYear_Error ? "red" : "blue",
              width: width * 0.7,
            }}
          >
            <Text>
              End Date :{" "}
              {this.state.endYear
                ? this.strSplit(this.state.endYear)
                : "Select date"}
            </Text>
          </Button>
          <DateTimePicker
            isVisible={this.state.isEndDateTimePickerVisible}
            onConfirm={this.handleEndDatePicked}
            onCancel={this.hideEndDateTimePicker}
          />
        </View>
        <View />
      </View>,

      <Item style={{ width: width * 0.85, marginLeft: 0 }} key={3}>
        <Label>Select Your Gender :</Label>
        <Form>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select your Gender"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: width * 0.4 }}
            selectedValue={this.state.gender}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Choose" value="0" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </Form>
        {/* <Icon name="checkmark-circle" /> */}
      </Item>,
    ];

    return items;
  };
  renderFormItem = () => {
    const items = this.arrayComponentList();
    return items[this.state.current];
  };

  renderError = () => {
    const i = this.state.current;
    if (i === 0) {
      return this.state.name_error ? this.state.name_error : "";
    } else if (i === 1) {
      return this.state.email_error ? this.state.email_error : "";
    } else if (i === 2) {
      return this.state.number_error ? this.state.number_error : "";
    } else if (i === 3) {
      return this.state.address_error ? this.state.address_error : "";
    } else if (i === 4) {
      return this.state.schoolName_error ? this.state.schoolName_error : "";
    } else if (i === 5) {
      return this.state.startYear_error ? this.state.startYear_error : "";
    } else if (i === 6) {
      return this.state.gender_error ? this.state.gender_error : "";
    }
  };
  onNextPress = () => {
    const i = this.state.current;
    const b = false;
    if (i === 0) {
      Joi.validate({ name: this.state.name }, nameSchema, (err, val) => {
        if (!err) {
          // console.log("valid");
          var c = this.state.current + 1;
          this.setState({ current: c, name_error: "" });
        } else {
          //console.log(err);
          const s = err.toString().split("[");
          const strError = s[1].split("]");
          // console.log(strError[0]);
          this.setState({ name_error: strError[0] });
        }
      });
    } else if (i === 1) {
      Joi.validate({ email: this.state.email }, emailSchema, (err, val) => {
        if (!err) {
          //console.log("valid");
          var c = this.state.current + 1;
          this.setState({ current: c, email_error: "" });
        } else {
          //console.log(err);
          const s = err.toString().split("[");
          const strError = s[1].split("]");
          //console.log(strError[0]);
          this.setState({ email_error: strError[0] });
        }
      });
    } else if (i === 2) {
      Joi.validate({ number: this.state.number }, numberSchema, (err, val) => {
        if (!err) {
          // console.log("valid");
          var c = this.state.current + 1;
          this.setState({ current: c, number_error: "" });
        } else {
          // console.log(err);
          const s = err.toString().split("[");
          const strError = s[1].split("]");
          //console.log(strError[0]);
          this.setState({ number_error: strError[0] });
        }
      });
    } else if (i === 3) {
      Joi.validate(
        { address: this.state.address },
        addressSchema,
        (err, val) => {
          if (!err) {
            //console.log("valid");
            var c = this.state.current + 1;
            this.setState({ current: c, address_error: "" });
          } else {
            //console.log(err);
            const s = err.toString().split("[");
            const strError = s[1].split("]");
            // console.log(strError[0]);
            this.setState({ address_error: strError[0] });
          }
        }
      );
    } else if (i === 4) {
      Joi.validate(
        { schoolName: this.state.schoolName },
        schoolNameSchema,
        (err, val) => {
          if (!err) {
            //    console.log("valid");
            var c = this.state.current + 1;
            this.setState({ current: c, schoolName_error: "" });
          } else {
            //console.log(err);
            const s = err.toString().split("[");
            const strError = s[1].split("]");
            //console.log(strError[0]);
            this.setState({ schoolName_error: strError[0] });
          }
        }
      );
    } else if (i === 5) {
      //console.log("entered");
      var s = new Date(this.state.startYear);

      var e = new Date(this.state.endYear);
      // console.log("start: ", s);
      // console.log("end: ", e);
      if (!this.state.endYear || !this.state.startYear) {
        this.setState({ startYear_error: "Select both dates" });
      } else {
        if (s > e) {
          // console.log("invalid");
          this.setState({
            startYear_error: "Starting date should be before Ending date",
          });
        } else {
          var c = this.state.current + 1;
          this.setState({ current: c, startYear_error: "" });
        }
      }
    } else if (i === 6) {
      Joi.validate({ gender: this.state.gender }, genderSchema, (err, val) => {
        if (!err) {
          //    console.log("valid");
          var c = this.state.current + 1;
          this.setState({ current: c, gender_error: "" });
        } else {
          //console.log(err);
          const s = err.toString().split("[");
          const strError = s[1].split("]");
          //console.log(strError[0]);
          this.setState({ gender_error: strError[0] });
        }
      });
    }

    // console.log(this.state.current);
  };

  onSubmitForm= () => {

    Joi.validate({ gender: this.state.gender }, genderSchema, (err, val) => {
        if (!err) {
          //    console.log("valid");
          //var c = this.state.current + 1;
          this.setState({ gender_error: "", submitted: false });
          var newPostKey = firebase
          .database()
          .ref()
          .child("students")
          .push().key;
      
       
        var updates = {};
        const { name, email, number, address, schoolName, startYear, endYear, gender}= this.state
        updates["/students/" + newPostKey] = {
          name:name,
          email:email,
          number: number,
          address: address,
          schoolName: schoolName,
          startYear: startYear,
          endYear: endYear,
          gender: gender
        };
      setTimeout(()=>{
        if(!this.state.submitted){
            this.setState({submitted: true});
            DangerToast("Internet Problem");
        }
      }, 12000);
        return firebase
          .database()
          .ref()
          .update(updates, (err)=>{
              if(!err){
                  console.log("added");

                  this.setState({submitted: true});
                  SuccessToast("Submitted successfully");
              }else{
                  console.log("failed");
                  this.setState({submitted: true});
                  DangerToast("Failded to submit");
              }
          });
        } else {
          //console.log(err);
          const s = err.toString().split("[");
          const strError = s[1].split("]");
          //console.log(strError[0]);
          this.setState({ gender_error: strError[0] });
        }
      });

  }
  render() {
    var images = [
      require("../assets/backtoschool.jpg"),
      require("../assets/bachpan.png"),
      require("../assets/friends.jpg"),
      require("../assets/exam.png"),
      require("../assets/school.jpg"),
      require("../assets/graduation.png"),
      require("../assets/address.jpg"),
    ];
    var currentImage = images[this.state.current];
    return (
      <Container style={{ backgroundColor: "#EFEEFD" }}>
        {/* <Header transparent>
          <Left></Left>
          <Body></Body>
        </Header> */}
        <StatusBar hidden />
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 80,
              alignItem: "center",
              justifyContent: "center",
              backgroundColor: "#EFEEFD",
              paddingTop: 20,
              marginTop: 20,
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
              }}
              source={require("../assets/logo.png")}
            />
          </View>
          <Text />

          <Card
            style={{
              width: width * 0.95,
              marginLeft: 10,
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            {/* <CardItem style={{ backgroundColor: "#fff9e1" }} bordered header>
              <Text> </Text>
            </CardItem> */}

            <CardItem>
              <Body>
                <View
                  style={{
                    flex: 1,
                    height: 300,
                    flexDirection: "column",
                    alignItem: "center",
                    justifyContent: "center",
                    backgroundColor:
                      this.state.current === 0 ? "#FDF9F6" : "#ffffff",
                  }}
                >
                  <Image
                    style={{
                      width: width * 0.9,
                      height: 300,
                      resizeMode: "contain",
                    }}
                    source={currentImage}
                  />
                </View>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  keyboardVerticalOffset={Platform.select({
                    ios: () => 0,
                    android: () => 10,
                  })()}
                >
                  <Content style={{ padding: 0, margin: 0 }}>
                    <Form style={{ padding: 0, margin: 0, marginBottom: 20 }}>
                      {/* Name */}
                      {this.renderFormItem()}
                      <Text
                        style={{
                          color: "red",
                          width: width * 0.8,
                          flexWrap: "wrap",
                        }}
                      >
                        {this.renderError()}
                      </Text>
                    </Form>
                    <View
                      style={{
                        width: width * 0.85,
                        flexDirection: "row",
                      }}
                    >
                      {this.state.current > 0 ? (
                        <Button
                          onPress={() => {
                            var c = this.state.current - 1;
                            this.setState({ current: c });
                          }}
                          transparent
                        >
                          <MaterialIcons
                            name="navigate-before"
                            size={24}
                            color="black"
                          />
                          <Text>prev</Text>
                        </Button>
                      ) : null}
                      <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                        {this.state.current < 6 ? (
                          <Button
                            onPress={() => {
                              this.onNextPress();
                            }}
                            transparent
                            style={{ alignSelf: "flex-end" }}
                          >
                            <Text>next</Text>
                            <MaterialIcons
                              name="navigate-next"
                              size={24}
                              color="black"
                            />
                          </Button>
                        ) : (
                          <Button
                            onPress={() => {
                              this.onSubmitForm();
                            }}
                            success
                            style={{ alignSelf: "flex-end", borderRadius: 7 }}
                          >
                              {this.state.submitted?<Text>submit</Text>:<Spinner color="blue" />}
                            
                          </Button>
                        )}
                      </View>
                    </View>
                  </Content>
                </KeyboardAvoidingView>
                {this.state.current === 0 ? (
                  <Text
                    style={{
                      color: "#3F51B5",
                      fontWeight: "700",
                      marginTop: 10,
                    }}
                  >
                    OBOG (0ldboys /Oldgirls )
                  </Text>
                ) : null}
                {this.state.current === 0 ? (
                  <Text style={{ marginTop: 3, color: "grey" }}>
                    Is an app designed to collect details of past school
                    students that have attended schools /colleges In order to
                    reconnect with fellow past school mates teachers,
                    principals, Register with OBOG today and reconnect your past
                    school mates
                  </Text>
                ) : null}
                {/* 
                <Button
                  style={{ marginTop: 20, backgroundColor: "#fff9e1" }}
                  bordered
                  full
                  success
                >
                  <Text>
                    Live Weight : {this.calWeight()}, Ton:{" "}
                    {this.calWeightGirthOnly() / 40}
                  </Text>
                </Button> */}
              </Body>
            </CardItem>
          </Card>
          <Text />
        </ScrollView>
      </Container>
    );
  }
}
