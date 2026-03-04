#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5
#define RST_PIN 22

MFRC522 rfid(SS_PIN, RST_PIN);

const char* ssid = "Wokwi-GUEST";
const char* password = "";

String server = "http://YOUR_LOCAL_IP:5000/api/scan-rfid";

void setup() {

 Serial.begin(115200);

 WiFi.begin(ssid,password);

 while(WiFi.status()!=WL_CONNECTED){
  delay(500);
 }

 SPI.begin();
 rfid.PCD_Init();
}

void loop() {

 if(!rfid.PICC_IsNewCardPresent()) return;

 if(!rfid.PICC_ReadCardSerial()) return;

 String uid="";

 for(byte i=0;i<rfid.uid.size;i++){
  uid += String(rfid.uid.uidByte[i],HEX);
 }

 HTTPClient http;

 http.begin(server);

 http.addHeader("Content-Type","application/json");

 String body = "{\"rfid_card\":\""+uid+"\"}";

 int code = http.POST(body);

 Serial.println(http.getString());

 http.end();

 delay(5000);

}