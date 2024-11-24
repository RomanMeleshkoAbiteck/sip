var user;

  function addScript() {

      var scriptSrc = '/phone/scripts/app.js';
      var $script = $('script[src="' + scriptSrc + '"]');

      if ($script.length) {
         // Если скрипт существует, удаляем его
         $script.remove();
      } else {
         // Если скрипта нет, добавляем его
         var scriptTag = '<script type="text/javascript" src="' + scriptSrc + '" defer></script>';
         $("body").append(scriptTag);
      }

  }


  function statusAccount( user ) {

      let obj = JSON.parse(localStorage.getItem('userData'));

      $(".showStatus").empty();

      for( let key in obj ) {

          let i = `<p><span>${key}: </span><span>${obj[key]}</span></p>`;

          $('.showStatus').append( i )

      }

  }

   statusAccount();

   function showStatus() {
       $(".sipStatus").on('click', function () {

           $('.statusAccount').toggle();

       });
   }

   showStatus();

   function setData() {
       let content = $(".content");
       let saveChanges = $(".saveChanges");
       let modal_setting = $(".modal-setting");

       user = JSON.parse(localStorage.getItem('userData'));

       if (user) {
          $(content).show();
          $(modal_setting).hide();

           addScript();

       }else {
          $(content).hide();
       }

       $(saveChanges).on("click", function( event ) {
           // getInfo();

           statusAccount();

           let validateForms = validateModalSetting( event );

           let storedUser = localStorage.getItem('userData');

           if ( storedUser && validateForms ) {

              user = JSON.parse(storedUser);

              addScript();

              // getInfo();

              $(content).show();
              $(modal_setting).hide();

           } else {
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
          userData[inputId] = inputValue;
      });

      localStorage.setItem('userData', JSON.stringify(userData));
  }


  function validateModalSetting( event ) {

      let isValid = true;

      // Проходим по каждому полю input внутри формы
      $('.modal-body input').each(function() {
          if ($(this).val().trim() === '') {
             isValid = false;
             $(this).addClass('is-invalid');
          } else {
             $(this).removeClass('is-invalid');
          }
      });

      // Если есть пустые поля, предотвращаем отправку формы
      if (!isValid) {
          event.preventDefault();
          alert('Пожалуйста, заполните все поля.');
      } else {

          getInfo();
          statusAccount();
          // Логика для отправки данных
          console.log('Форма валидна и может быть отправлена.');
      }

      return isValid;

  }
