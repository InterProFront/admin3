var slug = (function () {
    //Переменные по умолчанию, и внутренние переменные для работы
    var _space = '-';
    var _translate = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': _space, 'ы': 'y', 'ь': _space,
        'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': _space, '_': _space, '`': _space, '~': _space, '!': _space, '@': _space,
        '#': _space, '$': _space, '%': _space, '^': _space, '&': _space, '*': _space, '(': _space, ')': _space, '-': _space,
        '\=': _space, '+': _space, '[': _space, ']': _space, '\\': _space, '|': _space, '/': _space, '.': _space, ',': _space,
        '{': _space, '}': _space, '\'': _space, '"': _space, ';': _space, ':': _space, '?': _space, '<': _space, '>': _space,
        '№': _space
    }; 
    function  translate( elem ){
        var text = $( elem ).val().toLowerCase();
        var result = '';
        var curent_sim = '';
        for (i = 0; i < text.length; i++) {
            if (_translate[text[i]] != undefined) {
                if (curent_sim != _translate[text[i]] || curent_sim != _space) {
                    result += _translate[text[i]];
                    curent_sim = _translate[text[i]];
                }
            }
            else {
                result += text[i];
                curent_sim = text[i];
            }
        }
        result = result.trim();
        $( elem ).val(result);
    }

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
                return $(this.elem).val();
            };

            this.set = function (value) {
                $(this.elem).val(value);
            };

            $(this.elem).on('change', function () {
                translate( $this.elem );
                eventManager.call('updateWidget', $this.pos);
            });
        }
    };


    return Constr;

})();
