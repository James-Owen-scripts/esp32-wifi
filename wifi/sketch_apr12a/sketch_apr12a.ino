#include "WiFi.h"
#include <WebServer.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "TELUS1574";
const char* password = "2822i64f5x";

// DHT config
#define DHTPIN 32
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
WebServer server(80);

// Setup
void setup() {
  Serial.begin(9600);
  initWiFi();
  dht.begin();
  serverSetup();
}

// Loop
void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.reconnect();
  }

  server.handleClient();
}

// Root route
void handleRoot() {
  server.send(200, "text/html", "<title>ESP32 Server</title><h1>Hello, you made a GET request!</h1>");
}

// Status route
void handleStatus() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  String response = "{\"temperature\":" + String(temperature) +
                    ",\"humidity\":" + String(humidity) + "}";
  server.send(200, "application/json", response);
}

// WiFi init
void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println("\nWiFi connected. IP: ");
  Serial.println(WiFi.localIP());
}

// Server setup
void serverSetup() {
  server.on("/", HTTP_GET, handleRoot);
  server.on("/status", HTTP_GET, handleStatus);
  server.begin();
  Serial.println("Web server started!");
}
