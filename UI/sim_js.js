// External js for Head to Head
// Justin Lu


// Handles select interface
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
}

// Handles filling up select options
$(document).ready(function(){
    //All guards
    let guards = [
        {"code":"None|0", "name": "--Please choose an option--"},
        {"code":"Ryan Arcidiacono|2592", "name": "Ryan Arcidiacono"},
        {"code":"D.J. Augustin|2874", "name": "D.J. Augustin"},
        {"code":"Lonzo Ball|2669", "name": "Lonzo Ball"},
        {"code":"Lonzo Ball|3000(UCLA)", "name": "Lonzo Ball(UCLA)"},
        {"code":"Kent Bazemore|2629", "name": "Kent Bazemore"},
        {"code":"Bradley Beal|3658", "name": "Bradley Beal"},
        {"code":"Malik Beasley|2601", "name": "Malik Beasley"},
        {"code":"Marco Belinelli|2555", "name": "Marco Belinelli"},
        {"code":"Patrick Beverley|2704", "name": "Patrick Beverley"},
        {"code":"Eric Bledsoe|3152", "name": "Eric Bledsoe"},
        {"code":"Bogdan Bogdanovic|2775", "name": "Bogdan Bogdanovic"},
        {"code":"Malcolm Brogdon|2808", "name": "Malcolm Brogdon"},
        {"code":"Jaylen Brown|2706", "name": "Jaylen Brown"},
        {"code":"Jalen Brunson|2547", "name": "Jalen Brunson"},
        {"code":"Trey Burke|2501", "name": "Trey Burke"},
        {"code":"Jimmy Butler|3215", "name": "Jimmy Butler"},
        {"code":"Kobe Bryant|3900", "name": "Kobe Bryant"},
        {"code":"Kentavious Caldwell-Pope|2697", "name": "Kentavious Caldwell-Pope"},
        {"code":"Jordan Clarkson|2923", "name": "Jordan Clarkson"},
        {"code":"Darren Collison|2936", "name": "Darren Collison"},
        {"code":"Mike Conley|3301", "name": "Mike Conley"},
        {"code":"Stephen Curry|3815", "name": "Stephen Curry"},
        {"code":"DeMar DeRozan|3476", "name": "DeMar DeRozan"},
        {"code":"Spencer Dinwiddie|2885", "name": "Spencer Dinwiddie"},
        {"code":"Damyean Dotson|2560", "name": "Damyean Dotson"},
        {"code":"Kris Dunn|2534", "name": "Kris Dunn"},
        {"code":"Luka Doncic|3248", "name": "Luka Doncic"},
        {"code":"Tyreke Evans|2520", "name": "Tyreke Evans"},
        {"code":"Bryn Forbes|2636", "name": "Bryn Forbes"},
        {"code":"Evan Fournier|2875", "name": "Evan Fournier"},
        {"code":"De'Aaron Fox|3332", "name": "De'Aaron Fox"},
        {"code":"Shai Gilgeous-Alexander|2828", "name": "Shai Gilgeous-Alexander"},
        {"code":"Eric Gordon|2646", "name": "Eric Gordon"},
        {"code":"Danny Green|2634", "name": "Danny Green"},
        {"code":"Tim Hardaway Jr.|2795", "name": "Tim Hardaway Jr."},
        {"code":"James Harden|3852", "name": "James Harden"},
        {"code":"Gary Harris|2566", "name": "Gary Harris"},
        {"code":"Shaquille Harrison|2516", "name": "Shaquille Harrison"},
        {"code":"Buddy Hield|3115", "name": "Buddy Hield"},
        {"code":"Jrue Holiday|3274", "name": "Jrue Holiday"},
        {"code":"Rodney Hood|2628", "name": "Rodney Hood"},
        {"code":"Kevin Huerter|2568", "name": "Kevin Huerter"},
        {"code":"Andre Iguodala|2530", "name": "Andre Iguodala"},
        {"code":"Kyrie Irving|3342", "name": "Kyrie Irving"},
        {"code":"Allen Iverson|3670", "name": "Allen Iverson"},
        {"code":"Reggie Jackson|2935", "name": "Reggie Jackson"},
        {"code":"Tyler Johnson|2517", "name": "Tyler Johnson"},
        {"code":"Tyus Jones|2598", "name": "Tyus Jones"},
        {"code":"Michael Jordan|3999", "name": "Michael Jordan"},
        {"code":"Cory Joseph|2645", "name": "Cory Joseph"},
        {"code":"Zach LaVine|3071", "name": "Zach LaVine"},
        {"code":"Jeremy Lamb|3033", "name": "Jeremy Lamb"},
        {"code":"Damian Lillard|3720", "name": "Damian Lillard"},
        {"code":"Jeremy Lin|2612", "name": "Jeremy Lin"},
        {"code":"Jeremy Lin|3027", "name": "Linsanity"},
        {"code":"Kyle Lowry|2978", "name": "Kyle Lowry"},
        {"code":"Wesley Matthews|2593", "name": "Wesley Matthews"},
        {"code":"CJ McCollum|3005", "name": "CJ McCollum"},
        {"code":"Tracy Mcgrady|3550", "name": "Tracy Mcgrady"},
        {"code":"T.J. McConnell|2539", "name": "T.J. McConnell"},
        {"code":"Patty Mills|2609", "name": "Patty Mills"},
        {"code":"Donovan Mitchell|3291", "name": "Donovan Mitchell"},
        {"code":"Monte Morris|2771", "name": "Monte Morris"},
        {"code":"Emmanuel Mudiay|2647", "name": "Emmanuel Mudiay"},
        {"code":"Jamal Murray|3060", "name": "Jamal Murray"},
        {"code":"Josh Okogie|2531", "name": "Josh Okogie"},
        {"code":"Victor Oladipo|3401", "name": "Victor Oladipo"},
        {"code":"Chris Paul|2957", "name": "Chris Paul"},
        {"code":"Elfrid Payton|2515", "name": "Elfrid Payton"},
        {"code":"Flight Reacts|4000", "name": "Flight Reacts"},
        {"code":"JJ Redick|2900", "name": "JJ Redick"},
        {"code":"Josh Richardson|2978", "name": "Josh Richardson"},
        {"code":"Derrick Rose|2707", "name": "Derrick Rose"},
        {"code":"Derrick Rose(Vintage)|3600", "name": "Derrick Rose(Vintage)"},
        {"code":"Terrence Ross|2808", "name": "Terrence Ross"},
        {"code":"Terry Rozier|2633", "name": "Terry Rozier"},
        {"code":"Ricky Rubio|2840", "name": "Ricky Rubio"},
        {"code":"D'Angelo Russell|3253", "name": "D'Angelo Russell"},
        {"code":"Tomas Satoransky|2823", "name": "Tomas Satoransky"},
        {"code":"Dennis Schroder|2897", "name": "Dennis Schroder"},
        {"code":"Collin Sexton|2884", "name": "Collin Sexton"},
        {"code":"Ben Simmons|3455", "name": "Ben Simmons"},
        {"code":"Marcus Smart|2775", "name": "Marcus Smart"},
        {"code":"JR Smith|3079", "name": "JR Smith"},
        {"code":"Dennis Smith Jr.|2558", "name": "Dennis Smith Jr."},
        {"code":"Jeff Teague|2573", "name": "Jeff Teague"},
        {"code":"Klay Thompson|3093", "name": "Klay Thompson"},
        {"code":"Allonzo Trier|2507", "name": "Allonzo Trier"},
        {"code":"Evan Turner|2536", "name": "Evan Turner"},
        {"code":"Fred VanVleet|2647", "name": "Fred VanVleet"},
        {"code":"Dwyane Wade|2848", "name": "Dwyane Wade"},
        {"code":"Kemba Walker|3589", "name": "Kemba Walker"},
        {"code":"John Wall|3752", "name": "John Wall"},
        {"code":"Russell Westbrook|3629", "name": "Russell Westbrook"},
        {"code":"Derrick White|2680", "name": "Derrick White"},
        {"code":"Lou Williams|3228", "name": "Lou Williams"},
        {"code":"Delon Wright|2721", "name": "Delon Wright"},
        {"code":"Trae Young|3286", "name": "Trae Young"}
    ];
    // All forwards
    let forwards = [
        {"code":"None|0", "name": "--Please choose an option--"},
        {"code":"LaMarcus Aldridge|3596", "name": "LaMarcus Aldridge"},
        {"code":"Al-Farouq Aminu|2780", "name": "Al-Farouq Aminu"},
        {"code":"Giannis Antetokounmpo|3925", "name": "Giannis Antetokounmpo"},
        {"code":"Carmelo Anthony|3384", "name": "Carmelo Anthony"},
        {"code":"Carmelo Anthony(TeamUSA)|3820", "name": "Carmelo Anthony(TeamUSA)"},
        {"code":"Trevor Ariza|2785", "name": "Trevor Ariza"},
        {"code":"Marvin Bagley III|2801", "name": "Marvin Bagley III"},
        {"code":"Harrison Barnes|2872", "name": "Harrison Barnes"},
        {"code":"Nicolas Batum|2700", "name": "Nicolas Batum"},
        {"code":"DeAndre' Bembry|2663", "name": "DeAndre' Bembry"},
        {"code":"Nemanja Bjelica|2713", "name": "Nemanja Bjelica"},
        {"code":"Bojan Bogdanovic|3004", "name": "Bojan Bogdanovic"},
        {"code":"Mikal Bridges|2720", "name": "Mikal Bridges"},
        {"code":"Miles Bridges|2572", "name": "Miles Bridges"},
        {"code":"DeMarre Carroll|2581", "name": "DeMarre Carroll"},
        {"code":"John Collins|3035", "name": "John Collins"},
        {"code":"Zach Collins|2508", "name": "Zach Collins"},
        {"code":"Jae Crowder|2729", "name": "Jae Crowder"},
        {"code":"Anthony Davis|3500", "name": "Anthony Davis"},
        {"code":"Luka Doncic|3248", "name": "Luka Doncic"},
        {"code":"Kevin Durant|3736", "name": "Kevin Durant"},
        {"code":"Joel Embiid|3608", "name": "Joel Embiid"},
        {"code":"Derrick Favors|2980", "name": "Derrick Favors"},
        {"code":"Dorian Finney-Smith|2604", "name": "Dorian Finney-Smith"},
        {"code":"Filayyyy|3022", "name": "Filayyyy"},
        {"code":"Danilo Gallinari|3121", "name": "Danilo Gallinari"},
        {"code":"Rudy Gay|2813", "name": "Rudy Gay"},
        {"code":"Paul George|3739", "name": "Paul George"},
        {"code":"Taj Gibson|2778", "name": "Taj Gibson"},
        {"code":"Aaron Gordon|3069", "name": "Aaron Gordon"},
        {"code":"Jerami Grant|2923", "name": "Jerami Grant"},
        {"code":"Draymond Green|2788", "name": "Draymond Green"},
        {"code":"JaMychal Green|2531", "name": "JaMychal Green"},
        {"code":"Jeff Green|2772", "name": "Jeff Green"},
        {"code":"Blake Griffin|3413", "name": "Blake Griffin"},
        {"code":"Maurice Harkless|2513", "name": "Maurice Harkless"},
        {"code":"Montrezl Harrell|3293", "name": "Montrezl Harrell"},
        {"code":"Joe Harris|2717", "name": "Joe Harris"},
        {"code":"Tobias Harris|3276", "name": "Tobias Harris"},
        {"code":"Gordon Hayward|2777", "name": "Gordon Hayward"},
        {"code":"Justin Holiday|2718", "name": "Justin Holiday"},
        {"code":"Rondae Hollis-Jefferson|2508", "name": "Rondae Hollis-Jefferson"},
        {"code":"Richaun Holmes|2653", "name": "Richaun Holmes"},
        {"code":"Serge Ibaka|2985", "name": "Serge Ibaka"},
        {"code":"Joe Ingles|2881", "name": "Joe Ingles"},
        {"code":"Brandon Ingram|2703", "name": "Brandon Ingram"},
        {"code":"Jonathan Isaac|2707", "name": "Jonathan Isaac"},
        {"code":"Josh Jackson|2712", "name": "Josh Jackson"},
        {"code":"Jaren Jackson Jr.|2684", "name": "Jaren Jackson Jr."},
        {"code":"LeBron James|3908", "name": "LeBron James"},
        {"code":"Maxi Kleber|2507", "name": "Maxi Kleber"},
        {"code":"Kevin Knox|2624", "name": "Kevin Knox"},
        {"code":"Kyle Kuzma|2922", "name": "Kyle Kuzma"},
        {"code":"Kawhi Leonard|3750", "name": "Kawhi Leonard"},
        {"code":"Kevon Looney|2677", "name": "Kevon Looney"},
        {"code":"Lauri Markkanen|2751", "name": "Lauri Markkanen"},
        {"code":"Khris Middleton|3090", "name": "Khris Middleton"},
        {"code":"Paul Millsap|2900", "name": "Paul Millsap"},
        {"code":"Nikola Mirotic|2555", "name": "Nikola Mirotic"},
        {"code":"Marcus Morris|2783", "name": "Marcus Morris"},
        {"code":"Larry Nance Jr.|2828", "name": "Larry Nance Jr."},
        {"code":"Nerlens Noel|2551", "name": "Nerlens Noel"},
        {"code":"Kelly Olynyk|2681", "name": "Kelly Olynyk"},
        {"code":"Cedi Osman|2752", "name": "Cedi Osman"},
        {"code":"Kelly Oubre Jr.|2835", "name": "Kelly Oubre Jr."},
        {"code":"Jabari Parker|2722", "name": "Jabari Parker"},
        {"code":"Mason Plumlee|2828", "name": "Mason Plumlee"},
        {"code":"Otto Porter Jr.|2669", "name": "Otto Porter Jr."},
        {"code":"Bobby Portis|2569", "name": "Bobby Portis"},
        {"code":"Dwight Powell|2855", "name": "Dwight Powell"},
        {"code":"Taurean Prince|2514", "name": "Taurean Prince"},
        {"code":"Julius Randle|3294", "name": "Julius Randle"},
        {"code":"Domantas Sabonis|3033", "name": "Domantas Sabonis"},
        {"code":"Dario Saric|2716", "name": "Dario Saric"},
        {"code":"Pascal Siakam|3215", "name": "Pascal Siakam"},
        {"code":"Jayson Tatum|3025", "name": "Jayson Tatum"},
        {"code":"PJ Tucker|2659", "name": "PJ Tucker"},
        {"code":"Noah Vonleh|2640", "name": "Noah Vonleh"},
        {"code":"T.J. Warren|2575", "name": "T.J. Warren"},
        {"code":"Andrew Wiggins|2958", "name": "Andrew Wiggins"},
        {"code":"Marvin Williams|2673", "name": "Marvin Williams"},
        {"code":"Justise Winslow|2711", "name": "Justise Winslow"},
        {"code":"Thaddeus Young|3020", "name": "Thaddeus Young"}
    ];
    // All centers
    let centers = [
        {"code":"None|0", "name": "--Please choose an option--"},
        {"code":"Steven Adams|3017", "name": "Steven Adams"},
        {"code":"Bam Adebayo|2734", "name": "Bam Adebayo"},
        {"code":"Jarrett Allen|2830", "name": "Jarrett Allen"},
        {"code":"Deandre Ayton|2927", "name": "Deandre Ayton"},
        {"code":"Thomas Bryant|2632", "name": "Thomas Bryant"},
        {"code":"Clint Capela|3002", "name": "Clint Capela"},
        {"code":"Willie Cauley-Stein|2878", "name": "Willie Cauley-Stein"},
        {"code":"Ed Davis|2537", "name": "Ed Davis"},
        {"code":"Dewayne Dedmon|2580", "name": "Dewayne Dedmon"},
        {"code":"Andre Drummond|3292", "name": "Andre Drummond"},
        {"code":"Joel Embiid|3608", "name": "Joel Embiid"},
        {"code":"Marc Gasol|2912", "name": "Marc Gasol"},
        {"code":"Rudy Gobert|3288", "name": "Rudy Gobert"},
        {"code":"Al Horford|2800", "name": "Al Horford"},
        {"code":"Nikola Jokic|3407", "name": "Nikola Jokic"},
        {"code":"DeAndre Jordan|2786", "name": "DeAndre Jordan"},
        {"code":"Enes Kanter|2747", "name": "Enes Kanter"},
        {"code":"Alex Len|2600", "name": "Alex Len"},
        {"code":"Brook Lopez|2718", "name": "Brook Lopez"},
        {"code":"Robin Lopez|2522", "name": "Robin Lopez"},
        {"code":"JaVale McGee|2774", "name": "JaVale McGee"},
        {"code":"Jusuf Nurkic|3034", "name": "Jusuf Nurkic"},
        {"code":"Mitchell Robinson|2612", "name": "Mitchell Robinson"},
        {"code":"Karl-Anthony Towns|3402", "name": "Karl-Anthony Towns"},
        {"code":"Myles Turner|2828", "name": "Myles Turner"},
        {"code":"Jonas Valanciunas|2568", "name": "Jonas Valanciunas"},
        {"code":"Nikola Vucevic|3295", "name": "Nikola Vucevic"},
        {"code":"Hassan Whiteside|2816", "name": "Hassan Whiteside"}
    ];
// Populate using Jquery --------------------------------------------------------
    // Handles Team 1/2 guards
    $('#pg-select').empty();
    $('#pg2-select').empty();
    $('#sg-select').empty();
    $('#sg2-select').empty();
    $.each(guards, function(i, p) {
        $('#pg-select').append($('<option></option>').val(p.code).text(p.name));
        $('#pg2-select').append($('<option></option>').val(p.code).text(p.name));
        $('#sg-select').append($('<option></option>').val(p.code).text(p.name));
        $('#sg2-select').append($('<option></option>').val(p.code).text(p.name));
    });
    // Handles Team 1/2 forwards
    $('#sf-select').empty();
    $('#sf2-select').empty();
    $('#pf-select').empty();
    $('#pf2-select').empty();
    $.each(forwards, function(i, p) {
        $('#sf-select').append($('<option></option>').val(p.code).text(p.name));
        $('#sf2-select').append($('<option></option>').val(p.code).text(p.name));
        $('#pf-select').append($('<option></option>').val(p.code).text(p.name));
        $('#pf2-select').append($('<option></option>').val(p.code).text(p.name));
    });
    // Handles Team 1/2 centers
    $('#c-select').empty();
    $('#c2-select').empty();
    $.each(centers, function(i, p) {
        $('#c-select').append($('<option></option>').val(p.code).text(p.name));
        $('#c2-select').append($('<option></option>').val(p.code).text(p.name));
    });
});

