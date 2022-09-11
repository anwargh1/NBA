
const render = $("#player-input")

const fetchData = function () {
    let input = render.val();
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
