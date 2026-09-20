# Data

## Source

This project uses the **Iranian Churn** dataset from the UCI Machine Learning Repository.

- 3,150 customer records
- Real telecom-company data collected over 12 months
- Features are aggregated over the first 9 months
- Churn status is observed at the end of month 12
- No missing values reported by UCI
- Licence: CC BY 4.0
- DOI: https://doi.org/10.24432/C5JW3Z
- UCI page: https://archive.ics.uci.edu/dataset/563/iranian+churn+dataset

The raw CSV in this project is retained for reproducibility. The cleaned file standardises column names and adds analysis-only labels and segmentation fields.

## Important field notes

- `Charge Amount` is ordinal from 0 to 9. It is **not a currency value**.
- `Customer Value` is a calculated customer-value measure supplied in the source data.
- `record_id` is generated in this analysis only to make rows traceable; it is not an original customer identifier.

## Derived fields

The cleaned dataset adds:

- complaint_label
- tariff_label
- status_label
- churn_label
- tenure_band
- call_activity_band
- sms_activity_band
- retention_priority_score
- retention_priority

The retention-priority score is a transparent business-rule heuristic, not a predictive model.
