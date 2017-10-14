var eventManager = (function(){
    //переменные  приватные
    var _events = {
        save: function(){
            Api.save( Model.data() );
        },

        updateWidget : function ( pos ){
            View.get( pos );
        },
        updateGroupWidget: function( pos ){
            View.getItem( pos, arguments[1][2], arguments[1][3] );
        },


        updateModel : function(){},

        removeWidgets: function(data){
              View.removeWidget(data);
        },

        initGroupItem: function(elem){
            View.initItem(elem);
        },


        removeItem: function( obj ){
            Api.removeItem( obj );
        },
        addItem:    function( obj, pos ){
            Api.new( obj, arguments[1][2] );
        },
        addBoxItem: function( obj, pos ){
            Api.newBox( obj, arguments[1][2] );
        },






        sendFile: function($pos){
            Api.sendImage( View.widgets[$pos].load(), $pos );
            Status.add('sendFileLoad');
        },
        sendFile_: function($pos){
            Api.sendFile( View.widgets[$pos].load(), $pos );
            Status.add('sendFileLoad');
        },


        returnXHR: function(){

        },
        removeData: function(data){
            Model.remove(obj);
        },



        fileSuccess: function(data, pos){
            View.widgets[arguments[1][2]].addPreview( data );
            Status.add('sendFileSuccess');
        },
        removeSuccess: function( obj ){
            Model.remove( obj );
            Status.add('removeSuccess')
        },
        saveSuccess:        function()          {   Status.add('saveSuccess')   },
        saveFail:           function()          {   Status.add('ajaxFail')      },
        newSuccess :        function(data,pos)  {
            View.addItem(data, arguments[1][2]);
            Status.add('newSuccess')
        },
        fileError:      function( msg){ Status.add('sendFileError', msg)    },
        removeError:    function( msg){ Status.add('removeError',   msg)    },
        saveError:      function( msg){ Status.add('saveError',     msg)    },
        newError:       function( msg){ Status.add('newError',      msg)    },
        addError:       function ( ) { Status.add('addError')               }
    };

    return{
        call: function(event, args){
            _events[event](args,arguments);
        }
    }


})();

