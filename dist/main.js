// const fetchData = function () {
//   let input = $("#player-input").val();
//   $.get(`/teams/${input}`, function (data) {
//     $("#players").empty();
//     data.forEach((element) => {
//       $("#players")
//         .append(`<div id = finalPlayer>
//         <div id=fisrt-name>${element.firstName} ${element.lastName} </div>
//         <div id=jersey>${element.jersey} </div> 
//         <img src=https://nba-players.herokuapp.com/players/${element.lastName}/${element.firstName} alt=>
//         <div id=position>${element.position} </div></div> `);
//     });
//   });
// };
const fetchData = function () {
    let input = $("#player-input").val();
    $.get(`/teams/${input}`, function (data) {
      $("#players").empty();
      data.forEach((element) => {
        const source = $('#NBA-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template(element);
        $('#players').append(newHTML);
      });
    });
  };
