jQuery(document).ready(function($) {

  $.fn.chat = function() {
    this.each(function() {
      var container = this;
      var lastUpdate = $('.timestamp', container).text();
      var chatUpdateUrl = $('form.new_chat_update', container).attr('action');

      document.location = '#chat_end';

      function updateChat() {
        $.getJSON(chatUpdateUrl, {last_update: lastUpdate}, function(data) {
          $.each(data.feeds, function(i, feed) {
            if(document.getElementById(feed.id) == null) {
              $(".chat_updates", container).append(feed.update);
              $('a.chat_end', this).remove();
              $(".chat_updates", container).append("<a name='chat_end' class='chat_end'></a>");
              document.location = '#chat_end';
            };
          });

          lastUpdate = data.timestamp;
          setTimeout(updateChat, 1000);

        });
      };

      $('form.new_chat_update', this).ajaxForm(function() {
        $('#chat_update_message').val('');
      });

      $('#chat_update_message').focus();

      setTimeout(updateChat, 1000);
    });
  };

  $('#chat').chat();
});

