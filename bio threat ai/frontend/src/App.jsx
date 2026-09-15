import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Leaf,
  MapPin,
  Search,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,

  TileLayer,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";


// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function App() {

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


  const [result, setResult] = useState({
    analysis: {
      zone: "Zone A",
      reports: 31,
      previousReports: 12,
      riskScore: 100,
      riskLevel: "CRITICAL",
      anomalyDetected: true,
      increasePercentage: 158,

      evidence: [
        {
          signal: "Report spike",
          contribution: 40,
          detail:
            "Reports increased by 158% compared with the previous baseline.",
        },

        {
          signal: "Environmental signal",
          contribution: 25,
          detail:
            "An environmental alert is present.",
        },

        {
          signal: "Geographic clustering",
          contribution: 20,
          detail:
            "Reports show clustering within the monitored zone.",
        },

        {
          signal: "Rapid change",
          contribution: 15,
          detail:
            "A rapid change in reporting activity was detected.",
        },
      ],

      recommendation:
        "Human review recommended.",
    },
  });


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // Send data to Node.js backend
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


  return (

    <div className="app">


      {/* HEADER */}

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


      <div className="layout">


        {/* SIDEBAR */}

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


        {/* MAIN */}

        <main className="main">


          {/* DISCLAIMER */}

          <div className="disclaimer">

            <AlertTriangle size={21} />

            <span>
              Prototype using synthetic biosurveillance
              data. This system provides decision support
              and does not diagnose or confirm a biological
              threat.
            </span>

          </div>


          {/* TOP GRID */}

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
    onChange={(e) => setZone(e.target.value)}
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


          {/* BOTTOM GRID */}

          <div className="bottom-grid">


            {/* ANALYSIS */}

            <section className="panel analysis">

              <PanelTitle
                icon={<Brain />}
                title="Analysis Result"
                subtitle="Risk assessment based on input data"
              />


              <div className="risk-cards">

                <RiskCard
                  title="Risk Score"
                  value={`${analysis.riskScore}/100`}
                  cls="critical"
                  icon={<Activity />}
                />

                <RiskCard
                  title="Risk Level"
                  value={analysis.riskLevel}
                  cls="high"
                  icon={<AlertTriangle />}
                />

                <RiskCard
                  title="Anomaly"
                  value={
                    analysis.anomalyDetected
                      ? "DETECTED"
                      : "NOT DETECTED"
                  }
                  cls="anomaly"
                  icon={<TrendingUp />}
                />

              </div>


              <div className="recommendation">

                <Shield size={25} />

                <div>

                  <strong>
                    Recommended action
                  </strong>

                  <p>
                    {analysis.recommendation}
                  </p>

                </div>

              </div>

            </section>


            {/* EVIDENCE */}

            <section className="panel evidence">

              <PanelTitle
                icon={<FileText />}
                title="Evidence"
                subtitle="Signals contributing to risk score"
              />


              {analysis.evidence.map(
                (item, index) => (

                  <div
                    className="evidence-row"
                    key={index}
                  >

                    <div className="evidence-icon">

                      {index === 0 &&
                        <BarChart3 />}

                      {index === 1 &&
                        <Leaf />}

                      {index === 2 &&
                        <Users />}

                      {index === 3 &&
                        <Zap />}

                    </div>


                    <div className="evidence-text">

                      <strong>
                        {item.signal}
                      </strong>

                      <p>
                        {item.detail}
                      </p>

                    </div>


                    <strong className="points">
                      +{item.contribution}
                    </strong>

                  </div>

                )
              )}

            </section>


            {/* GRAPH */}

            <section className="panel trends">

              <PanelTitle
                icon={<TrendingUp />}
                title="Trends"
                subtitle={`Reported cases over time (${analysis.zone})`}
              />


              <div className="graph">

                <div className="graph-header">

                  <span>
                    Reported cases
                  </span>

                  <strong>
                    +{analysis.increasePercentage}%
                  </strong>

                </div>


                <svg
                  viewBox="0 0 600 250"
                  preserveAspectRatio="none"
                >

                  <line
                    x1="20"
                    y1="50"
                    x2="580"
                    y2="50"
                    className="grid-line"
                  />

                  <line
                    x1="20"
                    y1="110"
                    x2="580"
                    y2="110"
                    className="grid-line"
                  />

                  <line
                    x1="20"
                    y1="170"
                    x2="580"
                    y2="170"
                    className="grid-line"
                  />

                  <line
                    x1="20"
                    y1="220"
                    x2="580"
                    y2="220"
                    className="grid-line"
                  />


                  <polygon
                    points="
                    20,205
                    65,195
                    110,190
                    155,178
                    200,185
                    245,155
                    290,165
                    335,135
                    380,145
                    425,110
                    470,95
                    515,70
                    580,25
                    580,220
                    20,220
                    "
                    className="area"
                  />


                  <polyline
                    points="
                    20,205
                    65,195
                    110,190
                    155,178
                    200,185
                    245,155
                    290,165
                    335,135
                    380,145
                    425,110
                    470,95
                    515,70
                    580,25
                    "
                    className="line"
                  />


                  {[
                    [20, 205],
                    [65, 195],
                    [110, 190],
                    [155, 178],
                    [200, 185],
                    [245, 155],
                    [290, 165],
                    [335, 135],
                    [380, 145],
                    [425, 110],
                    [470, 95],
                    [515, 70],
                    [580, 25],
                  ].map(
                    ([x, y], i) => (

                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="5"
                        className="point"
                      />

                    )
                  )}

                </svg>

              </div>


              <div className="stats">

                <Stat
                  icon={<Users />}
                  value={analysis.reports}
                  text="Current Reports"
                />

                <Stat
                  icon={<TrendingUp />}
                  value={`${analysis.increasePercentage}%`}
                  text="Increase"
                />

                <Stat
                  icon={<CalendarDays />}
                  value={analysis.previousReports}
                  text="Previous Reports"
                />

              </div>

            </section>

          </div>

        </main>

      </div>


      {/* FOOTER */}

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

    </div>
  );
}


/* ---------- COMPONENTS ---------- */


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
          setChecked(e.target.checked)
        }
      />

      <span className="check-box">
        {checked && "✓"}
      </span>

    </label>

  );
}


function RiskCard({
  title,
  value,
  cls,
  icon,
}) {

  return (

    <div className={`risk-card ${cls}`}>

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


export default App;