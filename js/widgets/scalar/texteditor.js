var texteditor = (function () {
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

            this.editorObj = $(this.elem).summernote({
                height    : 400,
                lang      : 'ru-RU',
                codemirror: {
                    theme: 'monokai'
                },
                toolbar   : [
                    ['style', ['style', 'bold', 'italic', 'clear']],
                    ['insert', ['picture', 'link', 'video', 'table']],
                    ['paragraph', ['ul', 'ol', 'paragraph']],
                    ['misc', ['fullscreen', 'codeview']]
                ],
                callbacks : {
                    onImageUpload: function (files, editor, welEditable) {
                        sendFile(files[0], editor, welEditable);
                    }
                }
            });
            function sendFile(file, editor, welEditable) {
                data = new FormData();
                data.append("image_file", file);
                data.append("entity_name", 'default_imageset');
                data.append("image_name", 'image_item');
                data.append("entity_id", '0');
                $.ajax({
                    data       : data,
                    type       : "POST",
                    url        : "/adm/newImage",
                    cache      : false,
                    contentType: false,
                    processData: false,
                    success    : function (data) {
                        $($this.elem).summernote('editor.insertImage', data.image);
                    }
                });
            }
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
                return this.editorObj.summernote('code');
            };

            this.set = function (value) {
                $(this.elem).val(value);
            };

            $(this.elem).on('summernote.change', function () {
                eventManager.call('updateWidget', $this.pos);
            });
            this.destroy = function () {
                eventManager.call('removeData', this.get());
            }
        }
    };


    return Constr;

})();
