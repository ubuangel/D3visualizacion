let countries = [
    {"Country":"Bangladesh","Code":"BAN","LandArea":130170,"Population":160,"Energy":27944,"Rural":72.9,"Military":10.8,"Health":7.4,"HIV":0.1,"Internet":0.3,"Developed":1,"BirthRate":21.4,"ElderlyPop":3.8,"LifeExpectancy":66.1,"CO2":0.3198,"GDP":674.9316,"Cell":46.1692,"Electricity":251.6287,"kwhPerCap":"Under 2500"},
    {"Country":"Brazil","Code":"BRA","LandArea":8459420,"Population":191.972,"Energy":248528,"Rural":14.4,"Military":5.9,"Health":6,"Internet":37.5,"Developed":1,"BirthRate":16.2,"ElderlyPop":6.6,"LifeExpectancy":72.4,"CO2":2.0529,"GDP":10710.066,"Cell":104.1024,"Electricity":2206.1965,"kwhPerCap":"Under 2500"},
    {"Country":"China","Code":"CHN","LandArea":9327480,"Population":1324.655,"Energy":2116427,"Rural":56.9,"Military":16.1,"Health":10.3,"Internet":22.5,"Developed":1,"BirthRate":12.1,"ElderlyPop":7.9,"LifeExpectancy":73.1,"CO2":5.3085,"GDP":4428.4646,"Cell":64.1862,"Electricity":2631.4028,"kwhPerCap":"Under 2500"},
    {"Country":"India","Code":"IND","LandArea":2973190,"Population":1139.965,"Energy":620973,"Rural":70.5,"Military":14.7,"Health":4.4,"HIV":0.3,"Internet":4.5,"Developed":1,"BirthRate":22.8,"ElderlyPop":4.8,"LifeExpectancy":63.7,"CO2":1.5287,"GDP":1474.9808,"Cell":64.2382,"Electricity":596.8221,"kwhPerCap":"Under 2500"},
    {"Country":"Indonesia","Code":"INA","LandArea":1811570,"Population":227.345,"Energy":198679,"Rural":48.5,"Military":5.3,"Health":6.2,"HIV":0.2,"Internet":7.9,"Developed":1,"BirthRate":18.6,"ElderlyPop":5.9,"LifeExpectancy":70.8,"CO2":1.7281,"GDP":2945.5767,"Cell":91.716,"Electricity":590.1535,"kwhPerCap":"Under 2500"},
    {"Country":"Japan","Code":"JPN","LandArea":364500,"Population":127.704,"Energy":495838,"Rural":33.5,"Health":17.9,"HIV":0.1,"Internet":75.2,"Developed":3,"BirthRate":8.7,"ElderlyPop":21.4,"LifeExpectancy":82.6,"CO2":9.4606,"GDP":42831.0475,"Cell":94.7103,"Electricity":7819.1829,"kwhPerCap":"Over 5000"},
    {"Country":"Mexico","Code":"MEX","LandArea":1943950,"Population":106.35,"Energy":180605,"Rural":22.8,"Health":15,"HIV":0.3,"Internet":21.9,"Developed":1,"BirthRate":18.3,"ElderlyPop":6.2,"LifeExpectancy":75.1,"CO2":4.3012,"GDP":9123.4059,"Cell":80.5504,"Electricity":1942.8408,"kwhPerCap":"Under 2500"},
    {"Country":"Nigeria","Code":"NGR","LandArea":910770,"Population":151.212,"Energy":111156,"Rural":51.6,"Military":10.8,"Health":6.4,"HIV":3.6,"Internet":15.9,"Developed":1,"BirthRate":39.8,"ElderlyPop":3.1,"LifeExpectancy":47.9,"CO2":0.6356,"GDP":1222.4773,"Cell":55.1042,"Electricity":120.5077,"kwhPerCap":"Under 2500"},
    {"Country":"Pakistan","Code":"PAK","LandArea":770880,"Population":166.111,"Energy":82839,"Rural":63.8,"Military":18,"Health":3.1,"HIV":0.1,"Internet":11.1,"Developed":1,"BirthRate":30.1,"ElderlyPop":4,"LifeExpectancy":66.5,"CO2":0.9745,"GDP":1018.8728,"Cell":59.2058,"Electricity":449.3228,"kwhPerCap":"Under 2500"},
    {"Country":"Russian Federation","Code":"RUS","LandArea":16376870,"Population":141.95,"Energy":686757,"Rural":27.2,"Military":16.3,"Health":9.2,"HIV":1,"Internet":32,"Developed":3,"BirthRate":12.1,"ElderlyPop":13.3,"LifeExpectancy":67.8,"CO2":12.037,"GDP":10439.6424,"Cell":167.682,"Electricity":6135.5728,"kwhPerCap":"Over 5000"},
    {"Country":"United States","Code":"USA","LandArea":9147420,"Population":304.375,"Energy":2283722,"Rural":18.3,"Military":18.6,"Health":18.7,"HIV":0.6,"Internet":75.8,"Developed":3,"BirthRate":14.3,"ElderlyPop":12.6,"LifeExpectancy":78.4,"CO2":17.9417,"GDP":47198.5045,"Cell":90.2441,"Electricity":12903.8067,"kwhPerCap":"Over 5000"}] 


    d3.selectAll('svg#big-countries')  // select the svg element
  .attr('width', 400)
  .attr('height', 250)
  .selectAll('rect')  // new selection starts here (and is empty for now)
  .data(countries)
  .enter()
  .append('rect')     // selection now has 11 rects, each associated with 1 row of data
  .attr('x', 0)
  .attr('y', (d, i) => i * 20)
  .attr('height', 15)
  .attr('width', d => (d.Population / 1500) * 400)
  .style('fill', 'red')


