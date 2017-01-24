var Status = (function () {

    var status_class = {
        fail: {
            class: 'alert-danger',
            icon: 'fa-ban'
        },
        warning: {
            class: 'alert-danger',
            icon: 'fa-warning'
        },
        info: {
            class: 'alert-info',
            icon: 'fa-refresh fa-spin'
        },
        success: {
            class: 'alert-success',
            icon: 'fa-check'
        }
    };

    var statusText ={

      saveSuccess: { title: 'Данные успешно сохранены', message: '', type: 'success'},
      saveError: { title: 'Ошибка при сохранении данных', message: '', type: 'warning'},

      newSuccess: { title: 'Новый элемент успешно создан', message: '', type: 'success'},
      newError: { title: 'Ошибка при создании нового элемента', message: '', type: 'warning'},

      removeSuccess: {title: 'Элемент успешно удален', message:'', type: 'success'},
      removeError: {title: 'Ошибка при удалении элемента', message:'', type: 'warning'},

      sendFileSuccess: { title: 'Изображение успешно загружено', message: '', type: 'success'},
      sendFileLoad: { title: 'Идет загрузка',
          message: 'Идет загрузка изображения на сервер, это займет не больше минуты',
          type: 'info'
      },
      sendFileError: { title: 'Ошибка при загрузки изображения', message: '', type: 'warning'},

      ajaxFail: { title: 'Ошибка при отправке данных на сервер', message: '', type: 'fail'},
      addError : {title: 'Введите название элемента', message: '', type: 'fail'}
    };

    function makeTemplate( type, msg ){
        msg = msg || statusText[type].message;
        _template =
                '<div class=" alert '+status_class[statusText[type].type].class+' alert-dismissible widget-status">'+
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                '<h4><i class="icon fa '+status_class[statusText[type].type].icon+'"></i> '+statusText[type].title+'</h4>'+
                msg+
                '</div>';
        return _template;
    }
    var $this;
    return {
        init: function(){
            $this = this;
            this.elem = $('.main-footer');


            $('body').on('click', function(){
                if( $this.elem.find('.alert').is('.alert') ){
                    if( $this.elem.find('.alert').hasClass('alert-success') ){
                        $this.elem.find('.alert').remove();
                    }
                }
            });
        },
        add: function( type, msg ){

            this.elem.find('.alert').remove();
            this.elem.prepend($( makeTemplate(type, msg) ));
        }
    }


})();