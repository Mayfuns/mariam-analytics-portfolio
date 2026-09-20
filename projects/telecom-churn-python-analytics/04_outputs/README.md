# Outputs

## retention_priority_segments.csv

Summarises the transparent heuristic used to prioritise retention investigation.

| Priority | Customers | Churners | Churn rate |
|---|---:|---:|---:|
| High | 549 | 311 | 56.6% |
| Medium | 522 | 146 | 28% |
| Low | 2079 | 38 | 1.8% |

## high_priority_records.csv

Contains the 549 rows classified as High retention priority.

The priority rules intentionally use only transparent operational signals:

- complaint
- non-active status
- low call activity
- low SMS activity
- first-year tenure
- pay-as-you-go tariff

This is **not** a machine-learning probability score.
