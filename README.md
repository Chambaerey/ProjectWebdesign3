Project Webdesign - Groep 13
==============================


1  Projectuitleg en introductie
---------------------------------

### Opdracht
Als opdracht voor webdesign semester 3 hebben we ervoor gekozen een simpele weer applicatie te bouwen, deze voorspelt het weer van de huidige en volgende dag.
Afhankelijk van het weertype zal de achtergrond van de container veranderen, weertypes zijn bv. storm, sneeuw of mist.
### Groep 13
Groep 13 bestaat uit Chambaere Yentl en De Moor Ken.
Het grootste deel van de opdracht hebben we samen gemaakt tijdens enkele samenkomsten na school of via skype.

2  Implementeren in een eigen website
---------------------------------------
### In de webpagina
De code implementeren is erg simpel, het script laden en een container aanmaken is voldoende.
`<script src="weather.js"></script>`

De containers zijn \<div\> containers met ID "Today" en "Tomorrow".
```
<div id="Today" class="tab"></div>
<div id="Tomorrow" class="tab"></div>
```
Indien je de ID's wil veranderen kan je in weather.js de variabelen aanpassen naar de gewenste ID's.
```
var containerToday = "#Today";
var containerTomorrow = "#Tomorrow";
```

3  Overzicht code
------------------
### Weather.js

Hier zullen de gebruikte methods worden uitgelegd.

function GetPositionGeolocation()
>Probeert de positie op te halen via geolocation van de browser, fouten worden gelogd.

function GetSucces(position)
>De succesfunctie van GetPositionGeolocation(), deze zal latitude en longitude opslaan en de function GetWeather(days) oproepen.

function GetFail(error)
>De failfunctie, logt de error en geeft de error weer in de container.
>Het programma zal proberen geolocation via IP te gebruiken.

function GetPositionIP()
>Haalt latitude en longitude op via het IP van de gebruiker, hiervoor gebruiken we een Json service "http://freegeoip.net/json/".

function GetWeather(days)
>Haalt het weer op via "http://openweathermap.org" aan de hand van de eerder verkregen longitude/latitude en slaat dit op in een weather object.

function AppendText()
>Zet het weather object om naar text en voegt deze toe aan de container, stelt ook de achtergrond in aan de hand van de function GetBackground(id) method.

function GetBackground(id)
>Gebruikt het weer-ID om het weertype te bepalen.

function GetWindDir(deg)
>Zet het aantal graden van de windrichting om naar text (bv. South-East).

4  Voorbeeld
------------------
![voorbeeld](http://puu.sh/69e48.jpg "voorbeeld")

```
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>WeerApp</title>
    <link rel="stylesheet" href="lib/css/ui-lightness/jquery-ui.css" />
    <script src="lib/jquery.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script src="weather.js"></script>
    <link rel="stylesheet" href="css/Style.css" />
    <script>

    </script>
</head>
<body>
    <h1>Weather API</h1>
    <div id="tabs">
        <ul>
            <li><a href="#Today">Today</a></li>
            <li><a href="#Tomorrow">Tomorrow</a></li>
        </ul>
        <div id="Today" class="tab">
        </div>
        <div id="Tomorrow" class="tab">
        </div>
    </div>
</body>
</html>
```