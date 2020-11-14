
$(function() {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updatesave").click(function() {
    var id = $("#id").val();
    var title = $("#updatetitle").val();
    var body = $("#updatebody").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
      data: { title, body },
      method: "PUT",
      success: function(response) {
        console.log(response);
        

        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(
    response
  ) {
    $("#id").val(response._id);
    $("#updatetitle").val(response.title);
    $("#updatebody").val(response.body);
    $("#updateModal").modal("show");
    
  });
}
function addRecipe() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.body}</p></div>`
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}
