import { useState } from "react";

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

  const [zone, setZone] = useState("Zone A");

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

      zone: "Zone A",

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

    } catch (err) {

      console.error(err);

      setError(
        "Could not connect to the BioThreat AI backend. Make sure the backend is running on port 5000."
      );

    } finally {

      setLoading(false);
    }
  };


  const analysis = result.analysis;


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

          <div className="dna-logo">
            🧬
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
              SEP 15, 2026
            </strong>

            <span>
              12:45 PM
            </span>

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
            active
          />

          <SideItem
            icon={<FileText />}
            text="New Analysis"
          />

          <SideItem
            icon={<MapPin />}
            text="Zone Map"
          />

          <SideItem
            icon={<BarChart3 />}
            text="Statistics"
          />

          <SideItem
            icon={<Shield />}
            text="About"
          />

        </aside>


        {/* ==================================================
            MAIN
        ================================================== */}

        <main className="main">


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

          <div className="top-grid">


            {/* INPUT */}

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

                  <input
                    type="text"
                    value={zone}
                    placeholder="Enter any area or zone"
                    onChange={(e) =>
                      setZone(e.target.value)
                    }
                  />

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


            {/* MAP */}

            <section className="panel map-panel">

              <PanelTitle
                icon={<MapPin />}
                title="Geographic View"
                subtitle="Synthetic incident reports by region"
              />


              <div className="map">

                <MapContainer
                  center={[
                    20.5937,
                    78.9629,
                  ]}
                  zoom={4}
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


                  <Marker
                    position={[
                      13.0827,
                      80.2707,
                    ]}
                  >

                    <Popup>

                      <strong>
                        Zone A
                      </strong>

                      <br />

                      31 synthetic reports

                    </Popup>

                  </Marker>


                  <Marker
                    position={[
                      19.076,
                      72.8777,
                    ]}
                  >

                    <Popup>

                      <strong>
                        Zone B
                      </strong>

                      <br />

                      9 synthetic reports

                    </Popup>

                  </Marker>


                  <Marker
                    position={[
                      12.9716,
                      77.5946,
                    ]}
                  >

                    <Popup>

                      <strong>
                        Zone C
                      </strong>

                      <br />

                      5 synthetic reports

                    </Popup>

                  </Marker>

                </MapContainer>


                <div className="map-card">

                  <div className="pulse"></div>

                  <div>

                    <strong>
                      {analysis.zone}
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


            {/* ACTIVITY */}

            <section className="panel activity">

              <PanelTitle
                icon={<Clock3 />}
                title="Recent Activity"
                subtitle="Live updates (synthetic)"
              />


              <ActivityRow
                color="red"
                title="Zone A"
                value="31 reports"
                time="12:44 PM"
              />

              <ActivityRow
                color="yellow"
                title="Zone B"
                value="9 reports"
                time="12:38 PM"
              />

              <ActivityRow
                color="green"
                title="Zone C"
                value="5 reports"
                time="12:21 PM"
              />

              <ActivityRow
                icon={<Leaf />}
                title="Environmental alert detected"
                time="12:10 PM"
              />

              <ActivityRow
                icon={<Zap />}
                title="Rapid increase in reports"
                time="11:55 AM"
              />

              <ActivityRow
                icon={<Users />}
                title="Cluster detected in Zone A"
                time="11:43 AM"
              />

            </section>

          </div>


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
                title="Potential Measures for Human Review"
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
              FOOTER
          ================================================== */}

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
}) {

  return (

    <div
      className={
        active
          ? "side-item active"
          : "side-item"
      }
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