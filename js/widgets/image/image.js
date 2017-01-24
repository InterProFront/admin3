var image = (function () {
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
                obj.append('image_name',    this.fieldName);
                obj.append('image_file',    this.getField());
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

            this.wrap.on('change','.form-control.alt-text',function(){
                eventManager.call('updateWidget', $this.pos);
            });
            this.getFieldAlt = function(){
                return {
                    update_flag: update_flag,
                    alt: this.wrap.find('.form-control.alt-text').val()
                };
            };
            this.addPreview =  function( data ) {

                var _template = '<div class="file-preview-frame">'+
                    '<div class="kv-file-content">'+
                    '<img src="'+data+'" class="kv-preview-data file-preview-image" title="2.jpg" alt="2.jpg" style="width:auto;height:160px;">'+
                    '</div>'+
                    '<div class="file-thumbnail-footer">'+
                    '<div class="file-footer-caption" title="2.jpg">2.jpg <br><samp>(425.24 KB)</samp></div>'+
                    '<div class="file-actions">'+
                    '<input type="text" class="form-control alt-text"' +
                    '                   data-block="'+this.blockName+'"' +
                    '                   data-type="images"' +
                    '                   data-id="'+this.id+'"' +
                    '                   data-name="alt">'+
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
                eventManager.call('sendFile', $this.pos);
            });
            this.destroy = function(){
                eventManager.call('removeData', this.get() );
            }
        }
    };


    return Constr;

})();
