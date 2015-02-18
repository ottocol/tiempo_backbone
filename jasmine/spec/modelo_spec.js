describe("Pruebas sobre el modelo", function () {
    var t;

    beforeEach(function () {
        t = new DatosTiempo();
    });

    it("Un modelo recién creado no tiene localidad asignada", function () {
        expect(new DatosTiempo().has("localidad")).toBeFalsy();
    });


    it("La comunicación con el servicio web funciona correctamente", function () {
        jasmine.Ajax.install();
        t.set("localidad", "Alicante");
        t.actualizarTiempo();
        //comprobamos que la petición es correcta
        expect(jasmine.Ajax.requests.mostRecent().url).toEqual(URL_API + '&q=Alicante');
        expect(jasmine.Ajax.requests.mostRecent().method).toEqual('GET');
        //devolvemos una respuesta fake
        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            responseText: JSON.stringify({
                weather: [
                    {description: "Prueba", icon: "test"}
                ],
                dt: 0
            })
        });
        //comprobamos que las propiedades se han instanciado OK con la info del "servidor"
        expect(t.get("dt")).toBe(0);
        expect(t.get("descripcion")).toEqual("Prueba");
        jasmine.Ajax.uninstall();
    });


});
