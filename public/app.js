$.post("/scrape")
    .then(function() {
        $.getJSON("/articles", function(data) {

            for(var i = ; i < data.lenth; i++) {
                $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>"); 
            }
        })

    })


    $(document).on("click", "p", function() {

        $("#notes").empty();

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            .then(function(data) {
                console.log(data);

            // 1. Make aloop to render all the exisiting notes


            // 2. Create an empty form for a new note


            $("#notes").append("<h2>" + data.title + "</h2>");

            $("#notes").append("<input id='titleinput' name='title' >");

            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        });
});

$(document).on("click", "#savenote", function() {

    var thisId = $(this).attr("data-id"); 

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {

            title: $("#titleinput").val(),
            
            body: $("#bodyinput").val()
        }
    })
    
    .then(function(data) {

        console.log(data);
        
        $("#notes").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
