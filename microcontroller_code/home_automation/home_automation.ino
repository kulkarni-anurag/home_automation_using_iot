#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

 const char* ssid = "WiFi_SSID";
 const char* password = "WiFi_Password";

 //Setting Digital Pins
 int device1_pin=D3;
 int switch1_pin=D4;
 int switch2_pin=D5;
 int switch3_pin=D6;

 int device_status1;
 int device_status2;

//Setting the WiFi and Pin Modes 
void setup () {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting..");
  }
  
  pinMode(device1_pin,OUTPUT);
  pinMode(switch1_pin,OUTPUT);
  pinMode(switch2_pin,OUTPUT);
  pinMode(switch3_pin,OUTPUT);
}
 
void loop() {
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;  //Declare an object of class HTTPClient
    /*----------------------------------------------*/

    http.begin("url_stating_status_of_light1");  //Specify request destination
    int httpCode1 = http.GET();                                          //Send the request
    if (httpCode1 > 0) { //Check the returning code
      String payload = http.getString();   //Get the request response payload
      device_status1 = payload.toInt();
      //Serial.print("Device 1 Status=");
      //Serial.print(device_status1); //Print the response payload
      //Serial.println();
    }
    
    /*----------------------------------------------*/
    
    http.begin("url_stating_status_of_fan_speed");  //Specify request destination
    int httpCode2 = http.GET();                                          //Send the request
    if (httpCode2 > 0) { //Check the returning code
      String payload = http.getString();   //Get the request response payload
      device_status2 = payload.toInt();
      //Serial.print("Device 2 Status=");
      //Serial.print(device_status2); //Print the response payload
      //Serial.println();
    }

    /*----------------------------------------------*/
    
    http.end();   //Close connection
  }
  
  //If status is 1 turn on the light otherwise turn off
  if(device_status1 == 1){
     digitalWrite(device1_pin,HIGH);
     Serial.println("Device 1 ON");  
  }else if(device_status1 == 0){
     digitalWrite(device1_pin,LOW);
     Serial.println("Device 1 OFF");
  }
  
  //Change the speed according to status
  if(device_status2 == 1){
     digitalWrite(switch1_pin,HIGH);
     digitalWrite(switch2_pin,LOW);
     digitalWrite(switch3_pin,LOW);
     Serial.println("Device 2 Speed 1"); 
  }else if(device_status2 == 2){
     digitalWrite(switch1_pin,HIGH);
     digitalWrite(switch2_pin,HIGH);
     digitalWrite(switch3_pin,LOW);
     Serial.println("Device 2 Speed 2");
  }else if(device_status2 == 3){
     digitalWrite(switch1_pin,LOW);
     digitalWrite(switch2_pin,LOW);
     digitalWrite(switch3_pin,HIGH);
     Serial.println("Device 2 Speed 3");
  }else if(device_status2 == 0){
     digitalWrite(switch1_pin,LOW);
     digitalWrite(switch2_pin,LOW);
     digitalWrite(switch3_pin,LOW);
     Serial.println("Device 2 OFF");
  }
}