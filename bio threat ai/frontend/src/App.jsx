import { useState, useEffect } from "react";
import "./App.css";

import {
  Activity,
  AlertTriangle,
  Ambulance,
  BarChart3,
  Bed,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Leaf,
  MapPin,
  Package,
  Search,
  Shield,
  Stethoscope,
  TrendingUp,
  Users,
  Wind,
  Zap,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import L from "leaflet";

// ==================================================
// Leaflet marker fix
// ==================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// ==================================================
// APP
// ==================================================

function App() {

  // ------------------------------------------------
  // Input state
  // ------------------------------------------------

  const [zone, setZone] = useState("Chennai - Zone A");

  const [reports, setReports] = useState(31);

  const [previousReports, setPreviousReports] =
    useState(12);

  const [environmentalAlert, setEnvironmentalAlert] =
    useState(true);

  const [geographicCluster, setGeographicCluster] =
    useState(true);

  const [rapidChange, setRapidChange] =
    useState(true);


  // ------------------------------------------------
  // Symptoms
  // ------------------------------------------------

  const [symptoms, setSymptoms] = useState([]);

  const [otherSymptoms, setOtherSymptoms] =
    useState("");


  const symptomOptions = [
    "Fever",
    "Cough",
    "Shortness of breath",
    "Fatigue",
    "Headache",
    "Muscle aches",
    "Sore throat",
    "Nausea",
    "Vomiting",
    "Diarrhea",
  ];


  const toggleSymptom = (symptom) => {

    setSymptoms((currentSymptoms) => {

      if (currentSymptoms.includes(symptom)) {

        return currentSymptoms.filter(
          (item) => item !== symptom
        );
      }

      return [
        ...currentSymptoms,
        symptom,
      ];
    });
  };


  // ------------------------------------------------
  // Result
  // ------------------------------------------------

  const [result, setResult] = useState({
    analysis: {

      zone: "Chennai - Zone A",

      reports: 31,

      previousReports: 12,

      riskScore: 100,

      riskLevel: "CRITICAL",

      anomalyDetected: true,

      increasePercentage: 158,

      trend: "EXTREME INCREASE",

      monitoringPriority: "IMMEDIATE REVIEW",

      statistics: {
        currentReports: 31,
        previousReports: 12,
        absoluteChange: 19,
        percentageChange: 158.3,
        baselineRatio: 2.58,
        activeSignals: 4,
        maximumRiskScore: 100,
      },

      activeSignals: [
        "Report spike",
        "Environmental signal",
        "Geographic clustering",
        "Rapid change",
      ],

      symptoms: [],

      otherSymptoms: "",

      evidence: [
        {
          signal: "Report spike",
          contribution: 40,
          severity: "HIGH",
          detail:
            "Reports increased by 158.3% compared with the previous baseline.",
        },

        {
          signal: "Environmental signal",
          contribution: 25,
          severity: "MODERATE",
          detail:
            "An environmental alert is present in the monitored zone.",
        },

        {
          signal: "Geographic clustering",
          contribution: 20,
          severity: "MODERATE",
          detail:
            "Reports appear concentrated within the monitored geographic zone.",
        },

        {
          signal: "Rapid change",
          contribution: 15,
          severity: "MODERATE",
          detail:
            "Reporting activity is changing rapidly compared with the baseline.",
        },
      ],

      riskBreakdown: [
        {
          name: "Report Spike",
          points: 40,
          maximum: 40,
          detected: true,
        },
        {
          name: "Environmental Signal",
          points: 25,
          maximum: 25,
          detected: true,
        },
        {
          name: "Geographic Clustering",
          points: 20,
          maximum: 20,
          detected: true,
        },
        {
          name: "Rapid Change",
          points: 15,
          maximum: 15,
          detected: true,
        },
      ],

      trendData: [
        {
          label: "Previous",
          value: 12,
        },
        {
          label: "Current",
          value: 31,
        },
      ],

      dataQuality: "STRONG",

      aiSummary:
        "The system detected a critical pattern in Zone A. The strongest contributing signals should be reviewed by a human decision-maker.",

      recommendation:
        "Immediate human review is recommended. Authorized public-health officials should assess whether enhanced surveillance and protective measures are required.",

      potentialMeasures: [
        "Increase local surveillance and reporting frequency.",
        "Verify unusual reports with local health authorities.",
        "Assess whether temporary public-health communication is appropriate.",
        "Assess school and workplace attendance policies based on verified local evidence.",
        "Assess whether temporary restrictions on high-risk public interactions are warranted.",
      ],

      humanDecisionRequired: true,
    },
  });


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [activePage, setActivePage] = useState("Dashboard");

  // ==================================================
  // LIVE DATE & TIME
  // ==================================================

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const liveTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const liveDate = currentTime.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

// ==================================================
// EMERGENCY STAFF, STOCK & DIAGNOSTICS
// ==================================================

const emergencyStaff = [
  { id: "DOC001", name: "Dr. Arun Kumar", role: "Emergency Physician", department: "Emergency", specialty: "Emergency Medicine", phone: "+91 90000 00001", email: "arun.demo@hospital.test", shift: "08:00 AM - 04:00 PM", status: "ON DUTY" },
  { id: "DOC002", name: "Dr. Priya Sharma", role: "Critical Care Specialist", department: "ICU", specialty: "Critical Care", phone: "+91 90000 00002", email: "priya.demo@hospital.test", shift: "08:00 AM - 04:00 PM", status: "ON DUTY" },
  { id: "NUR001", name: "Nurse Meena", role: "Emergency Nurse", department: "Emergency", specialty: "Emergency Nursing", phone: "+91 90000 00003", email: "meena.demo@hospital.test", shift: "08:00 AM - 04:00 PM", status: "ON DUTY" },
  { id: "DOC003", name: "Dr. Ravi Kumar", role: "Emergency Physician", department: "Emergency", specialty: "Emergency Medicine", phone: "+91 90000 00004", email: "ravi.demo@hospital.test", shift: "04:00 PM - 12:00 AM", status: "OFF DUTY" },
];

const onDutyStaff = emergencyStaff.filter((staff) => staff.status === "ON DUTY");

const emergencyStock = [
  { id: "MED001", name: "IV Fluids", category: "Emergency Medicine", required: 500, available: 720, unit: "bags" },
  { id: "MED002", name: "Emergency Antibiotic Supply", category: "Medicine", required: 300, available: 180, unit: "units" },
  { id: "MED003", name: "Oxygen Masks", category: "Medical Supply", required: 500, available: 120, unit: "units" },
  { id: "MED004", name: "PPE Kits", category: "Protective Equipment", required: 1000, available: 1240, unit: "kits" },
  { id: "MED005", name: "Testing Kits", category: "Diagnostics", required: 500, available: 180, unit: "kits" },
];

const getStockStatus = (available, required) => {
  const percentage = (available / required) * 100;
  if (percentage >= 75) return "READY";
  if (percentage >= 50) return "LOW";
  return "CRITICAL";
};

const diagnosticsLab = [
  { id: "LAB001", name: "PCR Machines", available: 4, required: 5, unit: "machines" },
  { id: "LAB002", name: "Rapid Testing Kits", available: 180, required: 500, unit: "kits" },
  { id: "LAB003", name: "Lab Technicians", available: 8, required: 10, unit: "staff" },
  { id: "LAB004", name: "Daily Testing Capacity", available: 800, required: 1000, unit: "tests/day" },
  { id: "LAB005", name: "Reagents", available: 720, required: 600, unit: "units" },
];

const getLabStatus = (available, required) => {
  const percentage = (available / required) * 100;
  if (percentage >= 75) return "READY";
  if (percentage >= 50) return "LOW";
  return "CRITICAL";
};

// ==================================================
// HOSPITAL EMERGENCY READINESS
// ==================================================

const [hospital, setHospital] = useState({
  name: "CityCare General Hospital",

  totalBeds: 100,
  availableBeds: 32,

  totalICU: 20,
  availableICU: 4,

  totalIsolationBeds: 15,
  availableIsolationBeds: 8,

  oxygenCylinders: 42,
  oxygenInUse: 18,
  oxygenLevel: 72,

  doctorsAvailable: 18,
  doctorsRequired: 20,

  nursesAvailable: 42,
  nursesRequired: 50,

  ppeKits: 1240,
  testingSupplies: 380,

  ambulancesAvailable: 4,
  ambulancesTotal: 6,
});

const bedAvailability =
  (hospital.availableBeds / hospital.totalBeds) * 100;

const icuAvailability =
  (hospital.availableICU / hospital.totalICU) * 100;

const isolationAvailability =
  (hospital.availableIsolationBeds /
    hospital.totalIsolationBeds) * 100;

const staffAvailability =
  (
    (hospital.doctorsAvailable /
      hospital.doctorsRequired) +
    (hospital.nursesAvailable /
      hospital.nursesRequired)
  ) / 2 * 100;

const ambulanceAvailability =
  (hospital.ambulancesAvailable /
    hospital.ambulancesTotal) * 100;

const hospitalReadiness = Math.round(
  (
    bedAvailability +
    icuAvailability +
    isolationAvailability +
    hospital.oxygenLevel +
    staffAvailability +
    ambulanceAvailability
  ) / 6
);

const getResourceStatus = (value) => {
  if (value >= 75) return "READY";
  if (value >= 50) return "MONITOR";
  return "ATTENTION";
};
  // ==================================================
  // WORLDWIDE SYNTHETIC MAP ZONES
  // ==================================================

  const worldZones = [
    { name: "Chennai", country: "India", zone: "Zone A", lat: 13.0827, lng: 80.2707, reports: 31, level: "CRITICAL" },
    { name: "Mumbai", country: "India", zone: "Zone B", lat: 19.0760, lng: 72.8777, reports: 9, level: "MODERATE" },
    { name: "Bengaluru", country: "India", zone: "Zone C", lat: 12.9716, lng: 77.5946, reports: 5, level: "LOW" },
    { name: "London", country: "United Kingdom", zone: "Zone D", lat: 51.5074, lng: -0.1278, reports: 14, level: "MODERATE" },
    { name: "New York", country: "United States", zone: "Zone E", lat: 40.7128, lng: -74.0060, reports: 21, level: "HIGH" },
    { name: "Toronto", country: "Canada", zone: "Zone F", lat: 43.6532, lng: -79.3832, reports: 7, level: "LOW" },
    { name: "São Paulo", country: "Brazil", zone: "Zone G", lat: -23.5505, lng: -46.6333, reports: 11, level: "MODERATE" },
    { name: "Mexico City", country: "Mexico", zone: "Zone H", lat: 19.4326, lng: -99.1332, reports: 8, level: "LOW" },
    { name: "Cairo", country: "Egypt", zone: "Zone I", lat: 30.0444, lng: 31.2357, reports: 13, level: "MODERATE" },
    { name: "Nairobi", country: "Kenya", zone: "Zone J", lat: -1.2921, lng: 36.8219, reports: 6, level: "LOW" },
    { name: "Johannesburg", country: "South Africa", zone: "Zone K", lat: -26.2041, lng: 28.0473, reports: 10, level: "MODERATE" },
    { name: "Dubai", country: "United Arab Emirates", zone: "Zone L", lat: 25.2048, lng: 55.2708, reports: 12, level: "MODERATE" },
    { name: "Istanbul", country: "Türkiye", zone: "Zone M", lat: 41.0082, lng: 28.9784, reports: 15, level: "HIGH" },
    { name: "Moscow", country: "Russia", zone: "Zone N", lat: 55.7558, lng: 37.6173, reports: 18, level: "HIGH" },
    { name: "Tokyo", country: "Japan", zone: "Zone O", lat: 35.6762, lng: 139.6503, reports: 16, level: "HIGH" },
    { name: "Seoul", country: "South Korea", zone: "Zone P", lat: 37.5665, lng: 126.9780, reports: 9, level: "MODERATE" },
    { name: "Singapore", country: "Singapore", zone: "Zone Q", lat: 1.3521, lng: 103.8198, reports: 7, level: "LOW" },
    { name: "Sydney", country: "Australia", zone: "Zone R", lat: -33.8688, lng: 151.2093, reports: 6, level: "LOW" },
    { name: "Paris", country: "France", zone: "Zone S", lat: 48.8566, lng: 2.3522, reports: 12, level: "MODERATE" },
    { name: "Berlin", country: "Germany", zone: "Zone T", lat: 52.5200, lng: 13.4050, reports: 8, level: "LOW" },
  ];


  // ==================================================
  // RISK-COLORED MAP MARKERS
  // ==================================================

  const getRiskColor = (level) => {
    if (level === "LOW") return "#22c55e";
    if (level === "MODERATE") return "#facc15";
    if (level === "HIGH") return "#fb923c";
    if (level === "CRITICAL") return "#f43f5e";
    return "#60a5fa";
  };

  const createRiskIcon = (level) => {
    const color = getRiskColor(level);

    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 30px;
          height: 36px;
          position: relative;
        ">
          <div style="
            width: 22px;
            height: 22px;
            background: ${color};
            border: 3px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            position: absolute;
            left: 4px;
            top: 3px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          "></div>
          <div style="
            width: 8px;
            height: 8px;
            background: #ffffff;
            border-radius: 50%;
            position: absolute;
            left: 11px;
            top: 10px;
          "></div>
        </div>
      `,
      iconSize: [30, 36],
      iconAnchor: [15, 36],
      popupAnchor: [0, -36],
    });
  };
  const analysis = result.analysis;

  // ==================================================
  // LOCATION / ZONE LOOKUP + LIVE ACTIVITY
  // ==================================================

  const getZoneLocationLabel = (zoneValue) => {
    const selected = worldZones.find(
      (item) =>
        `${item.name} - ${item.zone}` === zoneValue ||
        item.name === zoneValue ||
        item.zone === zoneValue
    );

    return selected
      ? `${selected.name} - ${selected.zone}`
      : zoneValue;
  };

  const selectedWorldZone =
    worldZones.find(
      (item) =>
        `${item.name} - ${item.zone}` === zone
    ) ||
    worldZones.find((item) => item.name === zone) ||
    worldZones.find((item) => item.zone === zone) ||
    worldZones[0];

  const formatActivityTime = (minutesAgo = 0) => {
    const activityTime = new Date(
      currentTime.getTime() - minutesAgo * 60 * 1000
    );

    return activityTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const recentActivities = [
    ...worldZones
      .slice()
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 6)
      .map((item, index) => ({
        key: `${item.name}-${item.zone}`,
        color:
          item.level === "CRITICAL"
            ? "red"
            : item.level === "HIGH"
            ? "orange"
            : item.level === "MODERATE"
            ? "yellow"
            : "green",
        title: `${item.name} - ${item.zone}`,
        value: `${item.reports} reports • ${item.level}`,
        time: formatActivityTime(index * 3),
      })),
    {
      key: "environmental",
      icon: <Leaf />,
      title: `Environmental alert • ${selectedWorldZone.name} - ${selectedWorldZone.zone}`,
      value: selectedWorldZone.country,
      time: formatActivityTime(20),
    },
    {
      key: "rapid-change",
      icon: <Zap />,
      title: `Rapid change • ${selectedWorldZone.name} - ${selectedWorldZone.zone}`,
      value: `${analysis.increasePercentage}% vs baseline`,
      time: formatActivityTime(26),
    },
    {
      key: "cluster",
      icon: <Users />,
      title: `Geographic cluster • ${selectedWorldZone.name} - ${selectedWorldZone.zone}`,
      value: selectedWorldZone.country,
      time: formatActivityTime(32),
    },
  ];

  // ==================================================
  // ANALYZE DATA
  // ==================================================

  const analyzeData = async () => {

    setLoading(true);

    setError("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            zone,

            reports: Number(reports),

            previousReports:
              Number(previousReports),

            environmentalAlert,

            geographicCluster,

            rapidChange,

            symptoms,

            otherSymptoms,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.error || "Analysis failed"
        );
      }


      setResult(data);

      // After a successful analysis, automatically open Statistics.
      setActivePage("Statistics");

      if (
        data.analysis?.riskLevel === "HIGH" ||
        data.analysis?.riskLevel === "CRITICAL"
      ) {
        const alertMessage =
          `BioThreat AI ${data.analysis.riskLevel} alert for ${data.analysis.zone}. ` +
          "Unusual surveillance activity requires human review.";

        const newNotifications = onDutyStaff.map((staff) => ({
          id: `${staff.id}-${Date.now()}`,
          staffName: staff.name,
          contact: staff.phone,
          message: alertMessage,
          status: "SENT",
          sentAt: new Date().toLocaleTimeString(),
        }));

        setNotifications((previous) => [
          ...newNotifications,
          ...previous,
        ]);
      }

    } catch (err) {

      console.error(err);

      setError(
        "Could not connect to the BioThreat AI backend. Make sure the backend is running on port 5000."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==================================================
  // RISK COLOR
  // ==================================================

  const getRiskClass = () => {

    if (analysis.riskLevel === "CRITICAL") {
      return "critical";
    }

    if (analysis.riskLevel === "HIGH") {
      return "high";
    }

    if (analysis.riskLevel === "MODERATE") {
      return "moderate";
    }

    return "low";
  };


  const riskClass = getRiskClass();

  const sendEmergencyAlert = () => {
    if (
      analysis.riskLevel !== "HIGH" &&
      analysis.riskLevel !== "CRITICAL"
    ) {
      alert("Emergency alert routing is available for HIGH or CRITICAL prototype risk.");
      return;
    }

    const alertMessage =
      `BioThreat AI ${analysis.riskLevel} alert for ${analysis.zone}. ` +
      "Unusual surveillance activity requires human review.";

    const newNotifications = onDutyStaff.map((staff) => ({
      id: `${staff.id}-${Date.now()}`,
      staffName: staff.name,
      contact: staff.phone,
      message: alertMessage,
      status: "SENT",
      sentAt: new Date().toLocaleTimeString(),
    }));

    setNotifications((previous) => [
      ...newNotifications,
      ...previous,
    ]);
  };


  // ==================================================
  // MAIN UI
  // ==================================================

  return (

    <div className="app">


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="topbar">

        <div className="brand">

          <div className="dna-logo" aria-label="BioThreat AI logo">
            <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
              <path d="M18 7 C47 18 47 46 18 57" fill="none" stroke="#53e2a5" strokeWidth="4" strokeLinecap="round"/>
              <path d="M46 7 C17 18 17 46 46 57" fill="none" stroke="#ff4f72" strokeWidth="4" strokeLinecap="round"/>
              <path d="M23 14 L41 14 M18 25 L46 25 M18 39 L46 39 M23 50 L41 50" stroke="#8ed7ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
              <circle cx="32" cy="32" r="5" fill="#53e2a5" opacity="0.95"/>
            </svg>
          </div>

          <div>

            <h1>
              BioThreat <span>AI</span>
            </h1>

            <p>
              Detect Early. Respond Faster. Protect Together.
            </p>

          </div>

        </div>


        <div className="header-right">

          <div className="health-box">

            <Shield size={22} />

            <div>

              <strong>
                A Healthier Tomorrow
              </strong>

              <small>
                Through Smarter Surveillance.
              </small>

            </div>

          </div>


          <div className="date-box">

            <strong>
              {liveDate}
            </strong>

            <span>
              {liveTime}
            </span>

            <small
              style={{
                display: "block",
                marginTop: "3px",
                color: "#4ade80",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.8px",
              }}
            >
              ● LIVE
            </small>

          </div>

        </div>

      </header>


      {/* ==================================================
          LAYOUT
      ================================================== */}

      <div className="layout">


        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="sidebar">

          <SideItem
            icon={<Activity />}
            text="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => setActivePage("Dashboard")}
          />

          <SideItem
            icon={<FileText />}
            text="New Analysis"
            active={activePage === "New Analysis"}
            onClick={() => setActivePage("New Analysis")}
          />

          <SideItem
            icon={<MapPin />}
            text="Zone Map"
            active={activePage === "Zone Map"}
            onClick={() => setActivePage("Zone Map")}
          />

          <SideItem
            icon={<BarChart3 />}
            text="Statistics"
            active={activePage === "Statistics"}
            onClick={() => setActivePage("Statistics")}
          />

          <SideItem
            icon={<Shield />}
            text="Emergency Readiness"
            active={activePage === "Emergency Readiness"}
            onClick={() => setActivePage("Emergency Readiness")}
          />

          <SideItem
            icon={<Shield />}
            text="About"
            active={activePage === "About"}
            onClick={() => setActivePage("About")}
          />

        </aside>


        {/* ==================================================
            MAIN
        ================================================== */}

        <main className="main">


          <div style={{
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            flexWrap: "wrap",
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "26px" }}>
                {activePage}
              </h2>
              <p style={{ margin: "6px 0 0", opacity: 0.65, fontSize: "13px" }}>
                {activePage === "Dashboard" && "Real-time overview of surveillance activity, risk, and system readiness."}
                {activePage === "New Analysis" && "Enter synthetic observations and generate an explainable risk assessment."}
                {activePage === "Zone Map" && "Explore synthetic incident patterns and risk levels across monitored locations."}
                {activePage === "Statistics" && "Review evidence, trends, scoring, and the AI-assisted decision summary."}
                {activePage === "Emergency Readiness" && "Review synthetic hospital capacity, staff, diagnostics, supplies, and alerts."}
                {activePage === "About" && "Understand the purpose, workflow, and human-review safeguards behind BioThreat AI."}
              </p>
            </div>

            <div style={{
              padding: "9px 13px",
              borderRadius: "18px",
              background: "rgba(80,220,150,0.09)",
              border: "1px solid rgba(80,220,150,0.2)",
              color: "#6ee7b7",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.7px",
            }}>
              ● SYSTEM ONLINE
            </div>
          </div>

          {activePage === "Dashboard" && (
            <div
              style={{
                display: "grid",
                gap: "20px",
                marginBottom: "24px",
              }}
            >

              <section className="panel" style={{ padding: "24px" }}>

                <PanelTitle
                  icon={<Activity />}
                  title="Global Surveillance Overview"
                  subtitle="Live view of the synthetic surveillance network and current risk indicators."
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(170px, 1fr))",
                    gap: "14px",
                    marginTop: "20px",
                  }}
                >
                  <StatBox
                    icon={<Shield />}
                    value={`${analysis.riskScore}/100`}
                    label="Prototype Risk"
                  />

                  <StatBox
                    icon={<AlertTriangle />}
                    value={analysis.riskLevel}
                    label="Risk Level"
                  />

                  <StatBox
                    icon={<BarChart3 />}
                    value={analysis.reports}
                    label="Current Reports"
                  />

                  <StatBox
                    icon={<TrendingUp />}
                    value={`+${analysis.increasePercentage}%`}
                    label="Baseline Change"
                  />

                  <StatBox
                    icon={<MapPin />}
                    value={worldZones.length}
                    label="Global Zones"
                  />

                  <StatBox
                    icon={<Shield />}
                    value={`${hospitalReadiness}%`}
                    label="Hospital Readiness"
                  />
                </div>

              </section>


              <section className="panel" style={{ padding: "24px" }}>

                <PanelTitle
                  icon={<AlertTriangle />}
                  title="Current Situation"
                  subtitle="Priority indicators requiring closer human review."
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "14px",
                    marginTop: "20px",
                  }}
                >

                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      background: "rgba(255,80,80,0.08)",
                      border:
                        "1px solid rgba(255,80,80,0.18)",
                    }}
                  >
                    <small
                      style={{
                        opacity: 0.6,
                        letterSpacing: "1px",
                      }}
                    >
                      ACTIVE ZONE
                    </small>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "24px",
                        marginTop: "7px",
                      }}
                    >
                      {getZoneLocationLabel(analysis.zone)}
                    </strong>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "13px",
                        opacity: 0.7,
                      }}
                    >
                      {analysis.reports} synthetic reports
                    </div>
                  </div>


                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      background: "rgba(255,170,60,0.08)",
                      border:
                        "1px solid rgba(255,170,60,0.2)",
                    }}
                  >
                    <small
                      style={{
                        opacity: 0.6,
                        letterSpacing: "1px",
                      }}
                    >
                      MONITORING PRIORITY
                    </small>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "19px",
                        marginTop: "7px",
                      }}
                    >
                      {analysis.monitoringPriority ||
                        "ROUTINE MONITORING"}
                    </strong>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "13px",
                        opacity: 0.7,
                      }}
                    >
                      {analysis.humanDecisionRequired
                        ? "Human review required"
                        : "Routine review"}
                    </div>
                  </div>


                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      background: "rgba(80,220,150,0.07)",
                      border:
                        "1px solid rgba(80,220,150,0.18)",
                    }}
                  >
                    <small
                      style={{
                        opacity: 0.6,
                        letterSpacing: "1px",
                      }}
                    >
                      DATA QUALITY
                    </small>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "24px",
                        marginTop: "7px",
                      }}
                    >
                      {analysis.dataQuality || "LIMITED"}
                    </strong>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "13px",
                        opacity: 0.7,
                      }}
                    >
                      Synthetic demonstration dataset
                    </div>
                  </div>

                </div>

              </section>


              <section className="panel" style={{ padding: "24px" }}>

                <PanelTitle
                  icon={<MapPin />}
                  title="Global Zone Status"
                  subtitle="Synthetic risk status across monitored locations worldwide."
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                    marginTop: "20px",
                  }}
                >

                  {worldZones.map((worldZone) => {
                    const zoneColor = getRiskColor(
                      worldZone.level
                    );

                    return (
                      <div
                        key={`${worldZone.name}-${worldZone.country}`}
                        style={{
                          padding: "15px",
                          borderRadius: "14px",
                          background:
                            "rgba(255,255,255,0.035)",
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                        }}
                      >

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <strong>
                            {worldZone.name} - {worldZone.zone}
                          </strong>

                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: zoneColor,
                              boxShadow:
                                `0 0 10px ${zoneColor}`,
                              flexShrink: 0,
                            }}
                          ></span>
                        </div>

                        <div
                          style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            opacity: 0.6,
                          }}
                        >
                          {worldZone.country}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "11px",
                            fontSize: "12px",
                          }}
                        >
                          <span>
                            {worldZone.reports} reports
                          </span>

                          <strong
                            style={{
                              color: zoneColor,
                            }}
                          >
                            {worldZone.level}
                          </strong>
                        </div>

                      </div>
                    );
                  })}

                </div>

              </section>


              <section className="panel" style={{ padding: "24px" }}>

                <PanelTitle
                  icon={<Zap />}
                  title="Quick Actions"
                  subtitle="Jump to the most useful BioThreat AI workspace."
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: "12px",
                    marginTop: "18px",
                  }}
                >

                  <button
                    onClick={() =>
                      setActivePage("New Analysis")
                    }
                    style={{
                      padding: "15px",
                      borderRadius: "12px",
                      border:
                        "1px solid rgba(100,180,255,0.2)",
                      background:
                        "rgba(100,180,255,0.08)",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    + New Analysis
                  </button>

                  <button
                    onClick={() =>
                      setActivePage("Zone Map")
                    }
                    style={{
                      padding: "15px",
                      borderRadius: "12px",
                      border:
                        "1px solid rgba(80,220,150,0.2)",
                      background:
                        "rgba(80,220,150,0.08)",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    View Global Map
                  </button>

                  <button
                    onClick={() =>
                      setActivePage("Statistics")
                    }
                    style={{
                      padding: "15px",
                      borderRadius: "12px",
                      border:
                        "1px solid rgba(255,170,60,0.2)",
                      background:
                        "rgba(255,170,60,0.08)",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    View Statistics
                  </button>

                  <button
                    onClick={() =>
                      setActivePage(
                        "Emergency Readiness"
                      )
                    }
                    style={{
                      padding: "15px",
                      borderRadius: "12px",
                      border:
                        "1px solid rgba(255,80,80,0.2)",
                      background:
                        "rgba(255,80,80,0.08)",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Emergency Readiness
                  </button>

                </div>

              </section>

            </div>          )}

          {/* ==================================================
              DISCLAIMER
          ================================================== */}

          <div className="disclaimer">

            <AlertTriangle size={21} />

            <span>
              Prototype using synthetic biosurveillance
              data. This system provides decision support
              and does not diagnose or confirm a biological
              threat.
            </span>

          </div>


          {/* ==================================================
              INPUT + MAP + ACTIVITY
          ================================================== */}

          <div
            className="top-grid"
            style={
              activePage === "Dashboard"
                ? undefined
                : { gridTemplateColumns: "1fr" }
            }
          >


            {/* INPUT */}

            {activePage === "New Analysis" && (
            <section className="panel">

              <PanelTitle
                icon={<FileText />}
                title="Surveillance Data Input"
                subtitle="Enter synthetic surveillance observations for analysis."
              />


              <div className="form">

                <label>
                  Surveillance Area / Zone
                </label>

                <div className="input">

                  <MapPin size={18} />

                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "inherit",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    {worldZones.map((worldZone) => (
                      <option
                        key={`${worldZone.name}-${worldZone.zone}`}
                        value={`${worldZone.name} - ${worldZone.zone}`}
                        style={{
                          background: "#062330",
                          color: "#ffffff",
                        }}
                      >
                        {worldZone.name} - {worldZone.zone}
                      </option>
                    ))}
                  </select>

                </div>


                <label>
                  Current Reports
                </label>

                <div className="input">

                  <BarChart3 size={18} />

                  <input
                    type="number"
                    min="0"
                    value={reports}
                    onChange={(e) =>
                      setReports(e.target.value)
                    }
                  />

                </div>


                <label>
                  Previous Reports / Baseline
                </label>

                <div className="input">

                  <TrendingUp size={18} />

                  <input
                    type="number"
                    min="0"
                    value={previousReports}
                    onChange={(e) =>
                      setPreviousReports(
                        e.target.value
                      )
                    }
                  />

                </div>


                <Check
                  icon={<Leaf />}
                  text="Environmental alert"
                  checked={environmentalAlert}
                  setChecked={
                    setEnvironmentalAlert
                  }
                />


                <Check
                  icon={<Users />}
                  text="Geographic clustering"
                  checked={geographicCluster}
                  setChecked={
                    setGeographicCluster
                  }
                />


                <Check
                  icon={<Zap />}
                  text="Rapid temporal change"
                  checked={rapidChange}
                  setChecked={
                    setRapidChange
                  }
                />


                {/* SYMPTOMS */}

                <div className="symptom-section">

                  <label>
                    Symptoms Observed
                  </label>

                  <p className="input-help">
                    Select symptoms observed in the submitted synthetic surveillance data.
                  </p>


                  <div className="symptom-grid">

                    {symptomOptions.map(
                      (symptom) => (

                        <label
                          key={symptom}
                          className={
                            `symptom-option ${
                              symptoms.includes(
                                symptom
                              )
                                ? "selected"
                                : ""
                            }`
                          }
                        >

                          <input
                            type="checkbox"
                            checked={symptoms.includes(
                              symptom
                            )}
                            onChange={() =>
                              toggleSymptom(
                                symptom
                              )
                            }
                          />

                          <span>
                            {symptom}
                          </span>

                        </label>

                      )
                    )}

                  </div>


                  <input
                    className="other-symptom"
                    type="text"
                    value={otherSymptoms}
                    placeholder="Other symptoms (optional)"
                    onChange={(e) =>
                      setOtherSymptoms(
                        e.target.value
                      )
                    }
                  />

                </div>


                <button
                  className="analyze"
                  onClick={analyzeData}
                  disabled={loading}
                >

                  <Search size={21} />

                  {loading
                    ? "ANALYZING..."
                    : "ANALYZE DATA"}

                </button>


                {error && (

                  <div className="error">
                    {error}
                  </div>

                )}

              </div>

            </section>
            )}


            {/* MAP */}

            {activePage === "Zone Map" && (
            <section className="panel map-panel">

              <PanelTitle
                icon={<MapPin />}
                title="Worldwide Geographic View"
                subtitle="Synthetic incident reports by region"
              />


              <div className="map">

                <MapContainer
                  center={[
                    20,
                    0,
                  ]}
                  zoom={2}
                  scrollWheelZoom={true}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >

                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />


                  {worldZones.map((worldZone) => (
                    <Marker
                      key={`${worldZone.name}-${worldZone.country}`}
                      position={[worldZone.lat, worldZone.lng]}
                      icon={createRiskIcon(worldZone.level)}
                    >
                      <Popup>
                        <strong>
                          {worldZone.name} - {worldZone.zone}
                        </strong>
                        <br />
                        {worldZone.country}
                        <br />
                        {worldZone.reports} synthetic reports
                        <br />
                        Status: {worldZone.level}
                      </Popup>
                    </Marker>
                  ))}

                </MapContainer>


                <div className="map-card">

                  <div
                    className="pulse"
                    style={{
                      background: getRiskColor(
                        worldZones.find(
                          (item) =>
                            `${item.name} - ${item.zone}` === analysis.zone ||
                            item.name === analysis.zone ||
                            item.zone === analysis.zone
                        )?.level
                      ),
                    }}
                  ></div>

                  <div>

                    <strong>
                      {getZoneLocationLabel(analysis.zone)}
                    </strong>

                    <small>
                      {analysis.reports} reports
                    </small>

                  </div>

                </div>

              </div>


              <div className="legend">

                <Legend
                  cls="green"
                  text="Low"
                />

                <Legend
                  cls="yellow"
                  text="Moderate"
                />

                <Legend
                  cls="orange"
                  text="High"
                />

                <Legend
                  cls="red"
                  text="Critical"
                />

              </div>

            </section>
            )}


            {/* ACTIVITY */}

          {activePage === "Dashboard" && (
            <div className="dashboard-intelligence-grid">

              <section className="panel activity activity-premium">

                <PanelTitle
                  icon={<Clock3 />}
                  title="Recent Activity"
                  subtitle="Latest surveillance updates"
                />

                <div className="activity-live-strip">
                  <span className="live-dot"></span>
                  <span>Network activity stream</span>
                  <span className="activity-live-time">Updated {liveTime}</span>
                </div>

                {recentActivities.map((item) => (
                  <ActivityRow
                    key={item.key}
                    color={item.color}
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                    time={item.time}
                  />
                ))}

                <div className="activity-footer">
                  <span>Last refreshed</span>
                  <strong>{liveTime}</strong>
                </div>

              </section>

              <section className="panel signal-center">
                <div className="signal-orbit" aria-hidden="true"></div>

                <div className="signal-header">
                  <PanelTitle
                    icon={<Brain />}
                    title="AI Signal Center"
                    subtitle="Interactive early-warning snapshot"
                  />
                  <span className="signal-status">ANALYSIS READY</span>
                </div>

                <div className="signal-main">
                  <div className="signal-score">
                    <div className="score-ring" style={{
                      "--score": `${Math.min(Number(analysis.riskScore) || 0, 100) * 3.6}deg`,
                      "--risk-color": getRiskColor(analysis.riskLevel),
                    }}>
                      <div>
                        <strong>{analysis.riskScore}</strong>
                        <span>/ 100</span>
                      </div>
                    </div>
                    <div className="score-copy">
                      <span>Prototype Risk</span>
                      <strong style={{ color: getRiskColor(analysis.riskLevel) }}>{analysis.riskLevel}</strong>
                    </div>
                  </div>

                  <div className="signal-mini-chart" aria-label="Synthetic risk trend">
                    <div className="mini-chart-label">SIGNAL TREND</div>
                    <svg viewBox="0 0 220 78" role="img" aria-hidden="true">
                      <defs>
                        <linearGradient id="signalFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#53e2a5" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#53e2a5" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M4 63 C25 60 32 53 48 56 S74 46 90 50 S108 38 126 43 S148 31 162 34 S186 20 216 14 L216 78 L4 78 Z" fill="url(#signalFill)" />
                      <path d="M4 63 C25 60 32 53 48 56 S74 46 90 50 S108 38 126 43 S148 31 162 34 S186 20 216 14" fill="none" stroke="#53e2a5" strokeWidth="2.6" strokeLinecap="round" />
                      <circle cx="216" cy="14" r="4" fill="#53e2a5" />
                    </svg>
                    <div className="trend-note">Current zone signal is above its baseline.</div>
                  </div>
                </div>

                <div className="signal-grid">
                  <div className={`signal-chip ${environmentalAlert ? "active" : ""}`}>
                    <Leaf size={17} />
                    <div>
                      <span>Environmental</span>
                      <strong>{environmentalAlert ? "Detected" : "Clear"}</strong>
                    </div>
                  </div>
                  <div className={`signal-chip ${geographicCluster ? "active" : ""}`}>
                    <Users size={17} />
                    <div>
                      <span>Geographic cluster</span>
                      <strong>{geographicCluster ? "Detected" : "None"}</strong>
                    </div>
                  </div>
                  <div className={`signal-chip ${rapidChange ? "active" : ""}`}>
                    <Zap size={17} />
                    <div>
                      <span>Rapid change</span>
                      <strong>{rapidChange ? `+${analysis.increasePercentage}%` : "Stable"}</strong>
                    </div>
                  </div>
                  <div className="signal-chip">
                    <MapPin size={17} />
                    <div>
                      <span>Active zone</span>
                      <strong>{getZoneLocationLabel(analysis.zone)}</strong>
                    </div>
                  </div>
                </div>

                <div className="signal-action-row">
                  <div>
                    <span>Human review</span>
                    <strong>{analysis.humanDecisionRequired ? "Recommended now" : "Routine review"}</strong>
                  </div>
                  <button className="signal-action" onClick={() => setActivePage("Statistics")}>
                    Open Assessment <TrendingUp size={16} />
                  </button>
                </div>
              </section>

            </div>
          )}

          </div>



{activePage === "Statistics" && (
          <>

          {/* ==================================================
              RESULTS
          ================================================== */}

          <section
            className="panel"
            style={{
              marginTop: "24px",
              padding: "28px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                marginBottom: "25px",
                flexWrap: "wrap",
              }}
            >

              <div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >

                  <Brain size={28} />

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "28px",
                    }}
                  >
                    BioThreat AI Analysis
                  </h2>

                </div>

                <p
                  style={{
                    opacity: 0.7,
                    marginTop: "7px",
                  }}
                >
                  Decision-support assessment for {analysis.zone}
                </p>

              </div>


              <div
                style={{
                  padding: "10px 18px",
                  borderRadius: "30px",
                  border:
                    "1px solid rgba(255,255,255,0.15)",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >

                SYNTHETIC DATA

              </div>

            </div>


            {/* ==================================================
                BIG RISK RESULT
            ================================================== */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(260px, 1.2fr) minmax(220px, 0.8fr)",
                gap: "20px",
                marginBottom: "22px",
              }}
            >

              <div
                className={`risk-card ${riskClass}`}
                style={{
                  minHeight: "220px",
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "20px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >

                  <Activity size={30} />

                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    PROTOTYPE RISK SCORE
                  </span>

                </div>


                <strong
                  style={{
                    fontSize: "64px",
                    lineHeight: "1",
                    marginTop: "18px",
                  }}
                >
                  {analysis.riskScore}
                  <span
                    style={{
                      fontSize: "25px",
                      opacity: 0.6,
                    }}
                  >
                    /100
                  </span>
                </strong>


                <span
                  style={{
                    marginTop: "12px",
                    fontSize: "22px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                  }}
                >
                  {analysis.riskLevel}
                </span>

              </div>


              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >

                <MiniResult
                  icon={<AlertTriangle />}
                  title="Anomaly Status"
                  value={
                    analysis.anomalyDetected
                      ? "DETECTED"
                      : "NOT DETECTED"
                  }
                />


                <MiniResult
                  icon={<TrendingUp />}
                  title="Trend"
                  value={
                    analysis.trend ||
                    "STABLE"
                  }
                />


                <MiniResult
                  icon={<Clock3 />}
                  title="Monitoring Priority"
                  value={
                    analysis.monitoringPriority ||
                    "ROUTINE MONITORING"
                  }
                />

              </div>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "14px",
                marginBottom: "22px",
              }}
            >

              <StatBox
                icon={<BarChart3 />}
                value={
                  analysis.statistics?.currentReports ??
                  analysis.reports
                }
                label="Current Reports"
              />


              <StatBox
                icon={<CalendarDays />}
                value={
                  analysis.statistics?.previousReports ??
                  analysis.previousReports
                }
                label="Previous Baseline"
              />


              <StatBox
                icon={<TrendingUp />}
                value={
                  analysis.statistics
                    ? `+${
                        analysis.statistics
                          .absoluteChange
                      }`
                    : `+${
                        analysis.reports -
                        analysis.previousReports
                      }`
                }
                label="Absolute Change"
              />


              <StatBox
                icon={<Activity />}
                value={
                  analysis.statistics
                    ? `+${
                        analysis.statistics
                          .percentageChange
                      }%`
                    : `+${
                        analysis.increasePercentage
                      }%`
                }
                label="Percentage Change"
              />


              <StatBox
                icon={<BarChart3 />}
                value={
                  analysis.statistics?.baselineRatio
                    ? `${analysis.statistics.baselineRatio}×`
                    : "—"
                }
                label="Baseline Ratio"
              />


              <StatBox
                icon={<Shield />}
                value={
                  analysis.dataQuality ||
                  "LIMITED"
                }
                label="Data Quality"
              />

            </div>


            {/* ==================================================
                TWO COLUMN SECTION
            ================================================== */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >


              {/* ACTIVE SIGNALS */}

              <div
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  background:
                    "rgba(255,255,255,0.035)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >

                <SectionHeading
                  icon={<Zap />}
                  title="Active Signals"
                />


                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "18px",
                  }}
                >

                  {(analysis.activeSignals || [])
                    .map(
                      (signal, index) => (

                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding:
                              "9px 13px",
                            borderRadius:
                              "20px",
                            background:
                              "rgba(255,90,90,0.10)",
                            border:
                              "1px solid rgba(255,90,90,0.22)",
                            fontSize: "13px",
                          }}
                        >

                          <span>
                            ●
                          </span>

                          {signal}

                        </div>

                      )
                    )}

                </div>

              </div>


              {/* SYMPTOMS */}

              <div
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  background:
                    "rgba(255,255,255,0.035)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >

                <SectionHeading
                  icon={<Users />}
                  title="Symptoms Observed"
                />


                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "18px",
                  }}
                >

                  {(
                    analysis.symptoms || []
                  ).length > 0 ? (

                    analysis.symptoms.map(
                      (symptom, index) => (

                        <span
                          key={index}
                          style={{
                            padding:
                              "9px 14px",
                            borderRadius:
                              "18px",
                            background:
                              "rgba(100,180,255,0.12)",
                            border:
                              "1px solid rgba(100,180,255,0.22)",
                            fontSize: "13px",
                          }}
                        >
                          {symptom}
                        </span>

                      )
                    )

                  ) : (

                    <span
                      style={{
                        opacity: 0.55,
                        fontSize: "14px",
                      }}
                    >
                      No symptoms selected.
                    </span>

                  )}

                </div>


                {analysis.otherSymptoms && (

                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      borderRadius: "10px",
                      background:
                        "rgba(255,255,255,0.04)",
                      fontSize: "13px",
                    }}
                  >

                    <strong>
                      Other:
                    </strong>{" "}

                    {analysis.otherSymptoms}

                  </div>

                )}

              </div>

            </div>


            {/* ==================================================
                RISK BREAKDOWN
            ================================================== */}

            <div
              style={{
                padding: "24px",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                marginBottom: "20px",
              }}
            >

              <SectionHeading
                icon={<BarChart3 />}
                title="Risk Score Breakdown"
              />


              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "17px",
                }}
              >

                {(analysis.riskBreakdown ||
                  []
                ).map(
                  (item, index) => {

                    const percentage =
                      item.maximum > 0
                        ? (item.points /
                            item.maximum) *
                          100
                        : 0;

                    return (

                      <div key={index}>

                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            marginBottom:
                              "7px",
                            fontSize:
                              "13px",
                          }}
                        >

                          <span>
                            {item.name}
                          </span>

                          <strong>
                            +{item.points}
                            {" "}
                            /
                            {" "}
                            {item.maximum}
                          </strong>

                        </div>


                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            background:
                              "rgba(255,255,255,0.08)",
                            borderRadius:
                              "10px",
                            overflow:
                              "hidden",
                          }}
                        >

                          <div
                            style={{
                              width:
                                `${percentage}%`,
                              height:
                                "100%",
                              borderRadius:
                                "10px",
                              background:
                                item.detected
                                  ? "linear-gradient(90deg,#ff6b6b,#ff9f43)"
                                  : "rgba(255,255,255,0.15)",
                            }}
                          />

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            </div>


            {/* ==================================================
                EVIDENCE
            ================================================== */}

            <div
              style={{
                padding: "24px",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                marginBottom: "20px",
              }}
            >

              <SectionHeading
                icon={<FileText />}
                title="Statistical & Surveillance Evidence"
              />


              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >

                {(analysis.evidence || [])
                  .map(
                    (item, index) => (

                      <div
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "45px 1fr auto",
                          gap: "14px",
                          alignItems:
                            "center",
                          padding:
                            "16px",
                          borderRadius:
                            "14px",
                          background:
                            "rgba(255,255,255,0.035)",
                        }}
                      >

                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius:
                              "12px",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            background:
                              "rgba(255,255,255,0.07)",
                          }}
                        >

                          {index === 0 && (
                            <BarChart3
                              size={20}
                            />
                          )}

                          {index === 1 && (
                            <Leaf
                              size={20}
                            />
                          )}

                          {index === 2 && (
                            <Users
                              size={20}
                            />
                          )}

                          {index === 3 && (
                            <Zap
                              size={20}
                            />
                          )}

                        </div>


                        <div>

                          <strong>
                            {item.signal}
                          </strong>

                          <p
                            style={{
                              margin:
                                "5px 0 0",
                              opacity: 0.65,
                              fontSize:
                                "13px",
                            }}
                          >
                            {item.detail}
                          </p>

                        </div>


                        <strong
                          style={{
                            fontSize:
                              "18px",
                          }}
                        >
                          +{item.contribution}
                        </strong>

                      </div>

                    )
                  )}

              </div>

            </div>


            {/* ==================================================
                TREND
            ================================================== */}

            <div
              style={{
                padding: "24px",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                marginBottom: "20px",
              }}
            >

              <SectionHeading
                icon={<TrendingUp />}
                title="Surveillance Trend"
              />


              <div
                style={{
                  marginTop: "20px",
                  height: "220px",
                  position: "relative",
                }}
              >

                <svg
                  viewBox="0 0 700 240"
                  preserveAspectRatio="none"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >

                  <line
                    x1="20"
                    y1="50"
                    x2="680"
                    y2="50"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <line
                    x1="20"
                    y1="120"
                    x2="680"
                    y2="120"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <line
                    x1="20"
                    y1="190"
                    x2="680"
                    y2="190"
                    stroke="rgba(255,255,255,0.08)"
                  />


                  <polyline
                    points="30,190 180,170 330,155 480,100 670,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />


                  <circle
                    cx="30"
                    cy="190"
                    r="7"
                    fill="currentColor"
                  />

                  <circle
                    cx="180"
                    cy="170"
                    r="7"
                    fill="currentColor"
                  />

                  <circle
                    cx="330"
                    cy="155"
                    r="7"
                    fill="currentColor"
                  />

                  <circle
                    cx="480"
                    cy="100"
                    r="7"
                    fill="currentColor"
                  />

                  <circle
                    cx="670"
                    cy="35"
                    r="9"
                    fill="currentColor"
                  />

                </svg>


                <div
                  style={{
                    position: "absolute",
                    left: "5%",
                    bottom: "0",
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  Previous
                </div>


                <div
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "0",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Current
                </div>

              </div>

            </div>


            {/* ==================================================
                AI SUMMARY
            ================================================== */}

            <div
              style={{
                padding: "25px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg, rgba(120,100,255,0.12), rgba(0,200,255,0.06))",
                border:
                  "1px solid rgba(120,140,255,0.2)",
                marginBottom: "20px",
              }}
            >

              <SectionHeading
                icon={<Brain />}
                title="AI Situation Summary"
              />


              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  opacity: 0.85,
                  marginTop: "18px",
                  marginBottom: 0,
                }}
              >
                {analysis.aiSummary}
              </p>

            </div>


            {/* ==================================================
                RECOMMENDATION
            ================================================== */}

            <div
              style={{
                padding: "25px",
                borderRadius: "18px",
                background:
                  "rgba(255,170,60,0.08)",
                border:
                  "1px solid rgba(255,170,60,0.22)",
                marginBottom: "20px",
              }}
            >

              <SectionHeading
                icon={<Shield />}
                title="Recommended Action"
              />


              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  opacity: 0.85,
                  marginTop: "18px",
                }}
              >
                {analysis.recommendation}
              </p>

            </div>


            {/* ==================================================
                POTENTIAL MEASURES
            ================================================== */}

            <div
              style={{
                padding: "25px",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                marginBottom: "20px",
              }}
            >

              <SectionHeading
                icon={<CheckCircle2 />}
                title="Suggested Measures for Human Review"
              />


              <p
                style={{
                  fontSize: "12px",
                  opacity: 0.55,
                  marginTop: "8px",
                }}
              >
                These are decision-support suggestions only.
                Authorized officials must make the final decision.
              </p>


              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "18px",
                }}
              >

                {(
                  analysis.potentialMeasures ||
                  []
                ).map(
                  (measure, index) => (

                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems:
                          "flex-start",
                        gap: "12px",
                        padding:
                          "13px 15px",
                        borderRadius:
                          "12px",
                        background:
                          "rgba(255,255,255,0.035)",
                      }}
                    >

                      <CheckCircle2
                        size={18}
                      />

                      <span
                        style={{
                          fontSize:
                            "14px",
                          lineHeight:
                            "1.5",
                        }}
                      >
                        {measure}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* ==================================================
                HUMAN DECISION
            ================================================== */}

            <div
              style={{
                padding: "26px",
                borderRadius: "18px",
                border:
                  "1px solid rgba(255,255,255,0.12)",
                background:
                  analysis.humanDecisionRequired
                    ? "rgba(255,80,80,0.08)"
                    : "rgba(80,220,150,0.07)",
                textAlign: "center",
              }}
            >

              <Shield
                size={32}
                style={{
                  marginBottom: "10px",
                }}
              />


              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: "20px",
                }}
              >
                {analysis.humanDecisionRequired
                  ? "HUMAN DECISION REQUIRED"
                  : "ROUTINE MONITORING"}
              </h3>


              <p
                style={{
                  margin: 0,
                  opacity: 0.65,
                  fontSize: "13px",
                }}
              >
                AI identifies patterns and provides
                decision support. Final decisions remain
                with authorized human reviewers.
              </p>

            </div>

          </section>
          </>
          )}


{activePage === "Emergency Readiness" && (
          <>

          {/* ==================================================
            HOSPITAL EMERGENCY READINESS
        ================================================== */}

        <section
          className="panel"
          style={{
            marginTop: "24px",
            padding: "28px",
          }}
        >

          {/* HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "25px",
            }}
          >

            <div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >

                <Shield size={28} />

                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                  }}
                >
                  Hospital Emergency Readiness
                </h2>

              </div>

              <p
                style={{
                  opacity: 0.7,
                  marginTop: "7px",
                  marginBottom: 0,
                }}
              >
                Synthetic preparedness indicators for emergency planning.
              </p>

            </div>


            {/* READINESS SCORE */}

            <div
              style={{
                padding: "14px 20px",
                borderRadius: "16px",
                background:
                  hospitalReadiness >= 75
                    ? "rgba(80,220,150,0.12)"
                    : hospitalReadiness >= 50
                    ? "rgba(255,190,70,0.12)"
                    : "rgba(255,80,80,0.12)",
                border:
                  hospitalReadiness >= 75
                    ? "1px solid rgba(80,220,150,0.25)"
                    : hospitalReadiness >= 50
                    ? "1px solid rgba(255,190,70,0.25)"
                    : "1px solid rgba(255,80,80,0.25)",
                textAlign: "center",
              }}
            >

              <small
                style={{
                  display: "block",
                  opacity: 0.65,
                  fontSize: "11px",
                  letterSpacing: "1px",
                }}
              >
                READINESS SCORE
              </small>

              <strong
                style={{
                  display: "block",
                  fontSize: "32px",
                  marginTop: "4px",
                }}
              >
                {hospitalReadiness}%
              </strong>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {getResourceStatus(hospitalReadiness)}
              </span>

            </div>

          </div>


          {/* SYNTHETIC DATA NOTICE */}

          <div
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              background: "rgba(100,180,255,0.08)",
              border: "1px solid rgba(100,180,255,0.18)",
              marginBottom: "20px",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            <strong>Demo Hospital:</strong>{" "}
            {hospital.name}
            <br />
            All hospital capacity and resource values shown here are
            synthetic demonstration data and do not represent real hospital
            availability.
          </div>


          {/* CONNECTION TO RISK ANALYSIS */}

          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "20px",
            }}
          >

            <SectionHeading
              icon={<AlertTriangle />}
              title="Preparedness Review"
            />

            <p
              style={{
                marginTop: "14px",
                marginBottom: 0,
                fontSize: "14px",
                lineHeight: "1.6",
                opacity: 0.75,
              }}
            >
              Current surveillance assessment:
              {" "}
              <strong>
                {analysis.riskLevel}
              </strong>
              . Hospital preparedness indicators can be reviewed alongside
              surveillance signals by authorized human decision-makers.
            </p>

          </div>


          {/* RESOURCE CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
              marginBottom: "20px",
            }}
          >

            {/* GENERAL BEDS */}

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Bed size={24} />

              <div
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  opacity: 0.6,
                }}
              >
                GENERAL BEDS
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                }}
              >
                {hospital.availableBeds}
                {" / "}
                {hospital.totalBeds}
              </strong>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                {Math.round(bedAvailability)}% available
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                }}
              >
                {getResourceStatus(bedAvailability)}
              </div>

            </div>


            {/* ICU */}

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Activity size={24} />

              <div
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  opacity: 0.6,
                }}
              >
                ICU BEDS
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                }}
              >
                {hospital.availableICU}
                {" / "}
                {hospital.totalICU}
              </strong>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                {Math.round(icuAvailability)}% available
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {getResourceStatus(icuAvailability)}
              </div>

            </div>


            {/* ISOLATION */}

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Shield size={24} />

              <div
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  opacity: 0.6,
                }}
              >
                ISOLATION BEDS
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                }}
              >
                {hospital.availableIsolationBeds}
                {" / "}
                {hospital.totalIsolationBeds}
              </strong>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                {Math.round(isolationAvailability)}% available
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {getResourceStatus(isolationAvailability)}
              </div>

            </div>


            {/* OXYGEN */}

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Wind size={24} />

              <div
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  opacity: 0.6,
                }}
              >
                OXYGEN SUPPLY
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                }}
              >
                {hospital.oxygenLevel}%
              </strong>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                {hospital.oxygenCylinders} cylinders
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {getResourceStatus(hospital.oxygenLevel)}
              </div>

            </div>


            {/* STAFF */}

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Users size={24} />

              <div
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  opacity: 0.6,
                }}
              >
                STAFF READINESS
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                }}
              >
                {Math.round(staffAvailability)}%
              </strong>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                Doctors: {hospital.doctorsAvailable}/
                {hospital.doctorsRequired}
                <br />
                Nurses: {hospital.nursesAvailable}/
                {hospital.nursesRequired}
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {getResourceStatus(staffAvailability)}
              </div>

            </div>


            {/* AMBULANCES */}

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <MapPin size={24} />

              <div
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  opacity: 0.6,
                }}
              >
                AMBULANCES
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                }}
              >
                {hospital.ambulancesAvailable}
                {" / "}
                {hospital.ambulancesTotal}
              </strong>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                {Math.round(ambulanceAvailability)}% available
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {getResourceStatus(ambulanceAvailability)}
              </div>

            </div>

          </div>


          {/* ESSENTIAL SUPPLIES */}

          <div
            style={{
              padding: "24px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "20px",
            }}
          >

            <SectionHeading
              icon={<Package />}
              title="Essential Supplies"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginTop: "18px",
              }}
            >

              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "22px",
                  }}
                >
                  {hospital.ppeKits}
                </strong>

                <span
                  style={{
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  PPE KITS
                </span>
              </div>


              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "22px",
                  }}
                >
                  {hospital.testingSupplies}
                </strong>

                <span
                  style={{
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  TESTING SUPPLIES
                </span>
              </div>


              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "22px",
                  }}
                >
                  {hospital.oxygenCylinders}
                </strong>

                <span
                  style={{
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  OXYGEN CYLINDERS
                </span>
              </div>

            </div>

          </div>


          {/* PRIORITY REVIEW */}

          <div
            style={{
              padding: "24px",
              borderRadius: "18px",
              background: "rgba(255,170,60,0.08)",
              border: "1px solid rgba(255,170,60,0.22)",
              marginBottom: "20px",
            }}
          >

            <SectionHeading
              icon={<AlertTriangle />}
              title="Priority Review Areas"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
                marginTop: "18px",
              }}
            >

              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong>ICU Capacity</strong>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    opacity: 0.65,
                  }}
                >
                  Review available critical-care capacity.
                </p>
              </div>


              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong>Oxygen Readiness</strong>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    opacity: 0.65,
                  }}
                >
                  Review oxygen availability and usage.
                </p>
              </div>


              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong>Staffing</strong>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    opacity: 0.65,
                  }}
                >
                  Review staffing capacity and coverage.
                </p>
              </div>


              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <strong>Essential Supplies</strong>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    opacity: 0.65,
                  }}
                >
                  Review PPE and testing supply levels.
                </p>
              </div>

            </div>

          </div>


          {/* HUMAN DECISION */}

          <div
            style={{
              padding: "22px",
              borderRadius: "16px",
              background: "rgba(255,80,80,0.08)",
              border: "1px solid rgba(255,80,80,0.2)",
              textAlign: "center",
            }}
          >

            <Shield
              size={28}
              style={{
                marginBottom: "8px",
              }}
            />

            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "18px",
              }}
            >
              HUMAN REVIEW REQUIRED
            </h3>

            <p
              style={{
                margin: 0,
                opacity: 0.65,
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              These preparedness indicators are synthetic decision-support
              information. Authorized hospital and public-health personnel
              must review real-world capacity and make operational decisions.
            </p>

          </div>

        </section>


          {/* ==================================================
              EMERGENCY RESPONSE STAFF
          ================================================== */}

          <section className="panel" style={{ marginTop: "24px", padding: "28px" }}>
            <PanelTitle
              icon={<Users />}
              title="Emergency Response Staff"
              subtitle="Authorized staff available for emergency alert routing"
            />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}>
              {emergencyStaff.map((staff) => (
                <div key={staff.id} style={{
                  padding: "18px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <strong>{staff.name}</strong>
                    <span style={{ fontSize: "11px", fontWeight: "700" }}>
                      {staff.status}
                    </span>
                  </div>
                  <p style={{ margin: "10px 0 4px", fontWeight: "600" }}>{staff.role}</p>
                  <p style={{ margin: "4px 0", fontSize: "13px", opacity: 0.7 }}>
                    {staff.department} • {staff.specialty}
                  </p>
                  <p style={{ margin: "8px 0 4px", fontSize: "13px" }}>📞 {staff.phone}</p>
                  <p style={{ margin: "4px 0", fontSize: "13px" }}>✉️ {staff.email}</p>
                  <p style={{ margin: "4px 0", fontSize: "12px", opacity: 0.65 }}>
                    Shift: {staff.shift}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "18px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(255,170,60,0.08)",
              fontSize: "12px",
            }}>
              Demo staff names and contact details are synthetic.
            </div>
          </section>

          {/* ==================================================
              AUTOMATIC EMERGENCY NOTIFICATIONS
          ================================================== */}

          <section className="panel" style={{ marginTop: "24px", padding: "28px" }}>
            <PanelTitle
              icon={<AlertTriangle />}
              title="Emergency Notification"
              subtitle="Prototype routing to on-duty emergency staff"
            />

            <div style={{
              marginTop: "18px",
              padding: "16px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.035)",
            }}>
              <strong>Current prototype risk: {analysis.riskLevel}</strong>
              <p style={{ margin: "7px 0 0", fontSize: "13px", opacity: 0.7 }}>
                HIGH and CRITICAL results automatically create simulated
                notifications for ON-DUTY staff.
              </p>
            </div>

            <button
              onClick={sendEmergencyAlert}
              style={{
                marginTop: "18px",
                padding: "12px 18px",
                border: "none",
                borderRadius: "10px",
                background: "#dc2626",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Send / Resend Emergency Alert
            </button>

            {notifications.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ marginBottom: "12px" }}>Notification Log</h3>
                {notifications.map((notification) => (
                  <div key={notification.id} style={{
                    padding: "14px",
                    marginTop: "10px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                      <strong>{notification.staffName}</strong>
                      <span style={{ fontSize: "11px", fontWeight: "700" }}>
                        ✓ {notification.status}
                      </span>
                    </div>
                    <p style={{ margin: "6px 0", fontSize: "12px", opacity: 0.65 }}>
                      📞 {notification.contact}
                    </p>
                    <p style={{ margin: "6px 0", fontSize: "13px", lineHeight: "1.5" }}>
                      {notification.message}
                    </p>
                    <small style={{ opacity: 0.5 }}>
                      Sent at {notification.sentAt}
                    </small>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              marginTop: "18px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(100,180,255,0.08)",
              fontSize: "12px",
              lineHeight: "1.5",
            }}>
              This prototype simulates message delivery inside the application.
              It does not send real SMS, email, or medical instructions.
            </div>
          </section>

          {/* ==================================================
              EMERGENCY MEDICINE & SUPPLY STOCK
          ================================================== */}

          <section className="panel" style={{ marginTop: "24px", padding: "28px" }}>
            <PanelTitle
              icon={<Package />}
              title="Emergency Medicine & Supply Stock"
              subtitle="Emergency inventory readiness check"
            />

            <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
              {emergencyStock.map((item) => {
                const percentage = Math.round((item.available / item.required) * 100);
                const status = getStockStatus(item.available, item.required);

                return (
                  <div key={item.id} style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                      <div>
                        <strong>{item.name}</strong>
                        <div style={{ marginTop: "4px", fontSize: "12px", opacity: 0.6 }}>
                          {item.category}
                        </div>
                      </div>
                      <strong>{status}</strong>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      fontSize: "13px",
                    }}>
                      <span>Available: {item.available} {item.unit}</span>
                      <span>Required: {item.required} {item.unit}</span>
                      <span>{percentage}%</span>
                    </div>

                    <div style={{
                      height: "8px",
                      marginTop: "10px",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${Math.min(percentage, 100)}%`,
                        height: "100%",
                        borderRadius: "10px",
                        background:
                          status === "READY" ? "#16a34a" :
                          status === "LOW" ? "#f59e0b" : "#dc2626",
                      }} />
                    </div>

                    {status !== "READY" && (
                      <div style={{ marginTop: "9px", fontSize: "12px", fontWeight: "600" }}>
                        ⚠️ Replenishment review required.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: "18px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(100,180,255,0.08)",
              fontSize: "12px",
            }}>
              Inventory quantities are synthetic demonstration data.
            </div>
          </section>

          {/* ==================================================
              DIAGNOSTICS LAB
          ================================================== */}

          <section className="panel" style={{ marginTop: "24px", padding: "28px" }}>
            <PanelTitle
              icon={<Activity />}
              title="Diagnostics Laboratory Readiness"
              subtitle="Laboratory capacity and resource check"
            />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
              marginTop: "20px",
            }}>
              {diagnosticsLab.map((item) => {
                const percentage = Math.round((item.available / item.required) * 100);
                const status = getLabStatus(item.available, item.required);

                return (
                  <div key={item.id} style={{
                    padding: "18px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <strong>{item.name}</strong>
                    <div style={{ marginTop: "10px", fontSize: "14px" }}>
                      {item.available} / {item.required} {item.unit}
                    </div>
                    <div style={{ marginTop: "8px", fontWeight: "700" }}>{status}</div>
                    <div style={{ marginTop: "6px", fontSize: "12px", opacity: 0.65 }}>
                      Capacity: {percentage}%
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: "18px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(100,180,255,0.08)",
              fontSize: "12px",
            }}>
              Laboratory values are synthetic demonstration data and represent
              operational readiness only.
            </div>
          </section>


          {/* ==================================================
              FOOTER
          ================================================== */}

          </>
          )}


          {activePage === "About" && (
            <section className="panel" style={{ marginTop: "24px", padding: "28px" }}>
              <PanelTitle
                icon={<Shield />}
                title="About BioThreat AI"
                subtitle="AI-assisted early-warning & decision-support prototype"
              />

              <div style={{
                display: "grid",
                gap: "16px",
                marginTop: "20px",
              }}>
                <div style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <h3 style={{ marginTop: 0 }}>What BioThreat AI does</h3>
                  <p style={{ marginBottom: 0, lineHeight: "1.7", opacity: 0.75 }}>
                    BioThreat AI analyzes synthetic biosurveillance observations,
                    looks for unusual patterns, calculates a prototype risk score,
                    explains the contributing signals, and presents alerts and
                    preparedness information for human review.
                  </p>
                </div>

                <div style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <h3 style={{ marginTop: 0 }}>Prototype workspace</h3>
                  <div style={{ display: "grid", gap: "9px", fontSize: "14px", lineHeight: "1.6", opacity: 0.78 }}>
                    <div><strong>Dashboard:</strong> live high-level status and recent activity.</div>
                    <div><strong>New Analysis:</strong> enter synthetic observations and run the analysis.</div>
                    <div><strong>Zone Map:</strong> view synthetic incidents geographically.</div>
                    <div><strong>Statistics:</strong> inspect risk, evidence, trends, and the AI summary.</div>
                    <div><strong>Emergency Readiness:</strong> review hospital capacity, emergency staff, notifications, supply stock, and diagnostics.</div>
                    <div><strong>About:</strong> understand the prototype's purpose and limitations.</div>
                  </div>
                </div>

                <div style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255,170,60,0.08)",
                  border: "1px solid rgba(255,170,60,0.22)",
                }}>
                  <h3 style={{ marginTop: 0 }}>Human-in-the-loop</h3>
                  <p style={{ marginBottom: 0, lineHeight: "1.7", opacity: 0.8 }}>
                    AI identifies patterns and provides decision support. It does
                    not diagnose disease or confirm a biological threat, and it does
                    not autonomously order public-health or medical interventions.
                    Authorized human reviewers remain responsible for real-world decisions.
                  </p>
                </div>

                <div style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(100,180,255,0.08)",
                  border: "1px solid rgba(100,180,255,0.18)",
                }}>
                  <h3 style={{ marginTop: 0 }}>Synthetic data notice</h3>
                  <p style={{ marginBottom: 0, lineHeight: "1.7", opacity: 0.78 }}>
                    Surveillance, hospital, staff, inventory, and notification values
                    shown in this prototype are synthetic demonstration data.
                    Notification delivery displayed by the application is simulated.
                  </p>
                </div>
              </div>
            </section>
          )}

          <footer>

            <strong>
              🧬 BioThreat AI
            </strong>

            <span>
              Synthetic Data • Educational Prototype • Built
              for a Safer Tomorrow
            </span>

            <span>
              One Health • Smarter Data • Stronger Communities
            </span>

          </footer>

        </main>

      </div>

    </div>
  );
}


