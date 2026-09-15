const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// Temporary synthetic data
// --------------------------------------------------

const reportsDatabase = [
    {
        id: 1,
        zone: "Zone A",
        reports: 31,
        previousReports: 12,
        environmentalAlert: true,
        geographicCluster: true,
        rapidChange: true
    },
    {
        id: 2,
        zone: "Zone B",
        reports: 9,
        previousReports: 8,
        environmentalAlert: false,
        geographicCluster: false,
        rapidChange: false
    },
    {
        id: 3,
        zone: "Zone C",
        reports: 5,
        previousReports: 6,
        environmentalAlert: false,
        geographicCluster: false,
        rapidChange: false
    }
];

// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get("/", (req, res) => {
    res.json({
        success: true,
        service: "BioThreat AI Backend",
        status: "running",
        message: "Backend is ready for synthetic biosurveillance analysis."
    });
});

// --------------------------------------------------
// Get synthetic reports
// --------------------------------------------------

app.get("/api/reports", (req, res) => {
    res.json({
        success: true,
        count: reportsDatabase.length,
        reports: reportsDatabase
    });
});

// --------------------------------------------------
// Risk calculation
// --------------------------------------------------

function analyzeData(data) {
    const {
        reports,
        previousReports,
        environmentalAlert,
        geographicCluster,
        rapidChange
    } = data;

    let riskScore = 0;
    const evidence = [];

    // ----------------------------------------------
    // 1. Report increase
    // ----------------------------------------------

    const increasePercentage =
        previousReports > 0
            ? ((reports - previousReports) / previousReports) * 100
            : 0;

    if (increasePercentage >= 50) {
        riskScore += 40;

        evidence.push({
            signal: "Report spike",
            contribution: 40,
            detail: `Reports increased by ${Math.round(
                increasePercentage
            )}% compared with the previous baseline.`
        });
    }

    // ----------------------------------------------
    // 2. Environmental signal
    // ----------------------------------------------

    if (environmentalAlert === true) {
        riskScore += 25;

        evidence.push({
            signal: "Environmental signal",
            contribution: 25,
            detail: "An environmental alert is present."
        });
    }

    // ----------------------------------------------
    // 3. Geographic clustering
    // ----------------------------------------------

    if (geographicCluster === true) {
        riskScore += 20;

        evidence.push({
            signal: "Geographic clustering",
            contribution: 20,
            detail: "Reports show clustering within the monitored zone."
        });
    }

    // ----------------------------------------------
    // 4. Rapid temporal change
    // ----------------------------------------------

    if (rapidChange === true) {
        riskScore += 15;

        evidence.push({
            signal: "Rapid change",
            contribution: 15,
            detail: "A rapid change in reporting activity was detected."
        });
    }

    // Maximum score
    riskScore = Math.min(riskScore, 100);

    // ----------------------------------------------
    // Risk classification
    // ----------------------------------------------

    let riskLevel;

    if (riskScore >= 81) {
        riskLevel = "CRITICAL";
    } else if (riskScore >= 61) {
        riskLevel = "HIGH";
    } else if (riskScore >= 31) {
        riskLevel = "MODERATE";
    } else {
        riskLevel = "LOW";
    }

    // ----------------------------------------------
    // Anomaly detection
    // ----------------------------------------------

    const anomalyDetected = increasePercentage >= 50;

    // ----------------------------------------------
    // Recommendation
    // ----------------------------------------------

    let recommendation;

    if (riskScore >= 61) {
        recommendation = "Human review recommended.";
    } else if (riskScore >= 31) {
        recommendation = "Continue monitoring and review the signals.";
    } else {
        recommendation = "No immediate escalation indicated.";
    }

    return {
        riskScore,
        riskLevel,
        anomalyDetected,
        increasePercentage: Math.round(increasePercentage),
        evidence,
        recommendation
    };
}

// --------------------------------------------------
// Analyze a single report
// --------------------------------------------------

app.post("/api/analyze", (req, res) => {
    try {
        const {
            zone,
            reports,
            previousReports,
            environmentalAlert,
            geographicCluster,
            rapidChange
        } = req.body;

        // ------------------------------------------
        // Input validation
        // ------------------------------------------

        if (!zone) {
            return res.status(400).json({
                success: false,
                error: "Zone is required."
            });
        }

        if (
            typeof reports !== "number" ||
            typeof previousReports !== "number"
        ) {
            return res.status(400).json({
                success: false,
                error: "Reports and previousReports must be numbers."
            });
        }

        if (reports < 0 || previousReports < 0) {
            return res.status(400).json({
                success: false,
                error: "Report counts cannot be negative."
            });
        }

        // ------------------------------------------
        // Run analysis
        // ------------------------------------------

        const analysis = analyzeData({
            reports,
            previousReports,
            environmentalAlert: Boolean(environmentalAlert),
            geographicCluster: Boolean(geographicCluster),
            rapidChange: Boolean(rapidChange)
        });

        // ------------------------------------------
        // Response
        // ------------------------------------------

        res.json({
            success: true,

            analysis: {
                zone,
                reports,
                previousReports,
                ...analysis
            },

            systemNote:
                "This is a prototype decision-support system using synthetic data. It does not diagnose or confirm a biological threat."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: "Internal server error."
        });
    }
});

// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, () => {
    console.log(
        `BioThreat AI Backend running on http://localhost:${PORT}`
    );
});
