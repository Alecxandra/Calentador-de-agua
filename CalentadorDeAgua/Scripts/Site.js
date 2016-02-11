﻿$(document).ready(function () {
    var page = document.getElementById('page'),
    water = document.getElementById('water'),
    cnt = document.getElementById('count'),
    percent = cnt.innerHTML,
    random, diff, interval, isInProgress;

    function update(value) {

        if (isInProgress) return;
        btn.removeEventListener('click', update);
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
                btn.addEventListener('click', update);
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
        } else {
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
        } else {
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

    var params = {
        envTemp: 20,
        tankVolume: 2500,
        waterVolume: 1250,
        heatPower: 17400,
        inWaterFlow: 1.45,
        outWaterFlow: 1.45,
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
    };

    var disableSimulationForm = function () {
        $userTemp.prop('disabled', true);
        $heatSwitch.bootstrapSwitch('toggleDisabled', true);
    };

    $startSimulation.on('click', function () {
        params.onSimulation = true;
        disableParamsForm();
        enableSimulationForm();
        $stopSimulation.prop('disabled', false);
        $startSimulation.prop('disabled', true);
    });

    $stopSimulation.on('click', function () {
        params.onSimulation = false;
        enableParamsForm();
        disableSimulationForm();
        $stopSimulation.prop('disabled', true);
        $startSimulation.prop('disabled', false);
    });

    var littersToM3 = function (litters) { return litters * (0.001); };

    var celsiusToKelvins = function (celsius) { return celsius + 273.15; };

    var m3ToLitters = function (m3) { return m3 / 0.001 };

    var kelvinsToCelsius = function (kelvins) { return kelvins - 273.15; };

    var currentSimulation = {
        userTemp: celsiusToKelvins(params.envTemp),
        currentWaterVolume: littersToM3(params.waterVolume),
        currentTemp: celsiusToKelvins(params.envTemp),
    };

    // Función de revisión cada secundo 
    setInterval(function () {
        if (params.onSimulation) {
            console.log("Estoy revisando");
        }
    }, 1000);
});