// ==================================================
// SIDEBAR ITEM
// ==================================================

function SideItem({
  icon,
  text,
  active,
  onClick,
}) {

  return (

    <div
      className={
        active
          ? "side-item active"
          : "side-item"
      }
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick?.();
        }
      }}
      style={{ cursor: "pointer" }}
    >

      {icon}

      <span>
        {text}
      </span>

    </div>
  );
}


// ==================================================
// PANEL TITLE
// ==================================================

function PanelTitle({
  icon,
  title,
  subtitle,
}) {

  return (

    <div className="panel-title">

      <div className="panel-icon">
        {icon}
      </div>

      <div>

        <h2>
          {title}
        </h2>

        <p>
          {subtitle}
        </p>

      </div>

    </div>
  );
}


// ==================================================
// CHECKBOX
// ==================================================

function Check({
  icon,
  text,
  checked,
  setChecked,
}) {

  return (

    <label className="check">

      <span className="check-icon">
        {icon}
      </span>

      <span>
        {text}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          setChecked(
            e.target.checked
          )
        }
      />

      <span className="check-box">
        {checked && "✓"}
      </span>

    </label>
  );
}


// ==================================================
// MINI RESULT
// ==================================================

function MiniResult({
  icon,
  title,
  value,
}) {

  return (

    <div
      style={{
        flex: 1,
        padding: "18px",
        borderRadius: "16px",
        background:
          "rgba(255,255,255,0.035)",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: 0.7,
          fontSize: "12px",
          textTransform: "uppercase",
        }}
      >

        {icon}

        <span>
          {title}
        </span>

      </div>


      <strong
        style={{
          display: "block",
          marginTop: "9px",
          fontSize: "17px",
        }}
      >
        {value}
      </strong>

    </div>
  );
}


