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
        {"code":"None|0", "name": "--Please choose an option--"}
    ];
    // All forwards
    let forwards = [
        {"code":"None|0", "name": "--Please choose an option--"}
    ];
    // All centers
    let centers = [
        {"code":"None|0", "name": "--Please choose an option--"}
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



