var file = (function () {
    //Переменные по умолчанию, и внутренние переменные для работы
    var  update_flag = false;
    var Constr = function (options) {
        if (options === undefined) {
            return {error: true, msg: 'Невозможно создать виджет'};
        } else {

            var $this = this;

            this.elem      = options.elem;
            this.wrap = $(this.elem).closest('.form-group').find('.file-caption-main');
            this.pos       = options.position;

            this.fieldName = $(this.elem).data('name');
            this.type      = $(this.elem).data('type');
            this.blockName = $(this.elem).data('block');
            this.id        = $(this.elem).data('id');


            this.load = function () {
                var obj = new FormData();
                obj.append('entity_name',   this.blockName);
                obj.append('entity_id',     this.id);
                obj.append('file_name',    this.fieldName);
                obj.append('file',    this.getField());
                return obj;
            };


            this.get = function () {
                obj = {
                    block: this.blockName,
                    id   : this.id,
                    key  : this.fieldName,
                    type : this.type,
                    value: this.getFieldAlt()
                };
                return obj;
            };

            this.wrap.on('change','.form-control.title',function(){
                eventManager.call('updateWidget', $this.pos);
            });
            this.getFieldAlt = function(){
                return {
                    title: this.wrap.find('.form-control.title').val(),
                    update_flag: update_flag
                };
            };
            this.addPreview =  function( data ) {

                var _template ='<div class="file-preview-frame">'+
                    '<div class="kv-file-content">'+
                    '<p style="font-size: 120px"><i class="fa fa-file-pdf-o "></i></p>'+
                    '</div>'+
                    '<div class="file-thumbnail-footer">'+
                    '<div class="file-actions">'+
                    '<input type="text"'+
                'class="form-control title"'+
                'data-block="solo_widgets"'+
                'data-name="test"'+
                'data-type="title"'+
                'value="'+$this.getField().name+'"'+
                'data-id="0">'+
                '<div class="clearfix"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';

                this.wrap.html(_template);
                update_flag = true;
                eventManager.call('updateWidget', $this.pos);
            };


            this.getField = function () {
                return $(this.elem)[0].files[0];
            };

            $(this.elem).on('change', function () {
                eventManager.call('sendFile_', $this.pos);
            });
            this.destroy = function(){
                eventManager.call('removeData', this.get() );
            }
        }
    };


    return Constr;

})();
