$(function(){
    
    const socket = io();

    // obtener elemntos del dom
    const $messageForm = $('#message-form'),
          $messageBox = $('#message'),
          $chat = $('#chat');

    //elementos nick name form
    const $nickForm = $("#nickForm");
    const $nickError = $("#nickError");
    const $nickname = $("#nickname");

    const $usernames = $("#usernames");

    //functions
    function displayMsgs(data){
        $chat.append(`<b>${data.nick}<b/>:${data.msg} </br>`)
    }

    //eventos

    $nickForm.submit( e =>{
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data =>{
            if(data){
                $("#nickWrap").hide();
                $("#contentWrap").show();
            }
            else{
                $nickError.html(`
                    <div class="alert alert-danger">
                        El usuario ya existe.
                    </div>`)
                $nickname.val('')
            }
        } );
    })

    $messageForm.on('submit', e =>{
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), data =>{
            $chat.append(`<p class="error">${data}</p>`);
        } );
        $messageBox.val('');
    });

    socket.on('new message', data =>{
        displayMsgs(data)
    })

    socket.on('usernames', data=>{
        let html = '';
        data.forEach(dat =>{
            html += `<p><i class="fas fa-user"></i> ${dat}</p>`
        })
        $usernames.html(html)
    })

    socket.on('whisper', data =>{
        displayMsgs(data)
    })

    socket.on('load old msgs', msgs =>{
        msgs.forEach(msg =>{
            displayMsgs(msg)
        })
    })
})