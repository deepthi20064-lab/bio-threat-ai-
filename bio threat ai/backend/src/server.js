const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ==================================================
// Middleware
// ==================================================

app.use(cors());
app.use(express.json());


// ==================================================
// Temporary Synthetic Biosurveillance Data
// ==================================================

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


// ==================================================
// Health Check
// ==================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        service: "BioThreat AI Backend",
        status: "running",
        message:
            "Backend is ready for synthetic biosurveillance analysis."
    });
});


// ==================================================
// Get Synthetic Reports
// ==================================================

app.get("/api/reports", (req, res) => {
    res.json({
        success: true,
        count: reportsDatabase.length,
        reports: reportsDatabase
    });
});


// ==================================================
// MAIN ANALYSIS FUNCTION
// ==================================================

function analyzeData(data) {

    const {
        zone,
        reports,
        previousReports,
        environmentalAlert,
        geographicCluster,
        rapidChange,
        symptoms = [],
        otherSymptoms = ""
    } = data;


    // ==================================================
    // 1. STATISTICAL CALCULATIONS
    // ==================================================

    const absoluteChange = reports - previousReports;

    const increasePercentage =
        previousReports > 0
            ? ((reports - previousReports) / previousReports) * 100
            : reports > 0
                ? 100
                : 0;

    const roundedPercentageChange =
        Math.round(increasePercentage * 10) / 10;

    const baselineRatio =
        previousReports > 0
            ? Math.round((reports / previousReports) * 100) / 100
            : null;


    // ==================================================
    // 2. TREND CLASSIFICATION
    // ==================================================

    let trend = "STABLE";

    if (increasePercentage >= 100) {
        trend = "EXTREME INCREASE";
    } else if (increasePercentage >= 50) {
        trend = "SIGNIFICANT INCREASE";
    } else if (increasePercentage >= 20) {
        trend = "MODERATE INCREASE";
    } else if (increasePercentage > 0) {
        trend = "SMALL INCREASE";
    } else if (increasePercentage < 0) {
        trend = "DECREASE";
    }


    // ==================================================
    // 3. RISK SCORE
    // ==================================================

    let riskScore = 0;

    const evidence = [];
    const activeSignals = [];


    // --------------------------------------------------
    // Report Spike
    // --------------------------------------------------

    if (increasePercentage >= 50) {

        riskScore += 40;

        activeSignals.push("Report spike");

        evidence.push({
            signal: "Report spike",
            contribution: 40,
            severity: "HIGH",
            detail:
                `Reports increased by ${roundedPercentageChange}% ` +
                `compared with the previous baseline.`
        });
    }


    // --------------------------------------------------
    // Environmental Signal
    // --------------------------------------------------

    if (environmentalAlert === true) {

        riskScore += 25;

        activeSignals.push("Environmental signal");

        evidence.push({
            signal: "Environmental signal",
            contribution: 25,
            severity: "MODERATE",
            detail:
                "An environmental alert is present in the monitored zone."
        });
    }


    // --------------------------------------------------
    // Geographic Clustering
    // --------------------------------------------------

    if (geographicCluster === true) {

        riskScore += 20;

        activeSignals.push("Geographic clustering");

        evidence.push({
            signal: "Geographic clustering",
            contribution: 20,
            severity: "MODERATE",
            detail:
                "Reports appear concentrated within the monitored geographic zone."
        });
    }


    // --------------------------------------------------
    // Rapid Temporal Change
    // --------------------------------------------------

    if (rapidChange === true) {

        riskScore += 15;

        activeSignals.push("Rapid change");

        evidence.push({
            signal: "Rapid change",
            contribution: 15,
            severity: "MODERATE",
            detail:
                "Reporting activity is changing rapidly compared with the baseline."
        });
    }


    // ==================================================
    // 4. SYMPTOM INFORMATION
    // ==================================================

    const cleanedSymptoms = Array.isArray(symptoms)
        ? symptoms.filter(
            (symptom) =>
                typeof symptom === "string" &&
                symptom.trim() !== ""
        )
        : [];

    const hasOtherSymptoms =
        typeof otherSymptoms === "string" &&
        otherSymptoms.trim() !== "";

    if (
        cleanedSymptoms.length > 0 ||
        hasOtherSymptoms
    ) {
        activeSignals.push("Symptoms reported");
    }


    // ==================================================
    // 5. LIMIT RISK SCORE
    // ==================================================

    riskScore = Math.min(riskScore, 100);


    // ==================================================
    // 6. RISK LEVEL
    // ==================================================

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


    // ==================================================
    // 7. ANOMALY DETECTION
    // ==================================================

    const anomalyDetected =
        increasePercentage >= 50 ||
        environmentalAlert === true ||
        geographicCluster === true ||
        rapidChange === true;


    // ==================================================
    // 8. MONITORING PRIORITY
    // ==================================================

    let monitoringPriority;

    if (riskScore >= 81) {
        monitoringPriority = "IMMEDIATE REVIEW";
    } else if (riskScore >= 61) {
        monitoringPriority = "HIGH PRIORITY";
    } else if (riskScore >= 31) {
        monitoringPriority = "ENHANCED MONITORING";
    } else {
        monitoringPriority = "ROUTINE MONITORING";
    }


    // ==================================================
    // 9. RECOMMENDATION
    // ==================================================

    let recommendation;

    if (riskScore >= 81) {

        recommendation =
            "Immediate human review is recommended. " +
            "Authorized public-health officials should assess " +
            "whether enhanced surveillance and protective measures are required.";

    } else if (riskScore >= 61) {

        recommendation =
            "High-priority human review is recommended. " +
            "Consider enhanced surveillance, verification of incoming reports, " +
            "and assessment of appropriate public-health measures.";

    } else if (riskScore >= 31) {

        recommendation =
            "Continue enhanced monitoring and review the contributing signals. " +
            "Additional data collection may help determine whether the pattern persists.";

    } else {

        recommendation =
            "No immediate escalation is indicated by this prototype score. " +
            "Continue routine monitoring and review new incoming data.";
    }


    // ==================================================
    // 10. POTENTIAL RESPONSE MEASURES
    // ==================================================
    //
    // These are suggestions for authorized human review.
    // They are NOT automatic decisions.
    //

    const potentialMeasures = [];


    if (riskScore >= 61) {

        potentialMeasures.push(
            "Increase local surveillance and reporting frequency."
        );

        potentialMeasures.push(
            "Verify unusual reports with local health authorities."
        );

        potentialMeasures.push(
            "Assess whether temporary public-health communication is appropriate."
        );
    }


    if (riskScore >= 81) {

        potentialMeasures.push(
            "Assess school and workplace attendance policies based on verified local evidence."
        );

        potentialMeasures.push(
            "Assess whether temporary restrictions on high-risk public interactions are warranted."
        );
    }


    if (potentialMeasures.length === 0) {

        potentialMeasures.push(
            "Continue routine surveillance and collect additional evidence."
        );
    }


    // ==================================================
    // 11. AI-READY SITUATION SUMMARY
    // ==================================================

    let aiSummary;

    if (riskScore >= 81) {

        aiSummary =
            `The system detected a critical pattern in ${zone}. ` +
            "The strongest contributing signals should be reviewed " +
            "by a human decision-maker.";

    } else if (riskScore >= 61) {

        aiSummary =
            `The system detected a high-risk pattern in ${zone}. ` +
            "Multiple surveillance signals may be contributing " +
            "to the elevated score.";

    } else if (riskScore >= 31) {

        aiSummary =
            `The system detected a moderate pattern in ${zone}. ` +
            "Continued monitoring is recommended to determine " +
            "whether the signal persists.";

    } else {

        aiSummary =
            `The monitored pattern in ${zone} currently shows limited evidence ` +
            "of unusual escalation based on the prototype scoring rules.";
    }


    // ==================================================
    // 12. TREND DATA FOR FRONTEND
    // ==================================================

    const trendData = [
        {
            label: "Previous",
            value: previousReports
        },
        {
            label: "Current",
            value: reports
        }
    ];


    // ==================================================
    // 13. RISK SCORE BREAKDOWN
    // ==================================================

    const riskBreakdown = [
        {
            name: "Report Spike",
            points: increasePercentage >= 50 ? 40 : 0,
            maximum: 40,
            detected: increasePercentage >= 50
        },
        {
            name: "Environmental Signal",
            points: environmentalAlert ? 25 : 0,
            maximum: 25,
            detected: environmentalAlert
        },
        {
            name: "Geographic Clustering",
            points: geographicCluster ? 20 : 0,
            maximum: 20,
            detected: geographicCluster
        },
        {
            name: "Rapid Change",
            points: rapidChange ? 15 : 0,
            maximum: 15,
            detected: rapidChange
        }
    ];


    // ==================================================
    // 14. CONFIDENCE / DATA QUALITY INDICATORS
    // ==================================================

    let dataQuality = "LIMITED";

    if (
        previousReports > 0 &&
        activeSignals.length >= 3
    ) {
        dataQuality = "STRONG";
    } else if (
        previousReports > 0 &&
        activeSignals.length >= 2
    ) {
        dataQuality = "MODERATE";
    }


    // ==================================================
    // 15. HUMAN DECISION
    // ==================================================

    const humanDecisionRequired = riskScore >= 31;


    // ==================================================
    // 16. FINAL RESULT
    // ==================================================

    return {

        // Main result
        riskScore,
        riskLevel,

        // Detection
        anomalyDetected,

        // Trend
        trend,

        // Priority
        monitoringPriority,

        // Basic values
        reports,
        previousReports,

        // Statistics
        statistics: {

            currentReports: reports,

            previousReports: previousReports,

            absoluteChange: absoluteChange,

            percentageChange: roundedPercentageChange,

            baselineRatio: baselineRatio,

            activeSignals: activeSignals.length,

            maximumRiskScore: 100
        },

        // Signals
        activeSignals,

        // Symptoms
        symptoms: cleanedSymptoms,

        otherSymptoms: hasOtherSymptoms
            ? otherSymptoms.trim()
            : "",

        // Evidence
        evidence,

        // Risk breakdown
        riskBreakdown,

        // Graph data
        trendData,

        // Data quality
        dataQuality,

        // AI information
        aiSummary,

        // Recommendation
        recommendation,

        // Possible measures
        potentialMeasures,

        // Human review
        humanDecisionRequired
    };
}