// Function used to retrieve all user input values
// And then determine which team wins
function calculate() {
    var team1, team2;
    // Team 1 Handling -------------------------------
    // a b c d e represent the corresponding position selections by user
    // Extract the values and sum for total team value, if no player is
    // selected returns 0 as player value
    var a = document.getElementById("pg-select").value;
    var b = document.getElementById("sg-select").value;
    var c = document.getElementById("sf-select").value;
    var d = document.getElementById("pf-select").value;
    var e = document.getElementById("c-select").value;
    // Get value of player seperated by '|', turn string into int
    var aValue = a.split('|');
    var inta = parseInt( aValue[1], 10);
    var bValue = b.split('|');
    var intb = parseInt( bValue[1], 10);
    var cValue = c.split('|');
    var intc = parseInt( cValue[1], 10);
    var dValue = d.split('|');
    var intd= parseInt( dValue[1], 10);
    var eValue = e.split('|');
    var inte = parseInt( eValue[1], 10);
    // Calculate total team 1 value
    team1 = inta + intb + intc + intd + inte;
    // Team 2 Handling ---------------------------------
    // Follows same format as team 1 handling, values denoted
    // by the additional 2
    var a2 = document.getElementById("pg2-select").value;
    var b2 = document.getElementById("sg2-select").value;
    var c2 = document.getElementById("sf2-select").value;
    var d2 = document.getElementById("pf2-select").value;
    var e2 = document.getElementById("c2-select").value;
    var aValue2 = a2.split('|');
    var inta2 = parseInt( aValue2[1], 10);
    var bValue2 = b2.split('|');
    var intb2 = parseInt( bValue2[1], 10);
    var cValue2 = c2.split('|');
    var intc2 = parseInt( cValue2[1], 10);
    var dValue2 = d2.split('|');
    var intd2= parseInt( dValue2[1], 10);
    var eValue2 = e2.split('|');
    var inte2 = parseInt( eValue2[1], 10);
    // Calculate total team 2 value
    team2 = inta2 + intb2 + intc2 + intd2 + inte2;
    // Final outcome declaration ----------------------
    if (team1 == team2) {
        alert('We going to overtime!');
    } else if (team1 > team2) {
        alert('Team 1 wins!');
    } else if (team2 > team1) {
        alert('Team 2 wins!');
    }
    return false;
}



