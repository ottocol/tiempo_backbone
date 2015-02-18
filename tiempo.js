
var URL_API = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=es";
var URL_BASE_ICONO = "http://openweathermap.org/img/w/"

var DatosTiempo = Backbone.Model.extend({
    actualizarTiempo: function () {
        var callback = function (data) {
            this.set('descripcion', data.weather[0].description);
            var icono_url = URL_BASE_ICONO + data.weather[0].icon + ".png";
            this.set('icono_url', icono_url);
            this.set('dt', data.dt);
            console.log("Se ha leído el tiempo del servicio web");
        }
        $.getJSON(
            URL_API,
            {q: this.get('localidad')},
            callback.bind(this)
        );
    }
});


var TiempoWidget = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, 'change:dt', this.renderData)
    },
    render: function() {
        this.$el.html('<input type="text" id="localidad">' +
           '<input type="button" value="Ver tiempo" id="ver_tiempo">' +
           '<div> <img id="icono" src=""></div>' +
           '<div id="descripcion"></div>');
    },
    renderData: function() {
        console.log("Se ha llamado a renderData");
        $('#icono').attr('src',this.model.get("icono_url"));
        $('#descripcion').html(this.model.get("descripcion"));
    },
    events: {
        "click #ver_tiempo": "ver_tiempo_de"
    },
    ver_tiempo_de: function() {
        console.log("Click en el botón 'ver tiempo'");
        this.model.set("localidad", $("#localidad").val())
        this.model.actualizarTiempo()
        //Si llamara a renderData ahora no funcionará ya que actualizarTiempo es asíncrono
        //y los datos todavía no estarán para ser renderizados
        //this.renderData()
    }
})

var miTiempo = new DatosTiempo();
var miWidget = new TiempoWidget({model: miTiempo});
$('#tiempo_widget').html(miWidget.$el)