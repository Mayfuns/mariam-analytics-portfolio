# Telecom Customer Churn & Retention Intelligence — Learning Path

Build the project in this order. Each stage has a clear purpose so you can learn at your own pace.

## 1. Create the project

Create a Jupyter notebook called:

`telecom_churn_analysis.ipynb`

Import the libraries:

```python
import pandas as pd
import matplotlib.pyplot as plt
```

## 2. Load the raw data

```python
df = pd.read_csv("Customer_Churn.csv")
```

Inspect:

```python
df.head()
df.shape
df.info()
df.columns.tolist()
df.describe()
```

Purpose: understand the size, fields, data types and ranges before changing anything.

## 3. Check data quality

Missing values:

```python
df.isnull().sum()
```

Duplicate profiles:

```python
df.duplicated().sum()
df[df.duplicated(keep=False)].head(10)
```

Important: do not automatically drop duplicates. The source has no unique customer ID, so identical aggregated profiles cannot safely be assumed to be duplicate customers.

## 4. Clean the column names

```python
df.columns = (
    df.columns
    .str.strip()
    .str.replace(r"\s+", "_", regex=True)
    .str.lower()
)
```

Check:

```python
df.columns.tolist()
```

## 5. Understand coded variables

Check:

```python
df["complains"].value_counts()
df["tariff_plan"].value_counts()
df["status"].value_counts()
df["churn"].value_counts()
df["age_group"].value_counts().sort_index()
```

Source coding:

- complains: 0 = no complaint, 1 = complaint
- tariff_plan: 1 = pay as you go, 2 = contractual
- status: 1 = active, 2 = non-active
- churn: 0 = retained, 1 = churned

## 6. Create readable labels

```python
df["complaint_label"] = df["complains"].map({
    0: "No complaint",
    1: "Complaint"
})

df["tariff_label"] = df["tariff_plan"].map({
    1: "Pay as you go",
    2: "Contractual"
})

df["status_label"] = df["status"].map({
    1: "Active",
    2: "Non-active"
})

df["churn_label"] = df["churn"].map({
    0: "Retained",
    1: "Churned"
})
```

## 7. Calculate the headline churn KPI

```python
total_customers = len(df)
total_churned = df["churn"].sum()
churn_rate = (total_churned / total_customers) * 100

print("Total Customers:", total_customers)
print("Churned Customers:", total_churned)
print(f"Churn Rate: {churn_rate:.1f}%")
```

Expected headline result:

- 3,150 customers
- 495 churners
- 15.7% churn rate

## 8. Analyse complaints

```python
complaint_churn = (
    df.groupby("complaint_label")["churn"]
    .mean()
    .mul(100)
    .round(1)
)
```

Key result:

- Complaint: 83.0%
- No complaint: 10.1%

Create and save a bar chart.

## 9. Analyse customer activity status

```python
status_churn = (
    df.groupby("status_label")["churn"]
    .mean()
    .mul(100)
    .round(1)
)
```

Key result:

- Active: 5.3%
- Non-active: 47.3%

## 10. Analyse tariff plan

```python
tariff_churn = (
    df.groupby("tariff_label")["churn"]
    .mean()
    .mul(100)
    .round(1)
)
```

Key result:

- Pay as you go: 16.8%
- Contractual: 2.4%

## 11. Analyse subscription length

Create tenure bands:

```python
df["tenure_band"] = pd.cut(
    df["subscription_length"],
    bins=[0, 12, 24, 36, float("inf")],
    labels=["0–12 months", "13–24 months", "25–36 months", "37+ months"]
)
```

Then:

```python
tenure_churn = (
    df.groupby("tenure_band", observed=False)["churn"]
    .mean()
    .mul(100)
    .round(1)
)
```

Key result:

- 0–12 months: 38.6%
- 13–24 months: 2.8%
- 25–36 months: 18.9%
- 37+ months: 13.2%

## 12. Analyse call activity

```python
df["call_activity_band"] = pd.cut(
    df["frequency_of_use"],
    bins=[-1, 0, 25, 75, float("inf")],
    labels=["No calls", "1–25 calls", "26–75 calls", "76+ calls"]
)
```

Calculate churn by band.

Key result:

- No calls: 52.6%
- 1–25 calls: 29.0%
- 26–75 calls: 16.4%
- 76+ calls: 3.3%

## 13. Analyse SMS activity

```python
df["sms_activity_band"] = pd.cut(
    df["frequency_of_sms"],
    bins=[-1, 0, 25, 100, float("inf")],
    labels=["No SMS", "1–25 SMS", "26–100 SMS", "101+ SMS"]
)
```

Key result:

- No SMS: 22.7%
- 1–25 SMS: 22.8%
- 26–100 SMS: 14.4%
- 101+ SMS: 0.7%

## 14. Analyse customer value carefully

```python
df["customer_value"].describe()

customer_value_by_churn = (
    df.groupby("churn_label")["customer_value"]
    .mean()
    .round(1)
)
```

Important: Customer Value is a source-calculated score. Do not present it as £ or $ revenue.

## 15. Build a transparent retention-priority score

This is a business-rule heuristic, not machine learning.

```python
df["retention_priority_score"] = (
    (df["complains"].eq(1)) * 3 +
    (df["status"].eq(2)) * 3 +
    (df["frequency_of_use"].le(25)) * 2 +
    (df["frequency_of_sms"].le(25)) * 1 +
    (df["subscription_length"].le(12)) * 1 +
    (df["tariff_plan"].eq(1)) * 1
)
```

Create bands:

```python
df["retention_priority"] = pd.cut(
    df["retention_priority_score"],
    [-1, 3, 6, float("inf")],
    labels=["Low", "Medium", "High"]
)
```

Observed churn:

- High: 56.6%
- Medium: 28.0%
- Low: 1.8%

## 16. Export cleaned data

```python
df.to_csv("telecom_churn_cleaned.csv", index=False)
```

## 17. Export retention outputs

Create:

- retention_priority_segments.csv
- high_priority_records.csv

## 18. Create final visuals

Recommended charts:

1. complaint vs churn
2. status vs churn
3. tariff vs churn
4. tenure vs churn
5. call activity vs churn
6. SMS activity vs churn
7. retention priority vs churn

## 19. Write business recommendations

Your recommendations should focus on:

- complaint recovery
- re-engagement of inactive and low-usage customers
- first-year retention
- pay-as-you-go retention strategy
- validation of the retention-priority heuristic before operational use

## 20. State limitations

Be explicit that:

- this is observational analysis
- association does not prove causation
- the dataset contains no unique customer ID
- Customer Value is not currency revenue
- the retention-priority score is heuristic, not a predictive model

## 21. Finish the GitHub project

The final repo should contain:

```
01_notebook/
02_data/
03_visuals/
04_outputs/
05_documentation/
README.md
requirements.txt
```

## 22. Portfolio story

Present the case study as:

**Business Question → Data Quality → Customer Behaviour → Churn Signals → Retention Priorities → Recommendations**

That makes it a business analytics project, not just a Python exercise.
