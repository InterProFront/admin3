var bool = (function () {
    //Переменные по умолчанию, и внутренние переменные для работы
    var data = {};

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
                obj = {
                    block: this.blockName,
                    id   : this.id,
                    key  : this.fieldName,
                    value: this.getField()
                };
                if (this.type != undefined) {
                    obj.type = this.type;
                }
                return obj;
            };

            this.getField = function () {
                return  $(this.elem).is(':checked');
            };

            this.set = function (value) {
                $(this.elem).prop('checked', value);
            };

            $(this.elem).on('change', function () {
                eventManager.call('updateWidget', $this.pos);
            });

            this.destroy = function(){
                eventManager.call('removeData', this.get() );
            }
        }
    };


    return Constr;

})();
