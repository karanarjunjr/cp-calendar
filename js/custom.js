const btn = document.getElementById(`toggle`);
const sidebar = document.getElementById(`sidebar`);
const rest = document.getElementById(`rest`);
const tc = document.getElementById(`tableContent`);
const checkboxElems = document.querySelectorAll("input[type='checkbox']");
const radioElems = document.querySelectorAll("input[type='radio']");
const map1 = new Map();
map1.set("codechef.com", "codechef.png");
map1.set("codeforces.com", "codeforces.svg");
map1.set("atcoder.jp", "atcoder.png");
map1.set("geeksforgeeks.org", "GeeksforGeeks.svg");
map1.set("codingcompetitions.withgoogle.com", "google.png");
map1.set("hackerearth.com", "HackerEarth_logo.png");
map1.set("leetcode.com", "leetcode.png");
map1.set("topcoder.com", "topcoder.png");

btn.addEventListener("click", function (e) {
  if (sidebar.classList.contains("inactive")) {
    sidebar.classList.remove("inactive");
    rest.classList.add("whenBarActive");
    rest.classList.remove("whenBarInActive");
  } else {
    sidebar.classList.add("inactive");
    rest.classList.remove("whenBarActive");
    rest.classList.add("whenBarInActive");
  }
});

var host;
if (localStorage.getItem("hosts") === null) {
  host = [`codechef.com`, `codeforces.com`];
  document.getElementById("btncheck2").checked = true;
  document.getElementById("btncheck1").checked = true;
} else {
  host = JSON.parse(localStorage.getItem("hosts"));
  host.forEach(function (name) {
    document.getElementsByName(`${name}`)[0].checked = true;
  });
}
var hosts = `codechef.com%2Ccodeforces.com%2Cgeeksforgeeks.org%2Chackerearth.com%2Cleetcode.com%2Ctopcoder.com%2Catcoder.jp%2Ccodingcompetitions.withgoogle.com`;

var now = new Date();
const nowString =
  now.toISOString().substring(0, 11) + now.toISOString().substring(11, 19);

var today = false;
var todayStart = new Date();
todayStart.setDate(todayStart.getDate() - 32);
todayStart.setHours(00, 00, 00);

var todayStartString =
  todayStart.toISOString().substring(0, 11) +
  todayStart.toISOString().substring(11, 19);
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(00, 00, 00);
const apiURL = `https://cors-m66t.onrender.com/clist.by:443/api/v2/contest/?username=karanarjunjr&api_key=32b0dc3d2ed2ee0e8ad5eb7dfe37c47e4da8abb4&format=json&order_by=start`;
const apiURL2 = `https://bright-fly-undershirt.cyclic.app/clist.by:443/api/v2/contest/?username=karanarjunjr&api_key=32b0dc3d2ed2ee0e8ad5eb7dfe37c47e4da8abb4&format=json&order_by=start`;

var apiData;

