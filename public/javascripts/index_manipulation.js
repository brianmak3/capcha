$(document).ready(function(){

	$('.register_toggle').click(function() {
        $('#myModal2').fadeIn(300);
        $('#x_hide_reg').click(function () {
            $('#myModal2').fadeOut(300);
        });
        });

    //var connection = new WebSocket('ws://localhost:8080');
    //implementing of web sockets if your webhost allows will take place here

        try{
            var socket = io.connect('http://127.0.0.1:8080');
        }catch(e){
            // set status to warn
        }

        if(socket == '')
        {
          alert('Sorry you are not connected');
        }
   //getting the current date and time
        var mydate = new Date();
        var year = mydate.getYear();
        if (year < 1000)
            year += 1900;
        var day = mydate.getDay();
        var month = mydate.getMonth();
        var daym = mydate.getDate();
        if (daym < 10)
            daym = "0" + daym;
        var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday");
        var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var time = mydate.getHours() + ": " + mydate.getMinutes() + ": " + mydate.getSeconds();
        var date = dayarray[day] + ", " + montharray[month] + " " + daym + ", " + year;

    //sending of data to the database


        $('#submit_registration').click(function(){
            var user_name = $('#username').val();
            var first_name =  $('#first_name').val();
            var   last_name = $('#last_name') .val();
            var   email =  $('#email').val();
            var  work_id =  $('#work_id').val();
            var  phone_number =  $('#phone_number').val();
            var    password =  $('#password').val();
            var    password2 =  $('#password2').val();

            if(jQuery.trim(user_name) != '' & jQuery.trim(first_name) != '' & jQuery.trim(last_name) != '' & jQuery.trim(email) != '' & jQuery.trim(work_id) != '' & jQuery.trim(phone_number) != '' & jQuery.trim(password2) != '') {
                if (!validateEmail(email)) {
                    $('#warning_div').text(email + ' is an invalid email address *').css({'color':'red','font-size':'12px'});;
                } else
                {
                    if (password == password2) {
                 password = $.md5(password);
                  socket.emit('register_user',{user_name: user_name, first_name: first_name, last_name:last_name, email: email, work_id:work_id, phone_number:phone_number, password:password, time: time, date:date});
                        $('#modal_body').html('<span style="font-size:15px;color: forestgreen">A confirmation link has been sent to your email. Click it to validate your account.</span><br/><br/><input type="button" class="btn btn-success" id="okay_reg" value="Ok">');
                        $('#okay_reg').click(function () {
                            $('#myModal2').fadeOut(300);
                        });
                    }else {
                 $('#warning_div').text('The passwords do not match *').css({'color':'red','font-size':'12px'});
                 }
                    }
            } else
            {
                var fields = [first_name, last_name,user_name, email, work_id, phone_number, password, password2];
                var field_names = ['First name', 'Last name', 'User name', 'Email', 'Work id', 'Phone number', 'Password', 'Password confirmation'];
                for(i=fields.length; i>=0; i<= i--)
                {
                    if(fields[i]==''){
                        $('#warning_div').text(field_names[i]+' is required *').css({'color':'red','font-size':'12px'});
                    }

                }

            }
        });


        //login in to the system


        socket.on('get_user',function(data)
        {
            if(data.length != 0)
            {
                $('#login_btn').click(function() {

                    var user_name_login = $('#username_login ').val();
                    var pass_login = $('#password_login').val();
                    var password_login = $.md5(pass_login);
                    if (user_name_login != '' && pass_login != ''){
                        for (var x = 0; x < data.length; x = x + 1) {
                            var username = data[x].user_name;
                            var passwordlg = data[x].password;
                            var first_last_names = data[x].first_name+' '+data[x].last_name;
                            if (user_name_login == username && password_login == passwordlg) {
                                $.session.clear();
                                 $.session.set("session_name", username);
                                    session_name =  $.session.get("session_name");
                                 window.location = 'users';

                            } else
                                {
                                    $('#login_warning').show(function(){
                                        $(document).mousemove(function(){
                                            $('#login_warning').hide();
                                        });
                                    }).text('Invalid user name password combination *');
                            }
                        }
                    }else
                    {
                        $('#login_warning').show(function(){
                            $(document).mousemove(function(){
                                $('#login_warning').hide();
                            });
                        }).text('Username and password are required *');
                    }
                });
            }
        });
});

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

