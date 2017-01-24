var image = (function () {
    //Переменные по умолчанию, и внутренние переменные для работы

    var Constr = function (options) {
        if (options === undefined) {
            return {error: true, msg: 'Невозможно создать виджет'};
        } else {

            var $this = this;

            this.elem      = options.elem;
            this.pos       = options.position;

            this.fieldName = $(this.elem).data('name');
            this.type      = $(this.elem).data('type');
            this.blockName = $(this.elem).data('block');
            this.id        = $(this.elem).data('id');


            this.get = function () {
                var obj = new FormData();
                obj.append('entity_name',   this.blockName);
                obj.append('entity_id',     this.id);
                obj.append('image_name',    this.fieldName);
                obj.append('image_file',    this.getField());

                return obj;
            };

            this.getField = function () {
                return $(this.elem)[0].files[0];
            };

            $(this.elem).on('change', function () {
                eventManager.call('sendFile', $this.pos);
            });
        }
    };


    return Constr;

})();
