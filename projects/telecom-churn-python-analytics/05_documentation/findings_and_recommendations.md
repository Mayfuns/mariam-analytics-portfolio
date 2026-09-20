# Findings & Recommendations

## Executive summary

The analysis identified churn as primarily an **engagement and service-friction problem**, not simply a tenure or demographic problem.

Across 3,150 customers, 495 churned, producing an overall churn rate of **15.7%**.

## 1. Complaints are the strongest behavioural warning signal

- Customers with a complaint: **83% churn**
- Customers without a complaint: **10.1% churn**

This is the clearest single segmentation gap in the analysis and makes complaint resolution an obvious retention intervention point.

## 2. Inactive customers show much higher churn

- Non-active customers: **47.3% churn**
- Active customers: **5.3% churn**

Operational status is strongly associated with churn and should be monitored alongside usage behaviour.

## 3. Low calling activity is associated with churn

- No call activity: **52.6% churn**
- 1–25 calls: **29% churn**
- 26–75 calls: **16.4% churn**
- 76+ calls: **3.3% churn**

Customers who remain highly engaged through calls are much less likely to churn in this dataset.

## 4. SMS engagement shows a similar pattern

- No SMS: **22.7% churn**
- 1–25 SMS: **22.8% churn**
- 26–100 SMS: **14.4% churn**
- 101+ SMS: **0.7% churn**

The highest-SMS group has a very low churn rate, reinforcing the broader engagement story.

## 5. First-year customers deserve closer attention

The 0–12 month subscription group recorded **38.6% churn**, the highest of the tenure bands used in this analysis.

Tenure alone does not explain churn, but early-life customers appear to be a useful intervention segment.

## 6. Tariff type matters

- Pay as you go: **16.8% churn**
- Contractual: **2.4% churn**

Contractual customers are substantially more retained in this dataset.

## 7. Customer Value should not be treated as revenue

Churned customers had an average source `Customer Value` of **124.8**, compared with **535.5** among retained customers.

Because Customer Value is a calculated source metric and Charge Amount is ordinal, this project deliberately avoids presenting invented currency-based “revenue at risk”.

## Retention-priority heuristic

A transparent score was created to concentrate operational attention:

- Complaint: +3
- Non-active status: +3
- Frequency of use ≤25: +2
- Frequency of SMS ≤25: +1
- Subscription length ≤12 months: +1
- Pay-as-you-go tariff: +1

Bands:

- High: score ≥7
- Medium: score 4–6
- Low: score ≤3

Observed churn:

- **High: 56.6%**
- **Medium: 28%**
- **Low: 1.8%**

This is a prioritisation rule for investigation, not a predictive probability model.

## Recommendations

1. **Prioritise complaint recovery.** Escalate unresolved complaints and analyse resolution time because complaint behaviour is associated with the largest observed churn gap.
2. **Trigger re-engagement workflows for inactive and low-usage customers.** Low call and SMS activity provide clear behavioural signals for intervention.
3. **Strengthen first-year retention.** Introduce onboarding and early-life engagement checkpoints during the first 12 months.
4. **Review pay-as-you-go retention strategy.** Investigate whether contractual offers or targeted incentives can retain appropriate pay-as-you-go customers.
5. **Use the retention-priority score as an operational triage tool.** Validate it prospectively before using it for automated customer decisions.

## Limitations

This is observational analysis. Associations should not be interpreted as proof of causation. The dataset is historical, contains aggregated behavioural variables, and does not provide actual monetary revenue. The priority score is intentionally heuristic and should be validated on future customer outcomes before operational deployment.
