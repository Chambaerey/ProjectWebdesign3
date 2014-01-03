Project Webdesign - Groep 13
==============================


1  Projectuitleg en introductie
---------------------------------

### Opdracht
Als opdracht voor webdesign Semester 3 hebben we ervoor gekozen een simpele Weer applicatie te bouwen, deze voorspelt het weer van de huidige en volgende dag.
Afhankelijk van het weertype zal de achtergrond van de container veranderen, weertypes zijn bv. storm, sneeuw of mist.
### Groep 13
Groep 13 bestaat uit Chambaere Yentl en De Moor Ken.
Het grootste deel van de opdracht hebben we samen gemaakt tijdens enkele samenkomsten na school of via skype.

2  Implementeren in een eigen Website
---------------------------------------
### In de webpagina
De code implementeren is erg simpel, het script laden en een container aanmaken is voldoende.
`<script src="weather.js"></script>`

De containers zijn <div> containers met id "Today" en "Tomorrow".
```
<div id="Today" class="tab"></div>
<div id="Tomorrow" class="tab"></div>
```
Indien je de Id's wil veranderen kan je in weather.js de variabeles aanpassen naar de gewenste id's.
```
var containerToday = "#Today";
var containerTomorrow = "#Tomorrow";
```

3  Overzicht code
------------------
### Weather.js

hier zullen de gebruikte methods worden uitgelegd.

function GetPositionGeolocation()
>Zal proberen de positie op te halen via geolocation van de browser, fouten worden gelogd.

function GetSucces(position)
>De succesfunctie van GetPositionGeolocation(), deze zal latitude en longitude opslaan en function GetWeather(days) oproepen.

function GetFail(error)
>De failfuntie, logd de error en geeft de error weer in de container.
>het programma zal proberen geolocation via IP te gebruiken.

function GetPositionIP()
>Zal de latitude en longitude ophalen via het ip van de gebruiker, hiervoor gebruiken we een Json service "http://freegeoip.net/json/".

function GetWeather(days)
>Zal het weer ophalen via openweathermap.org aan de hand van longitude/latitude eerder verkregen en zal dit opslaan in een weather object.

function AppendText()
>Het weather object omzetten naar text en toevoegen aan de container, zal ook de achtergrond instellen aan de hand van de function GetBackground(id) method.

function GetBackground(id)
>zal het weer id gebruiken om het weertype te bepalen.

function GetWindDir(deg)
>zal het aantal graden van de windrichting omzetten naar text (bv South-East).