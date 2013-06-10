Template.messageItem.helpers({
  linkify: function() {
    //something horribly wrong here
    if(!this["message"]) return "";
    if(typeof this["message"] !== 'string') {
      if(this["message"] instanceof Array) {
        var val = this["message"].join(' ');
      } else {
        return "";
      }
    } else {
      var val = this["message"];
    }
    var link = Handlebars._escape(val);
    var exp = /((http|https):\/\/([ \S]+\.(jpg|jpeg|png|gif)))/ig;
    if(val.match(exp)) {
      link = val.replace(exp, '<a href="$1" target="_blank"><img src="$1" width="200" height="200"></a>');
    } else {
      exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      link = val.replace(exp, '<a href="$1" target="_blank">$1</a>');
    }
    return link;
  },
  prettyTime: function() {
    if(!this["date_time"]) return "";
    var val = this["date_time"];
    var parsed = new Date(val);
    return ('0'+parsed.getHours()).substr(-2,2)+':'+('0'+parsed.getMinutes()).substr(-2,2);
  }
});

Template.messageItem.events = {
  'click': function(evt) {
    Session.set('auto_scroll', false);
  }
};


Template.messageItem.rendered = function() {
  scrollToBottom();
  $(this.find('.message')).hide().fadeIn();
};