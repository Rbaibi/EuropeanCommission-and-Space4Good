from datetime import datetime
import pytz

import pandas as pd
import altair as alt
import names

# Load houses data into DataFrame
num_houses = 20
df_list = []
house_numbers = range(1, num_houses + 1)
house_names = ["John", "Sarah", "Mike", "Lily", "George"] + [names.get_first_name() for i in range(num_houses - 5)]
for h in house_numbers:
    df_h = (
        pd.read_csv("Energy-Poverty-JRC-master/run_household_solar/run_household_solar_%s/gridbalance.2016" % h, sep=" ", usecols=[1])
        .set_index(pd.date_range(start=datetime(2016, 1, 1), end=datetime(2016, 12, 31, 23, 59), closed="left", freq="T", tz=pytz.utc))
        .resample("H").mean()
    )
    df_h.columns = ["power"]
    df_list.append(df_h)

df = pd.concat(df_list, axis=0, keys=house_names).reset_index()
df.columns = ["House", "datetime", "power"]

# Production values only
df["power"] = df["power"].clip(lower=0)
max_production = df["power"].max()

# Create selection brush
date_selection_brush = alt.selection_multi(encodings=["x", "y"], name="date_select")

# Create calendar
calendar = (
    alt.Chart(df).mark_rect()
    .encode(
        x=alt.Y("date(datetime):O", title="Day of the month"),
        y=alt.X("month(datetime):O", title="Month"),
        color=alt.Color("sum(power):Q", title="Excess solar production (kWh)", scale=alt.Scale(scheme="dark2")),
        opacity=alt.condition(date_selection_brush, alt.value(1), alt.value(0.7)))
)

# Make calendar days selectable
calendar = calendar.add_selection(date_selection_brush)

# Create a chart that shows a power profile of a single day (the selected day)
chart = (
    alt.Chart(df).mark_line()
    .transform_filter(date_selection_brush)
    .encode(
        x=alt.X(
            "datetime",
            title="Time of day",
        ),
        y=alt.Y("power", title="Power (kW)", scale=alt.Scale(domain=(0, max_production))),
    )
    .properties(height=100, width=600)
    .facet(row="House")
)

# Combine the calendar and chart on a panel
panel = calendar & chart

# Serve the panel to a browser
panel.serve()
