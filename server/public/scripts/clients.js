var editing = false;
var taskId = 0;


$(document).ready(function(){
  console.log('jQuery sourced');
  getTask();

  $('#todo').on('click', '.delete', function(){
    console.log('Delete todo: '+ $(this).data('todo'));
    var id = $(this).data('todo');
    $.ajax({
      type: 'DELETE',
      url: '/todo/delete/' + id,
      success: function(response){
        getTask();
      }
    });
  });

  $('#todo').on('click', '.edit', function(){
    console.log($(this).data('todo'));
    editing = true;
    $('#formTask').text("You are now editing...");
    taskId = $(this).data('todo');
    $('#task').val($(this).data('task'));
    $('#complete').val($(this).data('complete'));
  });



  $('#todoForm').on('submit', function(event){
    event.preventDefault();
    console.log($('#task').val(), $('#complete').val());
    if(editing) {
      editing = false;
      $('#formTask').text("Add new entry");

      $.ajax({
        type: "PUT",
        url: "/todo/edit",
        data: {task: $('#task').val(), complete:$('#complete').val(), id: taskId },
        success: function(response){
          getTask();
        }
});
    } else {
      $.ajax({
        type: "POST",
        url: "/todo/add",
        data: {task: $('#task').val(), complete:$('#complete').val()},
        success: function(response) {
          getTask();
        }
      });
    }
    $('#task').val('');
    $('#complete').val('');
  });
});

function getTask() {
  $.ajax({
    type: "GET",
    url: "/todo",
    success: function(response) {
      console.log(response);
      $('#todo').empty();
      for(var i = 0; i < response.length; i++) {
        var todo = response[i];
        $('#todo').append('<tr></tr>');
        var $el = $('#todo').children().last();
        $el.append('<td>' + todo.id + '</td>');
        $el.append('<td>' + todo.task + '</td>');
        $el.append('<td>' + todo.complete + '</td>');
        $el.append('<td><button class="delete" data-todo="' +
        todo.id + '">Delete</button></td>');
        $el.append('<td><input type="checkbox" value="checkbox" data-todo"' +
        todo.id + '" data-task="' +
        todo.task + '" data-complete="'+
        todo.complete +'"></checkbox</td>');
      }
    }
  });
}
