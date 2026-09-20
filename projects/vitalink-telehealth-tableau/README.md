# VitalLink Telehealth Analytics — Tableau Case Study

## Project overview

VitalLink is a remote patient monitoring analytics case study focused on alert overload, clinical response performance and device-health investigation.

The analysis asks a practical stakeholder question:

> Are device problems driving warning-alert volume, or is the larger issue operational response and alert prioritisation?

## Dataset

- 10,500 alert records
- 5,000 patients
- 12 clinicians
- 40 devices
- Period: January 2026

## Analytical model

A star-schema-style model was organised around the alert fact table with patient, clinician and device dimensions.

Key fields included alert date, vital type, alert severity, response time, clinician, hub, device model, connectivity and battery status.

## Tableau dashboard

### Page 1 — Patient Alert Profile

Designed to understand alert volume, severity and patient-risk concentration.

Key measures:
- 10,500 total alerts
- 1,591 critical alerts
- 15.2% critical-alert rate
- 3,668 warning alerts
- 4,417 patients with alerts

### Page 2 — Clinical SLA & Device Health

Designed to measure response efficiency and test whether devices are contributing to warning-alert load.

Key measures:
- 7.7 hours overall average response time
- 19.8% overall SLA compliance
- 8,425 SLA breaches
- 54.2% critical SLA compliance
- 34.9% warning-alert rate

## Findings

- Critical alerts were responded to faster on average, but only 54.2% met the 2-hour SLA.
- North Hub recorded the strongest critical SLA performance at 57.1%; West Hub recorded 51.6%.
- Warning-alert rates by device model ranged from 33.3% to 37.0%, a relatively narrow spread.
- Battery level showed little visible relationship with warning-alert rate.
- Bluetooth and cellular devices followed similar warning patterns.
- The evidence did not support a blanket conclusion that device condition was the main cause of warning-alert volume.

## Recommendations

1. Separate critical alerts into a dedicated priority queue.
2. Monitor critical SLA compliance by hub and clinician in real time.
3. Review clinician workload alongside SLA performance to identify bottlenecks.
4. Investigate higher-warning device models selectively rather than replacing devices broadly.

## Tools

Tableau • Data modelling • KPI design • SLA analysis • Root-cause investigation • Stakeholder reporting

## Portfolio case study

[View the full VitalLink case study](../../vitalink.html)
