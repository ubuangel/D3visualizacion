## D3 timeseries chart

- the `D3` chart currently displayed on metacat UI
- issue: the line and area shapes interpolate across missing data
- features:
    - mini 'brush' chart shows the context of the data in focus in the main chart
    - x-axis zooming and panning is limited to the range of available data
    - y-axis resizes automatically to match the maximum y-value of the data in focus
    - buttons zoom focus to an interval equal to one year (if sufficient data), one month, or the range of the data
    - text at top changes to indicate the range of data in focus
    - when no data is available, displays text instead
    - sorts data by date
