$(document).ready(function () {
    var page = document.getElementById('page'),
    water = document.getElementById('water'),
    cnt = document.getElementById('count'),
    percent = cnt.innerHTML,
    random, diff, interval, isInProgress;

    function update(value) {

        if (isInProgress) return;

        isInProgress = true;

        page.classList.add('page_animated');
        setTimeout(function () {
            page.classList.remove('page_animated');
        }, 1000);


        random = value;

        diff = percent - random;
        random = Math.abs(random);

        interval = setInterval(function () {

            if (diff === 0 || percent === random) {
                clearInterval(interval);
                isInProgress = false;
                return;
            }

            if (diff < 0) {
                percent++;
            } else {
                percent--;
            }

            cnt.innerHTML = percent;
            water.style.transition = 'all 3s';
            water.style.transform = 'translate(0, ' + (100 - percent) + '%)';
            water.querySelector('.water__inner').style.height = percent + '%';

            isInProgress = false;
        }, 16);
    }

    $("[name='heater-checkbox']").bootstrapSwitch();

    //---Llave entrada
    var tapOn = false,
    waterTL = new TimelineLite();

    Math.randMinMax = function (t, n, a) {
        var r = t + Math.random() * (n - t)
        return a && (r = Math.round(r)), r
    }


    $('.tap-entrada').click(function () {
        $(this).toggleClass('on');
        tapOn = !tapOn;
        if (tapOn) {
            water2();
            currentSimulation.inOpen = true;
        } else {
            currentSimulation.inOpen = false;
            waterTL.clear();
            $('#emitter-entrada').remove();
            // waterTL.kill({repeat: true});

        }
    });


    var water2 = function () {
        $('.tap-entrada').append('<div id="emitter-entrada" />');
        for (var i = 0; i < 200; i++) {
            $particle = $('<div class="particle" />');
            var x = Math.randMinMax(60, -60);
            waterTL.to($particle, /* sets the length of journey for THIS generated particle */ Math.randMinMax(1, 2), { x: x, y: 200, repeat: -1, ease: Power0.easeOut, repeatDelay: Math.randMinMax(0, 2) }, Math.randMinMax(0, 3));
            $('#emitter-entrada').append($particle);
        }

    }

    //---llave salida-----
    var tapOn1 = false,
    waterTL1 = new TimelineLite();


    $('.tap-salida').click(function () {
        $(this).toggleClass('on');
        tapOn1 = !tapOn1;
        if (tapOn1) {
            water1();
            currentSimulation.outOpen = true;
        } else {
            currentSimulation.outOpen = false;
            waterTL1.clear();
            $('#emitter-salida').remove();
            // waterTL.kill({repeat: true});

        }
    });

    var water1 = function () {
        $('.tap-salida').append('<div id="emitter-salida" />');
        for (var i = 0; i < 200; i++) {
            $particle = $('<div class="particle" />');
            var x = Math.randMinMax(60, -60);
            waterTL.to($particle, /* sets the length of journey for THIS generated particle */ Math.randMinMax(1, 2), { x: x, y: 200, repeat: -1, ease: Power0.easeOut, repeatDelay: Math.randMinMax(0, 2) }, Math.randMinMax(0, 3));
            $('#emitter-salida').append($particle);
        }

    }

    // Parámetros iniciales
    var $envTemp = $('#env-temp');
    var $tankVolume = $('#tank-volume');
    var $waterVolume = $('#water-volume');
    var $heatPower = $('#heat-power');
    var $inWaterFlow = $('#in-water-flow');
    var $outWaterFlow = $('#out-water-flow');

    var $tempDisplay = $('#actual-temp');
    var $userTemp = $('#desired-temp');
    var $heatSwitch = $('input[name="heater-checkbox"]');

    // Botones de simulación
    var $startSimulation = $('#start-simulation');
    var $stopSimulation = $('#stop-simulation');
    var $changeUserTemp = $('#change-user-temp');
    var $saveInfo = $('#save-info');

    var params = {
        envTemp: 20,
        tankVolume: 2500,
        waterVolume: 1250,
        heatPower: 1740000,
        inWaterFlow: 10.45,
        outWaterFlow: 10.45,
        onSimulation: false, 
        waterDensity: 1000,
        waterSpecificHeat: 4190,
    };

    $envTemp.val(params.envTemp);
    $tankVolume.val(params.tankVolume);
    $waterVolume.val(params.waterVolume);
    $heatPower.val(params.heatPower);
    $inWaterFlow.val(params.inWaterFlow);
    $outWaterFlow.val(params.outWaterFlow);

    var changeParams = function () {
        params.envTemp = parseInt($envTemp.val());
        params.tankVolume = parseInt($tankVolume.val());
        params.waterVolume = parseInt($waterVolume.val());
        params.heatPower = parseInt($heatPower.val());
        params.inWaterFlow = parseInt($inWaterFlow.val());
        params.outWaterFlow = parseInt($outWaterFlow.val());
    };

    var disableParamsForm = function () {
        $envTemp.prop('disabled', true);
        $tankVolume.prop('disabled', true);
        $waterVolume.prop('disabled', true);
        $heatPower.prop('disabled', true);
        $inWaterFlow.prop('disabled', true);
        $outWaterFlow.prop('disabled', true);
    };

    var enableParamsForm = function () {
        $envTemp.prop('disabled', false);
        $tankVolume.prop('disabled', false);
        $waterVolume.prop('disabled', false);
        $heatPower.prop('disabled', false);
        $inWaterFlow.prop('disabled', false);
        $outWaterFlow.prop('disabled', false);
    };

    var enableSimulationForm = function () {
        $userTemp.prop('disabled', false);
        $heatSwitch.bootstrapSwitch('toggleDisabled', false);
        $changeUserTemp.prop('disabled', false);
    };

    var disableSimulationForm = function () {
        $userTemp.prop('disabled', true);
        $heatSwitch.bootstrapSwitch('toggleDisabled', true);
        $changeUserTemp.prop('disabled', true);
    };

    $startSimulation.on('click', function () {
        params.onSimulation = true;
        changeParams();
        disableParamsForm();
        enableSimulationForm();
        $stopSimulation.prop('disabled', false);
        $startSimulation.prop('disabled', true);
        $saveInfo.prop('disabled', true);
        resetSimulation();

        var newPercent = currentSimulation.currentWaterVolume / littersToM3(params.tankVolume) * 100;
        console.log(newPercent);
        update(newPercent | 0);
    });

    $stopSimulation.on('click', function () {
        params.onSimulation = false;
        enableParamsForm();
        disableSimulationForm();
        $stopSimulation.prop('disabled', true);
        $startSimulation.prop('disabled', false);
        $saveInfo.prop('disabled', false);

    });

    var littersToM3 = function (litters) { return litters * (0.001); };

    var celsiusToKelvins = function (celsius) { return celsius + 273.15; };

    var m3ToLitters = function (m3) { return m3 / 0.001 };

    var kelvinsToCelsius = function (kelvins) { return kelvins - 273.15; };

    var resetSimulation = function() {
        currentSimulation = {
            userTemp: celsiusToKelvins(params.envTemp),
            currentWaterVolume: littersToM3(params.waterVolume),
            currentTemp: celsiusToKelvins(params.envTemp),
            time: 0,
        };
    };

    var currentSimulation = {
        userTemp: celsiusToKelvins(params.envTemp),
        currentWaterVolume: littersToM3(params.waterVolume),
        currentTemp: celsiusToKelvins(params.envTemp),
        inOpen: false,
        outOpen: false,
        heatOn: true,
        automatic: false,
        time: 0,
    };

    var inTap = function () {
        $('.tap-entrada').trigger('click');
    };

    var outTap = function () {
        $('.tap-salida').trigger('click');
    };

    $heatSwitch.on('switchChange.bootstrapSwitch', function(event, state) {
        currentSimulation.heatOn = state;       
    });

    // Función de revisión cada secundo 
    setInterval(function () {
        if (params.onSimulation) {
            if (currentSimulation.heatOn)
                currentSimulation.time = currentSimulation.time + 1
            if (!currentSimulation.heatOn && currentSimulation.time > 0)
                currentSimulation.time = currentSimulation.time - 1

            var currentLiquidVolume = currentSimulation.currentWaterVolume;
            if (currentSimulation.inOpen && currentLiquidVolume <= littersToM3(params.tankVolume)) {
                currentLiquidVolume = currentLiquidVolume + littersToM3(params.inWaterFlow);
            }

            if (currentSimulation.outOpen && currentLiquidVolume > 0) {
                currentLiquidVolume = currentLiquidVolume - littersToM3(params.outWaterFlow);
            }

            currentSimulation.currentWaterVolume = currentLiquidVolume;

            var newPercent = currentLiquidVolume / littersToM3(params.tankVolume) * 100;
            var percent = newPercent | 0

            if (percent >= 100 && currentSimulation.inOpen) {
                update(100);
                inTap();
            }

            if (percent <= 0 && currentSimulation.outOpen) {
                outTap();
            }

            update(percent);

            var neoTemp = celsiusToKelvins(params.envTemp) + (params.heatPower) / (params.waterDensity * currentLiquidVolume * params.waterSpecificHeat) * currentSimulation.time;
            currentSimulation.currentTemp = neoTemp;
            $tempDisplay.val(kelvinsToCelsius(currentSimulation.currentTemp));

            //Situaciones en automático
            if (neoTemp <= currentSimulation.userTemp && currentSimulation.automatic) {
                if (currentSimulation.inOpen) inTap();
                currentSimulation.automatic = false;
            };
            console.log(currentSimulation);

        }
    }, 1000);

    $changeUserTemp.on('click', function () {
        if (parseInt($userTemp.val()) < params.envTemp) {
            alert("La temperatura deseada es menor que la temperatura ambiente.");
        } else {
            currentSimulation.automatic = true;
            currentSimulation.userTemp = celsiusToKelvins(parseInt($userTemp.val()));
            if (currentSimulation.currentTemp - currentSimulation.userTemp > 0) {
                // hay que enfriar el agua
                $heatSwitch.bootstrapSwitch('state', false);
                //Estategia apagar el calentador y llenar de agua fria
                if (!currentSimulation.inOpen && currentSimulation.currentWaterVolume < littersToM3(params.tankVolume)) {
                    inTap();
                }
            } else {
                // hay que calentar el agua
                $heatSwitch.bootstrapSwitch('state', true);
            }
            console.log("nueva temp " + currentSimulation.userTemp);
        }
    });

    $saveInfo.on('click', function () {
        $.ajax({
            type: "POST",
            url: '/Simulator/Insertar',
            data: JSON.stringify({
                envtemp: $('#env-temp').val().toString(),
                volumenTanque: $('#tank-volume').val().toString(),
                volumenAgua: $('#water-volume').val().toString(),
                potenciaCalentador: $('#heat-power').val().toString(),
                flujoEntranteAgua: $('#in-water-flow').val().toString(),
                flujoSalienteAgua: $('#out-water-flow').val().toString(),
                actualTemp: $('#actual-temp').val().toString(),
                desiredTemp: $('#desired-temp').val().toString(),
                time: currentSimulation.time.toString()

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
            }
        });
        simulacionesGuardadas.push({
            id: indexSelect,
            envtemp: $('#env-temp').val().toString(),
            volumenTanque: $('#tank-volume').val().toString(),
            volumenAgua: $('#water-volume').val().toString(),
            potenciaCalentador: $('#heat-power').val().toString(),
            flujoEntranteAgua: $('#in-water-flow').val().toString(),
            flujoSalienteAgua: $('#out-water-flow').val().toString(),
            actualTemp: $('#actual-temp').val().toString(),
            desiredTemp: $('#desired-temp').val().toString(),
            time: currentSimulation.time.toString()
        });
        $('#simulaciones-guardadas').append('<option value=' + indexSelect + ' >' + "TF:" + $('#actual-temp').val().toString() + ",  " + "T:" + currentSimulation.time.toString() + '</option>');
        $saveInfo.prop('disabled', true);
        alert("La información se almacenó correctamente");
    });

    var simulacionesGuardadas = [];
    var indexSelect = 0;
   
    $.ajax({
        url: '/Simulator/Get',
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            $.each(data, function (index, item) {
               
                simulacionesGuardadas.push({
                    id: item.id,
                    envTemp: item.envTemp,
                    volumenTanque: item.volumenTanque,
                    volumenAgua: item.volumenAgua,
                    potenciaCalentador: item.potenciaCalentador,
                    flujoEntranteAgua: item.flujoEntranteAgua,
                    flujoSalienteAgua: item.flujoSalienteAgua,
                    actualTemp: item.actualTemp,
                    desiredTemp: item.desiredTemp,
                    time: item.time
                });

            });
            $('#simulaciones-guardadas').append('<option value="">'+""+'</option>');
            $.each(simulacionesGuardadas, function (index, item) {
                $('#simulaciones-guardadas').append('<option value=' + index + ' >' + "TF:" + item.actualTemp + ",  " + "T:" + item.time + '</option>');
                indexSelect = indexSelect + 1;
            });
        },
        error: function (xhr) {
            alert('error');
        }
    });

    var indexsimulacionesguardadas = 0;

    $('#simulaciones-guardadas').on('change', function () {
        indexsimulacionesguardadas = this.value;
        if (this.value == "") {
        } else {
            
            $.each(simulacionesGuardadas, function (index, item) {
               if (index==indexsimulacionesguardadas) {
                $('#env-temp').val(parseFloat(item.envTemp));
                $('#tank-volume').val(parseFloat(item.volumenTanque));
                $('#water-volume').val(parseFloat(item.volumenAgua));
                $('#heat-power').val(parseFloat(item.potenciaCalentador));
                $('#in-water-flow').val(parseFloat(item.flujoEntranteAgua));
                $('#out-water-flow').val(parseFloat(item.flujoSalienteAgua));
                   
                }
            });
        }
    });

});