var user;

function addScript() {

     let i = '<script type="text/javascript" src="/phone/scripts/app.js" defer></script>'

     $("body").append( i );

}


function setData() {
    let content = $(".content");
    let saveChanges = $(".saveChanges");
    let modal_setting = $(".modal-setting");
    let i;

     user = JSON.parse(localStorage.getItem('userData'));

     if (user) {
          $(content).show();
          $(modal_setting).hide();

          i = '<script type="text/javascript" src="/phone/scripts/app.js" defer></script>'

          $("body").append( i );


     }else {
          $(content).hide();
     }

    $(saveChanges).on("click", function() {
        getInfo();
        let i;

        // Получаем данные из localStorage
        let storedUser = localStorage.getItem('userData');

        if (storedUser) {
            // Если данные есть, создаем объект user
            user = JSON.parse(storedUser);

            addScript();
            // console.log(user);
            $(content).show();
            $(modal_setting).hide();
        } else {
            // Если данных нет, показываем модальное окно
            $(modal_setting).show();
        }
    });
}

setData();

function getInfo() {
    let userData = {};

    $('#myModal').find('input').each(function() {
        var inputId = $(this).attr('id');
        var inputValue = $(this).val().trim();
        userData[inputId] = inputValue; // Сохраняем значения в объект
    });

    // Сохраняем объект userData в localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
}
