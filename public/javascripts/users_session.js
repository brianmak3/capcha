
$(function() {
    try{
        var socket = io.connect('http://127.0.0.1:8080');
    }catch(e){
        // set status to warn
    }

    if(socket == '') {
        alert('Sorry you are not connected');
    }
    session_name = $.session.get("session_name");
    socket.on('get_user',function(data)
    {
        if(data.length != 0)
        {
            for(var x = 0; x < data.length; x++)
            {
                if(data[x].user_name == session_name)
                {
                    first_name = data[x].first_name;
                    last_name = data[x].last_name;
                    $('#user_id_div').text(first_name+' '+last_name);
                }
            }
        }
    });
    $('#logout').click(function(){
        $.session.clear();

    });
});
