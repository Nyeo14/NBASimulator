// External js for Head to Head
// Justin Lu

// Dropdown usage
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

// Outcome statement
const button = document.querySelector('button');
button.onclick = function() {
  alert('Example : Team 1 Wins!');
}


/*
function getOutcome(players1, players2, file?) {

    let players1 = [];
    let players2 = [];
    var team1, team2;
    if file.content == players1
        team1 = players1.value + team1
    if file.content == players2
        team1 = players2.value + team2
    if (team1 == team2) {
        lastResult.textContent = 'We going to overtime!';
    } else if (team1 > team2) {
        lastResult.textContent = 'Team1 wins!';
    } else if (team2 > team1) {
        lastResult.textContent = 'Team2 wins!';
    }

}
*/
