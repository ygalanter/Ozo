import clock from "clock";
import document from "document";
import * as messaging from "fitbit-file-messaging";
import * as fs from "fs";
import { me } from "appbit";
import dtlib from "../common/datetimelib"

const hour_hand = document.getElementById("hours");
const minute_hand = document.getElementById("minutes");
const date_text = document.getElementById("datetext");
const ampm_text = document.getElementById("ampmtext");
const date_group = document.getElementById("date");
const ampm_group = document.getElementById("ampm");

// trying to get user settings if saved before
let userSettings;
try {
  userSettings = fs.readFileSync("user_settings.json", "json");
} catch (e) {
  userSettings = {showAmPm: false, 
                  showDate: false
                 }
}

// on app exit collect settings 
me.onunload = () => {
  fs.writeFileSync("user_settings.json", userSettings, "json");
}

 ampm_group.style.display = userSettings.showAmPm? 'inline': 'none';
 date_group.style.display = userSettings.showDate? 'inline': 'none';


// Message is received
messaging.peerSocket.onmessage = evt => {
  
  switch (evt.data.key) {
    case "showAmPm":
          userSettings.showAmPm = (evt.data.newValue == "true");
          ampm_group.style.display = userSettings.showAmPm? 'inline': 'none';
          break;
    case "showDate":
          userSettings.showDate = (evt.data.newValue == "true");
          date_group.style.display = userSettings.showDate? 'inline': 'none';
          break;

  };
 
  clock.ontick({date: new Date()}); // and refresh the clock
      
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};



// Update the clock every minute
clock.granularity = "minutes";

// setting time format to always "12h" for analog clocls
dtlib.timeFormat = 1;


// Update the clock every tick event
clock.ontick = (evt) => {
  let today = evt.date;
  
  // obtaining time
  let hours = dtlib.format1224hour(today.getHours());
  let mins = today.getMinutes();
  
  //rotating secondary timezone hands
  hour_hand.groupTransform.rotate.angle = 360*hours/12; // rotating hours in increments of 1, disregarding minutes
  minute_hand.groupTransform.rotate.angle = 360  - 360 * Math.floor(mins/5)*5 / 60; // rotating minutes in increment of 5 

  date_text.text = dtlib.zeroPad(today.getDate());
  ampm_text.text = today.getHours() >= 12 ? 'PM' : 'AM';
  
 
}