// ==================================================
// STAT BOX
// ==================================================

function StatBox({
  icon,
  value,
  label,
}) {

  return (

    <div
      style={{
        padding: "18px",
        borderRadius: "15px",
        background:
          "rgba(255,255,255,0.035)",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >

      <div
        style={{
          opacity: 0.65,
          marginBottom: "9px",
        }}
      >
        {icon}
      </div>

      <strong
        style={{
          display: "block",
          fontSize: "22px",
        }}
      >
        {value}
      </strong>

      <span
        style={{
          display: "block",
          marginTop: "4px",
          opacity: 0.55,
          fontSize: "12px",
        }}
      >
        {label}
      </span>

    </div>
  );
}


// ==================================================
// SECTION HEADING
// ==================================================

function SectionHeading({
  icon,
  title,
}) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >

      {icon}

      <h3
        style={{
          margin: 0,
          fontSize: "18px",
        }}
      >
        {title}
      </h3>

    </div>
  );
}


// ==================================================
// RISK CARD
// ==================================================

function RiskCard({
  title,
  value,
  cls,
  icon,
}) {

  return (

    <div
      className={`risk-card ${cls}`}
    >

      <div className="risk-icon">
        {icon}
      </div>

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// ==================================================
// ACTIVITY ROW
// ==================================================

function ActivityRow({
  color,
  icon,
  title,
  value,
  time,
}) {
  return (
    <div className="activity-row">
      {color ? (
        <span
          className={`activity-dot ${color}`}
        />
      ) : (
        <span className="activity-icon">
          {icon}
        </span>
      )}
      <div className="activity-text">
        <strong>
          {title}
        </strong>

        {value && (

          <small>
            {value}
          </small>

        )}

      </div>


      <time>
        {time}
      </time>

    </div>
  );
}
// ==================================================
// LEGEND
// ==================================================
function Legend({
  cls,
  text,
}) {

  return (

    <div>

      <span
        className={`legend-dot ${cls}`}
      />

      {text}

    </div>
  );
}
// ==================================================
// OLD STAT COMPONENT
// ==================================================
function Stat({
  icon,
  value,
  text,
}) {
  return (

    <div className="stat">

      {icon}

      <strong>
        {value}
      </strong>

      <span>
        {text}
      </span>

    </div>
  );
}
// ==================================================
// EXPORT
// ==================================================
export default App;