/**
 * world-places.ts — עיר בירה לכל מדינה בעולם + ערים מרכזיות במדינות הגדולות.
 * פורמט שורה: קוד מדינה (ISO) | מזהה | שם בעברית | שם באנגלית | קו רוחב | קו אורך | אזור זמן IANA
 */
export const WORLD_DATA = `
AL|tirana|טירנה|Tirana|41.33|19.82|Europe/Tirane
AD|andorra-la-vella|אנדורה לה ולה|Andorra la Vella|42.51|1.52|Europe/Andorra
AT|vienna|וינה|Vienna|48.21|16.37|Europe/Vienna
AT|graz|גראץ|Graz|47.07|15.44|Europe/Vienna
BY|minsk|מינסק|Minsk|53.90|27.56|Europe/Minsk
BY|gomel|הומל|Gomel|52.44|30.98|Europe/Minsk
BE|brussels|בריסל|Brussels|50.85|4.35|Europe/Brussels
BE|antwerp|אנטוורפן|Antwerp|51.22|4.40|Europe/Brussels
BA|sarajevo|סרייבו|Sarajevo|43.86|18.41|Europe/Sarajevo
BG|sofia|סופיה|Sofia|42.70|23.32|Europe/Sofia
HR|zagreb|זאגרב|Zagreb|45.81|15.98|Europe/Zagreb
CY|nicosia|ניקוסיה|Nicosia|35.19|33.38|Asia/Nicosia
CY|limassol|לימסול|Limassol|34.71|33.02|Asia/Nicosia
CZ|prague|פראג|Prague|50.08|14.44|Europe/Prague
DK|copenhagen|קופנהגן|Copenhagen|55.68|12.57|Europe/Copenhagen
EE|tallinn|טאלין|Tallinn|59.44|24.75|Europe/Tallinn
FI|helsinki|הלסינקי|Helsinki|60.17|24.94|Europe/Helsinki
FR|paris|פריז|Paris|48.86|2.35|Europe/Paris
FR|marseille|מרסיי|Marseille|43.30|5.37|Europe/Paris
FR|lyon|ליון|Lyon|45.76|4.84|Europe/Paris
FR|nice|ניס|Nice|43.70|7.27|Europe/Paris
FR|strasbourg|שטרסבורג|Strasbourg|48.57|7.75|Europe/Paris
DE|berlin|ברלין|Berlin|52.52|13.40|Europe/Berlin
DE|munich|מינכן|Munich|48.14|11.58|Europe/Berlin
DE|frankfurt|פרנקפורט|Frankfurt|50.11|8.68|Europe/Berlin
DE|hamburg|המבורג|Hamburg|53.55|9.99|Europe/Berlin
DE|cologne|קלן|Cologne|50.94|6.96|Europe/Berlin
GR|athens|אתונה|Athens|37.98|23.73|Europe/Athens
GR|thessaloniki|סלוניקי|Thessaloniki|40.64|22.94|Europe/Athens
HU|budapest|בודפשט|Budapest|47.50|19.04|Europe/Budapest
IS|reykjavik|רייקיאוויק|Reykjavik|64.15|-21.94|Atlantic/Reykjavik
IE|dublin|דבלין|Dublin|53.35|-6.26|Europe/Dublin
IT|rome|רומא|Rome|41.90|12.50|Europe/Rome
IT|milan|מילאנו|Milan|45.46|9.19|Europe/Rome
IT|naples|נאפולי|Naples|40.85|14.27|Europe/Rome
IT|florence|פירנצה|Florence|43.77|11.26|Europe/Rome
IT|venice|ונציה|Venice|45.44|12.32|Europe/Rome
XK|pristina|פרישטינה|Pristina|42.66|21.17|Europe/Belgrade
LV|riga|ריגה|Riga|56.95|24.11|Europe/Riga
LI|vaduz|ואדוץ|Vaduz|47.14|9.52|Europe/Vaduz
LT|vilnius|וילנה|Vilnius|54.69|25.28|Europe/Vilnius
LT|kaunas|קובנה|Kaunas|54.90|23.90|Europe/Vilnius
LU|luxembourg|לוקסמבורג|Luxembourg|49.61|6.13|Europe/Luxembourg
MT|valletta|ואלטה|Valletta|35.90|14.51|Europe/Malta
MD|chisinau|קישינב|Chișinău|47.01|28.86|Europe/Chisinau
MC|monaco|מונקו|Monaco|43.74|7.42|Europe/Monaco
ME|podgorica|פודגוריצה|Podgorica|42.44|19.26|Europe/Podgorica
NL|amsterdam|אמסטרדם|Amsterdam|52.37|4.90|Europe/Amsterdam
NL|rotterdam|רוטרדם|Rotterdam|51.92|4.48|Europe/Amsterdam
MK|skopje|סקופיה|Skopje|42.00|21.43|Europe/Skopje
NO|oslo|אוסלו|Oslo|59.91|10.75|Europe/Oslo
PL|warsaw|ורשה|Warsaw|52.23|21.01|Europe/Warsaw
PL|krakow|קרקוב|Kraków|50.06|19.94|Europe/Warsaw
PL|lodz|לודז׳|Łódź|51.76|19.46|Europe/Warsaw
PT|lisbon|ליסבון|Lisbon|38.72|-9.14|Europe/Lisbon
PT|porto|פורטו|Porto|41.15|-8.61|Europe/Lisbon
RO|bucharest|בוקרשט|Bucharest|44.43|26.10|Europe/Bucharest
RO|iasi|יאשי|Iași|47.16|27.59|Europe/Bucharest
RO|cluj|קלוז׳|Cluj-Napoca|46.77|23.62|Europe/Bucharest
RU|moscow|מוסקבה|Moscow|55.76|37.62|Europe/Moscow
RU|st-petersburg|סנקט פטרבורג|Saint Petersburg|59.93|30.36|Europe/Moscow
RU|kazan|קאזאן|Kazan|55.79|49.12|Europe/Moscow
RU|yekaterinburg|יקטרינבורג|Yekaterinburg|56.84|60.61|Asia/Yekaterinburg
RU|novosibirsk|נובוסיבירסק|Novosibirsk|55.01|82.93|Asia/Novosibirsk
RU|vladivostok|ולדיווסטוק|Vladivostok|43.12|131.89|Asia/Vladivostok
SM|san-marino|סן מרינו|San Marino|43.94|12.45|Europe/San_Marino
RS|belgrade|בלגרד|Belgrade|44.79|20.45|Europe/Belgrade
SK|bratislava|ברטיסלבה|Bratislava|48.15|17.11|Europe/Bratislava
SI|ljubljana|לובליאנה|Ljubljana|46.06|14.51|Europe/Ljubljana
ES|madrid|מדריד|Madrid|40.42|-3.70|Europe/Madrid
ES|barcelona|ברצלונה|Barcelona|41.39|2.17|Europe/Madrid
ES|seville|סביליה|Seville|37.39|-5.98|Europe/Madrid
ES|valencia|ולנסיה|Valencia|39.47|-0.38|Europe/Madrid
SE|stockholm|סטוקהולם|Stockholm|59.33|18.07|Europe/Stockholm
SE|gothenburg|גטבורג|Gothenburg|57.71|11.97|Europe/Stockholm
CH|bern|ברן|Bern|46.95|7.45|Europe/Zurich
CH|zurich|ציריך|Zurich|47.38|8.54|Europe/Zurich
CH|geneva|ז׳נבה|Geneva|46.20|6.14|Europe/Zurich
CH|basel|באזל|Basel|47.56|7.59|Europe/Zurich
UA|kyiv|קייב|Kyiv|50.45|30.52|Europe/Kyiv
UA|odesa|אודסה|Odesa|46.48|30.72|Europe/Kyiv
UA|kharkiv|חרקוב|Kharkiv|49.99|36.23|Europe/Kyiv
UA|dnipro|דניפרו|Dnipro|48.46|35.05|Europe/Kyiv
UA|lviv|לבוב|Lviv|49.84|24.03|Europe/Kyiv
GB|london|לונדון|London|51.51|-0.13|Europe/London
GB|manchester|מנצ׳סטר|Manchester|53.48|-2.24|Europe/London
GB|birmingham|ברמינגהם|Birmingham|52.49|-1.89|Europe/London
GB|leeds|לידס|Leeds|53.80|-1.55|Europe/London
GB|edinburgh|אדינבורו|Edinburgh|55.95|-3.19|Europe/London
GB|glasgow|גלזגו|Glasgow|55.86|-4.25|Europe/London
VA|vatican|הוותיקן|Vatican City|41.90|12.45|Europe/Vatican
PS|ramallah|רמאללה|Ramallah|31.90|35.20|Asia/Hebron
PS|gaza|עזה|Gaza|31.50|34.47|Asia/Gaza
JO|amman|עמאן|Amman|31.95|35.93|Asia/Amman
LB|beirut|ביירות|Beirut|33.89|35.50|Asia/Beirut
SY|damascus|דמשק|Damascus|33.51|36.28|Asia/Damascus
IQ|baghdad|בגדד|Baghdad|33.31|44.37|Asia/Baghdad
IQ|basra|בצרה|Basra|30.51|47.78|Asia/Baghdad
IR|tehran|טהרן|Tehran|35.69|51.39|Asia/Tehran
IR|isfahan|אספהאן|Isfahan|32.65|51.67|Asia/Tehran
IR|shiraz|שיראז|Shiraz|29.59|52.58|Asia/Tehran
SA|riyadh|ריאד|Riyadh|24.71|46.68|Asia/Riyadh
SA|jeddah|ג׳דה|Jeddah|21.49|39.19|Asia/Riyadh
AE|abu-dhabi|אבו דאבי|Abu Dhabi|24.45|54.38|Asia/Dubai
AE|dubai|דובאי|Dubai|25.20|55.27|Asia/Dubai
QA|doha|דוחה|Doha|25.29|51.53|Asia/Qatar
BH|manama|מנאמה|Manama|26.23|50.59|Asia/Bahrain
KW|kuwait-city|כווית|Kuwait City|29.38|47.99|Asia/Kuwait
OM|muscat|מסקט|Muscat|23.59|58.41|Asia/Muscat
YE|sanaa|צנעא|Sana'a|15.37|44.19|Asia/Aden
YE|aden|עדן|Aden|12.79|45.02|Asia/Aden
TR|ankara|אנקרה|Ankara|39.93|32.86|Europe/Istanbul
TR|istanbul|איסטנבול|Istanbul|41.01|28.98|Europe/Istanbul
TR|izmir|איזמיר|İzmir|38.42|27.14|Europe/Istanbul
EG|cairo|קהיר|Cairo|30.04|31.24|Africa/Cairo
EG|alexandria|אלכסנדריה|Alexandria|31.20|29.92|Africa/Cairo
GE|tbilisi|טביליסי|Tbilisi|41.72|44.83|Asia/Tbilisi
AM|yerevan|ירוואן|Yerevan|40.18|44.51|Asia/Yerevan
AZ|baku|באקו|Baku|40.41|49.87|Asia/Baku
KZ|astana|אסטנה|Astana|51.17|71.45|Asia/Almaty
KZ|almaty|אלמטי|Almaty|43.24|76.89|Asia/Almaty
UZ|tashkent|טשקנט|Tashkent|41.30|69.24|Asia/Tashkent
UZ|samarkand|סמרקנד|Samarkand|39.65|66.96|Asia/Samarkand
UZ|bukhara|בוכרה|Bukhara|39.77|64.42|Asia/Samarkand
TM|ashgabat|אשגבט|Ashgabat|37.96|58.33|Asia/Ashgabat
TJ|dushanbe|דושנבה|Dushanbe|38.56|68.79|Asia/Dushanbe
KG|bishkek|בישקק|Bishkek|42.87|74.59|Asia/Bishkek
AF|kabul|קאבול|Kabul|34.56|69.21|Asia/Kabul
PK|islamabad|איסלמבאד|Islamabad|33.68|73.05|Asia/Karachi
PK|karachi|קראצ׳י|Karachi|24.86|67.01|Asia/Karachi
PK|lahore|לאהור|Lahore|31.55|74.34|Asia/Karachi
IN|new-delhi|ניו דלהי|New Delhi|28.61|77.21|Asia/Kolkata
IN|mumbai|מומבאי|Mumbai|19.08|72.88|Asia/Kolkata
IN|bangalore|בנגלור|Bengaluru|12.97|77.59|Asia/Kolkata
IN|kolkata|קולקטה|Kolkata|22.57|88.36|Asia/Kolkata
IN|chennai|צ׳נאי|Chennai|13.08|80.27|Asia/Kolkata
IN|goa|גואה|Goa (Panaji)|15.49|73.83|Asia/Kolkata
BD|dhaka|דאקה|Dhaka|23.81|90.41|Asia/Dhaka
LK|colombo|קולומבו|Colombo|6.93|79.86|Asia/Colombo
NP|kathmandu|קטמנדו|Kathmandu|27.72|85.32|Asia/Kathmandu
BT|thimphu|טימפו|Thimphu|27.47|89.64|Asia/Thimphu
MV|male|מאלה|Malé|4.18|73.51|Indian/Maldives
CN|beijing|בייג׳ינג|Beijing|39.90|116.41|Asia/Shanghai
CN|shanghai|שנגחאי|Shanghai|31.23|121.47|Asia/Shanghai
CN|guangzhou|גואנגג׳ואו|Guangzhou|23.13|113.26|Asia/Shanghai
CN|shenzhen|שנג׳ן|Shenzhen|22.54|114.06|Asia/Shanghai
CN|chengdu|צ׳נגדו|Chengdu|30.57|104.07|Asia/Shanghai
HK|hong-kong|הונג קונג|Hong Kong|22.32|114.17|Asia/Hong_Kong
MO|macau|מקאו|Macau|22.20|113.54|Asia/Macau
TW|taipei|טאייפה|Taipei|25.03|121.57|Asia/Taipei
MN|ulaanbaatar|אולן בטור|Ulaanbaatar|47.89|106.91|Asia/Ulaanbaatar
KP|pyongyang|פיונגיאנג|Pyongyang|39.04|125.76|Asia/Pyongyang
KR|seoul|סיאול|Seoul|37.57|126.98|Asia/Seoul
KR|busan|בוסאן|Busan|35.18|129.08|Asia/Seoul
JP|tokyo|טוקיו|Tokyo|35.68|139.65|Asia/Tokyo
JP|osaka|אוסקה|Osaka|34.69|135.50|Asia/Tokyo
JP|kyoto|קיוטו|Kyoto|35.01|135.77|Asia/Tokyo
VN|hanoi|האנוי|Hanoi|21.03|105.85|Asia/Ho_Chi_Minh
VN|ho-chi-minh|הו צ׳י מין סיטי|Ho Chi Minh City|10.82|106.63|Asia/Ho_Chi_Minh
LA|vientiane|ויינטיאן|Vientiane|17.98|102.63|Asia/Vientiane
KH|phnom-penh|פנום פן|Phnom Penh|11.56|104.93|Asia/Phnom_Penh
TH|bangkok|בנגקוק|Bangkok|13.76|100.50|Asia/Bangkok
TH|chiang-mai|צ׳יאנג מאי|Chiang Mai|18.79|98.99|Asia/Bangkok
MM|naypyidaw|נאיפידו|Naypyidaw|19.76|96.13|Asia/Yangon
MM|yangon|יאנגון|Yangon|16.87|96.20|Asia/Yangon
MY|kuala-lumpur|קואלה לומפור|Kuala Lumpur|3.14|101.69|Asia/Kuala_Lumpur
SG|singapore|סינגפור|Singapore|1.35|103.82|Asia/Singapore
ID|jakarta|ג׳קרטה|Jakarta|-6.21|106.85|Asia/Jakarta
ID|bali|באלי (דנפסר)|Bali (Denpasar)|-8.65|115.22|Asia/Makassar
PH|manila|מנילה|Manila|14.60|120.98|Asia/Manila
BN|bandar-seri-begawan|בנדר סרי בגוואן|Bandar Seri Begawan|4.90|114.94|Asia/Brunei
TL|dili|דילי|Dili|-8.56|125.56|Asia/Dili
AU|canberra|קנברה|Canberra|-35.28|149.13|Australia/Sydney
AU|sydney|סידני|Sydney|-33.87|151.21|Australia/Sydney
AU|melbourne|מלבורן|Melbourne|-37.81|144.96|Australia/Melbourne
AU|brisbane|בריסביין|Brisbane|-27.47|153.03|Australia/Brisbane
AU|perth|פרת׳|Perth|-31.95|115.86|Australia/Perth
AU|adelaide|אדלייד|Adelaide|-34.93|138.60|Australia/Adelaide
NZ|wellington|ולינגטון|Wellington|-41.29|174.78|Pacific/Auckland
NZ|auckland|אוקלנד|Auckland|-36.85|174.76|Pacific/Auckland
PG|port-moresby|פורט מורסבי|Port Moresby|-9.44|147.18|Pacific/Port_Moresby
FJ|suva|סובה|Suva|-18.12|178.44|Pacific/Fiji
SB|honiara|הוניארה|Honiara|-9.43|159.95|Pacific/Guadalcanal
VU|port-vila|פורט וילה|Port Vila|-17.73|168.32|Pacific/Efate
WS|apia|אפיה|Apia|-13.83|-171.76|Pacific/Apia
TO|nukualofa|נוקואלופה|Nukuʻalofa|-21.14|-175.20|Pacific/Tongatapu
KI|tarawa|טאראווה|Tarawa|1.45|173.00|Pacific/Tarawa
MH|majuro|מג׳ורו|Majuro|7.12|171.18|Pacific/Majuro
FM|palikir|פאליקיר|Palikir|6.92|158.16|Pacific/Pohnpei
PW|ngerulmud|נגרולמוד|Ngerulmud|7.50|134.62|Pacific/Palau
NR|yaren|יארן|Yaren|-0.55|166.92|Pacific/Nauru
TV|funafuti|פונפוטי|Funafuti|-8.52|179.20|Pacific/Funafuti
DZ|algiers|אלג׳יר|Algiers|36.75|3.06|Africa/Algiers
AO|luanda|לואנדה|Luanda|-8.84|13.23|Africa/Luanda
BJ|porto-novo|פורטו נובו|Porto-Novo|6.50|2.60|Africa/Porto-Novo
BW|gaborone|גבורונה|Gaborone|-24.65|25.91|Africa/Gaborone
BF|ouagadougou|ואגאדוגו|Ouagadougou|12.37|-1.52|Africa/Ouagadougou
BI|gitega|גיטגה|Gitega|-3.43|29.93|Africa/Bujumbura
CV|praia|פראיה|Praia|14.93|-23.51|Atlantic/Cape_Verde
CM|yaounde|יאונדה|Yaoundé|3.85|11.50|Africa/Douala
CF|bangui|בנגי|Bangui|4.39|18.56|Africa/Bangui
TD|ndjamena|אנג׳מנה|N'Djamena|12.13|15.06|Africa/Ndjamena
KM|moroni|מורוני|Moroni|-11.70|43.26|Indian/Comoro
CD|kinshasa|קינשאסה|Kinshasa|-4.44|15.27|Africa/Kinshasa
CG|brazzaville|ברזוויל|Brazzaville|-4.27|15.28|Africa/Brazzaville
CI|yamoussoukro|יאמוסוקרו|Yamoussoukro|6.83|-5.29|Africa/Abidjan
CI|abidjan|אביג׳אן|Abidjan|5.36|-4.01|Africa/Abidjan
DJ|djibouti|ג׳יבוטי|Djibouti|11.59|43.15|Africa/Djibouti
GQ|malabo|מלאבו|Malabo|3.75|8.78|Africa/Malabo
ER|asmara|אסמרה|Asmara|15.32|38.93|Africa/Asmara
SZ|mbabane|מבבנה|Mbabane|-26.31|31.14|Africa/Mbabane
ET|addis-ababa|אדיס אבבה|Addis Ababa|9.03|38.74|Africa/Addis_Ababa
ET|gondar|גונדר|Gondar|12.60|37.47|Africa/Addis_Ababa
GA|libreville|ליברוויל|Libreville|0.42|9.47|Africa/Libreville
GM|banjul|בנג׳ול|Banjul|13.45|-16.58|Africa/Banjul
GH|accra|אקרה|Accra|5.60|-0.19|Africa/Accra
GN|conakry|קונקרי|Conakry|9.64|-13.58|Africa/Conakry
GW|bissau|ביסאו|Bissau|11.86|-15.60|Africa/Bissau
KE|nairobi|ניירובי|Nairobi|-1.29|36.82|Africa/Nairobi
LS|maseru|מסרו|Maseru|-29.31|27.48|Africa/Maseru
LR|monrovia|מונרוביה|Monrovia|6.31|-10.80|Africa/Monrovia
LY|tripoli|טריפולי|Tripoli|32.89|13.19|Africa/Tripoli
MG|antananarivo|אנטננריבו|Antananarivo|-18.88|47.51|Indian/Antananarivo
MW|lilongwe|לילונגווה|Lilongwe|-13.96|33.79|Africa/Blantyre
ML|bamako|במאקו|Bamako|12.64|-8.00|Africa/Bamako
MR|nouakchott|נואקשוט|Nouakchott|18.08|-15.98|Africa/Nouakchott
MU|port-louis|פורט לואי|Port Louis|-20.16|57.50|Indian/Mauritius
MA|rabat|רבאט|Rabat|34.02|-6.84|Africa/Casablanca
MA|casablanca|קזבלנקה|Casablanca|33.57|-7.59|Africa/Casablanca
MA|marrakesh|מרקש|Marrakesh|31.63|-8.01|Africa/Casablanca
MA|fes|פס|Fez|34.03|-5.00|Africa/Casablanca
MZ|maputo|מאפוטו|Maputo|-25.97|32.57|Africa/Maputo
NA|windhoek|וינדהוק|Windhoek|-22.56|17.08|Africa/Windhoek
NE|niamey|ניאמיי|Niamey|13.51|2.11|Africa/Niamey
NG|abuja|אבוג׳ה|Abuja|9.08|7.40|Africa/Lagos
NG|lagos|לאגוס|Lagos|6.52|3.38|Africa/Lagos
RW|kigali|קיגאלי|Kigali|-1.94|30.06|Africa/Kigali
ST|sao-tome|סאו טומה|São Tomé|0.34|6.73|Africa/Sao_Tome
SN|dakar|דקאר|Dakar|14.72|-17.47|Africa/Dakar
SC|victoria-sc|ויקטוריה|Victoria|-4.62|55.45|Indian/Mahe
SL|freetown|פריטאון|Freetown|8.47|-13.23|Africa/Freetown
SO|mogadishu|מוגדישו|Mogadishu|2.05|45.32|Africa/Mogadishu
ZA|pretoria|פרטוריה|Pretoria|-25.75|28.19|Africa/Johannesburg
ZA|johannesburg|יוהנסבורג|Johannesburg|-26.20|28.05|Africa/Johannesburg
ZA|cape-town|קייפטאון|Cape Town|-33.92|18.42|Africa/Johannesburg
ZA|durban|דרבן|Durban|-29.86|31.02|Africa/Johannesburg
SS|juba|ג׳ובה|Juba|4.85|31.58|Africa/Juba
SD|khartoum|חרטום|Khartoum|15.50|32.56|Africa/Khartoum
TZ|dodoma|דודומה|Dodoma|-6.16|35.75|Africa/Dar_es_Salaam
TZ|dar-es-salaam|דאר א-סלאם|Dar es Salaam|-6.79|39.21|Africa/Dar_es_Salaam
TG|lome|לומה|Lomé|6.13|1.22|Africa/Lome
TN|tunis|תוניס|Tunis|36.81|10.18|Africa/Tunis
TN|djerba|ג׳רבה|Djerba|33.81|10.85|Africa/Tunis
UG|kampala|קמפלה|Kampala|0.35|32.58|Africa/Kampala
ZM|lusaka|לוסקה|Lusaka|-15.39|28.32|Africa/Lusaka
ZW|harare|הרארה|Harare|-17.83|31.05|Africa/Harare
US|washington|וושינגטון|Washington, D.C.|38.91|-77.04|America/New_York
US|new-york|ניו יורק|New York|40.71|-74.01|America/New_York
US|boston|בוסטון|Boston|42.36|-71.06|America/New_York
US|philadelphia|פילדלפיה|Philadelphia|39.95|-75.17|America/New_York
US|baltimore|בולטימור|Baltimore|39.29|-76.61|America/New_York
US|miami|מיאמי|Miami|25.76|-80.19|America/New_York
US|atlanta|אטלנטה|Atlanta|33.75|-84.39|America/New_York
US|cleveland|קליבלנד|Cleveland|41.50|-81.69|America/New_York
US|detroit|דטרויט|Detroit|42.33|-83.05|America/Detroit
US|chicago|שיקגו|Chicago|41.88|-87.63|America/Chicago
US|houston|יוסטון|Houston|29.76|-95.37|America/Chicago
US|dallas|דאלאס|Dallas|32.78|-96.80|America/Chicago
US|denver|דנוור|Denver|39.74|-104.99|America/Denver
US|phoenix|פיניקס|Phoenix|33.45|-112.07|America/Phoenix
US|las-vegas|לאס וגאס|Las Vegas|36.17|-115.14|America/Los_Angeles
US|los-angeles|לוס אנג׳לס|Los Angeles|34.05|-118.24|America/Los_Angeles
US|san-francisco|סן פרנסיסקו|San Francisco|37.77|-122.42|America/Los_Angeles
US|seattle|סיאטל|Seattle|47.61|-122.33|America/Los_Angeles
US|anchorage|אנקורג׳|Anchorage|61.22|-149.90|America/Anchorage
US|honolulu|הונולולו|Honolulu|21.31|-157.86|Pacific/Honolulu
CA|ottawa|אוטווה|Ottawa|45.42|-75.70|America/Toronto
CA|toronto|טורונטו|Toronto|43.65|-79.38|America/Toronto
CA|montreal|מונטריאול|Montreal|45.50|-73.57|America/Toronto
CA|winnipeg|וויניפג|Winnipeg|49.90|-97.14|America/Winnipeg
CA|calgary|קלגרי|Calgary|51.05|-114.07|America/Edmonton
CA|vancouver|ונקובר|Vancouver|49.28|-123.12|America/Vancouver
MX|mexico-city|מקסיקו סיטי|Mexico City|19.43|-99.13|America/Mexico_City
MX|guadalajara|גוודלחרה|Guadalajara|20.67|-103.35|America/Mexico_City
MX|cancun|קנקון|Cancún|21.16|-86.85|America/Cancun
GT|guatemala-city|גואטמלה סיטי|Guatemala City|14.63|-90.51|America/Guatemala
BZ|belmopan|בלמופן|Belmopan|17.25|-88.77|America/Belize
SV|san-salvador|סן סלבדור|San Salvador|13.69|-89.22|America/El_Salvador
HN|tegucigalpa|טגוסיגלפה|Tegucigalpa|14.07|-87.19|America/Tegucigalpa
NI|managua|מנגואה|Managua|12.11|-86.24|America/Managua
CR|san-jose-cr|סן חוסה|San José|9.93|-84.08|America/Costa_Rica
PA|panama-city|פנמה סיטי|Panama City|8.98|-79.52|America/Panama
CU|havana|הוואנה|Havana|23.11|-82.37|America/Havana
JM|kingston|קינגסטון|Kingston|18.02|-76.80|America/Jamaica
HT|port-au-prince|פורט או פרנס|Port-au-Prince|18.59|-72.31|America/Port-au-Prince
DO|santo-domingo|סנטו דומינגו|Santo Domingo|18.49|-69.93|America/Santo_Domingo
PR|san-juan|סן חואן|San Juan|18.47|-66.11|America/Puerto_Rico
BS|nassau|נסאו|Nassau|25.05|-77.35|America/Nassau
BB|bridgetown|ברידג׳טאון|Bridgetown|13.10|-59.62|America/Barbados
TT|port-of-spain|פורט אוף ספיין|Port of Spain|10.65|-61.51|America/Port_of_Spain
AG|st-johns-ag|סנט ג׳ונס|St. John's|17.12|-61.85|America/Antigua
DM|roseau|רוזו|Roseau|15.30|-61.39|America/Dominica
GD|st-georges|סנט ג׳ורג׳ס|St. George's|12.06|-61.75|America/Grenada
KN|basseterre|בסטר|Basseterre|17.30|-62.72|America/St_Kitts
LC|castries|קסטריס|Castries|14.01|-60.99|America/St_Lucia
VC|kingstown|קינגסטאון|Kingstown|13.16|-61.22|America/St_Vincent
CO|bogota|בוגוטה|Bogotá|4.71|-74.07|America/Bogota
CO|medellin|מדיין|Medellín|6.24|-75.58|America/Bogota
VE|caracas|קראקס|Caracas|10.48|-66.90|America/Caracas
EC|quito|קיטו|Quito|-0.18|-78.47|America/Guayaquil
PE|lima|לימה|Lima|-12.05|-77.04|America/Lima
BO|la-paz|לה פאס|La Paz|-16.50|-68.15|America/La_Paz
CL|santiago|סנטיאגו|Santiago|-33.45|-70.67|America/Santiago
AR|buenos-aires|בואנוס איירס|Buenos Aires|-34.60|-58.38|America/Argentina/Buenos_Aires
AR|cordoba-ar|קורדובה|Córdoba|-31.42|-64.18|America/Argentina/Cordoba
UY|montevideo|מונטווידאו|Montevideo|-34.90|-56.16|America/Montevideo
PY|asuncion|אסונסיון|Asunción|-25.26|-57.58|America/Asuncion
BR|brasilia|ברזיליה|Brasília|-15.79|-47.88|America/Sao_Paulo
BR|sao-paulo|סאו פאולו|São Paulo|-23.55|-46.63|America/Sao_Paulo
BR|rio|ריו דה ז׳נרו|Rio de Janeiro|-22.91|-43.17|America/Sao_Paulo
BR|salvador-br|סלבדור|Salvador|-12.97|-38.50|America/Bahia
BR|recife|רסיפה|Recife|-8.05|-34.88|America/Recife
GY|georgetown|ג׳ורג׳טאון|Georgetown|6.80|-58.16|America/Guyana
SR|paramaribo|פרמריבו|Paramaribo|5.85|-55.20|America/Paramaribo
`;

/** שמות מדינות שאין להן שם מובנה בכל הדפדפנים */
export const COUNTRY_FALLBACK: Record<string, { he: string; en: string }> = {
  XK: { he: 'קוסובו', en: 'Kosovo' },
};
