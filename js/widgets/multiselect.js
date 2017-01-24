var multiselect = (function () {
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

            $(this.elem).select2();

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
                return $(this.elem).val();

            };

            this.set = function (value) {
                $(this.elem).val(value).trigger('change');
            };

            $(this.elem).on('change', function () {
                eventManager.call('updateWidget', $this.pos);
            });
        }
    };


    return Constr;

})();