// ==================================================
// ANALYZE A SINGLE REPORT
// ==================================================

app.post("/api/analyze", (req, res) => {

    try {

        const {
            zone,
            reports,
            previousReports,
            environmentalAlert,
            geographicCluster,
            rapidChange,
            symptoms,
            otherSymptoms
        } = req.body;


        // ==================================================
        // Input Validation
        // ==================================================

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
                error:
                    "Reports and previousReports must be numbers."
            });
        }


        if (
            reports < 0 ||
            previousReports < 0
        ) {

            return res.status(400).json({
                success: false,
                error:
                    "Report counts cannot be negative."
            });
        }


        // ==================================================
        // Run Analysis
        // ==================================================

        const analysis = analyzeData({

            zone,

            reports,

            previousReports,

            environmentalAlert:
                Boolean(environmentalAlert),

            geographicCluster:
                Boolean(geographicCluster),

            rapidChange:
                Boolean(rapidChange),

            symptoms:
                Array.isArray(symptoms)
                    ? symptoms
                    : [],

            otherSymptoms:
                otherSymptoms || ""
        });


        // ==================================================
        // Send Response
        // ==================================================

        res.json({

            success: true,

            analysis: {

                zone,

                reports,

                previousReports,

                environmentalAlert:
                    Boolean(environmentalAlert),

                geographicCluster:
                    Boolean(geographicCluster),

                rapidChange:
                    Boolean(rapidChange),

                ...analysis
            },

            systemNote:
                "This is a prototype decision-support system using synthetic data. It does not diagnose or confirm a biological threat."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error:
                "Internal server error."
        });
    }
});


// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, () => {

    console.log(
        `BioThreat AI Backend running on http://localhost:${PORT}`
    );

});