function display() {
  var inner = ``;

  apiData.data.objects.forEach(function (contest) {
    var contStart = new Date(contest.start + `.000Z`);
    var contEnd = new Date(contest.end + `.000Z`);
    if (today) {
      if (
        host.includes(contest.resource) &&
        contEnd > now &&
        contStart < tomorrow
      ) {
        const minutes = (parseInt(contest.duration) / 60) % 60;
        const hours = parseInt((parseInt(contest.duration) / 3600) % 24);
        const days = parseInt(parseInt(contest.duration) / 3600 / 24);
        var dur = ``;
        if (days > 0) {
          dur += `${days} days `;
        }
        if (hours > 0) {
          dur += `${hours} hours `;
        }
        if (minutes > 0) {
          dur += `${minutes} minutes `;
        }
        var start = new Date(contest.start + `.000Z`);
        start = start.toLocaleString("en-US");
        const time = start.split(", ");
        const date = time[0].split("/");
        var temp = `
					<a class="contest btn btn-lg btn-light mx-4 my-3" href="${
            contest.href
          }" target="_blank">
						<div class="left">
							<span><strong>${contest.event}</strong></span>
							<span>Start date: ${date[1]}/${date[0]}/${date[2]}</span>
							<span>Start time: ${time[1]}</span>
							<span>Duration: ${dur}</span>
						</div>
						<div class="right">
							<img class="logo" src="images/${map1.get(contest.resource)}" alt="codechef">
						</div>
					</a>
					
				`;

        inner += temp;
      }
    } else {
      if (host.includes(contest.resource) && contStart > now) {
        const minutes = (parseInt(contest.duration) / 60) % 60;
        const hours = parseInt((parseInt(contest.duration) / 3600) % 24);
        const days = parseInt(parseInt(contest.duration) / 3600 / 24);
        var dur = ``;
        if (days > 0) {
          dur += `${days} days `;
        }
        if (hours > 0) {
          dur += `${hours} hours `;
        }
        if (minutes > 0) {
          dur += `${minutes} minutes `;
        }
        var start = new Date(contest.start + `.000Z`);
        start = start.toLocaleString("en-US");
        const time = start.split(", ");
        const date = time[0].split("/");
        var temp = `
					<a class="contest btn btn-lg btn-light mx-4 my-3" href="${
            contest.href
          }" target="_blank">
						<div class="left">
							<span><strong>${contest.event}</strong></span>
							<span>Start date: ${date[1]}/${date[0]}/${date[2]}</span>
							<span>Start time: ${time[1]}</span>
							<span>Duration: ${dur}</span>
						</div>
						<div class="right">
							<img class="logo" src="images/${map1.get(contest.resource)}" alt="codechef">
						</div>
					</a>
					
				`;

        inner += temp;
      }
    }
  });
  tc.innerHTML = inner;
  if (inner === ``) {
    tc.innerHTML = `
			<p id="load1">(⌣̩̩́_⌣̩̩̀)</p>
			<p id="load2">"First In First Out" says Queue,</p>
			<p id="load3">We have nothing to show you!</p>
		`;
  }
  btn.disabled = false;
}

async function callAPI() {
  //   try {
  //     const response = await fetch(
  //       apiURL +
  //         `&resource=${hosts}&end__gt=${nowString}&start__gt=${todayStartString}`
  //     );
  //     const data = await response.json();

  //     return {
  //       data,
  //     };
  //   } catch {
  //     const response = await fetch(
  //       apiURL2 +
  //         `&resource=${hosts}&end__gt=${nowString}&start__gt=${todayStartString}`
  //     );
  //     const data = await response.json();

  //     return {
  //       data,
  //     };
  //   }
  const response = await fetch(
    apiURL2 +
      `&resource=${hosts}&end__gt=${nowString}&start__gt=${todayStartString}`
  );
  const data = await response.json();

  return {
    data,
  };
}

function addEventListeners() {
  for (var i = 0; i < checkboxElems.length; i++) {
    checkboxElems[i].addEventListener("click", function (e) {
      if (e.target.checked) {
        if (!host.includes(e.target.name)) {
          host.push(e.target.name);
        }
      } else {
        const index = host.indexOf(e.target.name);
        if (index > -1) {
          host.splice(index, 1);
        }
      }
      display();
      localStorage.setItem("hosts", JSON.stringify(host));
    });
  }

  for (var i = 0; i < radioElems.length; i++) {
    radioElems[i].addEventListener("click", function (e) {
      if (e.target.id === "btncheck9") {
        today = true;
        display();
      } else {
        today = false;
        display();
      }
    });
  }
}

var todayStart = new Date();
todayStart.setHours(00, 00, 00);

const TS = new Date(localStorage.getItem("timeStamp"));
if (localStorage.getItem("contests") === null || TS < todayStart) {
  callAPI().then((data) => {
    apiData = data;
    const timeStamp = new Date();
    localStorage.setItem("contests", JSON.stringify(data));
    localStorage.setItem("timeStamp", timeStamp);
    display();
    addEventListeners();
  });
} else {
  addEventListeners();
  apiData = JSON.parse(localStorage.getItem("contests"));
  display();
}
