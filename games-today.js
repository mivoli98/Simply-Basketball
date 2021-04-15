/* <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1", id="game1"></div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">6:30pm</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div> */

const app = document.getElementById('games-today');

const container = document.createElement('div');
container.setAttribute('class', 'row');


app.appendChild(container);

var counter = 0;

var d = new Date();
var date = d.getFullYear().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getDate().toString();


var request = new XMLHttpRequest();
//date = "2021-04-10"

request.open('GET', 'https://www.balldontlie.io/api/v1/games?dates[]=' + date, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.data.forEach(games => {
		var game_id = date + "-" + counter.toString()

		const a = document.createElement('div');
		a.setAttribute('class', 'col-xl-3 col-md-6 mb-4');
		const b = document.createElement('div');
		b.setAttribute('class', 'card border-left-primary shadow h-100 py-2 games-today-card');
		b.setAttribute('id', game_id)
		b.addEventListener('click', clickHandler)


		const c = document.createElement('div');
		c.setAttribute('class', 'card-body');
		const d = document.createElement('div');
		d.setAttribute('class', 'row no-gutters align-items-center');
		const e = document.createElement('div');
		e.setAttribute('class', 'col mr-2');
		const h = document.createElement('div');
		h.setAttribute('class', 'col-auto');
		//const i = document.createElement('i');
		//i.setAttribute('class', 'fas fa-calendar fa-2x text-gray-300');

		
		a.appendChild(b);
		b.appendChild(c);
		c.appendChild(d);
		d.appendChild(e);
		d.appendChild(h);
		//d.appendChild(i);

		const team_names_div = document.createElement('div');
		team_names_div.setAttribute('class', 'text-lg font-weight-bold text-primary text-center text-uppercase border-bottom-dark mb-1');
		team_names_div.textContent = games.visitor_team.name + " @ " + games.home_team.name
		
		e.appendChild(team_names_div);
		
		if( !games.status.includes(":")) { //if game has yet to start, checks to see if game status is displaying a time
			const game_score_div = document.createElement('div');
			game_score_div.setAttribute('class', 'h5 mb-0 font-weight-bold text-center text-lg text-gray-800');
			game_score_div.textContent = games.visitor_team_score + " - " + games.home_team_score
			
			e.appendChild(game_score_div);
			
			if( container.childNodes[0] == null)
				container.appendChild(a);
			else 
				container.insertBefore(a, container.childNodes[0]);
			
		} else {
			container.appendChild(a);
		}
		
		const status_div = document.createElement('div');
		status_div.setAttribute('class', 'text-lg font-weight-bold text-info text-uppercase text-center mb-1');
		status_div.textContent = games.status
		
		if( games.status.includes("Qtr")) { //if game is in progress, checks to see if Qtr is in status
			if( games.time=="" ){
				status_div.textContent += " - 00:00" 
			} else {
				status_div.textContent += " - " + games.time
			}
		}
		
		e.appendChild(status_div);
		counter++
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

function clickHandler() {
	console.log(this.getAttribute("id"));
	window.location.href = "blank.html";
}

request.send();