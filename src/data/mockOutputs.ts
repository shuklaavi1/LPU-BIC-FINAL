import { BuilderResponse } from '@/types';

// Full, realistic prebuilt outputs keyed by project ID.
// These are used in DEMO_MODE and as fallback when the API fails.

const MOCK_OUTPUTS: Record<string, BuilderResponse> = {

  'smart-irrigation': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: 'Main microcontroller' },
      { component: 'Soil Moisture Sensor (YL-69 + LM393)', quantity: '1', notes: 'Analog capacitive soil probe' },
      { component: '5V 1-Channel Relay Module', quantity: '1', notes: 'For isolating pump from MCU' },
      { component: 'Submersible Mini Water Pump (3–5V)', quantity: '1', notes: 'For water delivery' },
      { component: '9V Alkaline Battery + Clip', quantity: '1', notes: 'Power for Arduino' },
      { component: 'Breadboard (Half Size)', quantity: '1', notes: '' },
      { component: 'Jumper Wires (M–M, M–F)', quantity: '20', notes: 'Various lengths' },
    ],
    pin_map: [
      {
        device: 'Soil Moisture Sensor (YL-69)',
        details: 'Analog output from LM393 comparator board',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Sensor power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
          { from_pin: 'A0', to_node: 'A0 (Arduino)', notes: 'Analog moisture reading (0–1023)' },
        ],
      },
      {
        device: '5V Relay Module',
        details: 'Active-LOW triggered relay; coil draws ~70mA from 5V pin',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Relay coil power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
          { from_pin: 'IN', to_node: 'D8 (Arduino)', notes: 'Logic trigger — LOW = pump ON' },
          { from_pin: 'COM', to_node: 'Battery +', notes: 'External power for pump circuit' },
          { from_pin: 'NO', to_node: 'Pump +', notes: 'Normally Open — connects when relay triggers' },
        ],
      },
      {
        device: 'Submersible Pump',
        details: 'Powered from external battery via relay — never GPIO directly',
        connections: [
          { from_pin: 'Pump +', to_node: 'Relay NO', notes: 'Switched via relay' },
          { from_pin: 'Pump −', to_node: 'GND (shared)', notes: 'Common ground with Arduino' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: The soil moisture sensor probe is inserted into the soil. The LM393 comparator converts resistance between probes to an analog voltage (0–1023 on A0).',
      'Processing: Arduino reads A0 every second. If the value < 400, soil is dry. If value > 700, soil is wet.',
      'Decision: When dry (A0 < 400), the Arduino pulls pin D8 LOW, activating the relay.',
      'Actuation: The relay COM–NO circuit closes, connecting the external battery to the pump. Water flows until soil is moist.',
      'Feedback: When soil moisture rises above 700, Arduino sets D8 HIGH, relay opens, pump stops. A 5-second debounce prevents rapid switching.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Never power pump from GPIO', description: 'The pump draws 200–500mA — far beyond the 40mA GPIO limit. Always route pump power through the relay using an external supply.' },
      { severity: 'critical', title: 'Common Ground Required', description: 'The external pump battery GND must connect to Arduino GND. Without a common ground, the relay circuit will not function correctly.' },
      { severity: 'warning', title: 'Keep sensor probe dry at connector', description: 'Water must not reach the PCB/connector end of the soil probe. Only the metal prongs should contact the soil.' },
      { severity: 'info', title: 'Calibrate thresholds for your soil type', description: 'The values 400 (dry) and 700 (wet) are estimates. Read dry and fully watered soil and adjust hardcoded thresholds accordingly.' },
    ],
    code: `/*
  Innobotix — Smart Irrigation System
  Board: Arduino Uno | Sensor: YL-69 | Load: Relay + Pump
*/

const int moisturePin = A0;
const int relayPin    = 8;

const int DRY_THRESHOLD = 400;   // below = dry, pump ON
const int WET_THRESHOLD = 700;   // above = wet,  pump OFF

void setup() {
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);  // Relay is active-LOW; HIGH = pump OFF at start
  Serial.println("Smart Irrigation System Ready");
}

void loop() {
  int moisture = analogRead(moisturePin);
  Serial.print("Moisture: ");
  Serial.println(moisture);

  if (moisture < DRY_THRESHOLD) {
    digitalWrite(relayPin, LOW);   // Pump ON
    Serial.println("Soil DRY — Pump ON");
  } else if (moisture > WET_THRESHOLD) {
    digitalWrite(relayPin, HIGH);  // Pump OFF
    Serial.println("Soil WET — Pump OFF");
  }
  // Between thresholds: keep current state (hysteresis)

  delay(1000);
}`,
    follow_up_questions: [
      'How would you add an LCD display to show moisture level in real time?',
      'Can you modify this to water plants only twice a day at fixed times?',
      'How would you make this solar-powered for outdoor use?',
    ],
    concepts_learned: ['Analog sensor reading (ADC)', 'Relay-based load switching', 'Threshold automation', 'Hysteresis logic'],
    estimated_budget: '₹450 – ₹650',
  },

  'smart-street-light': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: 'Microcontroller' },
      { component: 'LDR (Light Dependent Resistor)', quantity: '1', notes: '5mm GL5528 or equivalent' },
      { component: '10kΩ Resistor', quantity: '1', notes: 'Pull-down for voltage divider with LDR' },
      { component: 'High-Brightness White LED', quantity: '1', notes: 'Simulates street light' },
      { component: '220Ω Resistor', quantity: '1', notes: 'Current limiting for LED' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '15', notes: '' },
    ],
    pin_map: [
      {
        device: 'LDR + 10kΩ Voltage Divider',
        details: 'LDR in series with 10kΩ to GND — midpoint to A0',
        connections: [
          { from_pin: 'Top of LDR', to_node: '5V', notes: 'Power rail' },
          { from_pin: 'Mid (LDR–Resistor junction)', to_node: 'A0 (Arduino)', notes: 'Analog light level input' },
          { from_pin: 'Bottom of 10kΩ', to_node: 'GND', notes: 'Pull-down to ground' },
        ],
      },
      {
        device: 'White LED',
        details: 'Anode through 220Ω resistor to D9; cathode to GND',
        connections: [
          { from_pin: 'Anode (+)', to_node: 'D9 via 220Ω', notes: 'Digital output PWM capable' },
          { from_pin: 'Cathode (−)', to_node: 'GND', notes: 'Ground' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: The LDR and 10kΩ form a voltage divider. In bright light, LDR resistance is low (~1kΩ), so A0 reads LOW. In darkness, LDR resistance rises (~100kΩ), so A0 reads HIGH.',
      'Processing: Arduino continuously reads A0. A threshold of 500 separates "day" from "night" conditions.',
      'Decision: If the reading exceeds 500 (dark), the LED is switched ON. If it drops below 400 (bright), LED is switched OFF.',
      'Actuation: Digital pin D9 goes HIGH/LOW to control the LED through the current-limiting resistor.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Always use current-limiting resistor with LED', description: 'Without the 220Ω resistor, excessive current will burn out the LED and potentially damage pin D9.' },
      { severity: 'warning', title: 'LDR placement matters', description: 'Keep the LDR away from the LED — the LED light can create a feedback loop causing rapid flickering.' },
      { severity: 'info', title: 'Calibrate threshold for your environment', description: 'The threshold value 500 may need adjustment depending on ambient lighting in your classroom or demo room.' },
    ],
    code: `/*
  Innobotix — Smart Street Light
  Board: Arduino Uno | Sensor: LDR | Output: LED
*/

const int ldrPin  = A0;
const int ledPin  = 9;

const int DARK_THRESHOLD   = 500;
const int BRIGHT_THRESHOLD = 400;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  Serial.println("Smart Street Light Ready");
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  Serial.print("LDR: ");
  Serial.println(ldrValue);

  if (ldrValue > DARK_THRESHOLD) {
    digitalWrite(ledPin, HIGH);  // Dark — light ON
    Serial.println("Night — Light ON");
  } else if (ldrValue < BRIGHT_THRESHOLD) {
    digitalWrite(ledPin, LOW);   // Bright — light OFF
    Serial.println("Day — Light OFF");
  }
  delay(500);
}`,
    follow_up_questions: [
      'How would you dim the light gradually instead of just ON/OFF?',
      'Can you add a time-based override so lights stay OFF after midnight?',
    ],
    concepts_learned: ['LDR voltage divider', 'Analog threshold logic', 'Digital output control', 'Light sensing'],
    estimated_budget: '₹200 – ₹350',
  },

  'fire-gas-alarm': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: 'Microcontroller' },
      { component: 'MQ-2 Gas/Smoke Sensor Module', quantity: '1', notes: 'Detects LPG, smoke, CO' },
      { component: 'Flame Sensor Module (IR)', quantity: '1', notes: 'Detects visible flame/fire' },
      { component: 'Piezo Buzzer (5V Active)', quantity: '1', notes: 'Alert output' },
      { component: 'Red LED', quantity: '1', notes: 'Visual alarm indicator' },
      { component: '220Ω Resistor', quantity: '1', notes: 'LED current limiter' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      {
        device: 'MQ-2 Gas Sensor Module',
        details: 'Has both AO (analog) and DO (digital threshold) outputs. Use AO for precision.',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Module power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
          { from_pin: 'AO', to_node: 'A0 (Arduino)', notes: 'Analog gas concentration (0–1023)' },
        ],
      },
      {
        device: 'Flame Sensor Module',
        details: 'IR-based flame detector — DO goes LOW when flame detected',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Module power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
          { from_pin: 'DO', to_node: 'D7 (Arduino)', notes: 'Digital: LOW = flame detected' },
        ],
      },
      {
        device: 'Piezo Buzzer',
        details: 'Active buzzer — buzzes when pin goes HIGH',
        connections: [
          { from_pin: '+', to_node: 'D8 (Arduino)', notes: 'Digital trigger output' },
          { from_pin: '−', to_node: 'GND', notes: 'Ground' },
        ],
      },
      {
        device: 'Red LED',
        details: 'Visual alert indicator',
        connections: [
          { from_pin: 'Anode', to_node: 'D9 via 220Ω', notes: 'Digital output' },
          { from_pin: 'Cathode', to_node: 'GND', notes: 'Ground' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: MQ-2 reads gas concentration on A0. Flame sensor monitors infrared radiation on D7.',
      'Processing: Arduino checks A0 value every 500ms. An A0 reading above 400 means gas detected. D7 going LOW means flame is present.',
      'Decision: If EITHER gas OR flame is detected, alarm state is set to true.',
      'Actuation: D8 (buzzer) is pulled HIGH and D9 (red LED) is pulled HIGH to trigger both visual and audible alarms.',
      'Reset: Both sensors must read safe values simultaneously for 3 consecutive cycles before the alarm is silenced.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'MQ-2 requires 2-minute warm-up', description: 'The MQ-2 heating element needs 2 minutes after power-on to reach stable operation temperature. Add a startup delay or ignore readings for the first 120s.' },
      { severity: 'warning', title: 'Avoid sprays and alcohol near sensor', description: 'Deodorant, sanitizer sprays, and cooking alcohol will trigger false alarms. Keep sensor away from such sources during demos.' },
      { severity: 'info', title: 'Calibrate gas threshold in your environment', description: 'The threshold 400 on A0 is a starting point. Measure baseline indoors and set the alarm threshold ~30% above that.' },
    ],
    code: `/*
  Innobotix — Fire and Gas Alarm System
  Board: Arduino Uno
  Sensors: MQ-2 (A0) + Flame Sensor (D7)
  Output: Buzzer (D8) + Red LED (D9)
*/

const int gasPin   = A0;
const int flamePin = 7;
const int buzzer   = 8;
const int redLed   = 9;

const int GAS_THRESHOLD = 400;

void setup() {
  Serial.begin(9600);
  pinMode(flamePin, INPUT);
  pinMode(buzzer,   OUTPUT);
  pinMode(redLed,   OUTPUT);
  digitalWrite(buzzer, LOW);
  digitalWrite(redLed, LOW);
  delay(2000);  // MQ-2 warm-up
  Serial.println("Fire & Gas Alarm — Armed");
}

void loop() {
  int gasLevel    = analogRead(gasPin);
  bool flameDetected = (digitalRead(flamePin) == LOW);

  Serial.print("Gas: "); Serial.print(gasLevel);
  Serial.print(" | Flame: "); Serial.println(flameDetected ? "YES" : "no");

  if (gasLevel > GAS_THRESHOLD || flameDetected) {
    digitalWrite(buzzer, HIGH);
    digitalWrite(redLed, HIGH);
    Serial.println("!!! ALARM TRIGGERED !!!");
  } else {
    digitalWrite(buzzer, LOW);
    digitalWrite(redLed, LOW);
  }
  delay(500);
}`,
    follow_up_questions: [
      'How would you add an LCD to show which sensor triggered the alarm?',
      'Can you send an SMS alert when gas is detected using a GSM module?',
    ],
    concepts_learned: ['Multi-sensor integration', 'Analog threshold detection', 'Active sensor warm-up', 'Emergency alarm logic'],
    estimated_budget: '₹350 – ₹500',
  },

  'home-security': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'PIR Motion Sensor (HC-SR501)', quantity: '1', notes: 'Passive Infrared — detects body heat movement' },
      { component: 'Piezo Buzzer (Active, 5V)', quantity: '1', notes: 'Alarm sound' },
      { component: 'Green LED', quantity: '1', notes: 'System armed/safe indicator' },
      { component: 'Red LED', quantity: '1', notes: 'Intruder detected indicator' },
      { component: '220Ω Resistors', quantity: '2', notes: 'One per LED' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '15', notes: '' },
    ],
    pin_map: [
      {
        device: 'PIR Sensor (HC-SR501)',
        details: 'Output stays HIGH for ~3s after motion, adjustable with onboard pot',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Sensor power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
          { from_pin: 'OUT', to_node: 'D2 (Arduino)', notes: 'HIGH when motion detected' },
        ],
      },
      {
        device: 'Piezo Buzzer',
        connections: [
          { from_pin: '+', to_node: 'D8', notes: 'Alarm trigger' },
          { from_pin: '−', to_node: 'GND', notes: '' },
        ],
        details: 'Active buzzer — buzzes on HIGH',
      },
      {
        device: 'Green LED (Safe)',
        connections: [
          { from_pin: 'Anode', to_node: 'D9 via 220Ω', notes: '' },
          { from_pin: 'Cathode', to_node: 'GND', notes: '' },
        ],
        details: 'Lit when system is armed and no motion',
      },
      {
        device: 'Red LED (Alarm)',
        connections: [
          { from_pin: 'Anode', to_node: 'D10 via 220Ω', notes: '' },
          { from_pin: 'Cathode', to_node: 'GND', notes: '' },
        ],
        details: 'Lit and flashing when intruder detected',
      },
    ],
    circuit_flow: [
      'Idle: System is armed. Green LED is ON. PIR output is LOW.',
      'Sensing: PIR sensor detects infrared radiation from moving warm bodies within 5–7m range.',
      'Trigger: PIR OUT goes HIGH for ~3 seconds each time motion is detected.',
      'Alarm: Arduino sets D8 (buzzer) HIGH and D10 (red LED) HIGH while silencing green LED (D9 LOW).',
      'Reset: After PIR output returns LOW and stays low for 5 seconds, alarm silences and green LED returns.',
    ],
    safety_checks: [
      { severity: 'warning', title: 'PIR warm-up time: 30–60 seconds', description: 'After power-on, the PIR sensor requires 30–60 seconds to calibrate to ambient infrared levels. Add a startup delay to prevent false triggers.' },
      { severity: 'info', title: 'Adjust PIR sensitivity and delay pots', description: 'HC-SR501 has two adjustable potentiometers: one for sensitivity range (2–7m) and one for output delay time (0.5s–200s). Set them before demo.' },
      { severity: 'info', title: 'Avoid placing near AC vents or windows', description: 'Heat flow from HVAC or direct sunlight through windows can cause false motion triggers due to rapid infrared changes.' },
    ],
    code: `/*
  Innobotix — Home Security Alarm
  Board: Arduino Uno | Sensor: PIR HC-SR501
  Output: Buzzer + Red/Green LEDs
*/

const int pirPin    = 2;
const int buzzer    = 8;
const int greenLed  = 9;
const int redLed    = 10;

bool armed = true;

void setup() {
  Serial.begin(9600);
  pinMode(pirPin,   INPUT);
  pinMode(buzzer,   OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed,   OUTPUT);
  delay(30000);  // PIR calibration warm-up
  Serial.println("Security System Armed");
  digitalWrite(greenLed, HIGH);
}

void loop() {
  int motion = digitalRead(pirPin);

  if (motion == HIGH) {
    Serial.println("INTRUDER DETECTED!");
    digitalWrite(greenLed, LOW);
    digitalWrite(redLed,   HIGH);
    digitalWrite(buzzer,   HIGH);
    delay(5000);  // Alarm for 5 seconds
    digitalWrite(buzzer,   LOW);
    digitalWrite(redLed,   LOW);
    digitalWrite(greenLed, HIGH);
  }
  delay(200);
}`,
    follow_up_questions: [
      'How would you add a password button to temporarily disarm the system?',
      'Can you log intrusion events with timestamps using an RTC module?',
    ],
    concepts_learned: ['PIR motion sensing', 'State-based control logic', 'Multi-output alerting', 'Security system design'],
    estimated_budget: '₹300 – ₹450',
  },

  'smart-dustbin': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'HC-SR04 Ultrasonic Sensor', quantity: '1', notes: 'Detects hand proximity' },
      { component: 'SG90 Micro Servo Motor', quantity: '1', notes: 'Opens/closes lid' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '15', notes: '' },
    ],
    pin_map: [
      {
        device: 'HC-SR04 Ultrasonic Sensor',
        details: 'Measures distance using 40kHz sound pulses',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: '' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'TRIG', to_node: 'D9', notes: 'Trigger pulse output' },
          { from_pin: 'ECHO', to_node: 'D10', notes: 'Echo pulse input' },
        ],
      },
      {
        device: 'SG90 Servo Motor',
        details: '0° = lid closed, 90° = lid open',
        connections: [
          { from_pin: 'Red (VCC)', to_node: '5V', notes: 'Servo power' },
          { from_pin: 'Brown (GND)', to_node: 'GND', notes: 'Ground' },
          { from_pin: 'Orange (Signal)', to_node: 'D6 (PWM)', notes: 'Position control' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: HC-SR04 sends an ultrasonic pulse via TRIG and measures the echo return time on ECHO.',
      'Processing: Arduino converts pulse duration to distance in centimeters using the formula: distance = (duration / 2) / 29.1.',
      'Decision: If distance < 20cm, a hand is detected nearby. If distance > 25cm, no hand present.',
      'Actuation: Servo rotates to 90° (lid opens) on hand detection. After a 3-second hold, servo returns to 0° (lid closes).',
    ],
    safety_checks: [
      { severity: 'warning', title: 'Servo current draw on 5V pin', description: 'SG90 under load can draw up to 500mA. If powering from USB, use an external 5V supply for the servo to avoid brownouts.' },
      { severity: 'info', title: 'Tune detection distance', description: 'Adjust the threshold (currently 20cm) based on your dustbin lid height. Measure and test before the demo.' },
    ],
    code: `/*
  Innobotix — Smart Dustbin
  Board: Arduino Uno
  Sensor: HC-SR04 | Actuator: SG90 Servo
*/

#include <Servo.h>

const int trigPin = 9;
const int echoPin = 10;
const int servoPin = 6;

Servo lidServo;

long getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long dur = pulseIn(echoPin, HIGH);
  return dur / 58;  // cm
}

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  lidServo.attach(servoPin);
  lidServo.write(0);  // Closed
}

void loop() {
  long dist = getDistance();
  Serial.print("Distance: "); Serial.print(dist); Serial.println(" cm");

  if (dist < 20) {
    lidServo.write(90);   // Open
    delay(3000);
    lidServo.write(0);    // Close
  }
  delay(200);
}`,
    follow_up_questions: [
      'How would you add a fill-level sensor inside the bin to alert when it is full?',
    ],
    concepts_learned: ['Ultrasonic distance measurement', 'Servo position control', 'Touchless interaction', 'Pulse-width measurement'],
    estimated_budget: '₹350 – ₹500',
  },

  'traffic-light': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'Red LED', quantity: '1', notes: '5mm through-hole' },
      { component: 'Yellow LED', quantity: '1', notes: '5mm through-hole' },
      { component: 'Green LED', quantity: '1', notes: '5mm through-hole' },
      { component: '220Ω Resistors', quantity: '3', notes: 'One per LED' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '10', notes: '' },
    ],
    pin_map: [
      {
        device: 'Traffic Signal LEDs',
        details: 'Three separate LEDs — each with own current-limiting resistor',
        connections: [
          { from_pin: 'Red LED Anode', to_node: 'D8 via 220Ω', notes: 'Stop signal' },
          { from_pin: 'Yellow LED Anode', to_node: 'D9 via 220Ω', notes: 'Caution signal' },
          { from_pin: 'Green LED Anode', to_node: 'D10 via 220Ω', notes: 'Go signal' },
          { from_pin: 'All Cathodes', to_node: 'GND', notes: 'Common ground' },
        ],
      },
    ],
    circuit_flow: [
      'Red phase (10s): Only D8 HIGH — vehicles stop.',
      'Yellow phase (3s): Only D9 HIGH — vehicles prepare to move.',
      'Green phase (10s): Only D10 HIGH — vehicles move.',
      'Cycle repeats continuously with precise timing.',
    ],
    safety_checks: [
      { severity: 'info', title: 'Always use resistors with LEDs', description: 'Without 220Ω resistors, LEDs draw too much current and burn out within minutes. One resistor per LED is required.' },
    ],
    code: `/*
  Innobotix — Traffic Light Controller
  Board: Arduino Uno | LEDs: Red D8 / Yellow D9 / Green D10
*/

const int redPin    = 8;
const int yellowPin = 9;
const int greenPin  = 10;

void allOff() {
  digitalWrite(redPin,    LOW);
  digitalWrite(yellowPin, LOW);
  digitalWrite(greenPin,  LOW);
}

void setup() {
  pinMode(redPin,    OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin,  OUTPUT);
  allOff();
}

void loop() {
  // Red — STOP
  allOff();
  digitalWrite(redPin, HIGH);
  delay(10000);

  // Yellow — READY
  allOff();
  digitalWrite(yellowPin, HIGH);
  delay(3000);

  // Green — GO
  allOff();
  digitalWrite(greenPin, HIGH);
  delay(10000);
}`,
    follow_up_questions: [
      'How would you add a pedestrian crossing button that pauses traffic?',
    ],
    concepts_learned: ['Digital output pins', 'Timed sequence logic', 'LED circuit basics', 'State machine design'],
    estimated_budget: '₹150 – ₹250',
  },

  'parking-assist': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'HC-SR04 Ultrasonic Sensor', quantity: '1', notes: 'Distance measurement' },
      { component: 'Green LED', quantity: '1', notes: 'Safe distance' },
      { component: 'Yellow LED', quantity: '1', notes: 'Caution zone' },
      { component: 'Red LED', quantity: '1', notes: 'Too close' },
      { component: 'Piezo Buzzer', quantity: '1', notes: 'Proximity beeper' },
      { component: '220Ω Resistors', quantity: '3', notes: '' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '15', notes: '' },
    ],
    pin_map: [
      {
        device: 'HC-SR04', details: 'Ultrasonic ranging sensor',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: '' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'TRIG', to_node: 'D9', notes: '' },
          { from_pin: 'ECHO', to_node: 'D10', notes: '' },
        ],
      },
      {
        device: 'LEDs + Buzzer', details: 'Output indicators',
        connections: [
          { from_pin: 'Green Anode', to_node: 'D4 via 220Ω', notes: '>40cm = safe' },
          { from_pin: 'Yellow Anode', to_node: 'D5 via 220Ω', notes: '20–40cm = caution' },
          { from_pin: 'Red Anode', to_node: 'D6 via 220Ω', notes: '<20cm = danger' },
          { from_pin: 'Buzzer +', to_node: 'D7', notes: 'Faster beep as closer' },
          { from_pin: 'All GND', to_node: 'GND', notes: '' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: HC-SR04 measures distance to nearest object.',
      'Processing: Distance is mapped into three zones: Safe (>40cm), Caution (20–40cm), Danger (<20cm).',
      'Actuation: Corresponding LED lights up; buzzer beep rate increases proportionally as distance decreases.',
    ],
    safety_checks: [
      { severity: 'info', title: 'Buzzer beep rate calibration', description: 'Adjust delay intervals in each zone for your demo environment. Too-fast beeping can be distracting in a classroom.' },
    ],
    code: `/*
  Innobotix — Parking Assist System
  Board: Arduino Uno
*/

const int trig = 9, echo = 10;
const int gLed = 4, yLed = 5, rLed = 6, buz = 7;

long getDistance() {
  digitalWrite(trig, LOW); delayMicroseconds(2);
  digitalWrite(trig, HIGH); delayMicroseconds(10);
  digitalWrite(trig, LOW);
  return pulseIn(echo, HIGH) / 58;
}

void allLedsOff() {
  digitalWrite(gLed, LOW); digitalWrite(yLed, LOW); digitalWrite(rLed, LOW);
}

void setup() {
  Serial.begin(9600);
  pinMode(trig, OUTPUT); pinMode(echo, INPUT);
  pinMode(gLed, OUTPUT); pinMode(yLed, OUTPUT);
  pinMode(rLed, OUTPUT); pinMode(buz, OUTPUT);
}

void loop() {
  long d = getDistance();
  Serial.print("Dist: "); Serial.print(d); Serial.println("cm");
  allLedsOff();

  if (d > 40) {
    digitalWrite(gLed, HIGH);
    digitalWrite(buz, LOW);
  } else if (d > 20) {
    digitalWrite(yLed, HIGH);
    digitalWrite(buz, HIGH); delay(100);
    digitalWrite(buz, LOW);  delay(400);
  } else {
    digitalWrite(rLed, HIGH);
    digitalWrite(buz, HIGH); delay(50);
    digitalWrite(buz, LOW);  delay(100);
  }
}`,
    follow_up_questions: ['How would you add an LCD to display the exact distance?'],
    concepts_learned: ['Ultrasonic sensing', 'Distance-proportional feedback', 'Multi-indicator output', 'Zone-based logic'],
    estimated_budget: '₹300 – ₹450',
  },

  'temp-fan': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'DHT11 Temperature & Humidity Sensor', quantity: '1', notes: 'With module board' },
      { component: 'L298N Motor Driver Module', quantity: '1', notes: 'For DC motor speed control' },
      { component: 'DC Fan Motor (5V)', quantity: '1', notes: 'Small hobby motor' },
      { component: 'Blue LED', quantity: '1', notes: 'Cooling indicator' },
      { component: '220Ω Resistor', quantity: '1', notes: '' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      {
        device: 'DHT11 Sensor', details: 'Single-wire digital temperature/humidity',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: '' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'DATA', to_node: 'D2', notes: '10kΩ pull-up to 5V recommended on data line' },
        ],
      },
      {
        device: 'L298N Motor Driver', details: 'IN1/IN2 = direction; ENA = PWM speed',
        connections: [
          { from_pin: 'ENA', to_node: 'D9 (PWM)', notes: 'Speed control' },
          { from_pin: 'IN1', to_node: 'D7', notes: 'Direction A' },
          { from_pin: 'IN2', to_node: 'D8', notes: 'Direction B' },
          { from_pin: 'V+ (motor)', to_node: '5V or external', notes: 'Motor supply voltage' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground with Arduino' },
          { from_pin: 'OUT1/OUT2', to_node: 'DC Motor terminals', notes: 'Motor output' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: DHT11 sends temperature and humidity as a digital serial packet on D2.',
      'Processing: Arduino maps temperature to fan speed (25°C = slow, 35°C+ = full speed).',
      'Actuation: analogWrite on ENA varies PWM duty cycle (0–255) to control fan RPM.',
      'Feedback: Blue LED brightness increases with fan speed using the same PWM value.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Never connect DC motor directly to GPIO', description: 'Motors draw 200mA+ and produce back-EMF spikes. Always use the L298N motor driver between Arduino and motor.' },
      { severity: 'warning', title: 'Common ground between L298N and Arduino', description: 'If powering L298N from a separate supply, connect its GND to Arduino GND for shared reference.' },
    ],
    code: `/*
  Innobotix — Temperature Controlled Fan
  Board: Arduino Uno | Sensor: DHT11 | Driver: L298N
*/

#include <DHT.h>

#define DHTPIN  2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const int enaPin = 9, in1 = 7, in2 = 8, blueLed = 6;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(in1, OUTPUT); pinMode(in2, OUTPUT);
  pinMode(enaPin, OUTPUT); pinMode(blueLed, OUTPUT);
  digitalWrite(in1, HIGH); digitalWrite(in2, LOW);
}

void loop() {
  float temp = dht.readTemperature();
  if (isnan(temp)) { Serial.println("DHT read error"); delay(2000); return; }

  Serial.print("Temp: "); Serial.print(temp); Serial.println("°C");

  int speed = 0;
  if (temp >= 35) speed = 255;
  else if (temp >= 30) speed = map(temp, 30, 35, 100, 255);
  else if (temp >= 25) speed = 80;

  analogWrite(enaPin, speed);
  analogWrite(blueLed, speed);
  delay(2000);
}`,
    follow_up_questions: ['How would you display temperature on an LCD screen?'],
    concepts_learned: ['DHT11 digital sensing', 'PWM motor speed control', 'L298N motor driver', 'Temperature-based automation'],
    estimated_budget: '₹400 – ₹600',
  },

  'rfid-door-lock': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'MFRC522 RFID Reader Module', quantity: '1', notes: 'SPI interface, 3.3V logic' },
      { component: 'RFID Cards/Key Fobs', quantity: '2', notes: '13.56MHz Mifare Classic' },
      { component: 'SG90 Servo Motor', quantity: '1', notes: 'For latch control' },
      { component: 'Green LED', quantity: '1', notes: 'Access granted' },
      { component: 'Red LED', quantity: '1', notes: 'Access denied' },
      { component: 'Piezo Buzzer', quantity: '1', notes: '' },
      { component: '220Ω Resistors', quantity: '2', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      {
        device: 'MFRC522 RFID Reader', details: 'SPI interface — uses 3.3V, NOT 5V',
        connections: [
          { from_pin: 'VCC', to_node: '3.3V', notes: 'IMPORTANT: 3.3V only, not 5V' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'SDA (SS)', to_node: 'D10', notes: 'SPI chip select' },
          { from_pin: 'SCK', to_node: 'D13', notes: 'SPI clock' },
          { from_pin: 'MOSI', to_node: 'D11', notes: 'SPI data out' },
          { from_pin: 'MISO', to_node: 'D12', notes: 'SPI data in' },
          { from_pin: 'RST', to_node: 'D9', notes: 'Reset pin' },
        ],
      },
      {
        device: 'SG90 Servo', details: 'Latch control',
        connections: [
          { from_pin: 'Signal (Orange)', to_node: 'D6', notes: '0° = locked, 90° = unlocked' },
          { from_pin: 'VCC (Red)', to_node: '5V', notes: '' },
          { from_pin: 'GND (Brown)', to_node: 'GND', notes: '' },
        ],
      },
    ],
    circuit_flow: [
      'Standby: System waits for an RFID card to be presented. Red LED on softly.',
      'Scan: MFRC522 reads card UID over SPI when card comes within 3–5cm.',
      'Authentication: Arduino compares UID against a stored authorized list.',
      'Grant: Green LED ON, servo rotates to 90° (unlocked), buzzer beeps once. After 3 seconds, servo returns to 0° (locked).',
      'Deny: Red LED flashes, buzzer beeps 3 times rapidly, servo stays locked.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'MFRC522 uses 3.3V — not 5V', description: 'Connecting VCC to 5V will permanently damage the MFRC522 module. Always use the Arduino 3.3V pin.' },
      { severity: 'info', title: 'Read and hardcode UIDs first', description: 'Upload a UID-reader sketch first, scan your card, note the UID, then hardcode it into the access control sketch.' },
    ],
    code: `/*
  Innobotix — RFID Door Lock
  Board: Arduino Uno | RFID: MFRC522 | Servo: SG90
  Install library: MFRC522 by GithubCommunity
*/

#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define SS_PIN  10
#define RST_PIN  9

MFRC522 rfid(SS_PIN, RST_PIN);
Servo latch;

const int greenLed = 7, redLed = 8, buzzer = 5, servoPin = 6;

// Replace with your authorized card UID (run UID reader sketch first)
byte authorizedUID[] = {0xAB, 0xCD, 0xEF, 0x12};

bool checkUID(byte *uid, byte size) {
  if (size != 4) return false;
  for (byte i = 0; i < 4; i++)
    if (uid[i] != authorizedUID[i]) return false;
  return true;
}

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  latch.attach(servoPin);
  latch.write(0);
  pinMode(greenLed, OUTPUT); pinMode(redLed, OUTPUT); pinMode(buzzer, OUTPUT);
  Serial.println("RFID Lock Ready — Present card");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  bool granted = checkUID(rfid.uid.uidByte, rfid.uid.size);
  if (granted) {
    Serial.println("ACCESS GRANTED");
    digitalWrite(greenLed, HIGH); tone(buzzer, 1000, 200);
    latch.write(90); delay(3000); latch.write(0);
    digitalWrite(greenLed, LOW);
  } else {
    Serial.println("ACCESS DENIED");
    for (int i = 0; i < 3; i++) {
      digitalWrite(redLed, HIGH); tone(buzzer, 500, 100); delay(200);
      digitalWrite(redLed, LOW); delay(200);
    }
  }
  rfid.PICC_HaltA();
}`,
    follow_up_questions: ['How would you add multiple authorized cards?', 'Can you log access attempts with timestamps?'],
    concepts_learned: ['SPI communication protocol', 'RFID/NFC technology', 'Access control systems', 'UID-based authentication'],
    estimated_budget: '₹550 – ₹750',
  },

  'weather-station': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'DHT11 Temperature & Humidity Sensor', quantity: '1', notes: '' },
      { component: 'BMP180 Barometric Pressure Sensor', quantity: '1', notes: 'I2C interface' },
      { component: 'SSD1306 OLED Display (0.96" I2C)', quantity: '1', notes: '128x64 pixels' },
      { component: 'Breadboard', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      {
        device: 'DHT11', details: 'Temperature and humidity',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: '' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'DATA', to_node: 'D2', notes: '' },
        ],
      },
      {
        device: 'BMP180 + OLED (shared I2C bus)', details: 'Both use I2C on same SDA/SCL pins',
        connections: [
          { from_pin: 'VCC (both)', to_node: '3.3V', notes: '' },
          { from_pin: 'GND (both)', to_node: 'GND', notes: '' },
          { from_pin: 'SDA (both)', to_node: 'A4 (SDA)', notes: 'Shared I2C data line' },
          { from_pin: 'SCL (both)', to_node: 'A5 (SCL)', notes: 'Shared I2C clock line' },
        ],
      },
    ],
    circuit_flow: [
      'DHT11 sends temperature and humidity as digital serial on D2.',
      'BMP180 sends atmospheric pressure over I2C (address 0x77).',
      'OLED receives formatted readings over I2C (address 0x3C) and displays them.',
      'Screen refreshes every 2 seconds with latest readings.',
    ],
    safety_checks: [
      { severity: 'info', title: 'BMP180 and OLED are 3.3V devices', description: 'Both modules work at 3.3V. Most breakout boards have onboard regulators so 5V input is fine, but verify your specific module.' },
      { severity: 'info', title: 'Install required libraries', description: 'Requires: DHT by Adafruit, Adafruit_BMP085, and Adafruit_SSD1306 libraries from Arduino Library Manager.' },
    ],
    code: `/*
  Innobotix — Weather Station
  Board: Arduino Uno
  Libraries: DHT, Adafruit_BMP085, Adafruit_SSD1306
*/

#include <Wire.h>
#include <DHT.h>
#include <Adafruit_BMP085.h>
#include <Adafruit_SSD1306.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP085 bmp;
Adafruit_SSD1306 oled(128, 64, &Wire);

void setup() {
  Serial.begin(9600);
  dht.begin();
  bmp.begin();
  oled.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  oled.clearDisplay();
}

void loop() {
  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();
  float pres = bmp.readPressure() / 100.0;

  oled.clearDisplay();
  oled.setTextSize(1); oled.setTextColor(WHITE);
  oled.setCursor(0, 0);  oled.print("Innobotix Weather");
  oled.setCursor(0, 16); oled.print("Temp: "); oled.print(temp); oled.print(" C");
  oled.setCursor(0, 28); oled.print("Hum:  "); oled.print(hum); oled.print(" %");
  oled.setCursor(0, 40); oled.print("Pres: "); oled.print(pres); oled.print(" hPa");
  oled.display();
  delay(2000);
}`,
    follow_up_questions: ['How would you log readings to an SD card for data analysis?'],
    concepts_learned: ['I2C communication protocol', 'Multi-sensor integration', 'OLED display driving', 'Environmental data collection'],
    estimated_budget: '₹500 – ₹750',
  },

  'line-follower': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'IR Sensor Module (TCRT5000)', quantity: '2', notes: 'Left and right sensors' },
      { component: 'L298N Motor Driver Module', quantity: '1', notes: '' },
      { component: 'DC Gear Motor (6V)', quantity: '2', notes: 'Left and right drive' },
      { component: 'Robot Chassis with wheels', quantity: '1', notes: 'Two-wheel drive platform' },
      { component: 'Caster Wheel', quantity: '1', notes: 'Front support wheel' },
      { component: '7.4V LiPo Battery or 6x AA pack', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      {
        device: 'Left IR Sensor', details: 'LOW = on black line, HIGH = off line',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: '' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'OUT', to_node: 'D2', notes: 'Left line detection' },
        ],
      },
      {
        device: 'Right IR Sensor', details: 'LOW = on black line, HIGH = off line',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: '' },
          { from_pin: 'GND', to_node: 'GND', notes: '' },
          { from_pin: 'OUT', to_node: 'D3', notes: 'Right line detection' },
        ],
      },
      {
        device: 'L298N Motor Driver', details: 'IN1/IN2 = left motor, IN3/IN4 = right motor',
        connections: [
          { from_pin: 'IN1', to_node: 'D8', notes: 'Left motor direction' },
          { from_pin: 'IN2', to_node: 'D9', notes: 'Left motor direction' },
          { from_pin: 'IN3', to_node: 'D10', notes: 'Right motor direction' },
          { from_pin: 'IN4', to_node: 'D11', notes: 'Right motor direction' },
          { from_pin: 'V+ (12V)', to_node: 'Battery +', notes: 'Motor power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
        ],
      },
    ],
    circuit_flow: [
      'Sensing: Both IR sensors emit IR light and detect reflection. White surface reflects (HIGH), black line absorbs (LOW).',
      'Logic Table: Both HIGH = forward. Left LOW = turn left. Right LOW = turn right. Both LOW = stop.',
      'Actuation: L298N receives direction commands and drives each motor independently.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Use separate power for motors', description: 'Never power motors from Arduino 5V. Use the battery directly through L298N to avoid brownouts and resets.' },
      { severity: 'warning', title: 'Calibrate IR sensor height', description: 'Mount IR sensors 5–15mm above the surface for reliable line detection. Too high = false readings. Too low = dragging.' },
    ],
    code: `/*
  Innobotix — Line Following Robot
  Board: Arduino Uno | Sensors: 2x IR | Driver: L298N
*/

const int leftSensor  = 2, rightSensor = 3;
const int in1 = 8, in2 = 9, in3 = 10, in4 = 11;

void forward()  { digitalWrite(in1,HIGH);digitalWrite(in2,LOW);digitalWrite(in3,HIGH);digitalWrite(in4,LOW); }
void turnLeft() { digitalWrite(in1,LOW); digitalWrite(in2,LOW);digitalWrite(in3,HIGH);digitalWrite(in4,LOW); }
void turnRight(){ digitalWrite(in1,HIGH);digitalWrite(in2,LOW);digitalWrite(in3,LOW); digitalWrite(in4,LOW); }
void stopBot()  { digitalWrite(in1,LOW); digitalWrite(in2,LOW);digitalWrite(in3,LOW); digitalWrite(in4,LOW); }

void setup() {
  pinMode(leftSensor, INPUT); pinMode(rightSensor, INPUT);
  pinMode(in1,OUTPUT);pinMode(in2,OUTPUT);pinMode(in3,OUTPUT);pinMode(in4,OUTPUT);
}

void loop() {
  bool L = !digitalRead(leftSensor);   // LOW when on line
  bool R = !digitalRead(rightSensor);

  if (L && R)  stopBot();
  else if (!L && !R) forward();
  else if (L && !R)  turnLeft();
  else if (!L && R)  turnRight();
}`,
    follow_up_questions: ['How would you add speed control for smoother curves?'],
    concepts_learned: ['IR reflection sensing', 'Differential drive control', 'Feedback robotics', 'Boolean logic for navigation'],
    estimated_budget: '₹650 – ₹900',
  },

  'obstacle-avoiding': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'HC-SR04 Ultrasonic Sensor', quantity: '1', notes: 'Mounted on servo for scanning' },
      { component: 'SG90 Servo Motor', quantity: '1', notes: 'Sensor panning mount' },
      { component: 'L298N Motor Driver', quantity: '1', notes: '' },
      { component: 'DC Gear Motors', quantity: '2', notes: '' },
      { component: 'Robot Chassis + Wheels', quantity: '1', notes: '' },
      { component: 'Battery Pack (7.4V)', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      { device: 'HC-SR04', details: 'On servo mount', connections: [{ from_pin: 'TRIG', to_node: 'D9', notes: '' }, { from_pin: 'ECHO', to_node: 'D10', notes: '' }, { from_pin: 'VCC', to_node: '5V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }] },
      { device: 'SG90 Servo (sensor mount)', details: 'Center=90°, Left=150°, Right=30°', connections: [{ from_pin: 'Signal', to_node: 'D6', notes: '' }, { from_pin: 'VCC', to_node: '5V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }] },
      { device: 'L298N', details: 'Dual motor driver', connections: [{ from_pin: 'IN1', to_node: 'D4', notes: '' }, { from_pin: 'IN2', to_node: 'D5', notes: '' }, { from_pin: 'IN3', to_node: 'D7', notes: '' }, { from_pin: 'IN4', to_node: 'D8', notes: '' }] },
    ],
    circuit_flow: [
      'Forward scan: Ultrasonic looks ahead. If distance > 30cm, move forward.',
      'Obstacle: If distance < 30cm, stop and pan servo left then right to measure both sides.',
      'Decision: Turn toward the side with greater clearance.',
      'Resume: Continue forward after turning.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Separate motor power supply', description: 'Motors need their own battery. Do not power from Arduino 5V.' },
    ],
    code: `/*
  Innobotix — Obstacle Avoiding Robot
  Board: Arduino Uno
*/

#include <Servo.h>
Servo scanServo;

const int trig=9, echo=10, in1=4, in2=5, in3=7, in4=8;

long getDistance() {
  digitalWrite(trig,LOW); delayMicroseconds(2);
  digitalWrite(trig,HIGH); delayMicroseconds(10);
  digitalWrite(trig,LOW);
  return pulseIn(echo,HIGH)/58;
}
void fwd()  { digitalWrite(in1,HIGH);digitalWrite(in2,LOW);digitalWrite(in3,HIGH);digitalWrite(in4,LOW); }
void back() { digitalWrite(in1,LOW);digitalWrite(in2,HIGH);digitalWrite(in3,LOW);digitalWrite(in4,HIGH); }
void left() { digitalWrite(in1,LOW);digitalWrite(in2,LOW);digitalWrite(in3,HIGH);digitalWrite(in4,LOW); }
void right(){ digitalWrite(in1,HIGH);digitalWrite(in2,LOW);digitalWrite(in3,LOW);digitalWrite(in4,LOW); }
void stp()  { digitalWrite(in1,LOW);digitalWrite(in2,LOW);digitalWrite(in3,LOW);digitalWrite(in4,LOW); }

void setup() {
  scanServo.attach(6); scanServo.write(90);
  pinMode(trig,OUTPUT);pinMode(echo,INPUT);
  pinMode(in1,OUTPUT);pinMode(in2,OUTPUT);pinMode(in3,OUTPUT);pinMode(in4,OUTPUT);
  delay(1000);
}

void loop() {
  long d = getDistance();
  if (d > 30) { fwd(); return; }
  stp(); back(); delay(500); stp();
  scanServo.write(150); delay(500); long dL = getDistance();
  scanServo.write(30);  delay(500); long dR = getDistance();
  scanServo.write(90);  delay(300);
  if (dL > dR) { left(); delay(500); } else { right(); delay(500); }
}`,
    follow_up_questions: ['How would you map the path the robot has traveled?'],
    concepts_learned: ['Autonomous navigation', 'Ultrasonic ranging', 'Servo scanning', 'Decision-based movement'],
    estimated_budget: '₹750 – ₹1100',
  },

  'bluetooth-car': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'HC-05 Bluetooth Module', quantity: '1', notes: 'Set baud to 9600' },
      { component: 'L298N Motor Driver Module', quantity: '1', notes: '' },
      { component: 'DC Gear Motors', quantity: '2', notes: '' },
      { component: 'Robot Chassis + Wheels', quantity: '1', notes: '' },
      { component: 'Battery Pack (7.4V)', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '20', notes: '' },
    ],
    pin_map: [
      { device: 'HC-05 Bluetooth', details: 'UART at 9600 baud — TX→RX, RX→TX (with voltage divider on RX)', connections: [{ from_pin: 'VCC', to_node: '5V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }, { from_pin: 'TXD', to_node: 'D0 (RX)', notes: 'HC-05 TX → Arduino RX' }, { from_pin: 'RXD', to_node: 'D1 via divider', notes: 'Arduino TX → HC-05 RX (use voltage divider: 1kΩ + 2kΩ)' }] },
      { device: 'L298N', details: 'Dual motor', connections: [{ from_pin: 'IN1', to_node: 'D8', notes: '' }, { from_pin: 'IN2', to_node: 'D9', notes: '' }, { from_pin: 'IN3', to_node: 'D10', notes: '' }, { from_pin: 'IN4', to_node: 'D11', notes: '' }] },
    ],
    circuit_flow: [
      'Bluetooth: Smartphone app sends character commands (F, B, L, R, S) via BT.',
      'Arduino receives char via Serial and executes corresponding motor commands.',
      'Motor Driver translates IN1-4 signals to drive left/right motors.',
    ],
    safety_checks: [
      { severity: 'warning', title: 'HC-05 RX pin is 3.3V — add voltage divider', description: 'Arduino TX outputs 5V. Use a voltage divider (1kΩ + 2kΩ) to bring it to 3.3V before HC-05 RX.' },
      { severity: 'critical', title: 'Disconnect HC-05 TX/RX before uploading', description: 'HC-05 shares pins D0/D1 with the upload port. Disconnect Bluetooth wires before uploading sketches.' },
    ],
    code: `/*
  Innobotix — Bluetooth Controlled Car
  Commands: F=forward, B=back, L=left, R=right, S=stop
  App: "Arduino Bluetooth Controller" on Play Store
*/

const int in1=8, in2=9, in3=10, in4=11;

void fwd()  { digitalWrite(in1,HIGH);digitalWrite(in2,LOW);digitalWrite(in3,HIGH);digitalWrite(in4,LOW); }
void back() { digitalWrite(in1,LOW);digitalWrite(in2,HIGH);digitalWrite(in3,LOW);digitalWrite(in4,HIGH); }
void lft()  { digitalWrite(in1,LOW);digitalWrite(in2,LOW);digitalWrite(in3,HIGH);digitalWrite(in4,LOW); }
void rgt()  { digitalWrite(in1,HIGH);digitalWrite(in2,LOW);digitalWrite(in3,LOW);digitalWrite(in4,LOW); }
void stp()  { digitalWrite(in1,LOW);digitalWrite(in2,LOW);digitalWrite(in3,LOW);digitalWrite(in4,LOW); }

void setup() {
  Serial.begin(9600);
  pinMode(in1,OUTPUT);pinMode(in2,OUTPUT);pinMode(in3,OUTPUT);pinMode(in4,OUTPUT);
}

void loop() {
  if (Serial.available()) {
    char cmd = Serial.read();
    if (cmd == 'F') fwd();
    else if (cmd == 'B') back();
    else if (cmd == 'L') lft();
    else if (cmd == 'R') rgt();
    else stp();
  }
}`,
    follow_up_questions: ['How would you add headlights that turn on with a Bluetooth command?'],
    concepts_learned: ['UART Bluetooth communication', 'Serial command parsing', 'Wireless control systems', 'Differential drive'],
    estimated_budget: '₹700 – ₹950',
  },

  'iot-smart-home': {
    bom: [
      { component: 'ESP32 Dev Board (38-pin)', quantity: '1', notes: 'Built-in Wi-Fi + Bluetooth' },
      { component: 'DHT22 Temperature & Humidity Sensor', quantity: '1', notes: 'Higher accuracy than DHT11' },
      { component: '4-Channel 5V Relay Module', quantity: '1', notes: 'For appliance control' },
      { component: 'SSD1306 OLED Display (I2C)', quantity: '1', notes: 'Local display' },
      { component: '5V 2A USB Power Adapter', quantity: '1', notes: 'Power supply' },
      { component: 'Jumper Wires', quantity: '25', notes: '' },
    ],
    pin_map: [
      { device: 'DHT22 Sensor', details: 'Single-wire digital, 3.3V compatible', connections: [{ from_pin: 'VCC', to_node: '3.3V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }, { from_pin: 'DATA', to_node: 'GPIO4', notes: '' }] },
      { device: 'Relay Module (4-ch)', details: 'Active LOW triggered', connections: [{ from_pin: 'VCC', to_node: '5V (Vin)', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }, { from_pin: 'IN1–IN4', to_node: 'GPIO26,27,32,33', notes: 'Appliance 1–4 control' }] },
      { device: 'OLED Display (I2C)', details: 'SDA/SCL on ESP32 default I2C', connections: [{ from_pin: 'VCC', to_node: '3.3V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }, { from_pin: 'SDA', to_node: 'GPIO21', notes: '' }, { from_pin: 'SCL', to_node: 'GPIO22', notes: '' }] },
    ],
    circuit_flow: [
      'ESP32 connects to Wi-Fi on startup and starts an HTTP web server.',
      'Web dashboard served to any browser on the same network shows temperature, humidity, and 4 appliance toggles.',
      'Clicking a toggle sends HTTP GET request → ESP32 flips relay state.',
      'OLED shows local readings every 5 seconds.',
      'DHT22 data refreshes every 10 seconds on the web dashboard via JavaScript polling.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Never connect mains AC through bare relay without enclosure', description: 'For demo purposes, only switch low-voltage DC loads (LEDs, fans, buzzers) through the relay. Mains wiring requires a proper enclosure and electrician-grade components.' },
      { severity: 'warning', title: 'ESP32 logic is 3.3V', description: 'All GPIO inputs and DHT22 must use 3.3V. The relay module typically accepts 3.3V trigger signals but verify your module.' },
      { severity: 'info', title: 'Update Wi-Fi credentials before upload', description: 'Replace SSID and PASSWORD in the sketch with your test network credentials before uploading.' },
    ],
    code: `/*
  Innobotix — IoT Smart Home (ESP32)
  Web server on port 80 — connect to same Wi-Fi
  Libraries: WiFi (built-in), DHT, Adafruit_SSD1306
*/

#include <WiFi.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>

const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

#define DHTPIN 4
DHT dht(DHTPIN, DHT22);
WiFiServer server(80);
Adafruit_SSD1306 oled(128, 64, &Wire);

const int relays[] = {26, 27, 32, 33};
bool relayState[4] = {false,false,false,false};

void setup() {
  Serial.begin(115200);
  dht.begin();
  for (int i=0;i<4;i++){pinMode(relays[i],OUTPUT);digitalWrite(relays[i],HIGH);}
  Wire.begin(21,22);
  oled.begin(SSD1306_SWITCHCAPVCC,0x3C);
  oled.clearDisplay(); oled.setTextSize(1); oled.setTextColor(WHITE);
  oled.setCursor(0,0); oled.println("Connecting WiFi..."); oled.display();
  WiFi.begin(ssid, password);
  while(WiFi.status()!=WL_CONNECTED){delay(500);Serial.print(".");}
  Serial.println("\\nIP: "+WiFi.localIP().toString());
  server.begin();
}

void loop() {
  float t = dht.readTemperature(), h = dht.readHumidity();
  oled.clearDisplay(); oled.setCursor(0,0);
  oled.println("InnobotixHome"); oled.print("T:"); oled.print(t); oled.print("C H:"); oled.print(h); oled.println("%");
  oled.print("IP:"); oled.println(WiFi.localIP()); oled.display();

  WiFiClient client = server.available();
  if (!client) return;
  String req = client.readStringUntil('\\r');
  for (int i=0;i<4;i++){
    if(req.indexOf("/relay/"+String(i)+"/on")!=-1){relayState[i]=true;digitalWrite(relays[i],LOW);}
    if(req.indexOf("/relay/"+String(i)+"/off")!=-1){relayState[i]=false;digitalWrite(relays[i],HIGH);}
  }
  client.println("HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n");
  client.println("<h2>Innobotix Smart Home</h2><p>T: "+String(t)+"°C | H: "+String(h)+"%</p>");
  for(int i=0;i<4;i++) client.println("<a href='/relay/"+String(i)+(relayState[i]?"/off":"/on")+"'><button>Appliance "+String(i+1)+(relayState[i]?" OFF":" ON")+"</button></a><br>");
  client.stop();
  delay(2000);
}`,
    follow_up_questions: ['How would you add MQTT for cloud dashboard integration?', 'Can you control this from outside your home network?'],
    concepts_learned: ['ESP32 Wi-Fi station mode', 'HTTP web server basics', 'Relay switching', 'IoT home automation concepts'],
    estimated_budget: '₹900 – ₹1400',
  },

  'farm-protection': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: '' },
      { component: 'PIR Motion Sensor', quantity: '1', notes: 'Animal/human detection' },
      { component: 'HC-SR04 Ultrasonic Sensor', quantity: '1', notes: 'Close-range detection backup' },
      { component: 'MQ-2 Gas Sensor', quantity: '1', notes: 'Optional smoke detection' },
      { component: '5V Active Buzzer', quantity: '1', notes: 'Scarer / alarm' },
      { component: '5V Relay Module', quantity: '1', notes: 'For external siren or light' },
      { component: 'Red LED', quantity: '1', notes: 'Alert indicator' },
      { component: '220Ω Resistor', quantity: '1', notes: '' },
      { component: '9V Battery', quantity: '1', notes: '' },
      { component: 'Jumper Wires', quantity: '25', notes: '' },
    ],
    pin_map: [
      { device: 'PIR Sensor', details: 'Wide-angle animal/human detection', connections: [{ from_pin: 'VCC', to_node: '5V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }, { from_pin: 'OUT', to_node: 'D2', notes: 'HIGH = motion detected' }] },
      { device: 'HC-SR04', details: 'Close-range backup detection', connections: [{ from_pin: 'TRIG', to_node: 'D9', notes: '' }, { from_pin: 'ECHO', to_node: 'D10', notes: '' }, { from_pin: 'VCC', to_node: '5V', notes: '' }, { from_pin: 'GND', to_node: 'GND', notes: '' }] },
      { device: 'Buzzer + Relay + LED', details: 'Alert outputs', connections: [{ from_pin: 'Buzzer +', to_node: 'D7', notes: '' }, { from_pin: 'Relay IN', to_node: 'D8', notes: 'External siren/strobe' }, { from_pin: 'Red LED anode', to_node: 'D6 via 220Ω', notes: '' }] },
    ],
    circuit_flow: [
      'PIR scans wide area for warm-body infrared signatures.',
      'Ultrasonic provides secondary close-range confirmation (<100cm = detected).',
      'If EITHER sensor triggers, alarm state activates.',
      'Buzzer sounds at high frequency to scare animals. Relay switches external siren/strobe. Red LED pulses rapidly.',
      'Alert continues for 10 seconds, then resets for next detection cycle.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'External load through relay only', description: 'Any external siren, strobe, or motor must go through the relay — not directly from GPIO pins.' },
      { severity: 'warning', title: 'PIR warm-up: 60 seconds', description: 'In outdoor environments, allow extra PIR calibration time (60s+) to avoid false triggers from wind or temperature changes.' },
      { severity: 'info', title: 'Weatherproofing for outdoor deployment', description: 'For actual farm use, enclose all electronics in a waterproof project box with cable glands. This demo version is for indoor simulation.' },
    ],
    code: `/*
  Innobotix — Smart Farm Protection Device
  Board: Arduino Uno | PIR + Ultrasonic detection
*/

const int pirPin=2, trig=9, echo=10, buzzer=7, relay=8, redLed=6;
bool alarm = false;

long getDistance() {
  digitalWrite(trig,LOW); delayMicroseconds(2);
  digitalWrite(trig,HIGH); delayMicroseconds(10);
  digitalWrite(trig,LOW);
  return pulseIn(echo,HIGH)/58;
}

void triggerAlarm() {
  Serial.println("*** INTRUDER/ANIMAL DETECTED ***");
  for(int i=0;i<10;i++){
    digitalWrite(buzzer,HIGH); digitalWrite(redLed,HIGH); digitalWrite(relay,LOW);
    delay(500);
    digitalWrite(buzzer,LOW); digitalWrite(redLed,LOW); digitalWrite(relay,HIGH);
    delay(500);
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(pirPin,INPUT); pinMode(trig,OUTPUT); pinMode(echo,INPUT);
  pinMode(buzzer,OUTPUT); pinMode(relay,OUTPUT); pinMode(redLed,OUTPUT);
  digitalWrite(relay,HIGH); // relay active LOW
  delay(60000); // PIR warm-up
  Serial.println("Farm Protection — Armed");
}

void loop() {
  bool pirDetect = digitalRead(pirPin) == HIGH;
  long dist = getDistance();
  bool ultraDetect = (dist > 0 && dist < 100);

  Serial.print("PIR:"); Serial.print(pirDetect);
  Serial.print(" | UltraDist:"); Serial.println(dist);

  if (pirDetect || ultraDetect) triggerAlarm();
  delay(500);
}`,
    follow_up_questions: ['How would you add GSM to send SMS alerts to the farmer?', 'Can you use a solar panel to power this for field deployment?'],
    concepts_learned: ['Multi-sensor fusion', 'Agricultural technology', 'Relay for external loads', 'Rural IoT applications'],
    estimated_budget: '₹850 – ₹1200',
  },

  'alarm-clock-rtc': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: 'Main microcontroller' },
      { component: 'DS1307 RTC Module', quantity: '1', notes: 'Real-time clock with battery backup (CR2032)' },
      { component: '4-Digit 7-Segment Display (TM1637)', quantity: '1', notes: 'With built-in driver — only 2 data pins needed' },
      { component: 'Active Piezo Buzzer (5V)', quantity: '1', notes: 'Alarm sound output' },
      { component: 'Push Buttons (Tactile)', quantity: '4', notes: 'SET, HOUR, MINUTE, ALARM ON/OFF' },
      { component: 'Green LED (5mm)', quantity: '1', notes: 'Alarm-set indicator' },
      { component: 'Red LED (5mm)', quantity: '1', notes: 'Alarm-ringing indicator' },
      { component: '220Ω Resistors', quantity: '2', notes: 'Current limiting for LEDs' },
      { component: '10kΩ Resistors', quantity: '4', notes: 'Pull-down for push buttons' },
      { component: 'Breadboard (Full Size)', quantity: '1', notes: '' },
      { component: 'Jumper Wires (M–M, M–F)', quantity: '25', notes: 'Various lengths' },
    ],
    pin_map: [
      {
        device: 'DS1307 RTC Module',
        details: 'I2C real-time clock — keeps time even when Arduino is powered off (coin-cell backup)',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Module power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Common ground' },
          { from_pin: 'SDA', to_node: 'A4 (Arduino SDA)', notes: 'I2C data line' },
          { from_pin: 'SCL', to_node: 'A5 (Arduino SCL)', notes: 'I2C clock line' },
        ],
      },
      {
        device: 'TM1637 4-Digit 7-Segment Display',
        details: 'Serial 2-wire interface — CLK and DIO; built-in driver handles multiplexing',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'Display power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Ground' },
          { from_pin: 'CLK', to_node: 'D2 (Arduino)', notes: 'TM1637 clock signal' },
          { from_pin: 'DIO', to_node: 'D3 (Arduino)', notes: 'TM1637 data signal' },
        ],
      },
      {
        device: 'Push Buttons (x4)',
        details: 'Tactile switches with 10kΩ pull-down resistors — HIGH when pressed',
        connections: [
          { from_pin: 'SET button', to_node: 'D4 (Arduino)', notes: 'Enter set mode / confirm' },
          { from_pin: 'HOUR button', to_node: 'D5 (Arduino)', notes: 'Increment hours' },
          { from_pin: 'MINUTE button', to_node: 'D6 (Arduino)', notes: 'Increment minutes' },
          { from_pin: 'ALARM ON/OFF', to_node: 'D7 (Arduino)', notes: 'Toggle alarm enable' },
        ],
      },
      {
        device: 'Buzzer + LEDs',
        details: 'Active buzzer for alarm; green = alarm set, red = alarm ringing',
        connections: [
          { from_pin: 'Buzzer +', to_node: 'D8 (Arduino)', notes: 'Alarm sound output' },
          { from_pin: 'Green LED Anode', to_node: 'D9 via 220Ω', notes: 'Alarm-armed indicator' },
          { from_pin: 'Red LED Anode', to_node: 'D10 via 220Ω', notes: 'Alarm-ringing indicator' },
          { from_pin: 'All GND', to_node: 'GND', notes: 'Common ground' },
        ],
      },
    ],
    circuit_flow: [
      'Timekeeping: The DS1307 RTC module maintains accurate time via its internal crystal oscillator and CR2032 backup battery. Arduino reads hours and minutes over I2C every 500ms.',
      'Display: The TM1637 driver chip receives time digits from Arduino via a 2-wire serial protocol (CLK on D2, DIO on D3). The display shows HH:MM with a blinking colon separator.',
      'Setting Time: Pressing the SET button (D4) enters "set mode." HOUR (D5) and MINUTE (D6) buttons increment values. Pressing SET again writes the new time to the RTC.',
      'Setting Alarm: In set mode, pressing SET a second time allows setting the alarm time using the same HOUR/MINUTE buttons. The green LED (D9) lights up when alarm is armed.',
      'Alarm Trigger: Every loop iteration, Arduino compares current RTC time with stored alarm time. When they match and alarm is enabled, D8 (buzzer) goes HIGH and the red LED (D10) flashes.',
      'Dismissal: Pressing the ALARM ON/OFF button (D7) during ringing silences the buzzer and disables the alarm. The green LED turns off.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Install CR2032 battery in RTC module', description: 'Without the backup battery, the DS1307 loses time whenever Arduino is powered off. Always insert a fresh CR2032 coin cell.' },
      { severity: 'warning', title: 'Use pull-down resistors on all buttons', description: 'Floating input pins cause erratic reads. Each button pin needs a 10kΩ pull-down resistor to GND to ensure clean LOW when not pressed.' },
      { severity: 'warning', title: 'Button debounce required', description: 'Mechanical buttons bounce for 5–20ms. The code uses a 200ms debounce delay, but if buttons feel unreliable, increase to 300ms.' },
      { severity: 'info', title: 'TM1637 brightness control', description: 'The display brightness can be set from 0–7 via the library. Default is 4; reduce to 1–2 for nighttime use to avoid glare.' },
    ],
    code: `/*
  Innobotix — Alarm Clock with RTC
  Board: Arduino Uno
  RTC: DS1307 (I2C) | Display: TM1637 | Buttons: SET, HR, MIN, ALARM
  Output: Buzzer (D8) + Green LED (D9) + Red LED (D10)

  Libraries needed:
    - RTClib by Adafruit
    - TM1637Display by Avishay Orpaz
*/

#include <Wire.h>
#include <RTClib.h>
#include <TM1637Display.h>

// ── Pin definitions ─────────────────────────────────
#define CLK_PIN   2
#define DIO_PIN   3
#define BTN_SET   4
#define BTN_HOUR  5
#define BTN_MIN   6
#define BTN_ALARM 7
#define BUZZER    8
#define GREEN_LED 9
#define RED_LED   10

// ── Objects ─────────────────────────────────────────
RTC_DS1307 rtc;
TM1637Display display(CLK_PIN, DIO_PIN);

// ── Alarm state ─────────────────────────────────────
int alarmHour = 7;
int alarmMin  = 0;
bool alarmEnabled = false;
bool alarmRinging = false;
bool settingMode  = false;
int settingStep   = 0;  // 0=time hours, 1=time mins, 2=alarm hours, 3=alarm mins

int setHour, setMin;

unsigned long lastDebounce = 0;
const int DEBOUNCE = 200;

void setup() {
  Serial.begin(9600);

  // Initialize pins
  pinMode(BTN_SET,   INPUT);
  pinMode(BTN_HOUR,  INPUT);
  pinMode(BTN_MIN,   INPUT);
  pinMode(BTN_ALARM, INPUT);
  pinMode(BUZZER,    OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED,   OUTPUT);

  // Initialize RTC
  Wire.begin();
  if (!rtc.begin()) {
    Serial.println("ERROR: RTC not found!");
    while (1);
  }
  if (!rtc.isrunning()) {
    Serial.println("RTC not running — setting to compile time");
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  // Initialize display
  display.setBrightness(4);

  Serial.println("Alarm Clock Ready");
}

void loop() {
  DateTime now = rtc.now();
  unsigned long ms = millis();

  // ── Button: ALARM ON/OFF ─────────────────────────
  if (digitalRead(BTN_ALARM) == HIGH && ms - lastDebounce > DEBOUNCE) {
    lastDebounce = ms;
    if (alarmRinging) {
      // Dismiss alarm
      alarmRinging = false;
      digitalWrite(BUZZER, LOW);
      digitalWrite(RED_LED, LOW);
    }
    alarmEnabled = !alarmEnabled;
    digitalWrite(GREEN_LED, alarmEnabled ? HIGH : LOW);
    Serial.print("Alarm: ");
    Serial.println(alarmEnabled ? "ON" : "OFF");
  }

  // ── Button: SET ──────────────────────────────────
  if (digitalRead(BTN_SET) == HIGH && ms - lastDebounce > DEBOUNCE) {
    lastDebounce = ms;
    if (!settingMode) {
      settingMode = true;
      settingStep = 0;
      setHour = now.hour();
      setMin  = now.minute();
      Serial.println("SET MODE: Time Hours");
    } else {
      settingStep++;
      if (settingStep == 1) {
        Serial.println("SET MODE: Time Minutes");
      } else if (settingStep == 2) {
        // Write new time to RTC
        rtc.adjust(DateTime(now.year(), now.month(), now.day(), setHour, setMin, 0));
        Serial.println("Time saved! SET MODE: Alarm Hours");
        setHour = alarmHour;
        setMin  = alarmMin;
      } else if (settingStep == 3) {
        Serial.println("SET MODE: Alarm Minutes");
      } else {
        // Save alarm and exit
        alarmHour = setHour;
        alarmMin  = setMin;
        settingMode = false;
        Serial.print("Alarm set to ");
        Serial.print(alarmHour); Serial.print(":");
        Serial.println(alarmMin);
      }
    }
  }

  // ── Buttons: HOUR / MIN (only in set mode) ──────
  if (settingMode) {
    if (digitalRead(BTN_HOUR) == HIGH && ms - lastDebounce > DEBOUNCE) {
      lastDebounce = ms;
      setHour = (setHour + 1) % 24;
    }
    if (digitalRead(BTN_MIN) == HIGH && ms - lastDebounce > DEBOUNCE) {
      lastDebounce = ms;
      setMin = (setMin + 1) % 60;
    }
  }

  // ── Display update ───────────────────────────────
  int dispHour, dispMin;
  if (settingMode) {
    dispHour = setHour;
    dispMin  = setMin;
  } else {
    dispHour = now.hour();
    dispMin  = now.minute();
  }

  int displayVal = dispHour * 100 + dispMin;
  // Blink colon every 500ms in normal mode; solid in set mode
  uint8_t colon = settingMode ? 0x40 : ((ms / 500) % 2 == 0 ? 0x40 : 0x00);
  display.showNumberDecEx(displayVal, colon, true);

  // ── Alarm check ──────────────────────────────────
  if (alarmEnabled && !settingMode && !alarmRinging) {
    if (now.hour() == alarmHour && now.minute() == alarmMin) {
      alarmRinging = true;
      Serial.println("*** ALARM RINGING ***");
    }
  }

  // ── Alarm output ─────────────────────────────────
  if (alarmRinging) {
    digitalWrite(BUZZER, (ms / 300) % 2 == 0 ? HIGH : LOW);
    digitalWrite(RED_LED, (ms / 300) % 2 == 0 ? HIGH : LOW);
  }

  delay(100);
}`,
    follow_up_questions: [
      'How would you add a snooze button that delays the alarm by 5 minutes?',
      'Can you switch to a 12-hour AM/PM format on the display?',
      'How would you add multiple alarm slots (e.g., weekday vs weekend)?',
    ],
    concepts_learned: [
      'I2C communication with RTC module',
      'TM1637 serial display driver protocol',
      'Button debouncing and state machine logic',
      'Alarm comparison and event triggering',
      'Multi-mode user interface design',
    ],
    estimated_budget: '₹400 – ₹700',
  },

  'electronic-safe': {
    bom: [
      { component: 'Arduino Uno R3', quantity: '1', notes: 'Main microcontroller' },
      { component: '4x4 Matrix Keypad', quantity: '1', notes: 'Membrane keypad — 8 pins (4 rows + 4 cols)' },
      { component: '16x2 LCD with I2C Backpack', quantity: '1', notes: 'PCF8574 I2C adapter — only 2 wires for data' },
      { component: 'SG90 Micro Servo Motor', quantity: '1', notes: 'Simulates lock mechanism (0°=locked, 90°=unlocked)' },
      { component: 'Active Piezo Buzzer (5V)', quantity: '1', notes: 'Feedback beeps and alarm on wrong code' },
      { component: 'Red LED (5mm)', quantity: '1', notes: 'Locked / alarm indicator' },
      { component: 'Green LED (5mm)', quantity: '1', notes: 'Unlocked indicator' },
      { component: '220Ω Resistors', quantity: '2', notes: 'Current limiting for LEDs' },
      { component: 'Breadboard (Full Size)', quantity: '1', notes: '' },
      { component: 'Jumper Wires (M–M, M–F)', quantity: '25', notes: 'Various lengths' },
    ],
    pin_map: [
      {
        device: '4x4 Matrix Keypad',
        details: '8-pin membrane keypad — 4 row pins and 4 column pins scanned by the Keypad library',
        connections: [
          { from_pin: 'Row 1', to_node: 'D9 (Arduino)', notes: 'Keypad row scan' },
          { from_pin: 'Row 2', to_node: 'D8 (Arduino)', notes: '' },
          { from_pin: 'Row 3', to_node: 'D7 (Arduino)', notes: '' },
          { from_pin: 'Row 4', to_node: 'D6 (Arduino)', notes: '' },
          { from_pin: 'Col 1', to_node: 'D5 (Arduino)', notes: 'Keypad column scan' },
          { from_pin: 'Col 2', to_node: 'D4 (Arduino)', notes: '' },
          { from_pin: 'Col 3', to_node: 'D3 (Arduino)', notes: '' },
          { from_pin: 'Col 4', to_node: 'D2 (Arduino)', notes: '' },
        ],
      },
      {
        device: '16x2 LCD (I2C)',
        details: 'I2C backpack address typically 0x27 — only needs SDA/SCL',
        connections: [
          { from_pin: 'VCC', to_node: '5V', notes: 'LCD power' },
          { from_pin: 'GND', to_node: 'GND', notes: 'Ground' },
          { from_pin: 'SDA', to_node: 'A4 (Arduino SDA)', notes: 'I2C data' },
          { from_pin: 'SCL', to_node: 'A5 (Arduino SCL)', notes: 'I2C clock' },
        ],
      },
      {
        device: 'SG90 Servo Motor',
        details: '0° = locked position, 90° = unlocked position',
        connections: [
          { from_pin: 'Signal (Orange)', to_node: 'D10 (PWM)', notes: 'Servo position control' },
          { from_pin: 'VCC (Red)', to_node: '5V', notes: 'Servo power' },
          { from_pin: 'GND (Brown)', to_node: 'GND', notes: 'Ground' },
        ],
      },
      {
        device: 'Buzzer + LEDs',
        details: 'Buzzer for key clicks and alarm; LEDs for lock state indication',
        connections: [
          { from_pin: 'Buzzer +', to_node: 'D11 (Arduino)', notes: 'Sound output' },
          { from_pin: 'Red LED Anode', to_node: 'D12 via 220Ω', notes: 'Locked indicator' },
          { from_pin: 'Green LED Anode', to_node: 'D13 via 220Ω', notes: 'Unlocked indicator' },
          { from_pin: 'All GND', to_node: 'GND', notes: 'Common ground' },
        ],
      },
    ],
    circuit_flow: [
      'Standby: LCD shows "SAFE LOCKED" on line 1 and "Enter PIN:" on line 2. Red LED is ON. Servo is at 0° (locked).',
      'Input: User presses keys on the 4x4 keypad. Each digit is read by scanning rows/columns. The Keypad library handles debouncing. Digits appear as asterisks (*) on the LCD for privacy.',
      'Validation: When user presses "#" (enter), Arduino compares the entered string against the stored 4-digit PIN ("1234" by default).',
      'Unlock: If PIN matches, LCD shows "ACCESS GRANTED", green LED ON, red LED OFF, servo rotates to 90° (unlocked). Buzzer plays a short success tone. After 5 seconds, the safe re-locks automatically.',
      'Deny: If PIN is wrong, LCD shows "WRONG PIN!", buzzer buzzes 3 times, failed attempt counter increments. Red LED flashes rapidly.',
      'Lockout: After 3 consecutive wrong attempts, LCD shows "LOCKED OUT!" and the system freezes for 30 seconds. Buzzer sounds continuous alarm. Counter resets after lockout.',
    ],
    safety_checks: [
      { severity: 'critical', title: 'Servo power from 5V rail, not GPIO', description: 'SG90 draws up to 500mA under load. Power it from the Arduino 5V pin or an external supply — never from a digital GPIO pin.' },
      { severity: 'warning', title: 'I2C address may differ', description: 'Some I2C LCD backpacks use address 0x3F instead of 0x27. If the LCD shows nothing, run an I2C scanner sketch first to find the correct address.' },
      { severity: 'warning', title: 'Keypad uses 8 digital pins', description: 'The 4x4 keypad occupies pins D2–D9. Make sure no other device shares these pins. Servo, buzzer, and LEDs use D10–D13.' },
      { severity: 'info', title: 'Change default PIN before demo', description: 'The default PIN is "1234". Change the PASSWORD variable in code to your preferred 4-digit code before presenting.' },
    ],
    code: `/*
  Innobotix — Electronic Safe
  Board: Arduino Uno
  Input: 4x4 Keypad | Display: 16x2 LCD (I2C)
  Actuator: SG90 Servo | Alert: Buzzer + LEDs

  Libraries needed:
    - Keypad by Mark Stanley
    - LiquidCrystal_I2C by Frank de Brabander
    - Servo (built-in)
*/

#include <Keypad.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// ── Pin definitions ─────────────────────────────────
#define SERVO_PIN  10
#define BUZZER     11
#define RED_LED    12
#define GREEN_LED  13

// ── Keypad setup ────────────────────────────────────
const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

// ── LCD and Servo ───────────────────────────────────
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo lockServo;

// ── Security state ──────────────────────────────────
String PASSWORD = "1234";
String inputCode = "";
int failCount = 0;
const int MAX_FAILS = 3;
bool isUnlocked = false;

void setup() {
  Serial.begin(9600);

  pinMode(BUZZER,    OUTPUT);
  pinMode(RED_LED,   OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

  lockServo.attach(SERVO_PIN);
  lockServo.write(0);  // Locked

  lcd.init();
  lcd.backlight();

  showLocked();
  Serial.println("Electronic Safe Ready");
}

void showLocked() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("  SAFE LOCKED");
  lcd.setCursor(0, 1);
  lcd.print("Enter PIN: ");
  inputCode = "";
  isUnlocked = false;
  digitalWrite(RED_LED, HIGH);
  digitalWrite(GREEN_LED, LOW);
}

void beepKey() {
  digitalWrite(BUZZER, HIGH);
  delay(50);
  digitalWrite(BUZZER, LOW);
}

void alarmBuzz(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(BUZZER, HIGH);
    digitalWrite(RED_LED, HIGH);
    delay(200);
    digitalWrite(BUZZER, LOW);
    digitalWrite(RED_LED, LOW);
    delay(200);
  }
  digitalWrite(RED_LED, HIGH);  // Re-enable red
}

void grantAccess() {
  Serial.println("ACCESS GRANTED");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(" ACCESS GRANTED");
  lcd.setCursor(0, 1);
  lcd.print("  Door Open...");

  digitalWrite(GREEN_LED, HIGH);
  digitalWrite(RED_LED, LOW);

  // Success tone
  digitalWrite(BUZZER, HIGH); delay(100);
  digitalWrite(BUZZER, LOW);  delay(50);
  digitalWrite(BUZZER, HIGH); delay(100);
  digitalWrite(BUZZER, LOW);

  lockServo.write(90);  // Unlock
  isUnlocked = true;
  failCount = 0;

  delay(5000);  // Stay open 5 seconds

  // Re-lock
  lockServo.write(0);
  Serial.println("Auto re-locked");
  showLocked();
}

void denyAccess() {
  failCount++;
  Serial.print("WRONG PIN — attempt ");
  Serial.print(failCount);
  Serial.print("/");
  Serial.println(MAX_FAILS);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("  WRONG PIN!");
  lcd.setCursor(0, 1);
  lcd.print("Tries: ");
  lcd.print(failCount);
  lcd.print("/");
  lcd.print(MAX_FAILS);

  alarmBuzz(3);

  if (failCount >= MAX_FAILS) {
    lockout();
  } else {
    delay(1500);
    showLocked();
  }
}

void lockout() {
  Serial.println("*** LOCKOUT ***");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("!! LOCKED OUT !!");
  lcd.setCursor(0, 1);
  lcd.print("Wait 30 seconds");

  // Continuous alarm for 5 seconds
  for (int i = 0; i < 10; i++) {
    digitalWrite(BUZZER, HIGH);
    digitalWrite(RED_LED, HIGH);
    delay(250);
    digitalWrite(BUZZER, LOW);
    digitalWrite(RED_LED, LOW);
    delay(250);
  }

  // Silent wait remaining 25 seconds
  delay(25000);

  failCount = 0;
  showLocked();
}

void loop() {
  char key = keypad.getKey();

  if (key && !isUnlocked) {
    Serial.print("Key: "); Serial.println(key);
    beepKey();

    if (key == '#') {
      // Submit PIN
      if (inputCode == PASSWORD) {
        grantAccess();
      } else {
        denyAccess();
      }
    } else if (key == '*') {
      // Clear input
      inputCode = "";
      lcd.setCursor(11, 1);
      lcd.print("     ");
      lcd.setCursor(11, 1);
    } else if (inputCode.length() < 6) {
      // Append digit
      inputCode += key;
      lcd.setCursor(10 + inputCode.length(), 1);
      lcd.print("*");
    }
  }
}`,
    follow_up_questions: [
      'How would you add the ability to change the PIN from the keypad itself?',
      'Can you store the PIN in EEPROM so it persists across power cycles?',
      'How would you add a master override key using an RFID card?',
    ],
    concepts_learned: [
      'Matrix keypad scanning and input buffering',
      'I2C LCD display control',
      'String comparison for authentication',
      'Servo-based physical actuation',
      'Fail-safe lockout security logic',
      'State management for embedded systems',
    ],
    estimated_budget: '₹500 – ₹800',
  },

};

export default MOCK_OUTPUTS;
