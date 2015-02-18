describe("Pruebas sobre el modelo", function(){
    var t;

    beforeEach(function(){
    });

    it ("Un modelo recién creado no tiene localidad asignada", function(){
        t = new DatosTiempo();
        expect(t.has("localidad")).toBeFalsy();
    });

});

describe("Pruebas sobre la vista", function() {
    var vista;

    beforeEach(function() {
    });

    it("Al hacer click sobre el botón se debería llamar a 'ver_tiempo_de'", function(){
        vista = new TiempoWidget({model: new DatosTiempo()});
        spyOn(vista, 'ver_tiempo_de');
        //Ponemos esto tras crear el espía para que se espíe a la función que toca, si no no va
        //visto en SO: http://stackoverflow.com/questions/7899474/spyon-a-backbone-view-method-using-jasmine
        vista.delegateEvents();
        //Si no hacemos render de la vista no se genera el HTML y por tanto no se puede hacer clic en él
        vista.render();
        var elem = vista.$('#ver_tiempo')
        elem.click();
        expect(vista.ver_tiempo_de).toHaveBeenCalled();
    });

    it("Al cambiar el atributo 'dt' del modelo se llama a 'renderData'", function() {
       spyOn(TiempoWidget.prototype, 'renderData');
       vista = new TiempoWidget({model: new DatosTiempo()});
       vista.model.trigger("change:dt");
       expect(vista.renderData).toHaveBeenCalled();
       //expect(vista.renderData.calledOnce).toBeTruthy();
    });

})